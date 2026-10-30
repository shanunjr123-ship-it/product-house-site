#!/usr/bin/env python3
"""
Excel -> website data.

  python3 scripts/import_catalog.py "path/to/catalogue.xlsx"

Reads the sheet (header row is found by looking for 'Part Code' and 'Part Name'),
extracts embedded pictures, classifies parts using data/taxonomy.json, and writes:

  data/products.json          full records (used at build time)
  public/data/catalog.json    slim records (used by the browser search)
  public/products/<code>.webp one optimised picture per part that has one
  data/review.txt             what the importer could not classify / skipped

Optional columns it understands (header text, any case):
  Category | Brand / Machine | Arabic Name | Description (Arabic) | Description (English) | Description
A 'Description' cell shorter than 20 characters is treated as a reference number, not a description.
"""
import io, json, re, sys, zipfile
from pathlib import Path

import openpyxl
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
TAX = json.loads((ROOT / "data" / "taxonomy.json").read_text(encoding="utf-8"))
ACRONYMS = {"SKF", "NSK", "FAG", "PU", "HYD", "OLI", "UCP", "UCF", "UCT", "LED", "KSA", "KW", "HP", "RPM",
            "AC", "DC", "PTO", "DIN", "CAT", "KOYO", "SKS", "ID", "NH", "LNG", "CR", "TK", "FD", "II"}
SKIP_NAME = re.compile(r"^(special purchase|vat\s*\d{10,})\b", re.I)
VAT_RX = re.compile(r"^vat\s*(\d{15})$", re.I)


def clean_name(s: str) -> str:
    s = re.sub(r"\s+", " ", str(s).replace("&amp;", "&")).strip()
    if s.isupper() or s.islower():
        out = []
        for w in s.split(" "):
            if w.upper() in ACRONYMS:
                out.append(w.upper())
            elif any(c.isdigit() for c in w):
                out.append(w.upper() if w.islower() and len(w) <= 4 else w)
            else:
                out.append(w.capitalize())
        s = " ".join(out)
    return s


def find_header(ws):
    for r in range(1, 15):
        vals = {str(c.value).strip().lower(): c.column for c in ws[r] if c.value is not None}
        if "part code" in vals and "part name" in vals:
            return r, vals
    sys.exit("Could not find a header row containing 'Part Code' and 'Part Name'.")


def col(vals, *needles):
    for k, v in vals.items():
        if any(n in k for n in needles):
            return v
    return None


def main(xlsx: str):
    wb = openpyxl.load_workbook(xlsx)
    ws = wb.active
    hr, vals = find_header(ws)
    c_code, c_name = vals["part code"], vals["part name"]
    c_cat = col(vals, "categor")
    c_brand = col(vals, "brand", "machine", "compatib")
    c_ar = col(vals, "arabic name", "اسم")
    c_dar = col(vals, "description (arabic", "وصف")
    c_den = col(vals, "description (english")
    c_desc = col(vals, "description", "details") if not (c_dar or c_den) else None

    # embedded pictures anchored over a row
    imgs = {}
    for im in getattr(ws, "_images", []):
        try:
            row = im.anchor._from.row + 1
            imgs.setdefault(row, im._data())
        except Exception:
            pass
    media = [n for n in zipfile.ZipFile(xlsx).namelist() if n.startswith("xl/media/")]
    notes = []
    if media and not imgs:
        notes.append(f"{len(media)} media files exist but none are anchored to a row "
                     "(probably 'Place in Cell' pictures). Extraction for that layout is not implemented yet.")

    cats = [(c["slug"], re.compile(c["rx"])) for c in TAX["categories"] if c["rx"]]
    tags = [(t["slug"], re.compile(t["rx"])) for t in TAX["tags"]]
    cat_slugs = {c["slug"] for c in TAX["categories"]}
    tag_slugs = {t["slug"]: t for t in TAX["tags"]}

    (ROOT / "public" / "products").mkdir(parents=True, exist_ok=True)
    products, skipped, business = [], [], {}
    for r in range(hr + 1, ws.max_row + 1):
        code, name = ws.cell(r, c_code).value, ws.cell(r, c_name).value
        if not code or not name:
            continue
        code, raw = str(code).strip(), str(name).strip()
        m = VAT_RX.match(raw)
        if m:
            business["vat"] = m.group(1)
        if SKIP_NAME.match(raw):
            skipped.append(f"{code}  {raw}")
            continue
        low = raw.lower()
        cat = None
        if c_cat and ws.cell(r, c_cat).value:
            v = str(ws.cell(r, c_cat).value).strip().lower()
            cat = next((s for s in cat_slugs if s == v), None)
        if not cat:
            cat = next((s for s, rx in cats if rx.search(low)), None)
        p = {
            "code": code,
            "name": clean_name(raw),
            "nameAr": (str(ws.cell(r, c_ar).value).strip() if c_ar and ws.cell(r, c_ar).value else None),
            "cat": cat,
            "tags": [s for s, rx in tags if rx.search(low)],
            "image": None,
            "descAr": (str(ws.cell(r, c_dar).value).strip() if c_dar and ws.cell(r, c_dar).value else None),
            "descEn": (str(ws.cell(r, c_den).value).strip() if c_den and ws.cell(r, c_den).value else None),
            "ref": None,
        }
        if c_desc and ws.cell(r, c_desc).value:
            d = str(ws.cell(r, c_desc).value).strip()
            if len(d) < 20:
                p["ref"] = d
            elif re.search(r"[؀-ۿ]", d):
                p["descAr"] = d
            else:
                p["descEn"] = d
        if c_brand and ws.cell(r, c_brand).value:
            for part in re.split(r"[,/;]", str(ws.cell(r, c_brand).value).lower()):
                part = part.strip()
                if part in tag_slugs and part not in p["tags"]:
                    p["tags"].append(part)
        if r in imgs:
            try:
                im = Image.open(io.BytesIO(imgs[r])).convert("RGB")
                im.thumbnail((900, 900))
                safe = re.sub(r"[^A-Za-z0-9_-]", "_", code)
                im.save(ROOT / "public" / "products" / f"{safe}.webp", quality=78)
                p["image"] = f"/products/{safe}.webp"
            except Exception as e:
                notes.append(f"{code}: image failed ({e})")
        products.append(p)

    # family fallback: same 6-digit code prefix, >=4 members, >=60% of the classified ones agree
    fam = {}
    for p in products:
        fam.setdefault(re.split(r"-", p["code"])[0][:6], []).append(p)
    for members in fam.values():
        known = [p["cat"] for p in members if p["cat"]]
        if len(members) >= 4 and known:
            top = max(set(known), key=known.count)
            if known.count(top) / len(known) >= 0.6:
                for p in members:
                    if not p["cat"]:
                        p["cat"] = top
    for p in products:
        p["cat"] = p["cat"] or "other"
        p["indexable"] = bool(p["image"] and (p["descAr"] or p["descEn"]))

    (ROOT / "data").mkdir(exist_ok=True)
    (ROOT / "public" / "data").mkdir(parents=True, exist_ok=True)
    (ROOT / "data" / "products.json").write_text(json.dumps(products, ensure_ascii=False, indent=0), encoding="utf-8")
    slim = [[p["code"], p["name"], p["nameAr"] or "", p["cat"], ",".join(p["tags"]), 1 if p["image"] else 0] for p in products]
    (ROOT / "public" / "data" / "catalog.json").write_text(json.dumps(slim, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    if business:
        (ROOT / "data" / "business-from-sheet.json").write_text(json.dumps(business), encoding="utf-8")

    counts = {}
    for p in products:
        counts[p["cat"]] = counts.get(p["cat"], 0) + 1
    other = [f'{p["code"]}  {p["name"]}' for p in products if p["cat"] == "other"]
    review = [f"Parts: {len(products)}  | with image: {sum(1 for p in products if p['image'])}  | indexable: {sum(p['indexable'] for p in products)}",
              "Per category: " + ", ".join(f"{k}={v}" for k, v in sorted(counts.items(), key=lambda x: -x[1])),
              "", "NOTES:", *notes, "", f"SKIPPED ({len(skipped)}):", *skipped, "", f"UNCLASSIFIED ({len(other)}):", *other]
    (ROOT / "data" / "review.txt").write_text("\n".join(review), encoding="utf-8")
    print("\n".join(review[:2]), "\nbusiness facts found:", business or "none")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    main(sys.argv[1])

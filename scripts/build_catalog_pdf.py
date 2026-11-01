"""
Builds the downloadable parts catalogue (PDF) from data/products.json + data/taxonomy.json.
Output: public/downloads/product-house-parts-catalog.pdf

Needs Python 3 with `playwright` (+ its Chromium) and `Pillow`:
    pip install playwright pillow && playwright install chromium
Run from the project root after the inventory changes:
    python scripts/build_catalog_pdf.py
Prices are never printed: the shop quotes on WhatsApp.
"""
import html
import json
import shutil
import tempfile
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "downloads" / "product-house-parts-catalog.pdf"

PHONE_LOCAL = "059 211 2782"
ADDR_EN = "Old Industrial Area, Al Owaidah, Riyadh"
ADDR_AR = "الصناعية القديمة، العويدة، الرياض"
NAME_EN, NAME_AR = "Product House Trading Est.", "مؤسسة بيت المنتج للتجارة"
CR, VAT = "1010380995", "310703724100003"

products = json.loads((ROOT / "data" / "products.json").read_text(encoding="utf-8"))
tax = json.loads((ROOT / "data" / "taxonomy.json").read_text(encoding="utf-8"))
cats = {c["slug"]: c for c in tax["categories"]}
tags = {t["slug"]: t for t in tax["tags"]}
esc = html.escape

tmp = Path(tempfile.mkdtemp(prefix="catpdf-"))
thumbs = tmp / "t"
thumbs.mkdir()

# Cover background, baked into one image. A CSS "colour -> transparent" gradient is written into the PDF as a
# soft mask + PostScript function, which Edge's viewer and the Claude app draw differently (no glow / wrong tint).
# A plain image looks the same in every viewer.
import numpy as np

_w, _h = 827, 1170  # A4 at 100 dpi
_y, _x = np.mgrid[0:_h, 0:_w].astype("float32")
_k =(_y / (_h - 1))[..., None]
_base = np.array([255, 255, 255], "float32") * (1 - _k) + np.array([238, 241, 255], "float32") * _k  # #fff -> #eef1ff
_cx, _cy = 0.85 * _w, -0.05 * _h
_t = np.sqrt(((_x - _cx) / (900 / 794 * _w)) ** 2 + ((_y - _cy) / (600 / 1123 * _h)) ** 2)
_a = np.clip(1 - _t / 0.6, 0, 1)[..., None]  # #dfe6ff fading to nothing at 60%
_img = _base * (1 - _a) + np.array([223, 230, 255], "float32") * _a
Image.fromarray(_img.round().astype("uint8")).save(tmp / "cover-bg.jpg", quality=95)


def thumb(code: str, rel: str | None) -> str | None:
    if not rel:
        return None
    src = ROOT / "public" / rel.lstrip("/")
    if not src.exists():
        return None
    im = Image.open(src).convert("RGB")
    im.thumbnail((120, 120))
    dst = thumbs / f"{code}.jpg"
    im.save(dst, "JPEG", quality=72, optimize=True)
    return dst.as_uri()


by_cat: dict[str, list[dict]] = {}
for p in products:
    by_cat.setdefault(p["cat"], []).append(p)
order = [c["slug"] for c in tax["categories"] if c["slug"] in by_cat and c["slug"] != "other"]
if "other" in by_cat:
    order.append("other")
order.sort(key=lambda s: (s == "other", -len(by_cat[s])))

fonts = ROOT / "public" / "fonts"
css = f"""
@font-face {{ font-family: "SF"; src: url("{(fonts / 'SFProDisplay-400.woff2').as_uri()}"); font-weight: 400; }}
@font-face {{ font-family: "SF"; src: url("{(fonts / 'SFProDisplay-500.woff2').as_uri()}"); font-weight: 500 600; }}
@font-face {{ font-family: "SF"; src: url("{(fonts / 'SFProDisplay-700.woff2').as_uri()}"); font-weight: 700 900; }}
@font-face {{ font-family: "Messiri"; src: url("{(fonts / 'ElMessiri-var.woff2').as_uri()}"); font-weight: 400 700; }}
@page {{ size: A4; margin: 16mm 12mm 17mm; }}
@page :first {{ margin: 0; }}
* {{ box-sizing: border-box; }}
html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{ margin: 0; font: 400 9.4pt/1.35 "SF", "Messiri", sans-serif; color: #141f6b; }}
.ar {{ font-family: "Messiri", "SF", sans-serif; direction: rtl; unicode-bidi: isolate; }}
.cover {{ height: 297mm; width: 210mm; padding: 22mm 18mm; display: flex; flex-direction: column; break-after: page;
  background: #fff url("{(tmp / 'cover-bg.jpg').as_uri()}") 0 0 / 100% 100% no-repeat; }}
.cover img.logo {{ height: 20mm; width: auto; align-self: flex-start; }}
.cover h1 {{ font-size: 40pt; line-height: 1.02; margin: 26mm 0 0; letter-spacing: -0.03em; font-weight: 700; }}
.cover h1.ar {{ font-size: 36pt; margin-top: 6mm; letter-spacing: 0; line-height: 1.25; }}
.cover .sub {{ margin-top: 8mm; font-size: 13pt; color: #3d4a8f; max-width: 150mm; }}
.cover .sub.ar {{ margin-top: 3mm; }}
.chips {{ display: flex; gap: 3mm; margin-top: 12mm; flex-wrap: wrap; }}
.chip {{ background: #fff; border: 0.3mm solid #cdd5f5; border-radius: 99mm; padding: 2mm 5mm; font-size: 10.5pt; font-weight: 600; }}
.cover .foot {{ margin-top: auto; border-top: 0.3mm solid #cdd5f5; padding-top: 6mm; display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; font-size: 10pt; }}
.cover .foot b {{ display: block; font-size: 11.5pt; margin-bottom: 1mm; }}
.cta {{ display: inline-block; margin-top: 3mm; background: #2641d8; color: #fff; padding: 2.4mm 6mm; border-radius: 99mm; font-weight: 700; font-size: 11pt; text-decoration: none; }}
h2.sec {{ margin: 0 0 4mm; padding: 3.4mm 5mm; border-radius: 3mm; background: linear-gradient(90deg, #2641d8, #3b56e6); color: #fff;
  display: flex; justify-content: space-between; align-items: baseline; gap: 6mm; font-size: 14pt; font-weight: 700; break-after: avoid; }}
h2.sec .ar {{ font-size: 14pt; font-weight: 600; }}
h2.sec small {{ font-weight: 500; font-size: 9pt; opacity: .85; display: block; }}
section.cat {{ break-before: page; }}
.toc {{ break-after: page; }}
.toc h1 {{ font-size: 22pt; margin: 0 0 1mm; }}
.toc h1.ar {{ margin-bottom: 6mm; font-size: 20pt; }}
.toc a {{ display: grid; grid-template-columns: 1fr auto 1fr; gap: 4mm; align-items: baseline; padding: 2.2mm 0; border-bottom: 0.2mm solid #dfe4fa; color: inherit; text-decoration: none; font-size: 10.5pt; }}
.toc a .n {{ font-weight: 700; color: #2641d8; text-align: center; min-width: 14mm; }}
.toc a .ar {{ text-align: right; }}
table {{ width: 100%; border-collapse: collapse; }}
th {{ font-size: 7.6pt; font-weight: 600; color: #5a6699; text-align: left; padding: 0 2mm 1.6mm; border-bottom: 0.3mm solid #cdd5f5; }}
th.ar {{ text-align: right; font-size: 8pt; }}
thead {{ display: table-header-group; }}
tr {{ break-inside: avoid; }}
td {{ padding: 1.6mm 2mm; border-bottom: 0.2mm solid #e6e9fb; vertical-align: middle; }}
td.img {{ width: 15mm; padding-left: 0; }}
td.img div {{ width: 13mm; height: 13mm; border-radius: 2mm; border: 0.2mm solid #dfe4fa; background: #fff; display: grid; place-items: center; overflow: hidden; }}
td.img img {{ max-width: 100%; max-height: 100%; object-fit: contain; }}
td.code {{ width: 25mm; font-weight: 700; font-variant-numeric: tabular-nums; white-space: nowrap; }}
td.ref {{ width: 24mm; font-size: 8.4pt; color: #3d4a8f; font-variant-numeric: tabular-nums; }}
td.fit {{ width: 26mm; font-size: 8pt; color: #3d4a8f; }}
.nm {{ font-size: 9.2pt; font-weight: 500; }}
.nm.ar {{ display: block; text-align: right; font-size: 9pt; color: #3d4a8f; margin-top: .6mm; }}
.last {{ break-before: page; text-align: center; padding-top: 50mm; }}
.last h1 {{ font-size: 24pt; margin: 0 0 3mm; }}
.last p {{ font-size: 11.5pt; color: #3d4a8f; margin: 2mm auto; max-width: 140mm; }}
"""


def row(p: dict) -> str:
    img = thumb(p["code"], p["image"])
    fit = ", ".join(tags[t]["en"] for t in p["tags"] if t in tags)
    ar = f'<span class="nm ar">{esc(p["nameAr"])}</span>' if p.get("nameAr") else ""
    return (
        "<tr>"
        f'<td class="img"><div>{f"<img src={chr(34)}{img}{chr(34)}>" if img else ""}</div></td>'
        f'<td class="code">{esc(p["code"])}</td>'
        f'<td><span class="nm">{esc(p["name"])}</span>{ar}</td>'
        f'<td class="ref">{esc(p["ref"] or "")}</td>'
        f'<td class="fit">{esc(fit)}</td>'
        "</tr>"
    )


parts = []
total = len(products)
parts.append(
    f"""
<div class="cover">
  <img class="logo" src="{(ROOT / 'public' / 'img' / 'logo.png').as_uri()}">
  <h1>Spare Parts<br>Catalog</h1>
  <h1 class="ar">كتالوج قطع الغيار</h1>
  <p class="sub">Concrete pumps, mixers and batching plants. {total:,} parts in {len(order)} categories.</p>
  <p class="sub ar">مضخات الخرسانة والخلاطات ومحطات الخلط. {total:,} قطعة في {len(order)} قسمًا.</p>
  <div class="chips"><span class="chip">Price on request · WhatsApp</span><span class="chip ar">السعر عند الطلب عبر واتساب</span></div>
  <div class="foot">
    <div><b>{NAME_EN}</b>{ADDR_EN}<br>Phone / WhatsApp: <span dir="ltr">{PHONE_LOCAL}</span><br>CR {CR} · VAT {VAT}
      <br><a class="cta" href="https://wa.me/966592112782">Request a price on WhatsApp</a></div>
    <div class="ar"><b>{NAME_AR}</b>{ADDR_AR}<br>هاتف / واتساب: <span dir="ltr">{PHONE_LOCAL}</span><br>سجل تجاري {CR} · ضريبة {VAT}</div>
  </div>
</div>
<div class="toc">
  <h1>Contents</h1><h1 class="ar">المحتويات</h1>
"""
)
for s in order:
    c = cats[s]
    parts.append(f'<a href="#c-{s}"><span>{esc(c["en"])}</span><span class="n">{len(by_cat[s])}</span><span class="ar">{esc(c["ar"])}</span></a>')
parts.append("</div>")

for s in order:
    c = cats[s]
    rows = "".join(row(p) for p in sorted(by_cat[s], key=lambda x: x["code"]))
    parts.append(
        f'<section class="cat" id="c-{s}"><h2 class="sec"><span>{esc(c["en"])}<small>{len(by_cat[s])} items</small></span>'
        f'<span class="ar">{esc(c["ar"])}<small>{len(by_cat[s])} صنف</small></span></h2>'
        '<table><thead><tr><th></th><th>Code · الرمز</th><th>Part · القطعة</th><th>OEM ref. · المرجع</th><th>Fits · يناسب</th></tr></thead>'
        f"<tbody>{rows}</tbody></table></section>"
    )

parts.append(
    f"""
<section class="last">
  <h1>Found your part?</h1><h1 class="ar" style="font-size:22pt">وجدت القطعة؟</h1>
  <p>Send the code (or a photo of the old part) on WhatsApp. We reply with the price.</p>
  <p class="ar">أرسل الرمز أو صورة القطعة القديمة على واتساب، وسنرسل لك السعر.</p>
  <a class="cta" href="https://wa.me/966592112782">WhatsApp <span dir="ltr">{PHONE_LOCAL}</span></a>
  <p style="margin-top:10mm;font-size:9.5pt">{NAME_EN} · {ADDR_EN}</p>
  <p class="ar" style="font-size:9.5pt">{NAME_AR} · {ADDR_AR}</p>
</section>"""
)

doc = f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{NAME_EN} - Spare Parts Catalog</title><style>{css}</style></head><body>{"".join(parts)}</body></html>'
(tmp / "catalog.html").write_text(doc, encoding="utf-8")

footer = (
    '<div style="width:100%;font:8px/1 Helvetica,Arial,sans-serif;color:#5a6699;padding:0 12mm;display:flex;justify-content:space-between">'
    f"<span>{NAME_EN} · {PHONE_LOCAL} · Price on request</span>"
    '<span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>'
)
OUT.parent.mkdir(parents=True, exist_ok=True)
with sync_playwright() as pw:
    b = pw.chromium.launch()
    pg = b.new_page()
    pg.goto((tmp / "catalog.html").as_uri(), wait_until="load")
    pg.evaluate("document.fonts.ready")
    pg.pdf(path=str(OUT), format="A4", print_background=True, display_header_footer=True, header_template="<span></span>", footer_template=footer, prefer_css_page_size=True, outline=True, tagged=True)
    b.close()
shutil.rmtree(tmp, ignore_errors=True)
print(f"{OUT} {OUT.stat().st_size / 1e6:.1f} MB, {total} items")

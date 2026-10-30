"use client";

import WhatsAppIcon from "@/components/WhatsAppIcon";
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Lang } from "@/config/site";
import { DICT, fmt } from "@/i18n/dict";
import { CATEGORIES, TAGS, catBySlug, label, type Row } from "@/lib/taxonomy";
import { href, productPath, waLink } from "@/lib/links";
import { norm, squash } from "@/lib/search";
import AddButton from "./AddButton";
import PartIcon from "./PartIcon";
import { MissingCard } from "./Cards";

const PAGE = 60;

/** Photo if there is one and it loads; otherwise an icon that matches the part. */
function RowThumb({ img, name, cat }: { img: string | null; name: string; cat: string }) {
  const [bad, setBad] = useState(false);
  if (img && !bad) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={img} alt="" loading="lazy" decoding="async" onError={() => setBad(true)} className="max-h-full max-w-full object-contain" />;
  }
  return <PartIcon name={name} cat={cat} size={26} />;
}

/**
 * `rows` is what the server rendered. With `moreFrom` + `total`, `rows` is only the first page of a long list
 * (the catalog): the full list is one static file, fetched the first time someone searches, filters or asks for more.
 */
type Props = { lang: Lang; rows: Row[]; flat?: boolean; filters?: boolean; searchOnly?: boolean; catSlugs?: string[]; tagSlugs?: string[]; moreFrom?: string; total?: number };

export default function Ledger({ lang, rows: firstRows, flat = false, filters = false, searchOnly = false, catSlugs, tagSlugs, moreFrom, total }: Props) {
  const d = DICT[lang];
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [tag, setTag] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [rows, setRows] = useState(firstRows);
  const [full, setFull] = useState(!moreFrom);
  const [failed, setFailed] = useState(false);

  const loadAll = useCallback(() => {
    if (full || !moreFrom) return;
    fetch(moreFrom)
      .then((r) => (r.ok ? (r.json() as Promise<Row[]>) : Promise.reject(new Error(String(r.status)))))
      .then((all) => {
        setRows(all);
        setFull(true);
      })
      .catch(() => setFailed(true));
  }, [full, moreFrom]);

  // The home-page search box sends people here as /catalog/?q=...
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("q")) setQ(p.get("q")!);
    if (p.get("cat")) setCat(p.get("cat")!);
    if (p.get("tag")) setTag(p.get("tag")!);
  }, []);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("q") || p.get("cat") || p.get("tag")) loadAll();
  }, [loadAll]);
  useEffect(() => setLimit(PAGE), [q, cat, tag]);

  const hay = useMemo(
    () =>
      rows.map((r) => {
        const c = catBySlug(r.cat);
        const tg = r.tags.map((t) => TAGS.find((x) => x.slug === t)).filter(Boolean);
        const text = norm([r.code, r.ref, r.name, r.nameAr, c?.ar, c?.en, ...tg.map((t) => `${t!.ar} ${t!.en}`)].join(" "));
        return { text, code: squash(r.code), name: norm(r.name) };
      }),
    [rows],
  );

  const list = useMemo(() => {
    const tokens = norm(q).split(" ").filter(Boolean);
    const out: { r: Row; score: number }[] = [];
    rows.forEach((r, i) => {
      if (cat && r.cat !== cat) return;
      if (tag && !r.tags.includes(tag)) return;
      const h = hay[i];
      let score = 2;
      for (const t of tokens) {
        const sq = squash(t);
        if (!(h.text.includes(t) || (sq.length > 2 && h.code.includes(sq)))) return;
        if (h.code.startsWith(sq)) score = Math.min(score, 0);
        else if (h.name.startsWith(t)) score = Math.min(score, 1);
      }
      out.push({ r, score });
    });
    if (tokens.length) out.sort((a, b) => a.score - b.score);
    return out.map((o) => o.r);
  }, [rows, hay, q, cat, tag]);

  const cats = catSlugs ? CATEGORIES.filter((c) => catSlugs.includes(c.slug)) : [];
  const tags = tagSlugs ? TAGS.filter((t) => tagSlugs.includes(t.slug)) : [];

  const sel = "h-11 w-full appearance-none truncate rounded-full bg-white/80 ps-4 pe-9 text-base outline-none ring-1 ring-inset ring-brand/10 focus:ring-2 focus:ring-brand-bright";
  const caret = "pointer-events-none absolute inset-y-0 end-3.5 my-auto text-steel";

  return (
    <div>
      {filters && (
        <div
          className={`glass rise grid grid-cols-2 gap-2 rounded-[1.5rem] p-1.5 md:sticky md:top-[5rem] md:rounded-full ${searchOnly ? "" : "md:grid-cols-[1fr_13rem_13rem]"}`}
          style={{ zIndex: 20 }}
        >
          <label className="relative col-span-2 block md:col-span-1">
            <span className="sr-only">{d.searchPlaceholder}</span>
            <MagnifyingGlass aria-hidden size={20} className="pointer-events-none absolute inset-y-0 start-4 my-auto text-steel" />
            <input
              type="search"
              value={q}
              onFocus={loadAll}
              onChange={(e) => {
                loadAll();
                setQ(e.target.value);
              }}
              placeholder={d.searchPlaceholder}
              className="h-11 w-full rounded-full bg-white/80 ps-11 pe-4 text-base outline-none ring-1 ring-inset ring-brand/10 placeholder:text-steel/80 focus:ring-2 focus:ring-brand-bright"
            />
          </label>
          {!searchOnly && (
            <>
              <label className="relative block">
                <select aria-label={d.category} value={cat} onChange={(e) => {
                    loadAll();
                    setCat(e.target.value);
                  }} className={sel}>
                  <option value="">{d.allCats}</option>
                  {cats.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {label(c, lang)}
                    </option>
                  ))}
                </select>
                <CaretDown size={16} aria-hidden className={caret} />
              </label>
              <label className="relative block">
                <select aria-label={d.machineBrand} value={tag} onChange={(e) => {
                    loadAll();
                    setTag(e.target.value);
                  }} className={sel}>
                  <option value="">{d.allTags}</option>
                  {tags.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {label(t, lang)}
                    </option>
                  ))}
                </select>
                <CaretDown size={16} aria-hidden className={caret} />
              </label>
            </>
          )}
        </div>
      )}

      <p className="t-num px-2 py-3 text-sm text-steel" aria-live="polite">
        {fmt(d.found, { n: full ? list.length : (total ?? list.length) })}
      </p>

      {list.length === 0 ? (
        <div className="surface rounded-[1.75rem] p-6 text-start sm:p-7">
          <p className="text-steel">{d.noResults}</p>
        </div>
      ) : (
        <div className="bezel max-sm:-mx-4 max-sm:border-0 max-sm:bg-transparent max-sm:p-0 max-sm:shadow-none">
          <ul className="plate">
            {list.slice(0, limit).map((r, i) => (
              <li key={r.code} className="row row-in transition-colors duration-300 hover:bg-brand/[0.03]" style={{ ["--i" as string]: i % 12 }}>
                <div className="grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 px-4 py-3.5 sm:grid-cols-[3.5rem_9.5rem_minmax(0,1fr)_auto] sm:gap-x-4 sm:px-5">
                  <span className="row-span-2 grid size-14 place-items-center self-center overflow-hidden rounded-xl bg-white text-brand ring-1 ring-inset ring-brand/10 sm:row-span-1">
                    <RowThumb img={r.img} name={r.name} cat={r.cat} />
                  </span>
                  <span className="col-start-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-start sm:col-start-auto">
                    <bdi dir="ltr" className="t-num rounded-lg bg-brand/[0.07] px-2.5 py-1 text-sm font-medium text-brand">
                      {r.code}
                    </bdi>
                    <span className="text-sm text-steel sm:hidden">{label(catBySlug(r.cat), lang)}</span>
                  </span>
                  <a href={href(lang, productPath(r.code))} className="col-start-2 min-w-0 text-start text-[1.0625rem] leading-snug [overflow-wrap:anywhere] hover:text-brand sm:col-start-auto sm:text-lg">
                    <bdi dir="auto">{lang === "ar" && r.nameAr ? r.nameAr : r.name}</bdi>
                    <span className="mt-0.5 hidden text-sm text-steel sm:block">{label(catBySlug(r.cat), lang)}</span>
                  </a>
                  <span className="col-start-3 row-span-2 row-start-1 sm:col-start-auto sm:row-span-1 sm:row-start-auto">
                    <AddButton lang={lang} code={r.code} name={r.name} nameAr={r.nameAr} />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(list.length > limit || (!full && !failed && (total ?? 0) > list.length)) && (
        <div className="pt-5 text-center">
          <button
            type="button"
            onClick={() => {
              loadAll();
              setLimit((l) => l + PAGE);
            }}
            className="btn btn-line"
          >
            {d.showMore}
          </button>
        </div>
      )}

      <div className="mt-4">
        <MissingCard lang={lang} />
      </div>
    </div>
  );
}

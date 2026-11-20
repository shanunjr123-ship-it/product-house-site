import Link from "next/link";
import { BrandCard } from "@/components/Cards";
import { notFound } from "next/navigation";
import Ledger from "@/components/Ledger";
import { HeadFigure, PageHead, PhotoStrip } from "@/components/PhotoBits";
import { CAT_GALLERY, MACHINE_PHOTO, catCover, catOg, machineOg, photo } from "@/config/photos";
import { type Lang } from "@/config/site";
import { DICT, fmt } from "@/i18n/dict";
import { CATEGORIES, PRODUCTS, TAGS, byCategory, byTag, catBySlug, categoryCounts, label, pname, tagBySlug, tagCounts, toRow } from "@/lib/catalog";
import { abs, href, productPath } from "@/lib/links";
import { isMachineOem } from "@/lib/brands";
import { breadcrumbJsonLd, collectionJsonLd, jsonLdScript, pageMeta, titled } from "@/lib/seo";
import { catalogIntro, categoryIntro, categoryMetaText, machineIntro, machineMetaText, machinesIntro } from "@/lib/intro";

function Crumbs({ lang, trail }: { lang: Lang; trail: { name: string; path?: string }[] }) {
  const d = DICT[lang];
  const all = [{ name: d.home, path: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="rise text-sm text-steel">
        <ol className="-my-2 flex items-center gap-x-2 overflow-hidden whitespace-nowrap">
          {all.map((c, i) => (
            <li key={c.name} className={`flex shrink-0 gap-2 ${i === all.length - 1 ? "max-sm:hidden" : ""}`}>
              {c.path && i < all.length - 1 ? <Link href={href(lang, c.path)} className="inline-flex min-h-[44px] min-w-[44px] items-center transition-colors duration-300 hover:text-brand">{c.name}</Link> : <bdi dir="auto" className="truncate" aria-current={i === all.length - 1 ? "page" : undefined}>{c.name}</bdi>}
              {i < all.length - 1 && <span aria-hidden className={i === all.length - 2 ? "max-sm:hidden" : ""}>/</span>}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(all.map((c) => ({ name: c.name, url: c.path ? abs(lang, c.path) : undefined }))))}
      />
    </>
  );
}
export { Crumbs };

/* ---------- Catalog ---------- */
export const catalogMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: "/catalog/",
    title: titled(lang, lang === "ar" ? "كتالوج قطع غيار معدات ثقيلة" : "Heavy Equipment Spare Parts Catalog"), // Heavy equipment spare parts catalog
    description:
      lang === "ar"
        ? "كتالوج قطع غيار معدات ثقيلة: ابحث برقم القطعة أو الاسم عن محامل وفلاتر وأختام وصمامات وقطع كهربائية. السعر عند الطلب عبر واتساب." // Heavy equipment spare parts catalog: search by part number or name for bearings, filters, seals, valves and electrical parts. Price on request via WhatsApp.
        : "Heavy equipment spare parts catalog: search by part number or name for bearings, filters, seals, valves, electrical parts. Price on request via WhatsApp.",
  });

export function CatalogView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navCatalog }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{d.catalogTitle}</h1>
      <p className="rise mt-5 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
        {catalogIntro(lang)}
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          collectionJsonLd({
            lang,
            path: "/catalog/",
            name: d.catalogTitle,
            description: catalogIntro(lang),
            items: categoryCounts().map((c) => ({ name: label(c, lang), path: `/category/${c.slug}/` })),
          }),
        )}
      />
      <div className="mt-5">
        <Ledger lang={lang} rows={PRODUCTS.slice(0, 60).map(toRow)} total={PRODUCTS.length} moreFrom="/data/rows.json" flat filters catSlugs={categoryCounts().map((c) => c.slug)} tagSlugs={tagCounts().map((t) => t.slug)} />
      </div>
    </div>
  );
}

/* ---------- Category ---------- */
export const categoryParams = () => CATEGORIES.filter((c) => byCategory(c.slug).length).map((c) => ({ slug: c.slug }));

export function categoryMeta(lang: Lang, slug: string) {
  const c = catBySlug(slug);
  if (!c) notFound();
  return pageMeta({
    lang,
    path: `/category/${slug}/`,
    title: titled(lang, lang === "ar" ? `${c.ar} لمعدات ثقيلة` : `${c.en} for Heavy Equipment`), // {category} for heavy equipment
    description: categoryMetaText(lang, slug),
    image: catOg(slug),
    imageSize: { w: 1200, h: 630 },
    imageAlt: catCover(slug)?.alt[lang],
  });
}

export function CategoryView({ lang, slug }: { lang: Lang; slug: string }) {
  const d = DICT[lang];
  const c = catBySlug(slug);
  if (!c) notFound();
  const items = byCategory(slug);
  const cover = catCover(slug);
  const more = (CAT_GALLERY[slug] ?? []).map((id) => photo(id)).filter((p): p is NonNullable<typeof p> => !!p);
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navCatalog, path: "/catalog/" }, { name: label(c, lang) }]} />
      <PageHead figure={cover && <HeadFigure p={cover} lang={lang} desktopOnly />}>
        <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{label(c, lang)}</h1>
        <p className="rise mt-5 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
          {categoryIntro(lang, slug)}
        </p>
      </PageHead>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          collectionJsonLd({
            lang,
            path: `/category/${slug}/`,
            name: label(c, lang),
            description: categoryIntro(lang, slug),
            image: catOg(slug),
            items: items.filter((p) => p.indexable).slice(0, 24).map((p) => ({ name: pname(p, lang), path: productPath(p.code) })),
          }),
        )}
      />
      <PhotoStrip lang={lang} cover={cover} more={more} />
      <div className="mt-5">
        <Ledger lang={lang} rows={items.map(toRow)} filters searchOnly />
      </div>
    </div>
  );
}

/* ---------- Machines & brands ---------- */
export const machinesMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: "/machines/",
    title: titled(lang, lang === "ar" ? "قطع غيار معدات ثقيلة حسب الآلة أو العلامة" : "Heavy Equipment Spare Parts by Machine or Brand"), // Heavy equipment spare parts by machine or brand
    description:
      lang === "ar"
        ? "قطع غيار معدات ثقيلة حسب الآلة أو العلامة: بوتزمايستر، شوينج، زينيث، سَني، سيفا وغيرها، في الرياض. السعر عند الطلب عبر واتساب." // Heavy equipment spare parts by machine or brand: Putzmeister, Schwing, Zenith, Sany, CIFA and more, in Riyadh. Price on request via WhatsApp.
        : "Heavy equipment spare parts by machine or brand: Putzmeister, Schwing, Zenith, Sany, CIFA and more, in Riyadh. Price on request via WhatsApp.",
  });

export function MachinesIndexView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navMachines }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{d.machinesTitle}</h1>
      <p className="rise mt-5 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
        {machinesIntro(lang)}
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          collectionJsonLd({
            lang,
            path: "/machines/",
            name: d.machinesTitle,
            description: machinesIntro(lang),
            items: tagCounts().filter((t) => isMachineOem(t.slug)).map((t) => ({ name: label(t, lang), path: `/machines/${t.slug}/` })),
          }),
        )}
      />
      <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 lg:mt-7 lg:grid-cols-4 lg:gap-6">
        {tagCounts().map((t, i) => (
          <li key={t.slug} className="reveal" style={{ ["--d" as string]: i % 4 }}>
            <BrandCard lang={lang} t={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const machineParams = () => tagCounts().map((t) => ({ slug: t.slug }));

export function machineMeta(lang: Lang, slug: string) {
  const t = tagBySlug(slug);
  if (!t) notFound();
  return pageMeta({
    lang,
    path: `/machines/${slug}/`,
    title: titled(lang, lang === "ar" ? `قطع غيار ${t.ar} في الرياض` : `${t.en} Spare Parts in Riyadh`), // {brand} spare parts in Riyadh
    description: machineMetaText(lang, slug),
    image: machineOg(slug),
    imageSize: { w: 1200, h: 630 },
    imageAlt: photo(MACHINE_PHOTO[slug])?.alt[lang],
  });
}

export function MachineView({ lang, slug }: { lang: Lang; slug: string }) {
  const d = DICT[lang];
  const t = tagBySlug(slug);
  if (!t) notFound();
  const items = byTag(slug);
  const shot = photo(MACHINE_PHOTO[slug]);
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navMachines, path: "/machines/" }, { name: label(t, lang) }]} />
      <PageHead figure={shot && <HeadFigure p={shot} lang={lang} ratio="16/10" />}>
        <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{fmt(d.partsFor, { name: label(t, lang) })}</h1>
        <p className="rise mt-5 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
          {machineIntro(lang, slug)}
        </p>
      </PageHead>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          collectionJsonLd({
            lang,
            path: `/machines/${slug}/`,
            name: fmt(d.partsFor, { name: label(t, lang) }),
            description: machineIntro(lang, slug),
            image: machineOg(slug),
            items: items.filter((p) => p.indexable).slice(0, 24).map((p) => ({ name: pname(p, lang), path: productPath(p.code) })),
          }),
        )}
      />
      <div className="mt-5">
        <Ledger lang={lang} rows={items.map(toRow)} filters searchOnly />
      </div>
    </div>
  );
}
void TAGS;

import Link from "next/link";
import { BrandCard } from "@/components/Cards";
import { notFound } from "next/navigation";
import Ledger from "@/components/Ledger";
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
        <ol className="flex items-center gap-x-2 overflow-hidden whitespace-nowrap">
          {all.map((c, i) => (
            <li key={c.name} className={`flex shrink-0 gap-2 ${i === all.length - 1 ? "max-sm:hidden" : ""}`}>
              {c.path && i < all.length - 1 ? <Link href={href(lang, c.path)} className="transition-colors duration-300 hover:text-brand">{c.name}</Link> : <bdi dir="auto" className="truncate" aria-current={i === all.length - 1 ? "page" : undefined}>{c.name}</bdi>}
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
    title: titled(lang, lang === "ar" ? "كتالوج قطع غيار مضخات الخرسانة والخلاطات" : "Spare Parts Catalog for Concrete Pumps & Mixers"), // Spare parts catalog for concrete pumps and mixers
    description:
      lang === "ar"
        ? "ابحث في كتالوج قطع الغيار برقم القطعة أو الاسم: محامل، فلاتر، أختام، صمامات، مكابس، معدات كهربائية وأكثر."
        : "Search the spare parts catalog by part number or name: bearings, filters, seals, valves, pistons, electrical equipment and more.",
  });

export function CatalogView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navCatalog }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{d.catalogTitle}</h1>
      <p className="rise mt-2 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
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
    title: titled(lang, lang === "ar" ? `${c.ar} لمضخات الخرسانة والخلاطات` : `${c.en} for Concrete Pumps & Mixers`), // {category} for concrete pumps and mixers
    description: categoryMetaText(lang, slug),
  });
}

export function CategoryView({ lang, slug }: { lang: Lang; slug: string }) {
  const d = DICT[lang];
  const c = catBySlug(slug);
  if (!c) notFound();
  const items = byCategory(slug);
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navCatalog, path: "/catalog/" }, { name: label(c, lang) }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{label(c, lang)}</h1>
      <p className="rise mt-2 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
        {categoryIntro(lang, slug)}
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          collectionJsonLd({
            lang,
            path: `/category/${slug}/`,
            name: label(c, lang),
            description: categoryIntro(lang, slug),
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

/* ---------- Machines & brands ---------- */
export const machinesMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: "/machines/",
    title: titled(lang, lang === "ar" ? "قطع الغيار حسب الآلة أو العلامة" : "Spare Parts by Machine or Brand"), // Spare parts by machine or brand
    description:
      lang === "ar"
        ? "اختر آلتك أو علامتك: بوتزمايستر، شوينغ، زينيث، سَني، سيفا وغيرها، وشاهد قطع غيارها في الرياض. السعر عند الطلب عبر واتساب." // Pick your machine or brand: Putzmeister, Schwing, Zenith, Sany, CIFA and more, and see its spare parts in Riyadh. Price on request via WhatsApp.
        : "Pick your machine or brand, Putzmeister, Schwing, Zenith, Sany, CIFA and more, and see its spare parts in Riyadh. Price on request via WhatsApp.",
  });

export function MachinesIndexView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navMachines }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{d.machinesTitle}</h1>
      <p className="rise mt-2 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
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
  });
}

export function MachineView({ lang, slug }: { lang: Lang; slug: string }) {
  const d = DICT[lang];
  const t = tagBySlug(slug);
  if (!t) notFound();
  const items = byTag(slug);
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navMachines, path: "/machines/" }, { name: label(t, lang) }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{fmt(d.partsFor, { name: label(t, lang) })}</h1>
      <p className="rise mt-2 max-w-[62ch] text-steel" style={{ ["--d" as string]: 2 }}>
        {machineIntro(lang, slug)}
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          collectionJsonLd({
            lang,
            path: `/machines/${slug}/`,
            name: fmt(d.partsFor, { name: label(t, lang) }),
            description: machineIntro(lang, slug),
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

import type { ReactNode } from "react";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import CatIcon from "@/components/CatIcon";
import { MissingCard } from "@/components/Cards";
import { HeadFigure, PageHead, Pic } from "@/components/PhotoBits";
import { GUIDE_PHOTO, STOREFRONT, photo, type Photo } from "@/config/photos";
import { SITE, type Lang } from "@/config/site";
import { GUIDES, guideBySlug, type Block, type Cluster, type Guide, type L } from "@/config/guides";
import { DICT } from "@/i18n/dict";
import { byCode, catBySlug, pname } from "@/lib/catalog";
import { abs, href, productPath, waLink } from "@/lib/links";
import { clipAt, jsonLdScript, pageMeta, titled, titledFit } from "@/lib/seo";
import { Crumbs } from "./Lists";

// Buying guides: plain-language articles that answer the questions buyers type into Google
// (how to find a part number, which parts wear out, how to order). Text lives in src/config/guides.ts.

const T = {
  ar: {
    index: "المدونة", // Blog
    indexH1: "مدونة قطع غيار معدات ثقيلة", // Blog: heavy equipment spare parts
    indexDesc: "شروحات قطع غيار معدات ثقيلة من بيت المنتج في الرياض: أجزاء مضخة الخرسانة، الأعطال الشائعة، الصيانة، قطع الخلاطات، وكيف تطلب القطعة الصحيحة.", // Heavy equipment spare parts guides from Product House in Riyadh: concrete pump parts, common faults, maintenance, mixer parts, and how to order the right part.
    indexLead: "مقالات قصيرة وواضحة تجيب عن أسئلة المقاولين والورش التي تصلنا كل يوم: ما اسم القطعة، لماذا ترتفع الحرارة، متى أستبدل، وكيف أطلب.", // Short, plain articles answering what contractors and workshops ask us every day: what the part is called, why it overheats, when to replace it, and how to order.
    quick: "الجواب المختصر", // The short answer
    toc: "في هذا المقال", // In this article
    updated: "آخر تحديث", // Last updated
    read: "اقرأ المقال", // Read the article
    parts: "قطع من الكتالوج", // Parts from the catalogue
    cats: "أقسام ذات صلة", // Related categories
    faq: "أسئلة سريعة", // Quick questions
    more: "اقرأ أيضًا", // Read next
    ask: "اسأل عن القطعة على واتساب", // Ask about the part on WhatsApp
    askMsg: (t: string) => `السلام عليكم، لدي سؤال بخصوص: ${t}`, // Peace be upon you, I have a question about: {t}
    published: "نُشر في", // Published
  },
  en: {
    index: "Blog",
    indexH1: "Blog: Heavy Equipment Spare Parts Guides",
    indexDesc: "Heavy equipment spare parts guides from Product House, Riyadh: concrete pump parts, faults, maintenance, mixer parts and how to order.",
    indexLead: "Short, plain-language articles that answer what contractors and workshops ask us every day: what the part is called, why it overheats, when to replace it and how to order.",
    quick: "The short answer",
    toc: "In this article",
    updated: "Last updated",
    read: "Read the article",
    parts: "Parts from the catalogue",
    cats: "Related categories",
    faq: "Quick questions",
    more: "Read next",
    ask: "Ask about the part on WhatsApp",
    askMsg: (t: string) => `Hello, I have a question about: ${t}`,
    published: "Published",
  },
} as const;

const CLUSTERS: { id: Cluster; title: L; blurb: L }[] = [
  {
    id: "pumps",
    title: { ar: "مضخات الخرسانة: القطع والأعطال والصيانة", /* Concrete pumps: parts, faults and maintenance */ en: "Concrete pumps: parts, faults and maintenance" },
    blurb: { ar: "أسماء الأجزاء، علامات التآكل، أسباب الأعطال الشائعة وقائمة الصيانة.", /* Part names, signs of wear, common faults and a maintenance checklist. */ en: "Part names, signs of wear, common faults and a maintenance checklist." },
  },
  {
    id: "mixers",
    title: { ar: "الخلاطات ومحطات الخلط", /* Truck mixers and batching plants */ en: "Truck mixers and batching plants" },
    blurb: { ar: "رولات الدرام والرولمان وقطع محطات الخلط.", /* Drum rollers, bearings and batching plant parts. */ en: "Drum rollers, bearings and batching plant parts." },
  },
  {
    id: "brands",
    title: { ar: "بوتزمايستر وشوينغ", /* Putzmeister and Schwing */ en: "Putzmeister and Schwing" },
    blurb: { ar: "كيف تحدد موديل الآلة وتطلب القطعة الصحيحة لكل ماركة.", /* How to identify the model and order the right part for each make. */ en: "How to identify the model and order the right part for each make." },
  },
  {
    id: "buying",
    title: { ar: "الشراء والطلب", /* Buying and ordering */ en: "Buying and ordering" },
    blurb: { ar: "رقم القطعة، الأصلي والبديل، اختيار المورّد وخطوات الطلب.", /* Part numbers, original vs alternative, choosing a supplier and how to order. */ en: "Part numbers, original vs alternative, choosing a supplier and how to order." },
  },
];

/** Text may carry [label](/path/) links; strip them where plain text is needed (structured data, meta). */
const plain = (t: string) => t.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, "$1");

/** Render text with [label](/path/) links turned into internal links for the current language. */
function Rich({ t, lang }: { t: string; lang: Lang }) {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of t.matchAll(/\[([^\]]+)\]\((\/[^)\s]*)\)/g)) {
    const i = m.index ?? 0;
    if (i > last) out.push(t.slice(last, i));
    out.push(
      <Link key={i} href={href(lang, m[2])} className="text-brand underline decoration-[color:var(--color-brand)]/30 underline-offset-4 transition-colors hover:decoration-[color:var(--color-brand)]">
        {m[1]}
      </Link>,
    );
    last = i + m[0].length;
  }
  if (last < t.length) out.push(t.slice(last));
  return <>{out}</>;
}

/** Guide slug -> its photo. "How to order" and the supplier checklist use the real shop-front photo; the others use catalogue-type photos. */
const SHOP_PHOTO = new Set(["how-to-order", "choose-spare-parts-supplier-riyadh"]);
const guidePhoto = (slug: string): Photo | undefined => (SHOP_PHOTO.has(slug) ? STOREFRONT : photo(GUIDE_PHOTO[slug]));

const date = (iso: string, lang: Lang) =>
  new Date(iso).toLocaleDateString(lang === "ar" ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

/* ---------- Index ---------- */
export const guidesMeta = (lang: Lang) =>
  pageMeta({ lang, path: "/guides/", title: titled(lang, T[lang].indexH1), description: T[lang].indexDesc });

export function GuidesIndexView({ lang }: { lang: Lang }) {
  const t = T[lang];
  const ar = lang === "ar";
  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: t.index }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{t.indexH1}</h1>
      <p className="rise mt-5 max-w-[66ch] text-lg text-steel" style={{ ["--d" as string]: 2 }}>
        {t.indexLead}
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t.indexH1,
          description: t.indexDesc,
          url: abs(lang, "/guides/"),
          inLanguage: lang,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: GUIDES.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title[lang], url: abs(lang, `/guides/${g.slug}/`) })),
          },
        })}
      />
      {CLUSTERS.map((c) => {
        const list = GUIDES.filter((g) => g.cluster === c.id);
        if (!list.length) return null;
        return (
          <section key={c.id} className="mt-10" aria-labelledby={`c-${c.id}`}>
            <h2 id={`c-${c.id}`} className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">
              {c.title[lang]}
            </h2>
            <p className="mt-1.5 max-w-[66ch] text-steel">{c.blurb[lang]}</p>
            <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:gap-6">
              {list.map((g) => (
                <li key={g.slug} className="grid">
                  <Link href={href(lang, `/guides/${g.slug}/`)} className={`card text-start ${guidePhoto(g.slug) ? "photo-card" : ""}`}>
                    {guidePhoto(g.slug) && (
                      <span className="photo-card-img">
                        <Pic p={guidePhoto(g.slug)!} lang={lang} sizes="(min-width: 1024px) 560px, (min-width: 768px) 46vw, 92vw" />
                      </span>
                    )}
                    <span className={guidePhoto(g.slug) ? "photo-card-body" : "contents"}>
                      <span className="text-xl font-medium leading-snug">{g.title[lang]}</span>
                      <span className="text-[0.95rem] text-steel">{plain(g.desc[lang])}</span>
                      <span className="mt-1 text-sm text-brand">{t.read}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
      <section className="mt-10">
        <MissingCard lang={lang} />
      </section>
      <p className="mt-4 text-sm text-steel">
        <Link href={href(lang, "/catalog/")} className="text-brand hover:underline">
          {ar ? "تصفّح الكتالوج الكامل" : "Browse the full catalogue"}
        </Link>
      </p>
    </div>
  );
}

/* ---------- Article ---------- */
export const guideSlugs = () => GUIDES.map((g) => ({ slug: g.slug }));

export function guideMeta(lang: Lang, slug: string) {
  const g = guideBySlug(slug);
  if (!g) return {};
  // "(Guide)" / "(دليل)" is added only when the title had to be shortened, so it never equals the machine-brand page of the same name.
  const title = titledFit(lang, g.title[lang], 70, lang === "ar" ? "(دليل)" : "(Guide)");
  return pageMeta({ lang, path: `/guides/${g.slug}/`, title, description: clipAt(plain(g.desc[lang]), 155) });
}

function Body({ b, lang }: { b: Block; lang: Lang }) {
  return (
    <>
      {b.p && (
        <p className="mt-3 max-w-[66ch] text-[1.0625rem] leading-relaxed">
          <Rich t={b.p[lang]} lang={lang} />
        </p>
      )}
      {b.ul && (
        <ul className="mt-3 max-w-[66ch] list-disc space-y-2 ps-6 text-[1.0625rem] leading-relaxed marker:text-brand">
          {b.ul.map((x, i) => (
            <li key={i}>
              <Rich t={x[lang]} lang={lang} />
            </li>
          ))}
        </ul>
      )}
      {b.ol && (
        <ol className="mt-3 max-w-[66ch] list-decimal space-y-2 ps-6 text-[1.0625rem] leading-relaxed marker:text-brand">
          {b.ol.map((x, i) => (
            <li key={i}>
              <Rich t={x[lang]} lang={lang} />
            </li>
          ))}
        </ol>
      )}
      {b.table && (
        <div className="mt-4 overflow-x-auto rounded-[1.25rem] bg-white ring-1 ring-[color:var(--color-line)]">
          <table className="w-full border-collapse text-start text-[0.95rem] leading-snug">
            <thead>
              <tr className="bg-[color:var(--color-brand)]/[0.06]">
                {b.table.head.map((h, i) => (
                  <th key={i} scope="col" className="px-4 py-3 text-start font-semibold text-brand-deep">
                    {h[lang]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.table.rows.map((r, ri) => (
                <tr key={ri} className="border-t border-[color:var(--color-line)] align-top">
                  {r.map((c, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 text-start font-medium">
                        <Rich t={c[lang]} lang={lang} />
                      </th>
                    ) : (
                      <td key={i} className="px-4 py-3 text-steel">
                        <Rich t={c[lang]} lang={lang} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {b.note && (
        <p className="mt-4 max-w-[66ch] rounded-[1rem] bg-[color:var(--color-brand)]/[0.05] px-4 py-3 text-[0.97rem] leading-relaxed text-steel">
          <Rich t={b.note[lang]} lang={lang} />
        </p>
      )}
    </>
  );
}

/** Same-cluster articles first, then the rest, up to six. */
const readNext = (g: Guide) => {
  const rest = GUIDES.filter((x) => x.slug !== g.slug);
  return [...rest.filter((x) => x.cluster === g.cluster), ...rest.filter((x) => x.cluster !== g.cluster)].slice(0, 6);
};

export function GuideView({ lang, slug }: { lang: Lang; slug: string }) {
  const g = guideBySlug(slug);
  if (!g) return null;
  const t = T[lang];
  const d = DICT[lang];
  const parts = g.codes.map((c) => byCode(c)).filter((p): p is NonNullable<ReturnType<typeof byCode>> => !!p);
  const cats = g.cats.map((c) => catBySlug(c)).filter(Boolean) as NonNullable<ReturnType<typeof catBySlug>>[];
  const others = readNext(g);
  const url = abs(lang, `/guides/${g.slug}/`);
  const faq = g.faq.map((f) => ({ q: plain(f.q[lang]), a: plain(f.a[lang]) }));
  const shot = guidePhoto(g.slug);

  return (
    <article className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: t.index, path: "/guides/" }, { name: g.title[lang] }]} />
      <PageHead figure={shot && <HeadFigure p={shot} lang={lang} ratio={shot.kind === "scene" ? "16/10" : "4/3"} />}>
        <h1 className="h-display rise mt-2 max-w-[24ch] text-[clamp(1.9rem,4.6vw,3rem)] leading-tight">{g.title[lang]}</h1>
        <p className="rise mt-5 max-w-[66ch] text-lg text-steel" style={{ ["--d" as string]: 2 }}>
          <Rich t={g.intro[lang]} lang={lang} />
        </p>
        <p className="mt-2 text-sm text-steel">
          {t.published} <time dateTime={g.date}>{date(g.date, lang)}</time>
          {g.updated && g.updated !== g.date && (
            <>
              {" · "}
              {t.updated} <time dateTime={g.updated}>{date(g.updated, lang)}</time>
            </>
          )}
        </p>
      </PageHead>
      <aside aria-label={t.quick} className="surface mt-6 max-w-[70ch] rounded-[1.5rem] border-s-4 border-[color:var(--color-brand)] p-5 text-start">
        <p className="text-sm font-semibold text-brand">{t.quick}</p>
        <p className="mt-1.5 text-[1.0625rem] leading-relaxed">
          <Rich t={g.answer[lang]} lang={lang} />
        </p>
      </aside>
      {g.sections.length >= 4 && (
        <nav aria-label={t.toc} className="mt-5 max-w-[70ch] text-start">
          <p className="text-sm font-semibold text-steel">{t.toc}</p>
          <ol className="mt-2 grid gap-x-6 gap-y-1.5 text-[0.97rem] sm:grid-cols-2">
            {g.sections.map((s, i) => (
              <li key={s.h.en}>
                <a href={`#s${i + 1}`} className="text-brand underline decoration-[color:var(--color-brand)]/30 underline-offset-4 hover:decoration-[color:var(--color-brand)]">
                  {s.h[lang]}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title[lang],
          description: plain(g.desc[lang]),
          abstract: plain(g.answer[lang]),
          articleSection: CLUSTERS.find((c) => c.id === g.cluster)?.title[lang],
          inLanguage: lang,
          datePublished: g.date,
          dateModified: g.updated ?? g.date,
          mainEntityOfPage: url,
          isPartOf: { "@type": "Blog", name: t.indexH1, url: abs(lang, "/guides/") },
          author: { "@type": "Organization", name: lang === "ar" ? SITE.nameAr : SITE.nameEn, url: SITE.url },
          publisher: { "@type": "Organization", name: lang === "ar" ? SITE.nameAr : SITE.nameEn, logo: { "@type": "ImageObject", url: `${SITE.url}/img/logo.png` } },
          image: shot ? `${SITE.url}${shot.lg}` : `${SITE.url}/img/og.jpg`,
        })}
      />

      <div className="mt-6 text-start">
        {g.sections.map((s, i) => (
          <section key={s.h.en} id={`s${i + 1}`} className="mt-8 scroll-mt-28">
            <h2 className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">{s.h[lang]}</h2>
            {s.body.map((b, i) => (
              <Body key={i} b={b} lang={lang} />
            ))}
          </section>
        ))}
      </div>

      <div className="mt-8">
        <a href={waLink(t.askMsg(g.title[lang]))} target="_blank" rel="noopener noreferrer" className="btn btn-wa w-full sm:w-auto">
          <WhatsAppIcon size={22} />
          {t.ask}
        </a>
      </div>

      {parts.length > 0 && (
        <section className="mt-10" aria-labelledby="g-parts">
          <h2 id="g-parts" className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">
            {t.parts}
          </h2>
          <ul className="mt-4 grid gap-3 text-start md:grid-cols-2">
            {parts.map((p) => (
              <li key={p.code} className="grid">
                <Link href={href(lang, productPath(p.code))} className="card card-row !gap-3.5 !p-2.5">
                  <span className="grid size-[4.5rem] shrink-0 place-items-center overflow-hidden rounded-[0.9rem] bg-white text-brand ring-1 ring-[color:var(--color-line)]">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt={pname(p, lang)} width={p.iw ?? 72} height={p.ih ?? 72} loading="lazy" decoding="async" className="size-full object-contain p-1" />
                    ) : (
                      <CatIcon slug={p.cat} />
                    )}
                  </span>
                  <span className="grid gap-0.5">
                    <span className="t-num text-sm text-steel">
                      <bdi dir="ltr">{p.code}</bdi>
                    </span>
                    <span className="text-[1.0625rem] leading-snug">{pname(p, lang)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {cats.length > 0 && (
        <section className="mt-8" aria-labelledby="g-cats">
          <h2 id="g-cats" className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">
            {t.cats}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-3 text-start">
            {cats.map((c) => (
              <li key={c.slug}>
                <Link href={href(lang, `/category/${c.slug}/`)} className="surface inline-block rounded-full px-4 py-2 text-[0.95rem] hover:text-brand">
                  {c[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10" aria-labelledby="g-faq">
        <h2 id="g-faq" className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">
          {t.faq}
        </h2>
        <div className="surface mt-4 overflow-hidden rounded-[1.75rem] text-start">
          <FaqList items={faq} />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: lang,
            mainEntity: faq.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
          })}
        />
      </section>

      <section className="mt-10" aria-labelledby="g-more">
        <h2 id="g-more" className="h-display text-[clamp(1.4rem,3vw,1.9rem)]">
          {t.more}
        </h2>
        <ul className="mt-3 space-y-3 text-start">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={href(lang, `/guides/${o.slug}/`)} className="font-medium text-brand hover:underline">
                {o.title[lang]}
              </Link>
              <span className="mt-0.5 block max-w-[66ch] text-[0.92rem] text-steel">{plain(o.desc[lang])}</span>
            </li>
          ))}
          <li>
            <Link href={href(lang, "/guides/")} className="text-brand hover:underline">
              {t.index}
            </Link>
          </li>
          <li>
            <Link href={href(lang, "/heavy-equipment-parts/")} className="text-brand hover:underline">
              {d.navHeavy}
            </Link>
          </li>
        </ul>
      </section>
    </article>
  );
}

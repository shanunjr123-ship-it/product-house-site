import Link from "next/link";
import FaqList from "@/components/FaqList";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { MissingCard } from "@/components/Cards";
import { SITE, type Lang } from "@/config/site";
import { GUIDES, guideBySlug, type Block } from "@/config/guides";
import { DICT } from "@/i18n/dict";
import { byCode, catBySlug, pname } from "@/lib/catalog";
import { abs, href, productPath, waLink } from "@/lib/links";
import { jsonLdScript, pageMeta, titled } from "@/lib/seo";
import { Crumbs } from "./Lists";

// Buying guides: plain-language articles that answer the questions buyers type into Google
// (how to find a part number, which parts wear out, how to order). Text lives in src/config/guides.ts.

const T = {
  ar: {
    index: "أدلة الشراء", // Buying guides
    indexH1: "أدلة شراء قطع غيار مضخات الخرسانة", // Buying guides for concrete pump spare parts
    indexDesc: "أدلة عملية من بيت المنتج في الرياض: كيف تعرف رقم القطعة، قطع التآكل في مضخة الخرسانة، الأصلي والبديل، وخطوات الطلب.", // Practical guides from Product House in Riyadh: how to find a part number, concrete pump wear parts, original vs alternative, and how to order.
    indexLead: "أربعة أدلة قصيرة تجيب عن الأسئلة التي تصلنا كل يوم من المقاولين والورش.", // Four short guides answering the questions contractors and workshops send us every day.
    read: "اقرأ الدليل", // Read the guide
    parts: "قطع من الكتالوج", // Parts from the catalogue
    cats: "أقسام ذات صلة", // Related categories
    faq: "أسئلة سريعة", // Quick questions
    more: "أدلة أخرى", // More guides
    ask: "اسأل عن القطعة على واتساب", // Ask about the part on WhatsApp
    askMsg: (t: string) => `السلام عليكم، لدي سؤال بخصوص: ${t}`, // Peace be upon you, I have a question about: {t}
    published: "نُشر في", // Published
  },
  en: {
    index: "Buying guides",
    indexH1: "Buying guides for concrete pump spare parts",
    indexDesc: "Practical guides from Product House in Riyadh: how to find a part number, concrete pump wear parts, original vs alternative parts, and how to order.",
    indexLead: "Four short guides that answer the questions contractors and workshops send us every day.",
    read: "Read the guide",
    parts: "Parts from the catalogue",
    cats: "Related categories",
    faq: "Quick questions",
    more: "More guides",
    ask: "Ask about the part on WhatsApp",
    askMsg: (t: string) => `Hello, I have a question about: ${t}`,
    published: "Published",
  },
} as const;

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
      <p className="rise mt-3 max-w-[66ch] text-lg text-steel" style={{ ["--d" as string]: 2 }}>
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
      <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:gap-6">
        {GUIDES.map((g) => (
          <li key={g.slug} className="grid">
            <Link href={href(lang, `/guides/${g.slug}/`)} className="card text-start">
              <span className="text-xl font-medium leading-snug">{g.title[lang]}</span>
              <span className="text-[0.95rem] text-steel">{g.desc[lang]}</span>
              <span className="mt-1 text-sm text-brand">{t.read}</span>
            </Link>
          </li>
        ))}
      </ul>
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
  return pageMeta({ lang, path: `/guides/${g.slug}/`, title: titled(lang, g.title[lang]), description: g.desc[lang] });
}

function Body({ b, lang }: { b: Block; lang: Lang }) {
  return (
    <>
      {b.p && <p className="mt-3 max-w-[66ch] text-[1.0625rem] leading-relaxed">{b.p[lang]}</p>}
      {b.ul && (
        <ul className="mt-3 max-w-[66ch] list-disc space-y-2 ps-6 text-[1.0625rem] leading-relaxed marker:text-brand">
          {b.ul.map((x) => (
            <li key={x.en}>{x[lang]}</li>
          ))}
        </ul>
      )}
      {b.ol && (
        <ol className="mt-3 max-w-[66ch] list-decimal space-y-2 ps-6 text-[1.0625rem] leading-relaxed marker:text-brand">
          {b.ol.map((x) => (
            <li key={x.en}>{x[lang]}</li>
          ))}
        </ol>
      )}
    </>
  );
}

export function GuideView({ lang, slug }: { lang: Lang; slug: string }) {
  const g = guideBySlug(slug);
  if (!g) return null;
  const t = T[lang];
  const d = DICT[lang];
  const parts = g.codes.map((c) => byCode(c)).filter((p): p is NonNullable<ReturnType<typeof byCode>> => !!p);
  const cats = g.cats.map((c) => catBySlug(c)).filter(Boolean) as NonNullable<ReturnType<typeof catBySlug>>[];
  const others = GUIDES.filter((x) => x.slug !== g.slug);
  const url = abs(lang, `/guides/${g.slug}/`);
  const faq = g.faq.map((f) => ({ q: f.q[lang], a: f.a[lang] }));

  return (
    <article className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: t.index, path: "/guides/" }, { name: g.title[lang] }]} />
      <h1 className="h-display rise mt-2 max-w-[24ch] text-[clamp(1.9rem,4.6vw,3rem)] leading-tight">{g.title[lang]}</h1>
      <p className="rise mt-3 max-w-[66ch] text-lg text-steel" style={{ ["--d" as string]: 2 }}>
        {g.intro[lang]}
      </p>
      <p className="mt-2 text-sm text-steel">
        {t.published} <time dateTime={g.date}>{date(g.date, lang)}</time>
      </p>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title[lang],
          description: g.desc[lang],
          inLanguage: lang,
          datePublished: g.date,
          dateModified: g.date,
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: lang === "ar" ? SITE.nameAr : SITE.nameEn, url: SITE.url },
          publisher: { "@type": "Organization", name: lang === "ar" ? SITE.nameAr : SITE.nameEn, logo: { "@type": "ImageObject", url: `${SITE.url}/img/logo.png` } },
          image: `${SITE.url}/img/og.jpg`,
        })}
      />

      <div className="mt-6 text-start">
        {g.sections.map((s) => (
          <section key={s.h.en} className="mt-8">
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
                <Link href={href(lang, productPath(p.code))} className="card">
                  <span className="t-num text-sm text-steel">
                    <bdi dir="ltr">{p.code}</bdi>
                  </span>
                  <span className="text-[1.0625rem] leading-snug">{pname(p, lang)}</span>
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
          <ul className="mt-3 flex flex-wrap gap-2 text-start">
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
        <ul className="mt-3 space-y-2 text-start">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={href(lang, `/guides/${o.slug}/`)} className="text-brand hover:underline">
                {o.title[lang]}
              </Link>
            </li>
          ))}
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

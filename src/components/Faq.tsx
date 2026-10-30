import FaqList from "./FaqList";
import type { Lang } from "@/config/site";
import { FAQ } from "@/config/faq";
import { DICT } from "@/i18n/dict";
import { PRODUCTS } from "@/lib/catalog";
import { jsonLdScript } from "@/lib/seo";

/** Plain <details> accordion (works without JavaScript) plus FAQPage structured data built from the same text. */
export default function Faq({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const items = FAQ.map((f) => ({ q: f.q[lang], a: f.a(PRODUCTS.length)[lang] }));
  return (
    <section className="wrap sec" aria-labelledby="faq-h">
      <h2 id="faq-h" className="h-display reveal text-[clamp(1.6rem,3.6vw,2.4rem)]">
        {d.faqTitle}
      </h2>
      <div className="surface reveal mt-5 overflow-hidden lg:mt-7 rounded-[1.75rem] text-start">
        <FaqList items={items} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: lang,
          mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
        })}
      />
    </section>
  );
}

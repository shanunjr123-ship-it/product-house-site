import FaqList from "@/components/FaqList";
import PhoneIcon from "@/components/PhoneIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { FAQ_COUNT, FAQ_GROUPS, FAQ_UPDATED, type PageFaq } from "@/config/faq-page";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { PRODUCTS, hasTagPage } from "@/lib/catalog";
import { href, telLink, waLink } from "@/lib/links";
import { faqPageJsonLd, jsonLdScript, pageMeta, titled } from "@/lib/seo";
import { Crumbs } from "./Lists";

// Full FAQ page. The home page keeps its short list; this page holds every confirmed answer and the questions from our buying guides, grouped by topic.

const PATH = "/faq/";

export const faqPageMeta = (lang: Lang) =>
  pageMeta({
    lang,
    path: PATH,
    title: titled(lang, lang === "ar" ? "أسئلة شائعة عن قطع غيار معدات ثقيلة" : "Heavy Equipment Spare Parts FAQ, Riyadh"), // Frequently asked questions about heavy equipment spare parts
    description:
      lang === "ar"
        ? "أسئلة وأجوبة عن قطع غيار معدات ثقيلة في الرياض: الطلب والتوصيل والضمان والدفع، مع شرح أجزاء مضخة الخرسانة والهيدروليك والصيانة والأعطال." // Questions and answers on heavy equipment spare parts in Riyadh: ordering, delivery, warranty and payment, with concrete pump parts, hydraulics, maintenance and faults explained.
        : "Heavy equipment spare parts in Riyadh: ordering, delivery, warranty, payment, plus concrete pump parts, hydraulics, maintenance and faults explained.",
  });

/** Brand pages exist only for brands with enough parts; a link to one that does not exist would be a dead end. */
const linkable = (to: string) => {
  const m = to.match(/^\/machines\/([^/]+)\/$/);
  return !m || hasTagPage(m[1]);
};

export function FaqPageView({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const ar = lang === "ar";
  const n = PRODUCTS.length;
  const h1 = ar ? "أسئلة شائعة عن قطع غيار معدات ثقيلة في الرياض" : "Heavy equipment spare parts in Riyadh: frequently asked questions"; // Frequently asked questions about heavy equipment spare parts in Riyadh
  const intro = ar
    ? "إجابات مباشرة عن قطع غيار المعدات الثقيلة من مؤسسة بيت المنتج للتجارة في الرياض: كيف تطلب وتستلم وتدفع، وما الضمان والإرجاع، ثم شرح أجزاء مضخة الخرسانة والهيدروليك والفلاتر وصيانتها وأعطالها. موزّع معتمد لبوتزمايستر." // Direct answers about heavy-equipment spare parts from Product House Trading Est. in Riyadh: how to order, receive and pay, warranty and returns, then concrete pump parts, hydraulics, filters, maintenance and faults explained. Authorised Putzmeister distributor.
    : "Direct answers about heavy equipment spare parts from Product House Trading Est. in Riyadh: how to order, receive and pay, warranty and returns, then concrete pump parts, hydraulics, filters, maintenance and faults explained. Authorised Putzmeister distributor.";

  const groups = FAQ_GROUPS.map((g) => ({
    id: g.id,
    title: g.title[lang],
    items: g.items.map((f: PageFaq) => ({
      q: f.q[lang],
      a: f.a(n)[lang],
      links: f.links?.filter((l) => linkable(l.to)).map((l) => ({ href: href(lang, l.to), label: l.label[lang] })),
    })),
  }));
  const all = groups.flatMap((g) => g.items);

  return (
    <div className="wrap pb-6 pt-4">
      <Crumbs lang={lang} trail={[{ name: d.navFaq }]} />
      <h1 className="h-display rise mt-2 text-[clamp(1.9rem,5vw,3.25rem)]">{h1}</h1>
      <p className="rise mt-5 max-w-[66ch] text-lg text-steel" style={{ ["--d" as string]: 2 }}>
        {intro}
      </p>
      <p className="mt-3 text-sm text-steel">
        {ar ? `${FAQ_COUNT} سؤالًا. آخر تحديث: 18 نوفمبر 2026.` : `${FAQ_COUNT} questions. Last updated: 18 November 2026.`}
        {/* ${FAQ_COUNT} questions. Last updated: 18 November 2026. */}
      </p>

      <nav aria-label={ar ? "أقسام الأسئلة" : "Question groups"} className="mt-6">
        {/* Question groups */}
        <ul className="flex flex-wrap gap-x-3 gap-y-3">
          {groups.map((g) => (
            <li key={g.id}>
              <a href={`#faq-${g.id}`} className="glass inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] transition-colors duration-300 hover:text-brand">
                {g.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((g) => (
        <section key={g.id} id={`faq-${g.id}`} aria-labelledby={`faq-${g.id}-h`} className="mt-10 scroll-mt-24">
          <h2 id={`faq-${g.id}-h`} className="h-display text-[clamp(1.5rem,3.4vw,2.2rem)]">
            {g.title}
          </h2>
          <div className="surface mt-4 overflow-hidden rounded-[1.75rem] text-start">
            <FaqList items={g.items} />
          </div>
        </section>
      ))}

      <section className="mt-10" aria-labelledby="faq-ask">
        <h2 id="faq-ask" className="h-display text-[clamp(1.5rem,3.4vw,2.2rem)]">
          {ar ? "لم تجد إجابتك؟" : "Did not find your answer?"} {/* Did not find your answer? */}
        </h2>
        <p className="mt-3 max-w-[62ch] text-steel">
          {ar
            ? "أرسل رقم القطعة أو صورتها على واتساب، أو اتصل بنا، ونرد عليك بالسعر والتوفر." // Send the part number or a photo on WhatsApp, or call us, and we reply with the price and availability.
            : "Send the part number or a photo on WhatsApp, or call us, and we reply with the price and availability."}
        </p>
        <div className="mt-5 grid max-w-md gap-4 sm:grid-cols-[1.5fr_1fr]">
          <a href={waLink(d.waPhoto)} target="_blank" rel="noopener noreferrer" className="hero-btn btn-wa">
            <WhatsAppIcon size={26} />
            {d.sendPhotoShort}
          </a>
          <a href={telLink()} className="hero-btn hero-call">
            <PhoneIcon size={24} />
            {d.call}
          </a>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqPageJsonLd({ lang, path: PATH, name: h1, modified: FAQ_UPDATED, items: all.map((i) => ({ q: i.q, a: i.a })) }))}
      />
    </div>
  );
}

import { SITE, type Lang } from "./site";

// FAQ shown on the home page and published as FAQPage structured data.
// Only facts already on the site (address, hours, phone, delivery, how ordering works) are in FAQ.
// DRAFT_FAQ holds questions that need the owner's answer first; they are NOT shown or marked up until moved into FAQ.

export type Faq = { q: Record<Lang, string>; a: (n: number) => Record<Lang, string> };

export const FAQ: Faq[] = [
  {
    q: { ar: "ماذا تبيعون في مؤسسة بيت المنتج للتجارة؟", /* What do you sell at Product House Trading Est.? */ en: "What does Product House Trading Est. sell?" },
    a: (n) => ({
      ar: `قطع غيار مضخات الخرسانة وخلاطات الخرسانة ومحطات الخلط: رومان بلي، سلاسل، فلاتر، خراطيم، جوانات، صمامات، فايبريتر، تروس وغيرها. أكثر من ${(Math.floor(n / 100) * 100).toLocaleString("en-US")} قطعة تختار منها.`,
      // Spare parts for concrete pumps, truck mixers and batching plants: bearings, chains, filters, hoses, seals, valves, vibrators, gears and more. Over N parts to choose from.
      en: `Spare parts for concrete pumps, truck mixers and batching plants: bearings, chains, filters, hoses, seals, valves, vibrators, gears and more. Over ${(Math.floor(n / 100) * 100).toLocaleString("en-US")} parts to choose from.`,
    }),
  },
  {
    q: { ar: "كيف أعرف سعر القطعة؟", /* How do I find out the price of a part? */ en: "How do I get the price of a part?" },
    a: () => ({
      ar: `الأسعار عند الطلب. أرسل رقم القطعة أو صورتها على واتساب ${SITE.phoneDisplay}، ونرد عليك بالسعر والتوفر.`,
      // Prices are on request. Send the part number or a photo on WhatsApp and we reply with price and availability.
      en: `Prices are given on request. Send the part number or a photo on WhatsApp at ${SITE.phoneDisplay} and we reply with the price and availability.`,
    }),
  },
  {
    q: { ar: "ما عندي رقم القطعة، كيف أطلبها؟", /* I don't have the part number, how do I order it? */ en: "I don't have the part number. How do I order?" },
    a: () => ({
      ar: "صوّر القطعة القديمة أو لوحة بيانات الآلة وأرسلها على واتساب، ونحدد لك القطعة المناسبة. وتقدر تبحث بالاسم من الكتالوج أيضًا.",
      // Photograph the old part or the machine's data plate and send it on WhatsApp; we identify the right part. You can also search by name in the catalog.
      en: "Photograph the old part or the machine's data plate and send it on WhatsApp. We identify the right part for you. You can also search the catalog by name.",
    }),
  },
  {
    q: { ar: "لأي آلات وماركات تتوفر القطع؟", /* Which machines and brands do the parts fit? */ en: "Which machines and brands do the parts fit?" },
    a: () => ({
      ar: "قطع لبوتزمايستر وشوينغ وسَني وزوملاين وسيفا وسيكوما وغيرها. افتح صفحة «الآلات» واختر آلتك لتشاهد قطعها.",
      // Parts for Putzmeister, Schwing, Sany, Zoomlion, CIFA, Sicoma and more. Open the Machines page and pick your machine to see its parts.
      en: "Parts for Putzmeister, Schwing, Sany, Zoomlion, CIFA, Sicoma and more. Open the Machines page and pick your machine to see its parts.",
    }),
  },
  {
    q: { ar: "هل توصّلون خارج الرياض؟", /* Do you deliver outside Riyadh? */ en: "Do you deliver outside Riyadh?" },
    a: () => ({
      ar: "نعم، نوفّر التوصيل داخل الرياض وخارجها. اكتب لنا المدينة على واتساب لنؤكد لك الطريقة.",
      // Yes, we deliver inside and outside Riyadh. Tell us the city on WhatsApp and we confirm how.
      en: "Yes, we deliver inside and outside Riyadh. Tell us your city on WhatsApp and we confirm how.",
    }),
  },
  {
    q: { ar: "أين موقعكم وما هي أوقات الدوام؟", /* Where are you and what are your opening hours? */ en: "Where are you located and what are your opening hours?" },
    a: () => ({
      ar: `${SITE.address.ar}. ${SITE.hours.ar}.`,
      en: `${SITE.address.en}. ${SITE.hours.en}.`,
    }),
  },
  {
    q: { ar: "من هم عملاؤكم؟", /* Who are your customers? */ en: "Who do you serve?" },
    a: () => ({
      ar: "نخدم المقاولين ومحطات الخرسانة وشركات التأجير والورش والميكانيكيين.",
      // We serve contractors, concrete plants, rental companies, workshops and mechanics.
      en: "We serve contractors, concrete plants, rental companies, workshops and mechanics.",
    }),
  },
];

// NOT PUBLISHED. Ask the owner, then move the confirmed ones into FAQ with his exact answer.
export const DRAFT_FAQ: string[] = [
  "Are the parts original (genuine), OEM or compatible? Which brands are genuine?", // CONFIRM
  "Is there a warranty on parts? How long, and what does it cover?", // CONFIRM
  "Can I return or exchange a part if it does not fit?", // CONFIRM
  "What payment methods do you accept (cash, transfer, card, credit for companies)?", // CONFIRM
  "Do you issue VAT invoices?", // CONFIRM
  "How much does delivery cost and how long does it take (Riyadh, other cities)?", // CONFIRM
  "Do you ship to other GCC countries?", // CONFIRM
  "Is there a minimum order?", // CONFIRM
  "Are you an authorised Putzmeister distributor? (needs the dealer certificate; the site currently says so)", // CONFIRM
  "Can you source a part that is not in the catalog? How long does it take?", // CONFIRM
];

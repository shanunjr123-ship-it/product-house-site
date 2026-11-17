import { SITE, type Lang } from "./site";

// FAQ shown on the home page and published as FAQPage structured data.
// Every answer here is a fact confirmed by the owner. Where a fact depends on the part (warranty, delivery cost and time,
// sourcing time) the answer says so instead of giving one figure.

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
    q: { ar: "كم تكلفة التوصيل وكم يستغرق؟", /* How much does delivery cost and how long does it take? */ en: "How much does delivery cost and how long does it take?" },
    a: () => ({
      ar: "التكلفة والمدة تختلف حسب القطعة. أرسل لنا القطعة والمدينة على واتساب ونؤكدهما لك.",
      // Cost and time depend on the part. Send us the part and the city on WhatsApp and we confirm both.
      en: "Cost and time depend on the part. Send us the part and your city on WhatsApp and we confirm both.",
    }),
  },
  {
    q: { ar: "هل تشحنون إلى دول الخليج الأخرى؟", /* Do you ship to other GCC countries? */ en: "Do you ship to other GCC countries?" },
    a: () => ({
      ar: "لا، لا نشحن إلى دول الخليج الأخرى.",
      // No, we do not ship to other GCC countries.
      en: "No, we do not ship to other GCC countries.",
    }),
  },
  {
    q: { ar: "هل القطع أصلية؟", /* Are the parts original? */ en: "Are your parts original?" },
    a: () => ({
      ar: "نعم، جميع القطع التي نبيعها أصلية.",
      // Yes, all the parts we sell are original.
      en: "Yes, all the parts we sell are original.",
    }),
  },
  {
    q: { ar: "هل يوجد ضمان على القطع؟", /* Is there a warranty on the parts? */ en: "Is there a warranty on the parts?" },
    a: () => ({
      ar: "أغلب القطع عليها ضمان، ومدته وشروطه تختلف حسب القطعة. اسألنا عن قطعتك على واتساب.",
      // Most parts carry a warranty; its length and terms depend on the part. Ask us about your part on WhatsApp.
      en: "Most parts carry a warranty. Its length and terms depend on the part. Ask us about your part on WhatsApp.",
    }),
  },
  {
    q: { ar: "هل أقدر أرجّع القطعة أو أبدّلها إذا ما ناسبت؟", /* Can I return or exchange a part if it doesn't fit? */ en: "Can I return or exchange a part if it does not fit?" },
    a: () => ({
      ar: "نعم، يمكنك إرجاع القطعة أو استبدالها إذا لم تناسب آلتك.",
      // Yes, you can return or exchange the part if it does not fit your machine.
      en: "Yes, you can return or exchange the part if it does not fit your machine.",
    }),
  },
  {
    q: { ar: "ما طرق الدفع عندكم؟", /* What payment methods do you accept? */ en: "What payment methods do you accept?" },
    a: () => ({
      ar: "نقبل جميع طرق الدفع.",
      // We accept all payment methods.
      en: "We accept all payment methods.",
    }),
  },
  {
    q: { ar: "هل تصدرون فاتورة ضريبية؟", /* Do you issue VAT invoices? */ en: "Do you issue VAT invoices?" },
    a: () => ({
      ar: "نعم، نصدر فاتورة ضريبية.",
      // Yes, we issue VAT invoices.
      en: "Yes, we issue VAT invoices.",
    }),
  },
  {
    q: { ar: "هل يوجد حد أدنى للطلب؟", /* Is there a minimum order? */ en: "Is there a minimum order?" },
    a: () => ({
      ar: "لا، لا يوجد حد أدنى للطلب.",
      // No, there is no minimum order.
      en: "No, there is no minimum order.",
    }),
  },
  {
    q: { ar: "هل تجلبون قطعة غير موجودة في الكتالوج؟", /* Can you source a part that is not in the catalogue? */ en: "Can you source a part that is not in the catalog?" },
    a: () => ({
      ar: "نعم، نوفّر قطعًا غير موجودة في الكتالوج. المدة تختلف حسب القطعة، فأرسل لنا رقمها أو صورتها على واتساب.",
      // Yes, we source parts that are not in the catalogue. The time depends on the part, so send us its number or a photo on WhatsApp.
      en: "Yes, we source parts that are not in the catalog. The time depends on the part, so send us its number or a photo on WhatsApp.",
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


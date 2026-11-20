import { SITE, type Lang } from "./site";
import { guideBySlug } from "./guides";

// Content of the /faq/ page. Every answer is a fact the owner confirmed. Where a fact depends on the part (warranty,
// delivery cost and time, sourcing time) the answer says so and gives no figure.
//
// Keyword grounding (Google Ads Keyword Planner, Arabic, Saudi Arabia, Nov 2025 - Oct 2026; volumes are Google's buckets):
//   Theme / scope   "قطع غيار معدات ثقيلة" 1k-10k; "قطع غيار المعدات الثقيلة" and "قطع غيار معدات" 100-1k;
//                   "طلب / محل / موقع / شركات قطع غيار معدات ثقيلة" 10-100
//   Pumps           "قطع غيار مضخات خرسانة" 10-100; "مضخة خرسانة", "بمب خرسانة" (colloquial) 100-1k; "اسبير مضخة خرسانة" 0-10
//   Mixers / plants "قطع غيار خلاطات خرسانة" 10-100; "قطع غيار محطات خرسانة" 10-100; "خلاطة خرسانة" 100-1k
//   Brands          "بوتسماستر" and "شيفنج" (spelling variants) 10-100; "سيفا" 10-100; "قطع غيار بوتزمايستر" 0-10
//   Authenticity    "قطع غيار اصلية" 100-1k and "قطع غيار بديلة" 10-100 (generic, mostly cars); the equipment-specific forms are 0-10
//   Delivery        "شحن قطع غيار" 10-100 (generic); "توصيل قطع غيار معدات ثقيلة" 0-10
//   Warranty/quote  "ضمان قطع الغيار" 0-10; "طلب عرض سعر قطع غيار" 0-10
//   Caterpillar     "قطع غيار كتربلر" 100-1k; "قطع غيار معدات ثقيلة كتربلر" 10-100 (owner confirmed Caterpillar parts are carried)
// Re-check, Nov 2026 (Saudi Arabia, all languages): "قطع غيار معدات ثقيلة" 1k-10k; "قطع غيار شيول" and "مضخة هيدروليك" 100-1k;
//   "قطع غيار رافعات شوكية", "قطع غيار فوركلفت", "قطع غيار حفارات", "فلاتر هيدروليك", "خراطيم هيدروليك" 10-100;
//   "قطع غيار مضخات الخرسانة", "قطع غيار بمب خرسانة", "قطع غيار بوتزمايستر" below 10. Loaders (شيول) and excavators are not in the catalogue, so they are not claimed.
// Question-style searches have almost no measurable volume, so the questions follow the buyer's real objections and the
// vocabulary above, not volume. Used, scrapyard, rental and for-sale terms are left out on purpose.

export const FAQ_UPDATED = "2026-11-18";

export type PageFaq = {
  q: Record<Lang, string>;
  a: (n: number) => Record<Lang, string>;
  /** Internal pages worth opening next. Only paths that exist: brand pages must be checked with hasTagPage first. */
  links?: { to: string; label: Record<Lang, string> }[];
};
export type FaqGroup = { id: string; title: Record<Lang, string>; items: PageFaq[] };

const N = (n: number) => (Math.floor(n / 100) * 100).toLocaleString("en-US");

/** Markdown links inside guide text become plain words: the FAQ shows one source link per answer instead. */
const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

/**
 * Questions taken straight from the buying guides (the blog), so the FAQ page and the article never disagree.
 * Each pick is [guide slug, indexes of its FAQ items]. A wrong slug or index fails the build instead of shipping a gap.
 * Left out on purpose: "do you supply / carry X" questions, answers that repeat another one, and the short list
 * of commercial questions above, which are written for this page.
 */
const fromGuides = (picks: [string, number[]][]): PageFaq[] =>
  picks.flatMap(([slug, idx]) => {
    const g = guideBySlug(slug);
    if (!g) throw new Error(`faq-page: unknown guide ${slug}`);
    return idx.map((i) => {
      const f = g.faq[i];
      if (!f) throw new Error(`faq-page: ${slug} has no FAQ item ${i}`);
      return {
        q: f.q,
        a: () => ({ ar: plain(f.a.ar), en: plain(f.a.en) }),
        links: [{ to: `/guides/${slug}/`, label: { ar: `المقال: ${g.title.ar}`, /* The article: ... */ en: `Read more: ${g.title.en}` } }],
      };
    });
  });

const GUIDE_GROUPS: FaqGroup[] = [
  {
    id: "pump-parts",
    title: { ar: "أجزاء مضخة الخرسانة وقطع التآكل", /* Concrete pump parts and wear parts */ en: "Concrete pump parts and wear parts" },
    items: fromGuides([["concrete-pump-parts-names", [0, 1, 2, 3]], ["pump-wear-parts", [0, 1]], ["spectacle-plate-cutting-ring", [0, 1, 3]]]),
  },
  {
    id: "pipes",
    title: { ar: "خطوط التوصيل والأكواع والوصلات", /* Delivery pipes, elbows and couplings */ en: "Delivery pipes, elbows and couplings" },
    items: fromGuides([["delivery-pipes-elbows-couplings", [0, 1, 2, 3]]]),
  },
  {
    id: "hydraulics",
    title: { ar: "المضخات الهيدروليكية والفلاتر", /* Hydraulic pumps and filters */ en: "Hydraulic pumps and filters" },
    items: fromGuides([["hydraulic-pump-motor-codes", [0, 1, 2, 3]], ["hydraulic-filters-concrete-pump", [0, 1, 2, 3]]]),
  },
  {
    id: "faults",
    title: { ar: "أعطال المضخة: حرارة الزيت وضعف الضخ", /* Pump faults: oil temperature and weak output */ en: "Pump faults: hot oil and weak output" },
    items: fromGuides([["hydraulic-oil-overheating-concrete-pump", [0, 1, 2, 3]], ["concrete-pump-slow-weak-output", [0, 1, 2, 3]]]),
  },
  {
    id: "maintenance",
    title: { ar: "صيانة مضخة الخرسانة", /* Concrete pump maintenance */ en: "Concrete pump maintenance" },
    items: fromGuides([["concrete-pump-maintenance-checklist", [0, 1, 2, 3]]]),
  },
  {
    id: "mixers",
    title: { ar: "الخلاطات ومحطات الخلط", /* Truck mixers and batching plants */ en: "Truck mixers and batching plants" },
    items: fromGuides([["truck-mixer-drum-rollers", [0, 1, 2]], ["batching-plant-spare-parts", [0, 1, 3]]]),
  },
  {
    id: "identify",
    title: { ar: "تحديد القطعة ورقمها", /* Identifying the part and its number */ en: "Identifying the part and its number" },
    items: fromGuides([["find-part-number", [1]], ["putzmeister-spare-parts-riyadh", [1]], ["schwing-spare-parts-riyadh", [0, 2]]]),
  },
  {
    id: "choosing",
    title: { ar: "أصلي أم بديل، واختيار المورّد", /* Original or alternative, and choosing a supplier */ en: "Original or alternative, and choosing a supplier" },
    items: fromGuides([["original-vs-alternative-parts", [0, 1]], ["choose-spare-parts-supplier-riyadh", [3]]]),
  },
];

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "parts",
    title: { ar: "القطع والعلامات", /* Parts and brands */ en: "Parts and brands" },
    items: [
      {
        q: { ar: "ماذا تبيعون في مؤسسة بيت المنتج للتجارة؟", /* What do you sell at Product House Trading Est.? */ en: "What does Product House Trading Est. sell?" },
        a: (n) => ({
          ar: `قطع غيار مضخات الخرسانة وخلاطات الخرسانة ومحطات الخلط ومعدات ثقيلة أخرى: رومان بلي، سلاسل، فلاتر، خراطيم، جوانات، صمامات، فايبريتر، تروس وغيرها. أكثر من ${N(n)} قطعة تختار منها.`,
          // Spare parts for concrete pumps, truck mixers, batching plants and other heavy equipment: bearings, chains, filters, hoses, seals, valves, vibrators, gears and more. Over N parts to choose from.
          en: `Spare parts for concrete pumps, truck mixers, batching plants and other heavy equipment: bearings, chains, filters, hoses, seals, valves, vibrators, gears and more. Over ${N(n)} parts to choose from.`,
        }),
        links: [{ to: "/catalog/", label: { ar: "تصفّح الكتالوج", /* Browse the catalog */ en: "Browse the catalog" } }],
      },
      {
        q: { ar: "هل تبيعون قطع غيار لكل المعدات الثقيلة؟", /* Do you sell spare parts for all heavy equipment? */ en: "Do you sell spare parts for all heavy equipment?" },
        a: () => ({
          ar: "لا نغطي كل المعدات الثقيلة. صفحة «قطع غيار معدات ثقيلة» والكتالوج يعرضان ما نوفّره. وإن لم تجد آلتك فأرسل رقم القطعة أو صورتها على واتساب ونخبرك هل نستطيع توفيرها.",
          // We do not cover all heavy equipment. The "Heavy equipment parts" page and the catalogue show what we supply. If you do not find your machine, send the part number or a photo on WhatsApp and we tell you whether we can supply it.
          en: "We do not cover all heavy equipment. The Heavy equipment parts page and the catalog show what we supply. If your machine is not there, send the part number or a photo on WhatsApp and we tell you whether we can supply it.",
        }),
        links: [{ to: "/heavy-equipment-parts/", label: { ar: "قطع غيار معدات ثقيلة", /* Heavy equipment parts */ en: "Heavy equipment parts" } }],
      },
      {
        q: { ar: "هل تبيعون آلات كاملة، أو تقدمون خدمة إصلاح؟", /* Do you sell complete machines, or offer a repair service? */ en: "Do you sell complete machines, or offer a repair service?" },
        a: () => ({
          ar: "لا. نبيع قطع الغيار والمستهلكات فقط. لا نصنّع، ولا نبيع آلات كاملة، ولا نقدّم خدمة إصلاح.",
          // No. We sell spare parts and consumables only. We do not manufacture, sell complete machines or offer a repair service.
          en: "No. We sell spare parts and consumables only. We do not manufacture, sell complete machines or offer a repair service.",
        }),
      },
      {
        q: { ar: "هل أنتم موزّع معتمد لبوتزمايستر؟", /* Are you an authorised Putzmeister distributor? */ en: "Are you an authorised Putzmeister distributor?" },
        a: () => ({
          ar: "نعم، مؤسسة بيت المنتج للتجارة موزّع معتمد لبوتزمايستر. أرسل رقم القطعة أو صورتها على واتساب ونرد عليك بالسعر والتوفر.",
          // Yes, Product House Trading Est. is an authorised Putzmeister distributor. Send the part number or a photo on WhatsApp and we reply with the price and availability.
          en: "Yes, Product House Trading Est. is an authorised Putzmeister distributor. Send the part number or a photo on WhatsApp and we reply with the price and availability.",
        }),
        links: [
          { to: "/machines/putzmeister/", label: { ar: "قطع بوتزمايستر", /* Putzmeister parts */ en: "Putzmeister parts" } },
          { to: "/guides/putzmeister-spare-parts-riyadh/", label: { ar: "دليل قطع غيار بوتزمايستر", /* Putzmeister spare parts guide */ en: "Putzmeister parts guide" } },
        ],
      },
      {
        q: { ar: "لأي آلات وماركات تتوفر القطع؟", /* Which machines and brands do the parts fit? */ en: "Which machines and brands do the parts fit?" },
        a: () => ({
          ar: "قطع لبوتزمايستر (وتُكتب أيضًا بوتسماستر) وشوينغ (وتُكتب أيضًا شيفنج) وسَني وزوملاين وسيفا وسيكوما وغيرها. افتح صفحة «الآلات» واختر آلتك لتشاهد قطعها.",
          // Parts for Putzmeister (also spelled "Butsmaster"), Schwing (also spelled "Shifing"), Sany, Zoomlion, CIFA, Sicoma and more. Open the Machines page and pick your machine to see its parts. (The alternative spellings are how Saudi buyers type these names.)
          en: "Parts for Putzmeister, Schwing, Sany, Zoomlion, CIFA, Sicoma and more. Open the Machines page and pick your machine to see its parts.",
        }),
        links: [{ to: "/machines/", label: { ar: "الآلات والعلامات", /* Machines and brands */ en: "Machines and brands" } }],
      },
      {
        q: { ar: "هل تتوفر قطع غيار كاتربيلر (كتربلر)؟", /* Do you have Caterpillar spare parts? ("كتربلر" is how Saudi buyers usually type it) */ en: "Do you have Caterpillar spare parts?" },
        a: () => ({
          ar: "نعم، نوفّر قطع غيار كاتربيلر. أرسل رقم القطعة أو صورتها على واتساب ونرد عليك بالسعر والتوفر.",
          // Yes, we supply Caterpillar spare parts. Send the part number or a photo on WhatsApp and we reply with the price and availability.
          en: "Yes, we supply Caterpillar spare parts. Send the part number or a photo on WhatsApp and we reply with the price and availability.",
        }),
        links: [{ to: "/machines/caterpillar/", label: { ar: "قطع كاتربيلر", /* Caterpillar parts */ en: "Caterpillar parts" } }],
      },
      {
        q: { ar: "هل تتوفر قطع غيار الرافعات الشوكية (فوركلفت)؟", /* Do you have forklift spare parts ("فوركلفت" is the colloquial loan word)? */ en: "Do you have forklift spare parts?" },
        a: () => ({
          ar: "نعم، نوفّر قطع غيار الرافعات الشوكية لعلامات مثل تويوتا. أرسل رقم القطعة أو صورتها على واتساب ونرد عليك بالسعر والتوفر.",
          // Yes, we supply forklift spare parts for makes such as Toyota. Send the part number or a photo on WhatsApp and we reply with the price and availability.
          en: "Yes, we supply forklift spare parts for makes such as Toyota. Send the part number or a photo on WhatsApp and we reply with the price and availability.",
        }),
        links: [{ to: "/machines/forklift/", label: { ar: "قطع الرافعات الشوكية", /* Forklift parts */ en: "Forklift parts" } }],
      },
      {
        q: { ar: "هل تتوفر قطع غيار مضخات الخرسانة (اسبيرات البمب)؟", /* Are spare parts for concrete pumps available ("اسبيرات البمب" is the colloquial way to say pump spares)? */ en: "Do you have spare parts for concrete pumps?" },
        a: () => ({
          ar: "نعم. نوفّر قطع غيار مضخات الخرسانة، ومنها المحامل والفلاتر والأختام والصمامات وقطع التآكل وأنابيب التوصيل. ابحث في الكتالوج بالاسم أو برقم القطعة، أو أرسل صورة القطعة على واتساب.",
          // Yes. We supply concrete pump spare parts, including bearings, filters, seals, valves, wear parts and delivery pipes. Search the catalogue by name or part number, or send a photo of the part on WhatsApp.
          en: "Yes. We supply concrete pump spare parts, including bearings, filters, seals, valves, wear parts and delivery pipes. Search the catalog by name or part number, or send a photo of the part on WhatsApp.",
        }),
        links: [
          { to: "/category/wear/", label: { ar: "قطع التآكل وصمام S", /* Wear parts and S-valve */ en: "Wear parts & S-valve" } },
          { to: "/guides/concrete-pump-parts-names/", label: { ar: "أسماء قطع مضخة الخرسانة", /* Concrete pump part names */ en: "Concrete pump part names" } },
        ],
      },
      {
        q: { ar: "هل تتوفر قطع غيار الخلاطات ومحطات الخلط؟", /* Are spare parts for mixers and batching plants available? */ en: "Do you have spare parts for mixers and batching plants?" },
        a: () => ({
          ar: "نعم. نوفّر قطع غيار شاحنات الخلاطات ومحطات الخلط، ومنها الخلاطات والمحركات والجيربوكسات والصمامات الهوائية والرومان بلي.",
          // Yes. We supply spare parts for truck mixers and batching plants, including mixers, motors, gearboxes, pneumatic valves and bearings.
          en: "Yes. We supply spare parts for truck mixers and batching plants, including mixers, motors, gearboxes, pneumatic valves and bearings.",
        }),
        links: [
          { to: "/category/mixer/", label: { ar: "قطع الخلاطات ومحطات الخلط", /* Mixer and batching-plant parts */ en: "Mixer & batching-plant parts" } },
          { to: "/guides/batching-plant-spare-parts/", label: { ar: "دليل قطع غيار محطات الخلط", /* Batching plant spare parts guide */ en: "Batching plant parts guide" } },
        ],
      },
    ],
  },
  {
    id: "order",
    title: { ar: "الطلب والأسعار", /* Ordering and prices */ en: "Ordering and prices" },
    items: [
      {
        q: { ar: "كيف أعرف سعر القطعة؟", /* How do I find out the price of a part? */ en: "How do I get the price of a part?" },
        a: () => ({
          ar: `الأسعار عند الطلب. أرسل رقم القطعة أو صورتها على واتساب ${SITE.phoneDisplay}، ونرد عليك بالسعر والتوفر.`,
          // Prices are on request. Send the part number or a photo on WhatsApp and we reply with the price and availability.
          en: `Prices are given on request. Send the part number or a photo on WhatsApp at ${SITE.phoneDisplay} and we reply with the price and availability.`,
        }),
      },
      {
        q: { ar: "هل القطعة متوفرة الآن؟", /* Is the part in stock right now? */ en: "Is the part in stock right now?" },
        a: () => ({
          ar: "الكتالوج لا يعرض المخزون لحظيًا. أرسل رقم القطعة أو صورتها على واتساب ونؤكد لك التوفر مع السعر.",
          // The catalogue does not show live stock. Send the part number or a photo on WhatsApp and we confirm availability with the price.
          en: "The catalog does not show live stock. Send the part number or a photo on WhatsApp and we confirm availability together with the price.",
        }),
      },
      {
        q: { ar: "كيف أطلب عرض سعر لعدة قطع؟", /* How do I request a quote for several parts? */ en: "How do I request a quote for several parts?" },
        a: () => ({
          ar: "أضف القطع من الكتالوج إلى «طلب السعر»، ثم أرسل الطلب عبر واتساب. نرد عليك بالسعر والتوفر.",
          // Add the parts from the catalogue to the "price request" list, then send the request through WhatsApp. We reply with the price and availability.
          en: "Add the parts from the catalog to the price request list, then send the request on WhatsApp. We reply with the price and availability.",
        }),
        links: [
          { to: "/catalog/", label: { ar: "الكتالوج", /* Catalog */ en: "Catalog" } },
          { to: "/quote/", label: { ar: "طلب السعر", /* Price request */ en: "Price request" } },
        ],
      },
      {
        q: { ar: "ما عندي رقم القطعة، كيف أطلبها؟", /* I don't have the part number, how do I order it? */ en: "I don't have the part number. How do I order?" },
        a: () => ({
          ar: "صوّر القطعة القديمة أو لوحة بيانات الآلة وأرسلها على واتساب، ونحدد لك القطعة المناسبة. وتقدر تبحث بالاسم من الكتالوج أيضًا.",
          // Photograph the old part or the machine's data plate and send it on WhatsApp; we identify the right part. You can also search by name in the catalogue.
          en: "Photograph the old part or the machine's data plate and send it on WhatsApp. We identify the right part for you. You can also search the catalog by name.",
        }),
        links: [{ to: "/guides/find-part-number/", label: { ar: "كيف تجد رقم القطعة", /* How to find the part number */ en: "How to find the part number" } }],
      },
      {
        q: { ar: "كيف أتأكد أن القطعة تناسب آلتي؟", /* How do I make sure the part fits my machine? */ en: "How do I make sure a part fits my machine?" },
        a: () => ({
          ar: "أرسل رقم القطعة، أو صورة القطعة القديمة، أو صورة لوحة بيانات الآلة، ونحدد لك القطعة المناسبة. وإذا لم تناسب آلتك فيمكنك إرجاعها أو استبدالها.",
          // Send the part number, a photo of the old part, or a photo of the machine's data plate and we identify the right part. If it does not fit your machine you can return or exchange it.
          en: "Send the part number, a photo of the old part, or a photo of the machine's data plate and we identify the right part. If it does not fit your machine you can return or exchange it.",
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
    ],
  },
  {
    id: "delivery",
    title: { ar: "التوصيل", /* Delivery */ en: "Delivery" },
    items: [
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
    ],
  },
  {
    id: "quality",
    title: { ar: "القطع الأصلية والضمان والإرجاع", /* Original parts, warranty and returns */ en: "Original parts, warranty and returns" },
    items: [
      {
        q: { ar: "هل القطع أصلية أم بديلة (تجارية)؟", /* Are the parts original or alternative ("تجارية" is the market word for non-original)? */ en: "Are your parts original or alternative?" },
        a: () => ({
          ar: "جميع القطع التي نبيعها أصلية.",
          // All the parts we sell are original.
          en: "All the parts we sell are original.",
        }),
        links: [{ to: "/guides/original-vs-alternative-parts/", label: { ar: "الأصلي والبديل: الفرق", /* Original vs alternative: the difference */ en: "Original vs alternative: the difference" } }],
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
    ],
  },
  {
    id: "pay",
    title: { ar: "الدفع والفواتير", /* Payment and invoices */ en: "Payment and invoices" },
    items: [
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
          ar: `نعم، نصدر فاتورة ضريبية. الرقم الضريبي للمؤسسة ${SITE.vat}.`,
          // Yes, we issue VAT invoices. The company's VAT number is ...
          en: `Yes, we issue VAT invoices. Our VAT number is ${SITE.vat}.`,
        }),
      },
    ],
  },
  {
    id: "about",
    title: { ar: "عن المؤسسة", /* About the company */ en: "About the company" },
    items: [
      {
        q: { ar: "أين موقعكم وما هي أوقات الدوام؟", /* Where are you and what are your opening hours? */ en: "Where are you located and what are your opening hours?" },
        a: () => ({
          ar: `${SITE.address.ar}. ${SITE.hours.ar}.`,
          en: `${SITE.address.en}. ${SITE.hours.en}.`,
        }),
        links: [{ to: "/contact/", label: { ar: "الموقع والتواصل", /* Location and contact */ en: "Location and contact" } }],
      },
      {
        q: { ar: "منذ متى تعملون؟", /* Since when have you been operating? */ en: "How long have you been in business?" },
        a: () => ({
          ar: "افتُتحت المؤسسة في 5 أبريل 2010.",
          // The company opened on 5 April 2010.
          en: "The company opened on 5 April 2010.",
        }),
      },
      {
        q: { ar: "ما رقم السجل التجاري والرقم الضريبي للمؤسسة؟", /* What are the company's commercial registration and VAT numbers? */ en: "What are your commercial registration and VAT numbers?" },
        a: () => ({
          ar: `السجل التجاري ${SITE.cr}، والرقم الضريبي ${SITE.vat}.`,
          // Commercial registration ..., VAT number ...
          en: `Commercial registration ${SITE.cr}. VAT number ${SITE.vat}.`,
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
      {
        q: { ar: "كيف أتواصل معكم؟", /* How do I contact you? */ en: "How do I contact you?" },
        a: () => ({
          ar: `واتساب أو اتصال على ${SITE.phoneDisplay}. أرسل رقم القطعة أو صورتها ونرد عليك.`,
          // WhatsApp or call ... Send the part number or a photo and we reply.
          en: `WhatsApp or call ${SITE.phoneDisplay}. Send the part number or a photo and we reply.`,
        }),
      },
    ],
  },
];

FAQ_GROUPS.push(...GUIDE_GROUPS);

export const FAQ_COUNT = FAQ_GROUPS.reduce((s, g) => s + g.items.length, 0);

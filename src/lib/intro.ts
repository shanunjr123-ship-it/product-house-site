import type { Lang } from "@/config/site";
import { PRODUCTS, TAGS, CATEGORIES, byCategory, byTag, catBySlug, categoryCounts, label, tagBySlug, tagCounts } from "@/lib/catalog";
import { isMachineOem } from "@/lib/brands";

/**
 * Short, factual opening paragraph for list pages. It is built from the catalogue itself, so it is always
 * true and never the same on two pages. Answer-first on purpose: search snippets and AI assistants quote it.
 */

const n = (x: number, lang: Lang) => x.toLocaleString(lang === "ar" ? "ar-SA-u-nu-latn" : "en-US");
const list = (xs: string[], lang: Lang) =>
  xs.length < 2 ? xs.join("") : lang === "ar" ? `${xs.slice(0, -1).join("، ")} و${xs[xs.length - 1]}` : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;

/** Most frequent machine brands among these parts (OEM brands only, ignoring generic machine types). */
function topBrands(items: { tags: string[] }[], max: number, lang: Lang, skip?: string) {
  const m = new Map<string, number>();
  for (const p of items) for (const t of p.tags) if (t !== skip && isMachineOem(t)) m.set(t, (m.get(t) ?? 0) + 1);
  return [...m.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([slug]) => label(tagBySlug(slug), lang))
    .filter(Boolean);
}

function sampleNames(items: { name: string; nameAr: string | null; image: string | null }[], max: number, lang: Lang) {
  const out: string[] = [];
  for (const p of items) {
    const nm = lang === "ar" ? p.nameAr : p.name;
    if (!nm || nm.length > 38 || out.includes(nm)) continue;
    out.push(nm);
    if (out.length === max) break;
  }
  return out;
}

const ASK = {
  // Send the part number or a photo on WhatsApp for price and availability. Prices are on request.
  ar: "أرسل رقم القطعة أو صورتها على واتساب لمعرفة السعر والتوفر. الأسعار عند الطلب.",
  en: "Send the part number or a photo on WhatsApp for price and availability. Prices are given on request.",
};

export function categoryIntro(lang: Lang, slug: string) {
  const c = catBySlug(slug)!;
  const items = byCategory(slug);
  const brands = topBrands(items, 4, lang);
  const names = sampleNames(items.filter((p) => p.image), 3, lang);
  if (lang === "ar") {
    // {count} parts in {category} for concrete pumps, mixers and batching plants, supplied from Riyadh. Examples: ... Used on machines from ... {ask}
    return [
      `${n(items.length, lang)} قطعة ضمن «${c.ar}» لمضخات الخرسانة والخلاطات ومحطات الخلط، تورّدها مؤسسة بيت المنتج من الرياض.`,
      names.length >= 2 ? `من أمثلتها: ${list(names, lang)}.` : "",
      brands.length ? `تُستخدم في آلات ${list(brands, lang)}.` : "",
      ASK.ar,
    ]
      .filter(Boolean)
      .join(" ");
  }
  return [
    `${n(items.length, lang)} parts in the “${c.en}” category, for concrete pumps, truck mixers and batching plants, supplied from Riyadh by Product House Trading Est.`,
    names.length >= 2 ? `Examples: ${list(names, lang)}.` : "",
    brands.length ? `Used on machines from ${list(brands, lang)}.` : "",
    ASK.en,
  ]
    .filter(Boolean)
    .join(" ");
}

/** The categories this machine brand has the most parts in (without "other"). */
function machineCats(lang: Lang, slug: string, max: number) {
  const items = byTag(slug);
  return categoryCounts()
    .map((c) => ({ c, k: items.filter((p) => p.cat === c.slug).length }))
    .filter((x) => x.k && x.c.slug !== "other")
    .sort((a, b) => b.k - a.k)
    .slice(0, max)
    .map((x) => label(x.c, lang));
}

/** Meta description for a machine brand page: up to three categories, fewer if the text would pass 155 characters. */
export function machineMetaText(lang: Lang, slug: string) {
  const t = tagBySlug(slug)!;
  const build = (k: number) => {
    const cats = machineCats(lang, slug, k);
    if (lang === "ar") {
      // {brand} spare parts in Riyadh: {categories}. Send the part number or a photo on WhatsApp and we reply with the price.
      return `قطع غيار ${t.ar} في الرياض${cats.length ? `: ${list(cats, lang)}` : ""}. أرسل رقم القطعة أو صورتها على واتساب ونرد عليك بالسعر.`;
    }
    return `${t.en} spare parts in Riyadh${cats.length ? `: ${list(cats, lang).toLowerCase()}` : ""}. Send the part number or a photo on WhatsApp and we reply with the price.`;
  };
  let k = 3;
  let text = build(k);
  while (text.length > 155 && k > 0) text = build(--k);
  // Too short (a brand with one category): add the supplier.
  if (text.length < 105) text += lang === "ar" ? " من مؤسسة بيت المنتج." : " From Product House."; // From Product House Trading Est.
  return text;
}

/** Meta description for a category page. */
export function categoryMetaText(lang: Lang, slug: string) {
  const c = catBySlug(slug)!;
  const k = n(byCategory(slug).length, lang);
  if (lang === "ar") {
    // {k} parts in "{category}" for concrete pumps and mixers in Riyadh. Send the part number or a photo on WhatsApp and get the price.
    return `${k} قطعة ضمن «${c.ar}» لمضخات الخرسانة والخلاطات في الرياض. أرسل رقم القطعة أو صورتها على واتساب ويصلك السعر.`;
  }
  const full = `${k} parts in “${c.en}” for concrete pumps and mixers in Riyadh. Send the part number or a photo on WhatsApp for the price.`;
  return full.length <= 155 ? full : `${k} parts in “${c.en}” in Riyadh. Send the part number or a photo on WhatsApp for the price.`;
}

export function machineIntro(lang: Lang, slug: string) {
  const t = tagBySlug(slug)!;
  const items = byTag(slug);
  const cats = machineCats(lang, slug, 4);
  if (lang === "ar") {
    // {count} spare parts for {brand}, in categories such as ..., supplied from Riyadh. {ask}
    return [
      `${n(items.length, lang)} قطعة غيار ${t.ar}، تورّدها مؤسسة بيت المنتج من الرياض.`,
      cats.length ? `أبرز الأقسام: ${list(cats, lang)}.` : "",
      ASK.ar,
    ]
      .filter(Boolean)
      .join(" ");
  }
  return [
    `${n(items.length, lang)} spare parts for ${t.en}, supplied from Riyadh by Product House Trading Est.`,
    cats.length ? `Main categories: ${list(cats, lang)}.` : "",
    ASK.en,
  ]
    .filter(Boolean)
    .join(" ");
}

export function machinesIntro(lang: Lang) {
  const brands = tagCounts().filter((t) => isMachineOem(t.slug));
  const names = brands.slice(0, 6).map((t) => label(t, lang));
  if (lang === "ar") {
    // We cover spare parts for {k} machine brands, including ... Pick your brand to see its parts. {ask}
    return `نغطي قطع غيار ${n(brands.length, lang)} علامة تجارية للآلات، منها ${list(names, lang)}. اختر علامتك لتعرض قطعها. ${ASK.ar}`;
  }
  return `Spare parts for ${n(brands.length, lang)} machine brands, including ${list(names, lang)}. Pick your brand to see its parts. ${ASK.en}`;
}

export function catalogIntro(lang: Lang) {
  const cats = categoryCounts().filter((c) => c.slug !== "other");
  const top = cats.slice(0, 3).map((c) => label(c, lang));
  const total = PRODUCTS.length;
  if (lang === "ar") {
    // {total} spare parts in {k} categories for concrete pumps, mixers and batching plants, including ... Search by part number or name. {ask}
    return `${n(total, lang)} قطعة غيار في ${n(cats.length, lang)} قسمًا لمضخات الخرسانة والخلاطات ومحطات الخلط، منها ${list(top, lang)}. ابحث برقم القطعة أو الاسم. ${ASK.ar}`;
  }
  return `${n(total, lang)} spare parts in ${n(cats.length, lang)} categories for concrete pumps, mixers and batching plants, including ${list(top, lang)}. Search by part number or name. ${ASK.en}`;
}
void TAGS;
void CATEGORIES;

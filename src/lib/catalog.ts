import products from "../../data/products.json";
import { CATEGORIES, TAGS, MIN_TAG_COUNT, type Row } from "./taxonomy";
import type { Lang } from "@/config/site";

export type Product = {
  code: string;
  name: string;
  nameAr: string | null;
  cat: string;
  tags: string[];
  image: string | null;
  descAr: string | null;
  descEn: string | null;
  ref: string | null;
  iw?: number;
  ih?: number;
  indexable: boolean;
};
export const PRODUCTS = products as unknown as Product[];

export * from "./taxonomy";

export const toRow = (p: Product): Row => ({
  code: p.code,
  name: p.name,
  nameAr: p.nameAr ?? "",
  cat: p.cat,
  tags: p.tags,
  img: p.image,
  ref: p.ref ?? "",
});

export function categoryCounts() {
  const m = new Map<string, number>();
  for (const p of PRODUCTS) m.set(p.cat, (m.get(p.cat) ?? 0) + 1);
  return CATEGORIES.filter((c) => m.has(c.slug))
    .map((c) => ({ ...c, count: m.get(c.slug)! }))
    .sort((a, b) => (a.slug === "other" ? 1 : b.slug === "other" ? -1 : b.count - a.count));
}

export function tagCounts() {
  const m = new Map<string, number>();
  for (const p of PRODUCTS) for (const t of p.tags) m.set(t, (m.get(t) ?? 0) + 1);
  const min = MIN_TAG_COUNT;
  return TAGS.filter((t) => (m.get(t.slug) ?? 0) >= min)
    .map((t) => ({ ...t, count: m.get(t.slug)! }))
    .sort((a, b) => b.count - a.count);
}

/** Brand pages exist only for brands with MIN_TAG_COUNT parts or more. Anything linking to /machines/{slug}/ must check this first. */
const TAG_PAGES = new Set(tagCounts().map((t) => t.slug));
export const hasTagPage = (slug: string) => TAG_PAGES.has(slug);

export const byCategory = (slug: string) => PRODUCTS.filter((p) => p.cat === slug);
export const byTag = (slug: string) => PRODUCTS.filter((p) => p.tags.includes(slug));
export const byCode = (code: string) => PRODUCTS.find((p) => p.code === code);
export function similar(p: Product, n = 6) {
  // Same category; parts for the same machine brand first, then the nearest neighbours in the catalogue order.
  // Neighbours (not "the first six of the category") so every part is linked from the parts next to it:
  // otherwise parts deep in a long category get a single inbound link. Indexable parts only link to indexable parts.
  // The four nearest parts always come first (two on each side), so the link is mutual and every part gets inbound links
  // whatever its tags; the remaining slots go to parts for the same machine brand.
  const cat = PRODUCTS.filter((x) => x.cat === p.cat && (!p.indexable || x.indexable || x.code === p.code));
  const at = cat.findIndex((x) => x.code === p.code);
  const shared = (x: Product) => x.tags.filter((t) => p.tags.includes(t)).length;
  const near = cat.map((x, i) => ({ x, d: Math.abs(i - at) })).filter((o) => o.x.code !== p.code).sort((a, b) => a.d - b.d);
  const rest = near.slice(4).sort((a, b) => shared(b.x) - shared(a.x) || a.d - b.d);
  return [...near.slice(0, 4), ...rest].slice(0, n).map((o) => o.x);
}

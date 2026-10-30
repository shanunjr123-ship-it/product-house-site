import products from "../../data/products.json";
import tax from "../../data/taxonomy.json";
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
export type Named = { slug: string; ar: string; en: string };
export type Row = { code: string; name: string; nameAr: string; cat: string; tags: string[]; img: string | null; ref: string };

export const PRODUCTS = products as unknown as Product[];
export const CATEGORIES = tax.categories as (Named & { rx: string })[];
export const TAGS = tax.tags as (Named & { rx: string })[];

export const catBySlug = (s: string) => CATEGORIES.find((c) => c.slug === s);
export const tagBySlug = (s: string) => TAGS.find((t) => t.slug === s);
export const label = (n: Named | undefined, lang: Lang) => (n ? n[lang] : "");
export const pname = (p: { name: string; nameAr: string | null }, lang: Lang) =>
  lang === "ar" && p.nameAr ? p.nameAr : p.name;

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
  const min = (tax as { minTagCount?: number }).minTagCount ?? 3;
  return TAGS.filter((t) => (m.get(t.slug) ?? 0) >= min)
    .map((t) => ({ ...t, count: m.get(t.slug)! }))
    .sort((a, b) => b.count - a.count);
}

export const byCategory = (slug: string) => PRODUCTS.filter((p) => p.cat === slug);
export const byTag = (slug: string) => PRODUCTS.filter((p) => p.tags.includes(slug));
export const byCode = (code: string) => PRODUCTS.find((p) => p.code === code);
export function similar(p: Product, n = 6) {
  // Same category first; among those, parts for the same machine brand come first.
  const pool = PRODUCTS.filter((x) => x.cat === p.cat && x.code !== p.code);
  const shared = (x: Product) => x.tags.filter((t) => p.tags.includes(t)).length;
  return pool
    .map((x, i) => ({ x, i, s: shared(x) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map((o) => o.x);
}

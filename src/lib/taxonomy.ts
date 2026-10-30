import tax from "../../data/taxonomy.json";
import type { Lang } from "@/config/site";

// Categories, brand tags and small helpers. Kept apart from the parts list on purpose:
// client components import from here, and must never pull the whole parts database into the browser.
export type Named = { slug: string; ar: string; en: string };
export type Row = { code: string; name: string; nameAr: string; cat: string; tags: string[]; img: string | null; ref: string };

export const CATEGORIES = tax.categories as (Named & { rx: string })[];
export const TAGS = tax.tags as (Named & { rx: string })[];
export const MIN_TAG_COUNT = (tax as { minTagCount?: number }).minTagCount ?? 3;

export const catBySlug = (s: string) => CATEGORIES.find((c) => c.slug === s);
export const tagBySlug = (s: string) => TAGS.find((t) => t.slug === s);
export const label = (n: Named | undefined, lang: Lang) => (n ? n[lang] : "");
export const pname = (p: { name: string; nameAr: string | null }, lang: Lang) =>
  lang === "ar" && p.nameAr ? p.nameAr : p.name;

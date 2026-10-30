import { statSync } from "node:fs";
import { join } from "node:path";
import type { MetadataRoute } from "next";
import { PRODUCTS, categoryCounts, tagCounts } from "@/lib/catalog";
import { abs, productPath } from "@/lib/links";

export const dynamic = "force-static";

// lastmod = when the catalogue data last changed (only real content changes should move it).
const MODIFIED = statSync(join(process.cwd(), "data", "products.json")).mtime;

export default function sitemap(): MetadataRoute.Sitemap {
  const top = ["/", "/catalog/", "/machines/", "/about/", "/contact/"];
  const paths = [
    ...top,
    ...categoryCounts().map((c) => `/category/${c.slug}/`),
    ...tagCounts().map((t) => `/machines/${t.slug}/`),
    // Only parts with a photo and a description are offered to Google.
    ...PRODUCTS.filter((p) => p.indexable).map((p) => productPath(p.code)),
  ];
  const rank = (p: string) => (p === "/" ? 1 : top.includes(p) ? 0.8 : p.startsWith("/category/") || p.startsWith("/machines/") ? 0.7 : 0.5);
  // One entry per language version, each listing both versions, as Google's hreflang-in-sitemap format asks.
  return paths.flatMap((p) =>
    (["ar", "en"] as const).map((lang) => ({
      url: abs(lang, p),
      lastModified: MODIFIED,
      priority: rank(p),
      alternates: { languages: { ar: abs("ar", p), en: abs("en", p), "x-default": abs("ar", p) } },
    })),
  );
}

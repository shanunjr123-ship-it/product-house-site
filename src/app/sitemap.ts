import type { MetadataRoute } from "next";
import { PRODUCTS, categoryCounts, tagCounts } from "@/lib/catalog";
import { GUIDES } from "@/config/guides";
import { CAT_COVER, MACHINE_PHOTO, catOg, machineOg } from "@/config/photos";
import { SITE } from "@/config/site";
import { abs, productPath } from "@/lib/links";

export const dynamic = "force-static";

// lastmod = date the catalogue content last changed. Update this by hand when the catalogue changes;
// a build-time value would move on every deploy and teach Google to ignore it.
const MODIFIED = "2026-11-06";
// Photos were added to the home, category, machine, heavy-equipment, guide and about pages on this date; part pages did not change.
const PHOTOS_ADDED = "2026-11-17";

export default function sitemap(): MetadataRoute.Sitemap {
  const top = ["/", "/catalog/", "/machines/", "/heavy-equipment-parts/", "/guides/", "/about/", "/contact/"];
  const paths = [
    ...top,
    ...GUIDES.map((g) => `/guides/${g.slug}/`),
    ...categoryCounts().map((c) => `/category/${c.slug}/`),
    ...tagCounts().map((t) => `/machines/${t.slug}/`),
    // Only parts with a photo and a description are offered to Google.
    ...PRODUCTS.filter((p) => p.indexable).map((p) => productPath(p.code)),
  ];
  const rank = (p: string) => (p === "/" ? 1 : top.includes(p) ? 0.8 : p.startsWith("/category/") || p.startsWith("/machines/") ? 0.7 : 0.5);
  // One entry per language version, each listing both versions, as Google's hreflang-in-sitemap format asks.
  const imageFor = (p: string): string[] | undefined => {
    const cat = p.match(/^\/category\/([^/]+)\/$/)?.[1];
    const mach = p.match(/^\/machines\/([^/]+)\/$/)?.[1];
    const path = cat && CAT_COVER[cat] ? catOg(cat) : mach && MACHINE_PHOTO[mach] ? machineOg(mach) : undefined;
    return path ? [`${SITE.url}${path}`] : undefined;
  };
  const isPart = (p: string) => !(top.includes(p) || p.startsWith("/guides/") || p.startsWith("/category/") || p.startsWith("/machines/"));
  return paths.flatMap((p) =>
    (["ar", "en"] as const).map((lang) => ({
      url: abs(lang, p),
      lastModified: isPart(p) ? MODIFIED : PHOTOS_ADDED,
      images: imageFor(p),
      priority: rank(p),
      alternates: { languages: { ar: abs("ar", p), en: abs("en", p), "x-default": abs("ar", p) } },
    })),
  );
}

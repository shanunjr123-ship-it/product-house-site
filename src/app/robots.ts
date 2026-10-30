import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

export const dynamic = "force-static";

// Everything is open to crawlers, search and AI assistants alike. The quote page keeps a noindex tag
// instead of a Disallow: a blocked page can still be listed by URL, a crawlable noindex page cannot.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE.url}/sitemap.xml`, host: SITE.url };
}

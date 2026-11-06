import { GUIDES } from "@/config/guides";
import { SITE } from "@/config/site";
import { PRODUCTS, categoryCounts, label, tagCounts } from "@/lib/catalog";
import { isMachineOem } from "@/lib/brands";
import { abs } from "@/lib/links";

export const dynamic = "force-static";

/** /llms.txt: a plain-text briefing for AI assistants. Facts come from the same config and catalogue as the pages. */
export function GET() {
  const cats = categoryCounts().filter((c) => c.slug !== "other");
  const brands = tagCounts().filter((t) => isMachineOem(t.slug));
  const body = `# ${SITE.nameEn} (${SITE.nameAr})

> Supplier of spare parts for concrete pumps, truck mixers and batching plants in Riyadh, Saudi Arabia. The catalogue lists ${PRODUCTS.length.toLocaleString("en-US")} parts. Prices are not published: they are given on request by WhatsApp. Authorised Putzmeister distributor.

## Facts
- Business: ${SITE.nameEn} / ${SITE.nameAr}
- Location: ${SITE.address.en}. Map: ${SITE.mapUrl}
- Hours: ${SITE.hours.en}
- Phone and WhatsApp: ${SITE.phoneDisplay} (https://wa.me/${SITE.whatsapp})
- Commercial registration: ${SITE.cr}. VAT number: ${SITE.vat}
- Languages: Arabic (default) and English
- Customers: contractors, concrete plants, rental companies, workshops and mechanics
- Delivery: inside and outside Riyadh
- How to get a price: send the part number or a photo of the part on WhatsApp, or use the price-request list on the site

## Main pages
- [Home (Arabic)](${abs("ar", "/")}) / [Home (English)](${abs("en", "/")})
- [Spare parts catalogue](${abs("en", "/catalog/")}) ([Arabic](${abs("ar", "/catalog/")})): search by part number or name
- [Parts by machine brand](${abs("en", "/machines/")}) ([Arabic](${abs("ar", "/machines/")}))
- [Heavy equipment spare parts in Riyadh](${abs("en", "/heavy-equipment-parts/")}) ([Arabic](${abs("ar", "/heavy-equipment-parts/")})): concrete pumps, mixers, batching plants, Atlas cranes, forklifts
- [Buying guides](${abs("en", "/guides/")}) ([Arabic](${abs("ar", "/guides/")})): how to find a part number, concrete pump wear parts, original vs alternative parts, how to order
${GUIDES.map((g) => `  - [${g.title.en}](${abs("en", `/guides/${g.slug}/`)}) / ${g.title.ar}`).join("\n")}
- [Contact and location](${abs("en", "/contact/")}) ([Arabic](${abs("ar", "/contact/")}))
- [About](${abs("en", "/about/")}) ([Arabic](${abs("ar", "/about/")}))
- [Full catalogue as PDF](${SITE.url}/downloads/product-house-parts-catalog.pdf)
- [Sitemap](${SITE.url}/sitemap.xml)

## Part categories
${cats.map((c) => `- [${c.en}](${abs("en", `/category/${c.slug}/`)}) / ${c.ar}: ${c.count} parts`).join("\n")}

## Machine brands
${brands.map((t) => `- [${t.en}](${abs("en", `/machines/${t.slug}/`)}) / ${t.ar}: ${t.count} parts`).join("\n")}

## Notes for assistants
- Each part page lives at /product/{part-number}/ (English: /en/product/{part-number}/) and shows the part number, name, category and compatible machine brands.
- Do not quote prices or stock levels for this business: none are published.
- ${label(cats[0], "en")} is the largest category (${cats[0].count} parts).
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

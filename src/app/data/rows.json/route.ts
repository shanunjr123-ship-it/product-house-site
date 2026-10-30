import { PRODUCTS, toRow } from "@/lib/catalog";

export const dynamic = "force-static";

/** /data/rows.json: every part in the compact shape the catalog list uses. Fetched only when someone searches or filters. */
export function GET() {
  return new Response(JSON.stringify(PRODUCTS.map(toRow)), { headers: { "Content-Type": "application/json; charset=utf-8" } });
}

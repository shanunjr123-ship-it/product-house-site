// Product pages are always opened with a normal link (full page load), so the
// per-route RSC payload files Next emits next to each index.html are never
// requested. Dropping them cuts ~5 files per product page and keeps the export
// far below Cloudflare Pages' 20,000-file limit as the catalog grows.
import { readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";

let removed = 0;
for (const base of ["out/product", "out/en/product"]) {
  let dirs = [];
  try { dirs = readdirSync(base); } catch { continue; }
  for (const d of dirs) {
    const dir = join(base, d);
    if (!statSync(dir).isDirectory()) continue;
    for (const f of readdirSync(dir)) {
      if (f !== "index.html") { rmSync(join(dir, f), { recursive: true }); removed++; }
    }
  }
}
console.log(`prune-export: removed ${removed} files`);

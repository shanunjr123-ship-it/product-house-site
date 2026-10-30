# Product House Trading Est. — website

Static catalogue site (Arabic at `/`, English at `/en/`). Built with Next.js, hosted free on Cloudflare Pages. No database, no server: the Excel file is the source of truth.

## Update the catalogue from Excel

Needs Python 3 with `openpyxl` and `Pillow` (`pip install openpyxl pillow`).

```
python scripts/import_catalog.py "path/to/catalogue.xlsx"
```

This rewrites `data/products.json` and `public/data/catalog.json` (the browser search data), and extracts photos into `public/products/`. Then read `data/review.txt`: it lists parts the importer could not categorise, parts with no photo, and rows it skipped. Fix those in the Excel file and run the import again.

Photos: the importer reads pictures placed on top of cells. Pictures set to "Place in cell" are not read yet; test with sheet 2 before relying on it.

## Run locally

```
npm install
npm run dev        # http://localhost:3000
```

## Deploy (Cloudflare Pages, free)

1. Put this folder in a GitHub repository owned by the client (or the client's account you manage).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repository.
3. Build command `npm run build`, output directory `out`, Node version 20 or newer.
4. Environment variable `NEXT_PUBLIC_SITE_URL` = the final address, for example `https://example.com` (no trailing slash). This feeds canonical links, the sitemap and structured data.
5. Add the custom domain under the project's Custom domains tab. Buy the domain in the client's name (Cloudflare Registrar sells at cost, or any registrar).

Every push to the repository redeploys the site. Limits to keep in mind: 20,000 files per deployment (currently about 2,200), 25 MiB per file, 500 builds per month.

## What to fill in before launch

Everything marked `CONFIRM` in `src/config/site.ts`: WhatsApp and phone number, email, address, commercial registration number. Arabic category and brand names in `data/taxonomy.json` are drafts and need the client's review.

## Structure

- `src/config/site.ts` business details
- `src/i18n/dict.ts` every interface string, Arabic and English
- `data/taxonomy.json` categories and machine/brand tags, with the keyword rules used to assign them
- `scripts/import_catalog.py` Excel → JSON
- `scripts/prune-export.mjs` runs after the build; keeps the file count low
- `src/views/` page templates, `src/app/` routes (thin wrappers)

Product pages with no photo and no description are marked `noindex` and left out of the sitemap, so Google only sees pages with real content.

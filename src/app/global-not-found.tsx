import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "الصفحة غير موجودة | Page not found", robots: { index: false, follow: true } };

/** Shown by Cloudflare for any address that does not exist. Both languages, with the three ways forward. */
export default function GlobalNotFound() {
  const link = "btn btn-line !min-h-12";
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="wrap grid min-h-[70vh] content-center gap-6 py-16 text-start">
          <div>
            <h1 className="h-display text-[clamp(1.9rem,5vw,3rem)]">الصفحة غير موجودة</h1>
            {/* This page does not exist */}
            <p className="mt-2 max-w-prose text-lg text-steel">ربما تغيّر الرابط. ابحث عن القطعة برقمها في الكتالوج أو ارجع للرئيسية.</p>
            {/* The link may have changed. Search the catalog by part number or go back home. */}
          </div>
          <div dir="ltr">
            <h2 className="h-display text-[clamp(1.5rem,4vw,2.25rem)]">Page not found</h2>
            <p className="mt-2 max-w-prose text-lg text-steel">The link may have changed. Search the catalog by part number, or go back home.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" className="btn btn-brand !min-h-12">الرئيسية / Home</a>
            <a href="/catalog/" className={link}>الكتالوج / Catalog</a>
            <a href="/en/catalog/" className={link}>English catalog</a>
          </div>
        </main>
      </body>
    </html>
  );
}

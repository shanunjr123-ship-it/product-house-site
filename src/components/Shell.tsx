import PhoneIcon from "./PhoneIcon";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import "../app/globals.css";

import type { ReactNode } from "react";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { telLink, waLink } from "@/lib/links";
import Footer from "./Footer";
import Header from "./Header";
import { QuoteProvider } from "./QuoteProvider";
import RevealObserver from "./RevealObserver";
import ScrollState from "./ScrollState";
import TabBar from "./TabBar";

export default function Shell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const d = DICT[lang];
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <body>
        <QuoteProvider lang={lang}>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
            {lang === "ar" ? "تخطَّ إلى المحتوى" /* Skip to content */ : "Skip to content"}
          </a>
          <Header lang={lang} />
          <main id="main">{children}</main>
          <Footer lang={lang} />
          <div className="fab-stack fixed bottom-6 end-6 hidden flex-col gap-3 md:flex" style={{ zIndex: "var(--z-fab)" }}>
            <a href={telLink()} aria-label={d.call} className="fab-call">
              <PhoneIcon size={24} />
            </a>
            <a href={waLink(d.waGeneral)} target="_blank" rel="noopener noreferrer" aria-label={d.waFloat} className="fab-wa grid size-14 place-items-center rounded-full">
              <WhatsAppIcon size={28} />
            </a>
          </div>
          <TabBar lang={lang} />
          <RevealObserver />
          <ScrollState />
        </QuoteProvider>
      </body>
    </html>
  );
}

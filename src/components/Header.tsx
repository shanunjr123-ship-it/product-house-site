import HomeLink from "./HomeLink";
import { SITE, type Lang } from "@/config/site";
import { href } from "@/lib/links";
import { CallLink, LangSwitch, NavLinks, QuoteLink } from "./HeaderBits";

/** Logo only on phones: the full company name does not fit, and the logo already carries it. */
export default function Header({ lang }: { lang: Lang }) {
  return (
    <header className="pointer-events-none sticky top-0 px-3 pt-3" style={{ zIndex: "var(--z-nav)" }}>
      <div className="glass nav-pill pointer-events-auto mx-auto flex h-14 max-w-[76rem] items-center gap-3 rounded-full ps-4 pe-2">
        <HomeLink to={href(lang, "/")} className="flex min-w-0 items-center gap-3" aria-label={lang === "ar" ? SITE.nameAr : SITE.nameEn}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-sm.webp" alt="" width={46} height={37} fetchPriority="high" className="h-9 w-auto transition-transform duration-500 [transition-timing-function:var(--ease-bounce)] hover:scale-105" />
          <span className="h-display nav-name hidden truncate text-base text-brand lg:block">{lang === "ar" ? SITE.nameAr : SITE.nameEn}</span>
        </HomeLink>

        <NavLinks lang={lang} />

        <div className="ms-auto flex items-center gap-2">
          <LangSwitch lang={lang} />
          <CallLink lang={lang} />
          <QuoteLink lang={lang} />
        </div>
      </div>
    </header>
  );
}

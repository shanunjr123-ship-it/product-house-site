"use client";

import { ClipboardText } from "@phosphor-icons/react";
import PhoneIcon from "./PhoneIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, type Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { href, telLink } from "@/lib/links";
import { useQuote } from "./QuoteProvider";

/** Path without the /en prefix, so Arabic and English pages share one active-state test. */
export function useBarePath() {
  const p = usePathname() || "/";
  return p.replace(/^\/en(?=\/|$)/, "") || "/";
}
export const isActive = (bare: string, to: string) => (to === "/" ? bare === "/" : bare.startsWith(to));

export function NavLinks({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const bare = useBarePath();
  const links = [
    [d.navCatalog, "/catalog/"],
    [d.navMachines, "/machines/"],
    [d.navAbout, "/about/"],
    [d.navContact, "/contact/"],
  ] as const;
  return (
    <nav aria-label="Main" className="mx-auto hidden items-center gap-1 md:flex">
      {links.map(([t, p]) => {
        const on = isActive(bare, p);
        return (
          <Link
            key={p}
            href={href(lang, p)}
            aria-current={on ? "page" : undefined}
            className={`rounded-full px-4 py-1.5 text-base transition-colors duration-300 ${on ? "bg-brand/10 text-brand" : "text-ink/75 hover:bg-brand/5 hover:text-brand"}`}
          >
            {t}
          </Link>
        );
      })}
    </nav>
  );
}

export function LangSwitch({ lang }: { lang: Lang }) {
  const bare = useBarePath();
  const target = lang === "ar" ? (bare === "/" ? "/en/" : `/en${bare}`) : bare;
  // Plain links on purpose: switching language reloads the page, which also resets the layout direction cleanly.
  return (
    <div className="seg" dir="ltr" role="group" aria-label="Language">
      {lang === "ar" ? (
        <>
          <span className="seg-on" aria-current="true" lang="ar">
            عربي
          </span>
          <a href={target} hrefLang="en" lang="en">
            EN
          </a>
        </>
      ) : (
        <>
          <a href={target} hrefLang="ar" lang="ar">
            عربي
          </a>
          <span className="seg-on" aria-current="true" lang="en">
            EN
          </span>
        </>
      )}
    </div>
  );
}

export function CallLink({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  return (
    <a href={telLink()} aria-label={`${d.call}: ${SITE.phoneDisplay}`} className="call-btn xl:px-4">
      <PhoneIcon size={19} />
      <span className="t-num hidden text-[0.95rem] xl:inline">
        <bdi dir="ltr">{SITE.phoneLocal}</bdi>
      </span>
    </a>
  );
}

export function QuoteLink({ lang }: { lang: Lang }) {
  const { count } = useQuote();
  const d = DICT[lang];
  return (
    <Link href={href(lang, "/quote/")} aria-label={count ? `${d.navQuote} (${count})` : d.navQuote} className="btn btn-signal relative !min-h-10 !px-3.5 text-sm md:!px-5">
      <ClipboardText size={20} weight="regular" aria-hidden />
      <span className="hidden md:inline">{d.navQuote}</span>
      {count > 0 && (
        <span key={count} className="bump t-num grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-xs font-medium text-signal shadow-[0_2px_6px_rgba(0,0,0,.25)] max-md:absolute max-md:-end-1.5 max-md:-top-1" aria-hidden>
          {count}
        </span>
      )}
    </Link>
  );
}

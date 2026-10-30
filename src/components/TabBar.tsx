"use client";

import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Gear, House, MapPin, SquaresFour } from "@phosphor-icons/react";
import Link from "next/link";
import HomeLink from "./HomeLink";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { href, waLink } from "@/lib/links";
import { isActive, useBarePath } from "./HeaderBits";

/** iOS-style floating tab bar (phones only). Five equal cells; a glass indicator slides to the active tab. */
export default function TabBar({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const bare = useBarePath();
  // Cells: 0 Home, 1 Catalog, 2 WhatsApp (an action, never "active"), 3 Machines, 4 Contact.
  const idx = bare === "/" ? 0 : /^\/(catalog|category|product)/.test(bare) ? 1 : isActive(bare, "/machines/") ? 3 : isActive(bare, "/contact/") ? 4 : -1;
  const cell = "tab-cell relative z-10 flex flex-col items-center justify-center gap-1 py-1.5 text-xs transition-colors duration-300";
  const tab = (i: number, to: string, text: string, Icon: typeof House) => {
    const props = { href: href(lang, to), "aria-current": idx === i ? ("page" as const) : undefined, className: `${cell} ${idx === i ? "text-brand" : "text-steel"}` };
    const inner = (
      <>
        <Icon size={26} weight={idx === i ? "fill" : "regular"} aria-hidden />
        {text}
      </>
    );
    return to === "/" ? (
      <HomeLink to={props.href} aria-current={props["aria-current"]} className={props.className}>
        {inner}
      </HomeLink>
    ) : (
      <Link {...props}>{inner}</Link>
    );
  };
  return (
    <nav
      aria-label="Tabs"
      className="glass fixed inset-x-3 rounded-[1.25rem] p-1 md:hidden [background:rgba(255,255,255,0.86)]"
      style={{ zIndex: "var(--z-nav)", bottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="relative grid grid-cols-5">
        <span aria-hidden className="tab-ind" style={{ ["--i" as string]: Math.max(idx, 0), opacity: idx < 0 ? 0 : 1 }} />
        {tab(0, "/", d.home, House)}
        {tab(1, "/catalog/", d.navCatalog, SquaresFour)}
        <a href={waLink(d.waGeneral)} target="_blank" rel="noopener noreferrer" className={`${cell} text-ink/80`}>
          <WhatsAppIcon size={26} className="text-[#25D366]" />
          {d.whatsappLbl}
        </a>
        {tab(3, "/machines/", d.tabMachines, Gear)}
        {tab(4, "/contact/", d.navContact, MapPin)}
      </div>
    </nav>
  );
}

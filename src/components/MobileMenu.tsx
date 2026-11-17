"use client";

import { Article, Gear, House, Info, List, MapPin, SquaresFour, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { href } from "@/lib/links";
import { isActive, useBarePath } from "./HeaderBits";

/** Hamburger for phones: the tab bar only holds five cells, so Blog and About live here with every other page. */
export default function MobileMenu({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const bare = useBarePath();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  // Close after navigating, on Escape and on a tap outside the menu.
  useEffect(() => setOpen(false), [bare]);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const away = (e: PointerEvent) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", away);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", away);
    };
  }, [open]);

  const items = [
    [d.home, "/", House],
    [d.navCatalog, "/catalog/", SquaresFour],
    [d.navMachines, "/machines/", Gear],
    [d.navGuides, "/guides/", Article],
    [d.navAbout, "/about/", Info],
    [d.navContact, "/contact/", MapPin],
  ] as const;

  return (
    <div ref={box} className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={d.menu}
        className="call-btn"
      >
        {open ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
      </button>
      <nav
        id="mobile-menu"
        aria-label={d.menu}
        className={`glass absolute inset-x-3 top-[calc(100%+0.5rem)] rounded-[1.5rem] p-2 transition duration-300 [background:rgba(255,255,255,0.94)] ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <ul className="grid">
          {items.map(([text, to, Icon]) => {
            const on = isActive(bare, to);
            return (
              <li key={to}>
                <Link
                  href={href(lang, to)}
                  aria-current={on ? "page" : undefined}
                  className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-[1.0625rem] transition-colors ${on ? "bg-brand/10 text-brand" : "text-ink hover:bg-brand/5"}`}
                >
                  <Icon size={22} weight={on ? "fill" : "regular"} aria-hidden />
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

"use client";

import { Check, Plus } from "@phosphor-icons/react";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { useQuote } from "./QuoteProvider";

type P = { lang: Lang; code: string; name: string; nameAr: string; full?: boolean };

/** Toggle for the price-request list. Always shows a word, not just a "+", so it reads as an action. */
export default function AddButton({ lang, code, name, nameAr, full }: P) {
  const q = useQuote();
  const d = DICT[lang];
  const on = q.has(code);
  const toggle = () => (on ? q.remove(code) : q.add({ code, name, nameAr }));
  const text = full ? (on ? d.inShort : d.addMid) : on ? d.inShort : d.addShort;
  const Icon = on ? Check : Plus;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={`${on ? d.inQuote : d.addQuote}: ${code}`}
      className={`add-btn ${full ? "btn" : ""} ${on ? "is-on" : ""}`}
    >
      <Icon size={full ? 20 : 18} weight={on ? "bold" : "regular"} aria-hidden />
      <span>{text}</span>
    </button>
  );
}

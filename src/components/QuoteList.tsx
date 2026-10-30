"use client";

import WhatsAppIcon from "@/components/WhatsAppIcon";
import { ClipboardText, Minus, Plus, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { href, quoteMessage, waLink } from "@/lib/links";
import { useQuote } from "./QuoteProvider";

const field = "h-12 w-full rounded-2xl bg-paper px-4 outline-none ring-1 ring-inset ring-brand/10 transition-shadow focus:bg-white focus:ring-2 focus:ring-brand-bright";
const step = "grid size-11 place-items-center rounded-full bg-brand/8 text-brand transition-transform duration-500 [transition-timing-function:var(--ease-spring)] active:scale-90";

export default function QuoteList({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const q = useQuote();
  const [who, setWho] = useState({ name: "", company: "", city: "", notes: "" });

  if (q.items.length === 0) {
    return (
      <div className="bezel max-w-xl">
        <div className="plate flex flex-col items-start gap-4 p-5 text-start sm:p-6">
          <span className="tile-icon !size-12 !rounded-2xl">
            <ClipboardText size={24} aria-hidden />
          </span>
          <p className="text-lg text-ink">{d.quoteEmpty}</p>
          <Link href={href(lang, "/catalog/")} className="btn btn-brand w-full sm:w-auto">
            {d.quoteEmptyCta}
          </Link>
        </div>
      </div>
    );
  }

  const lines = q.items.map((i) => ({ code: i.code, name: lang === "ar" && i.nameAr ? i.nameAr : i.name, qty: i.qty }));
  const link = waLink(quoteMessage(lang, lines, who));

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="bezel">
        <ul className="plate">
          {q.items.map((i, n) => (
            <li key={i.code} className="row row-in grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 p-4 text-start sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-x-5 sm:px-5" style={{ ["--i" as string]: n % 8 }}>
              <div className="min-w-0">
                <bdi dir="ltr" className="t-num inline-block rounded-lg bg-brand/[0.07] px-2.5 py-1 text-sm font-medium text-brand">
                  {i.code}
                </bdi>
                <p className="mt-2 text-[1.0625rem] leading-snug [overflow-wrap:anywhere]">
                  <bdi dir="auto">{lang === "ar" && i.nameAr ? i.nameAr : i.name}</bdi>
                </p>
              </div>
              <button
                type="button"
                onClick={() => q.remove(i.code)}
                aria-label={`${d.remove}: ${i.code}`}
                className="col-start-2 row-start-1 grid size-10 place-items-center self-start rounded-full text-steel transition-colors hover:bg-signal/10 hover:text-signal sm:col-start-3 sm:self-center"
              >
                <Trash size={20} aria-hidden />
              </button>
              <div className="col-span-2 row-start-2 flex items-center justify-between gap-3 sm:col-span-1 sm:col-start-2 sm:row-start-1" role="group" aria-label={d.qty}>
                <span className="text-sm text-steel sm:hidden">{d.qty}</span>
                <div dir="ltr" className="flex items-center gap-1.5">
                  <button type="button" aria-label="−" onClick={() => q.setQty(i.code, i.qty - 1)} className={step}>
                    <Minus size={16} aria-hidden />
                  </button>
                  <input
                    inputMode="numeric"
                    maxLength={4}
                    aria-label={d.qty}
                    value={i.qty}
                    onChange={(e) => q.setQty(i.code, parseInt(e.target.value.replace(/\D/g, ""), 10))}
                    className="t-num h-11 w-14 rounded-full bg-paper text-center outline-none ring-1 ring-inset ring-brand/10 focus:ring-2 focus:ring-brand-bright"
                  />
                  <button type="button" aria-label="+" onClick={() => q.setQty(i.code, i.qty + 1)} className={step}>
                    <Plus size={16} aria-hidden />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bezel reveal lg:sticky lg:top-24">
        <div className="plate p-4 text-start sm:p-5">
          <div className="grid gap-3">
            {(
              [
                ["name", d.fName],
                ["company", d.fCompany],
                ["city", d.fCity],
              ] as const
            ).map(([k, lbl]) => (
              <label key={k} className="grid gap-1.5 text-sm text-steel">
                {lbl}
                <input value={who[k]} maxLength={k === "company" ? 80 : 60} autoComplete={k === "name" ? "name" : k === "company" ? "organization" : "address-level2"} onChange={(e) => setWho({ ...who, [k]: e.target.value })} className={field} />
              </label>
            ))}
            <label className="grid gap-1.5 text-sm text-steel">
              {d.fNotes}
              <textarea rows={3} maxLength={500} value={who.notes} onChange={(e) => setWho({ ...who, notes: e.target.value })} className={`${field} h-auto py-3`} />
            </label>
          </div>
          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-wa mt-5 w-full !min-h-14 text-[1.0625rem]">
            <WhatsAppIcon size={24} />
            {d.sendQuote}
          </a>
          <button type="button" onClick={q.clear} className="mt-3 text-sm text-steel underline underline-offset-4 transition-colors hover:text-signal">
            {d.clearList}
          </button>
        </div>
      </div>
    </div>
  );
}

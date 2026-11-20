"use client";

import WhatsAppIcon from "@/components/WhatsAppIcon";
import { ClipboardText, Minus, Plus, Trash, WarningCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { href, quoteMessage, waLink } from "@/lib/links";
import { track } from "@/lib/track";
import { useQuote } from "./QuoteProvider";

const field = "h-12 w-full rounded-2xl bg-paper px-4 outline-none ring-1 ring-inset ring-brand/10 transition-shadow focus:bg-white focus:ring-2 focus:ring-brand-bright";
const fieldBad = "!ring-2 !ring-signal";
const step = "grid size-11 place-items-center rounded-full bg-brand/8 text-brand transition-transform duration-500 [transition-timing-function:var(--ease-spring)] active:scale-90";

type Who = { name: string; company: string; city: string; notes: string };
type Errs = { name?: string; city?: string };

/** Quantity box that lets the customer clear it and type a new number; a bad value shows a message and is reset on leaving the box. */
function QtyInput({ code, qty, lang }: { code: string; qty: number; lang: Lang }) {
  const d = DICT[lang];
  const q = useQuote();
  const [draft, setDraft] = useState<string | null>(null);
  const shown = draft ?? String(qty);
  const bad = draft !== null && !(parseInt(draft, 10) >= 1);
  const errId = `qty-err-${code}`;
  return (
    <div className="relative grid justify-items-center">
      <input
        inputMode="numeric"
        maxLength={4}
        aria-label={d.qty}
        aria-invalid={bad || undefined}
        aria-describedby={bad ? errId : undefined}
        value={shown}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "");
          setDraft(v);
          const n = parseInt(v, 10);
          if (n >= 1) q.setQty(code, n);
        }}
        onBlur={() => setDraft(null)}
        className={`t-num h-11 w-14 rounded-full bg-paper text-center outline-none ring-1 ring-inset ring-brand/10 focus:ring-2 focus:ring-brand-bright ${bad ? fieldBad : ""}`}
      />
      {bad && (
        <p id={errId} role="alert" className="absolute top-full mt-1 w-max text-xs text-signal">
          {d.errQty}
        </p>
      )}
    </div>
  );
}

function validate(who: Who, lang: Lang): Errs {
  const d = DICT[lang];
  const e: Errs = {};
  if (who.name.trim().length < 2) e.name = d.errName;
  if (who.city.trim().length < 2) e.city = d.errCity;
  return e;
}

export default function QuoteList({ lang }: { lang: Lang }) {
  const d = DICT[lang];
  const q = useQuote();
  const [who, setWho] = useState<Who>({ name: "", company: "", city: "", notes: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [touched, setTouched] = useState<{ name?: boolean; city?: boolean }>({});
  const [tried, setTried] = useState(false);
  const refs = { name: useRef<HTMLInputElement>(null), city: useRef<HTMLInputElement>(null) };

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

  const update = (k: keyof Who, v: string) => {
    const next = { ...who, [k]: v };
    setWho(next);
    // Once a field has been left (or a send was tried), re-check it on every keystroke so the message disappears as soon as it is fixed.
    if (k === "name" || k === "city") if (touched[k] || tried) setErrs((x) => ({ ...x, [k]: validate(next, lang)[k] }));
  };
  const leave = (k: "name" | "city") => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrs((x) => ({ ...x, [k]: validate(who, lang)[k] }));
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er = validate(who, lang);
    setErrs(er);
    setTried(true);
    if (er.name || er.city) {
      (er.name ? refs.name : refs.city).current?.focus();
      return;
    }
    track("quote_submit", { items: lines.length, units: lines.reduce((n, l) => n + l.qty, 0), lang }); // price request sent to WhatsApp
    const w = window.open(link, "_blank");
    if (w) w.opener = null;
    else window.location.href = link;
  };

  const req = (
    <span aria-hidden className="text-signal">
      {" "}
      *
    </span>
  );
  const hasErr = !!(errs.name || errs.city);

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
                className="col-start-2 row-start-1 grid size-11 place-items-center self-start rounded-full text-steel transition-colors hover:bg-signal/10 hover:text-signal sm:col-start-3 sm:self-center"
              >
                <Trash size={20} aria-hidden />
              </button>
              <div className="col-span-2 row-start-2 flex items-center justify-between gap-3 pb-4 sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:pb-0" role="group" aria-label={d.qty}>
                <span className="text-sm text-steel sm:hidden">{d.qty}</span>
                <div dir="ltr" className="flex items-center gap-1.5">
                  <button type="button" aria-label="−" onClick={() => q.setQty(i.code, i.qty - 1)} className={step}>
                    <Minus size={16} aria-hidden />
                  </button>
                  <QtyInput code={i.code} qty={i.qty} lang={lang} />
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
        <form noValidate onSubmit={submit} className="plate p-4 text-start sm:p-5">
          <p className="mb-3 text-sm text-steel">{d.fReqHint}</p>
          <div className="grid gap-3">
            <label className="grid gap-1.5 text-sm text-steel">
              <span>
                {d.fName}
                {req}
              </span>
              <input
                ref={refs.name}
                required
                aria-required="true"
                aria-invalid={errs.name ? true : undefined}
                aria-describedby={errs.name ? "err-name" : undefined}
                value={who.name}
                maxLength={60}
                autoComplete="name"
                onChange={(e) => update("name", e.target.value)}
                onBlur={() => leave("name")}
                className={`${field} ${errs.name ? fieldBad : ""}`}
              />
              {errs.name && (
                <span id="err-name" role="alert" className="text-signal">
                  {errs.name}
                </span>
              )}
            </label>
            <label className="grid gap-1.5 text-sm text-steel">
              <span>
                {d.fCity}
                {req}
              </span>
              <input
                ref={refs.city}
                required
                aria-required="true"
                aria-invalid={errs.city ? true : undefined}
                aria-describedby={errs.city ? "err-city" : undefined}
                value={who.city}
                maxLength={60}
                autoComplete="address-level2"
                onChange={(e) => update("city", e.target.value)}
                onBlur={() => leave("city")}
                className={`${field} ${errs.city ? fieldBad : ""}`}
              />
              {errs.city && (
                <span id="err-city" role="alert" className="text-signal">
                  {errs.city}
                </span>
              )}
            </label>
            <label className="grid gap-1.5 text-sm text-steel">
              <span>
                {d.fCompany} <span className="text-steel/70">({d.fOptional})</span>
              </span>
              <input value={who.company} maxLength={80} autoComplete="organization" onChange={(e) => update("company", e.target.value)} className={field} />
            </label>
            <label className="grid gap-1.5 text-sm text-steel">
              <span>
                {d.fNotes} <span className="text-steel/70">({d.fOptional})</span>
              </span>
              <textarea rows={3} maxLength={500} value={who.notes} onChange={(e) => update("notes", e.target.value)} className={`${field} h-auto py-3`} />
            </label>
          </div>
          {tried && hasErr && (
            <p role="alert" className="mt-4 flex items-start gap-2 text-sm font-medium text-signal">
              <WarningCircle size={20} aria-hidden className="mt-px shrink-0" />
              {d.errSummary}
            </p>
          )}
          <button type="submit" className="btn btn-wa mt-5 w-full !min-h-14 text-[1.0625rem]">
            <WhatsAppIcon size={24} />
            {d.sendQuote}
          </button>
          <button type="button" onClick={q.clear} className="mt-3 inline-flex min-h-11 items-center text-sm text-steel underline underline-offset-4 transition-colors hover:text-signal">
            {d.clearList}
          </button>
        </form>
      </div>
    </div>
  );
}

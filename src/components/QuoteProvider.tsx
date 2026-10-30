"use client";

import { Check } from "@phosphor-icons/react";
import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Lang } from "@/config/site";
import { DICT } from "@/i18n/dict";
import { href } from "@/lib/links";

export type QItem = { code: string; name: string; nameAr: string; qty: number };
type Ctx = {
  items: QItem[];
  count: number;
  has: (code: string) => boolean;
  add: (it: Omit<QItem, "qty">) => void;
  remove: (code: string) => void;
  setQty: (code: string, qty: number) => void;
  clear: () => void;
};

const KEY = "ph-quote-v1";
const QuoteCtx = createContext<Ctx | null>(null);

export function QuoteProvider({ children, lang }: { children: ReactNode; lang: Lang }) {
  const [items, setItems] = useState<QItem[]>([]);
  const [toast, setToast] = useState<{ n: number; out: boolean } | null>(null);
  const d = DICT[lang];

  // Toast: shows for ~2.6 s after a part is added, then animates out.
  useEffect(() => {
    if (!toast || toast.out) return;
    const t = setTimeout(() => setToast((x) => (x ? { ...x, out: true } : x)), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!toast?.out) return;
    const t = setTimeout(() => setToast(null), 400);
    return () => clearTimeout(t);
  }, [toast?.out]);

  // Browser storage can throw (private mode, blocked site data); the list then lives in memory only.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  const persist = useCallback((next: QItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      has: (code) => items.some((i) => i.code === code),
      add: (it) => {
        if (items.some((i) => i.code === it.code)) return;
        persist([...items, { ...it, qty: 1 }]);
        setToast((x) => ({ n: (x?.n ?? 0) + 1, out: false }));
      },
      remove: (code) => persist(items.filter((i) => i.code !== code)),
      setQty: (code, qty) =>
        persist(items.map((i) => (i.code === code ? { ...i, qty: Math.max(1, Math.min(9999, qty || 1)) } : i))),
      clear: () => persist([]),
    }),
    [items, persist],
  );
  return (
    <QuoteCtx.Provider value={value}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 flex justify-center px-4" style={{ zIndex: 60, bottom: "calc(max(0.75rem, env(safe-area-inset-bottom)) + 5.5rem)" }}>
        {toast && (
          <div key={toast.n} className={`toast glass-dark pointer-events-auto flex items-center gap-3 rounded-full py-2 ps-3 pe-2 text-sm font-medium ${toast.out ? "out" : ""}`} style={{ background: "linear-gradient(135deg, rgba(28,43,142,0.92), rgba(14,22,89,0.92))" }}>
            <span className="grid size-7 place-items-center rounded-full bg-wa">
              <Check size={16} weight="bold" aria-hidden />
            </span>
            {d.toastAdded}
            <Link href={href(lang, "/quote/")} className="rounded-full bg-white/20 px-3.5 py-1.5 font-medium">
              {d.toastView}
            </Link>
          </div>
        )}
      </div>
    </QuoteCtx.Provider>
  );
}

export function useQuote() {
  const c = useContext(QuoteCtx);
  if (!c) throw new Error("useQuote outside QuoteProvider");
  return c;
}

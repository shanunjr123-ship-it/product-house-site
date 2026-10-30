"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type OdoItem = { id: string; value: number; prefix?: string; suffix?: string; label: string; icon: ReactNode };

/** One number as rolling digit columns. Non-digits (comma, +, <) stay still. */
function Odo({ text, armed, row }: { text: string; armed: boolean; row: number }) {
  let k = 0;
  return (
    <span className="odo" data-armed={armed || undefined} style={{ ["--row" as string]: row }} dir="ltr">
      <span aria-hidden className="inline-flex">
        {[...text].map((ch, i) => {
          if (!/\d/.test(ch)) return <span key={i}>{ch}</span>;
          const n = Number(ch);
          const idx = k++;
          return (
            <span key={i} className="odo-col">
              <span className="odo-strip" style={{ ["--to" as string]: n, ["--k" as string]: idx }}>
                {Array.from({ length: 10 }, (_, d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

/** Four stats on a light card. Digits roll into place once when the card scrolls into view. Without JavaScript, or with reduced motion, the final numbers are simply shown. */
export default function StatsOdometer({ items }: { items: OdoItem[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        // Two frames so the browser paints the start position before the transition begins.
        requestAnimationFrame(() => requestAnimationFrame(() => setArmed(false)));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <ul ref={ref} className="stats-grid grid grid-cols-2 gap-x-5 lg:grid-cols-4">
      {items.map((s, i) => (
        <li key={s.id} className="min-w-0 text-start">
          <span className="tile-icon !size-10 !rounded-xl" aria-hidden>
            {s.icon}
          </span>
          <div className="mt-3">
            <Odo text={`${s.prefix ?? ""}${s.value.toLocaleString("en-US")}${s.suffix ?? ""}`} armed={armed} row={i} />
          </div>
          <span className={`odo-line`} data-armed={armed || undefined} style={{ ["--row" as string]: i }} aria-hidden />
          <p className="mt-2 max-w-[15rem] text-[0.95rem] leading-snug text-steel">{s.label}</p>
        </li>
      ))}
    </ul>
  );
}

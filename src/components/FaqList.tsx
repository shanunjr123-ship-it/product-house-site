"use client";

import { Plus } from "@phosphor-icons/react";
import Link from "next/link";
import { useRef } from "react";

type Item = { q: string; a: string; links?: { href: string; label: string }[] };

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

function Row({ q, a, links }: Item) {
  const det = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);

  // Opens and closes with a height + fade animation. Without JavaScript the native <details> still works.
  const toggle = (e: React.MouseEvent) => {
    const d = det.current;
    const b = body.current;
    if (!d || !b) return;
    e.preventDefault();
    anim.current?.cancel();
    const opening = d.dataset.state !== "open";
    d.dataset.state = opening ? "open" : "closed";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !b.animate) {
      d.open = opening;
      return;
    }
    if (opening) {
      d.open = true;
      const h = b.scrollHeight;
      anim.current = b.animate([{ height: "0px", opacity: 0, transform: "translateY(-6px)" }, { height: `${h}px`, opacity: 1, transform: "none" }], { duration: 420, easing: EASE });
    } else {
      const h = b.offsetHeight;
      const a2 = b.animate([{ height: `${h}px`, opacity: 1, transform: "none" }, { height: "0px", opacity: 0, transform: "translateY(-6px)" }], { duration: 320, easing: EASE });
      a2.onfinish = () => {
        if (d.dataset.state === "closed") d.open = false;
      };
      anim.current = a2;
    }
  };

  return (
    <details ref={det} className="faq row">
      <summary onClick={toggle} className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-[1.0625rem] leading-snug hover:text-brand sm:px-7 [&::-webkit-details-marker]:hidden">
        <span>{q}</span>
        <Plus size={22} aria-hidden className="faq-ico shrink-0 text-brand" />
      </summary>
      <div ref={body} className="overflow-hidden">
        <p className={`px-5 text-[0.9375rem] text-steel sm:max-w-[46rem] sm:px-7 ${links?.length ? "pb-3" : "pb-6"}`}>{a}</p>
        {links?.length ? (
          <p className="flex flex-wrap gap-x-5 gap-y-0 px-5 pb-3 text-[0.9375rem] sm:px-7">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="inline-flex min-h-[44px] items-center text-brand hover:underline">
                {l.label}
              </Link>
            ))}
          </p>
        ) : null}
      </div>
    </details>
  );
}

export default function FaqList({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((it) => (
        <Row key={it.q} {...it} />
      ))}
    </>
  );
}

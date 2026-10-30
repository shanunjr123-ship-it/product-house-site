"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fades `.reveal` elements in once they enter the viewport. Re-scans after every route change. */
export default function RevealObserver() {
  const path = usePathname();
  // Content only starts hidden once this component is running, so a page whose scripts fail to load stays fully visible.
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const scan = () => document.querySelectorAll<HTMLElement>(".reveal:not(.in)").forEach((e) => io.observe(e));
    scan();
    // Elements that mount later (the price-request form appears after the saved list loads) are picked up too.
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [path]);
  return null;
}

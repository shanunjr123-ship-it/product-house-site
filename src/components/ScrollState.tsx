"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Sets data-scrolled on <html> once the page moves off the top. Uses an observer, not a scroll listener. */
export default function ScrollState() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const first = useRef(true);
  const popped = useRef(false);

  // A new page opens at its top. Back/forward keep the browser's own restored position; #anchors are left alone.
  useEffect(() => {
    const onPop = () => (popped.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (popped.current) {
      popped.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      document.documentElement.toggleAttribute("data-scrolled", !e.isIntersecting);
    });
    io.observe(el);
    // The floating call/WhatsApp buttons step aside while the big footer name is on screen.
    const brand = document.getElementById("foot-brand");
    const io2 = brand
      ? new IntersectionObserver(([e]) => document.documentElement.toggleAttribute("data-foot", e.isIntersecting))
      : null;
    if (brand && io2) io2.observe(brand);
    return () => {
      io.disconnect();
      io2?.disconnect();
    };
  }, []);
  return <div ref={ref} aria-hidden style={{ position: "absolute", top: 0, left: 0, width: 1, height: 24, pointerEvents: "none" }} />;
}

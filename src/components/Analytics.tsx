"use client";

import Script from "next/script";
import { useEffect } from "react";
import { SITE } from "@/config/site";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...a: unknown[]) => void;
  }
}

/**
 * Google Analytics 4. Loads only when SITE.gaId is set. Besides page views it records the two actions that
 * matter for this business: a tap on WhatsApp (whatsapp_click) and on the phone number (call_click).
 * In GA4, mark both events as key events to see them as conversions.
 */
export default function Analytics() {
  const id = SITE.gaId;
  useEffect(() => {
    if (!id) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || !window.gtag) return;
      const h = a.getAttribute("href") ?? "";
      const kind = /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(h) ? "whatsapp_click" : h.startsWith("tel:") ? "call_click" : "";
      if (kind) window.gtag("event", kind, { page_path: location.pathname, link_text: (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [id]);
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}</Script>
    </>
  );
}

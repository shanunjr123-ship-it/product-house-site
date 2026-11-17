"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/config/site";
import { HERO_IMAGES } from "@/config/hero";

const AUTOPLAY_MS = 5500;
const N = HERO_IMAGES.length;

/**
 * Home hero photo. One large photo that cross-fades through the scenes; the caption and dots sit on it.
 * Large screens: it fills the whole hero behind the text and fades into the page on the text side (CSS .hg-bleed).
 * Phones and tablets: the same photo as an edge-to-edge band above the text (the phone box crops to the machine; sizes picks the large file there). Auto-advance stops while keyboard focus is on the dots, in background tabs, and for visitors who asked for reduced motion.
 */
export default function HeroGallery({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (held || still.matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [held, active]);

  return (
    <div
      className="hg"
      role="group"
      aria-roledescription="carousel"
      aria-label={lang === "ar" ? "آلات نوفّر قطع غيارها" : "Machines we supply parts for"}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="hg-stage" aria-live="off">
        {HERO_IMAGES.map((im, i) => (
          <figure key={im.id} className="hg-slide" data-on={i === active ? "" : undefined} aria-hidden={i !== active}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={im.lg}
              srcSet={`${im.sm} ${im.wSm}w, ${im.lg} ${im.wLg}w`}
              sizes="(min-width: 1024px) 92vw, (min-width: 640px) 100vw, 180vw"
              width={im.wLg}
              height={im.hLg}
              alt={im.alt[lang]}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : undefined}
              decoding="async"
              draggable={false}
              style={{ ["--pos" as string]: im.pos }}
            />
          </figure>
        ))}
      </div>
      <div className="hg-bar">
        <p className="hg-cap">{HERO_IMAGES[active].label[lang]}</p>
        <div className="hg-dots">
          {HERO_IMAGES.map((im, i) => (
            <button key={im.id} type="button" onClick={() => setActive(i)} aria-label={`${i + 1} / ${N}: ${im.label[lang]}`} aria-current={i === active ? "true" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}

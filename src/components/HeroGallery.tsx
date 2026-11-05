"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Lang } from "@/config/site";
import { HERO_IMAGES, type HeroImage } from "@/config/hero";

const SIZES = "(min-width: 1024px) 530px, 86vw";
const AUTOPLAY_MS = 5500;
const N = HERO_IMAGES.length;

function Photo({ im, lang, size, eager = false }: { im: HeroImage; lang: Lang; size: "stage" | "thumb"; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={size === "thumb" ? im.sm : im.lg}
      srcSet={size === "thumb" ? undefined : `${im.sm} ${im.wSm}w, ${im.lg} ${im.wLg}w`}
      sizes={size === "thumb" ? undefined : SIZES}
      width={im.wLg}
      height={im.hLg}
      alt={size === "thumb" ? "" : (im.alt ?? im.label)[lang]}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      draggable={false}
    />
  );
}

/**
 * Home hero images. Desktop: one large photo that cross-fades slowly through all four, with the other three
 * below as buttons that bring a photo to the front. Phones and tablets: a swipeable strip with dots.
 */
export default function HeroGallery({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false); // pointer or keyboard focus is on the gallery
  const [mobActive, setMobActive] = useState(0);
  const track = useRef<HTMLUListElement>(null);

  // Auto-advance on desktop only. Skipped for visitors who asked for reduced motion, while held, and in background tabs.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (held || !desktop.matches || still.matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((a) => (a + 1) % N);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [held, active]);

  // Which strip card is in view, for the dots. Reading card positions would break in right-to-left pages; observing does not.
  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setMobActive(Number((e.target as HTMLElement).dataset.i));
      },
      { root, threshold: 0.6 },
    );
    root.querySelectorAll("[data-i]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((i: number) => {
    const card = track.current?.querySelector<HTMLElement>(`[data-i="${i}"]`);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    card?.scrollIntoView({ behavior: still ? "auto" : "smooth", inline: "start", block: "nearest" });
  }, []);

  const others = HERO_IMAGES.map((im, i) => ({ im, i })).filter(({ i }) => i !== active);

  return (
    <div className="hg" role="group" aria-roledescription="carousel" aria-label={lang === "ar" ? "آلات نوفّر قطع غيارها" : "Machines we supply parts for"}>
      {/* Desktop */}
      <div
        className="hg-desk"
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
      >
        <div className="hg-stage" aria-live="off">
          {HERO_IMAGES.map((im, i) => (
            <figure key={im.id} className="hg-slide" data-fit={im.fit} data-on={i === active ? "" : undefined} aria-hidden={i !== active}>
              <Photo im={im} lang={lang} size="stage" eager={i === 0} />
            </figure>
          ))}
          <p className="hg-cap">{HERO_IMAGES[active].label[lang]}</p>
        </div>
        <ul className="hg-thumbs" style={{ gridTemplateColumns: `repeat(${others.length}, minmax(0, 1fr))` }}>
          {others.map(({ im, i }) => (
            <li key={im.id}>
              <button type="button" className="hg-thumb" onClick={() => setActive(i)} aria-label={im.label[lang]}>
                <span className="hg-thumb-img" data-fit={im.fit}>
                  <Photo im={im} lang={lang} size="thumb" />
                </span>
                <span className="hg-thumb-lbl">{im.label[lang]}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Phones and tablets */}
      <div className="hg-mob">
        <ul className="hg-track" ref={track}>
          {HERO_IMAGES.map((im, i) => (
            <li key={im.id} className="hg-card" data-i={i} data-fit={im.fit}>
              <Photo im={im} lang={lang} size="stage" eager={i === 0} />
              <p className="hg-cap">{im.label[lang]}</p>
            </li>
          ))}
        </ul>
        <div className="hg-dots">
          {HERO_IMAGES.map((im, i) => (
            <button key={im.id} type="button" onClick={() => goTo(i)} aria-label={`${i + 1} / ${N}: ${im.label[lang]}`} aria-current={i === mobActive ? "true" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}

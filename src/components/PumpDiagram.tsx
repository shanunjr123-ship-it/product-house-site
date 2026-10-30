"use client";

import { ArrowRight } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type PumpPart = { slug: string; name: string; count: number; href: string; thumbs: string[] };

// Visible window of the drawing (SVG units) and hotspot positions inside it. Order = number shown on the dot.
const VB = { x: 20, y: 24, w: 600, h: 372 };
const SPOTS: { slug: string; x: number; y: number }[] = [
  { slug: "hoses", x: 108, y: 150 },
  { slug: "pipes", x: 104, y: 62 },
  { slug: "electrical", x: 193, y: 254 },
  { slug: "filters", x: 278, y: 256 },
  { slug: "pistons", x: 300, y: 196 },
  { slug: "bearings", x: 338, y: 262 },
  { slug: "pumps", x: 411, y: 254 },
  { slug: "wear", x: 478, y: 206 },
  { slug: "valves", x: 540, y: 196 },
  { slug: "seals", x: 550, y: 256 },
];

type P = [number, number];
// Trig results are rounded: Node and the browser differ in the last digits, which made React report a hydration mismatch.
const r3 = (n: number) => Math.round(n * 1000) / 1000;
const ang = (a: P, b: P) => r3((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI);
const dist = (a: P, b: P) => r3(Math.hypot(b[0] - a[0], b[1] - a[1]));

/** One tapered boom section, drawn in its own frame so the metal shading runs across the tube: specular edge, shadow edge, flanged welds with bolts, a hydraulic line along the underside. */
function Boom({ a, b, w1, w2 }: { a: P; b: P; w1: number; w2: number }) {
  const L = dist(a, b);
  const rings = [0.14, 0.5, 0.86];
  return (
    <g transform={`translate(${a[0]} ${a[1]}) rotate(${ang(a, b)}) scale(1 -1)`}>
      <path d={`M0 ${r3(w1 / 2 + 3)}L${L} ${r3(w2 / 2 + 3)}`} stroke="#1a2158" strokeWidth="2.2" strokeLinecap="round" opacity=".85" />
      <path d={`M0 ${-w1 / 2}L${L} ${-w2 / 2}L${L} ${w2 / 2}L0 ${w1 / 2}Z`} fill="url(#pm-redm)" stroke="#5a080e" strokeWidth="1.2" strokeLinejoin="round" />
      <path d={`M0 ${r3(w1 / 2 - 3.6)}L${L} ${r3(w2 / 2 - 3.6)}`} stroke="#4a050a" strokeOpacity=".4" strokeWidth="2.6" />
      <path d={`M8 ${r3(-w1 / 2 + 3.2)}L${r3(L - 8)} ${r3(-w2 / 2 + 3.2)}`} stroke="#fff" strokeOpacity=".55" strokeWidth="1.8" strokeLinecap="round" />
      {rings.map((t) => {
        const w = r3(w1 + (w2 - w1) * t);
        const x = r3(L * t);
        return (
          <g key={t}>
            <rect x={x - 2.5} y={-w / 2 - 1.5} width="5" height={w + 3} rx="1.5" fill="url(#pm-chrome-v)" stroke="#566083" strokeWidth=".8" />
            <circle cx={x} cy={r3(-w / 2 + 1.6)} r=".9" fill="#566083" />
            <circle cx={x} cy={r3(w / 2 - 1.6)} r=".9" fill="#566083" />
          </g>
        );
      })}
    </g>
  );
}

/** Hex bolt head for pivots. */
function Bolts({ x, y, r = 8 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => (
        <circle key={i} cx={r3(x + Math.cos((i * Math.PI) / 3) * r)} cy={r3(y + Math.sin((i * Math.PI) / 3) * r)} r=".9" fill="#e7ebfa" stroke="#566083" strokeWidth=".4" />
      ))}
    </g>
  );
}

/** Hydraulic cylinder between two points: steel barrel, chrome rod that slides in and out. */
function Cyl({ a, b, w = 8, bodyShare = 0.55, delay = 0 }: { a: P; b: P; w?: number; bodyShare?: number; delay?: number }) {
  const L = dist(a, b);
  const body = r3(L * bodyShare);
  return (
    <g transform={`translate(${a[0]} ${a[1]}) rotate(${ang(a, b)})`}>
      <g className="rod-x" style={{ animationDelay: `${delay}s` }}>
        <rect x={body - 4} y={-w / 4} width={L - body + 4} height={w / 2} rx={w / 4} fill="url(#pm-chrome)" />
      </g>
      <rect x="0" y={-w / 2} width={body} height={w} rx={w / 2.4} fill="url(#pm-barrel)" stroke="#2a3470" strokeWidth="1" />
      <rect x="2" y={-w / 2 + 1.5} width={body - 4} height="1.6" rx=".8" fill="#fff" opacity=".6" />
      <circle cx="0" cy="0" r={w / 2 + 1} fill="#2a3470" />
      <circle cx={L} cy="0" r={w / 2} fill="#2a3470" />
    </g>
  );
}

function Wheel({ cx }: { cx: number }) {
  return (
    <g transform={`translate(${cx} 312)`}>
      <circle r="30" fill="#0a0f2b" />
      <circle r="27.5" fill="none" stroke="#1d2656" strokeWidth="4" strokeDasharray="5 3.4" />
      <circle r="21" fill="#141b44" />
      <circle r="17" fill="url(#pm-rim)" />
      <g className="spin spin-wheel">
        <circle r="15" fill="none" />
        {[0, 60, 120].map((a) => (
          <line key={a} x1="-15" y1="0" x2="15" y2="0" stroke="#8d99c7" strokeWidth="3.2" strokeLinecap="round" transform={`rotate(${a})`} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={r3(Math.cos((i * Math.PI) / 4) * 11.5)} cy={r3(Math.sin((i * Math.PI) / 4) * 11.5)} r="1.5" fill="#4a5688" />
        ))}
      </g>
      <circle r="5.5" fill="#cfd6f0" stroke="#566083" strokeWidth="1.2" />
    </g>
  );
}

type Props = { parts: PumpPart[]; itemsWord: string; browse: string; hint: string; alt: string; rtl?: boolean };

type Rect = { w: number; h: number; top: number };
const CARD_W = 272; // popover width (px) on tablets and desktops
const GAP = 28; // diagonal distance between a node and the card corner
const DOCK_MIN = 560; // stage narrower than this: the card docks under the drawing
const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), Math.max(lo, hi));

/**
 * Truck-mounted concrete pump drawn in SVG. Each numbered point is a spare-parts category.
 * Moving parts (pistons, S-valve, agitator, wheels, concrete flow) run on CSS; a highlight steps through the points until the visitor touches it.
 * Phones: a tap only selects a point; the Browse button opens the category. Mouse: clicking a point opens it.
 */
export default function PumpDiagram({ parts, itemsWord, browse, hint, alt, rtl = false }: Props) {
  const list = SPOTS.map((s) => ({ ...s, part: parts.find((p) => p.slug === s.slug) })).filter((s) => s.part) as (typeof SPOTS[number] & { part: PumpPart })[];
  const [i, setI] = useState(-1); // -1 = nothing chosen yet: show the hint
  const hold = useRef(0);
  const artRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [art, setArt] = useState({ w: 0, h: 0 });
  const [card, setCard] = useState<Rect>({ w: CARD_W, h: 132, top: 0 });

  // Size of the drawing in px, so the popover and its leader line can be placed in screen space.
  useEffect(() => {
    const el = artRef.current;
    if (!el) return;
    const read = () => setArt({ w: el.offsetWidth, h: el.offsetHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (Date.now() < hold.current) return;
      setI((n) => (n + 1) % list.length);
    }, 2800);
    return () => clearInterval(t);
  }, [list.length]);

  const pick = (n: number, ms = 9000) => {
    hold.current = Date.now() + ms;
    setI(n);
  };
  const on = (slug: string) => (i >= 0 && list[i]?.slug === slug ? " is-on" : "");
  const cur = i >= 0 ? list[i] : null;
  const docked = art.w > 0 && art.w < DOCK_MIN;
  const px = (s: { x: number; y: number }) => ({ x: ((s.x - VB.x) / VB.w) * art.w, y: ((s.y - VB.y) / VB.h) * art.h });

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (el) setCard((c) => (c.w === el.offsetWidth && c.h === el.offsetHeight && c.top === el.offsetTop ? c : { w: el.offsetWidth, h: el.offsetHeight, top: el.offsetTop }));
  }, [i, art.w, docked]);

  // Where the card sits and where the leader line runs. Popover: the card corner is pushed diagonally away from the node,
  // choosing the corner that covers the fewest other nodes. Docked (phones): card under the drawing, line drops to its top edge.
  let box = { left: 0, top: 0 };
  let lead: { x1: number; y1: number; x2: number; y2: number } | null = null;
  if (cur && art.w > 0) {
    const d = px(cur);
    let ax: number;
    let ay: number;
    if (docked) {
      ax = clamp(d.x, 28, art.w - 28);
      ay = card.top;
    } else {
      const cw = Math.min(CARD_W, art.w - 16);
      const others = list.filter((s) => s !== cur).map(px);
      let best = Infinity;
      for (const [sx, sy] of [[1, -1], [-1, -1], [1, 1], [-1, 1]]) {
        const l = clamp(sx > 0 ? d.x + GAP : d.x - GAP - cw, 8, art.w - cw - 8);
        const t = clamp(sy > 0 ? d.y + GAP : d.y - GAP - card.h, 8, art.h - card.h - 8);
        const shift = Math.abs(l - (sx > 0 ? d.x + GAP : d.x - GAP - cw)) + Math.abs(t - (sy > 0 ? d.y + GAP : d.y - GAP - card.h));
        const hit = others.filter((o) => o.x > l - 18 && o.x < l + cw + 18 && o.y > t - 18 && o.y < t + card.h + 18).length;
        const covers = d.x > l - 22 && d.x < l + cw + 22 && d.y > t - 22 && d.y < t + card.h + 22 ? 1 : 0;
        const score = shift + hit * 300 + covers * 5000;
        if (score < best) {
          best = score;
          box = { left: l, top: t };
        }
      }
      ax = clamp(d.x, box.left, box.left + cw);
      ay = clamp(d.y, box.top, box.top + card.h);
    }
    const len = Math.hypot(ax - d.x, ay - d.y);
    const r = art.w >= 768 ? 17 : 12; // start at the edge of the node, not its centre
    if (len > r + 6) lead = { x1: r3(d.x + ((ax - d.x) / len) * r), y1: r3(d.y + ((ay - d.y) / len) * r), x2: r3(ax), y2: r3(ay) };
  }

  const mouse = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <figure className="pump m-0">
      <div className="pump-stage relative">
        <div ref={artRef} className="relative">
        <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} role="img" aria-label={alt} className="relative block h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="pm-redm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff7077" />
              <stop offset=".2" stopColor="#f2404a" />
              <stop offset=".6" stopColor="#d51f28" />
              <stop offset="1" stopColor="#8c0f17" />
            </linearGradient>
            <linearGradient id="pm-blue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4a66f0" />
              <stop offset=".5" stopColor="#25379f" />
              <stop offset="1" stopColor="#141f6e" />
            </linearGradient>
            <linearGradient id="pm-steel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f7f9ff" />
              <stop offset=".55" stopColor="#d3daf4" />
              <stop offset="1" stopColor="#a9b4de" />
            </linearGradient>
            <linearGradient id="pm-chrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset=".45" stopColor="#c9d0ea" />
              <stop offset=".55" stopColor="#8f9bc8" />
              <stop offset="1" stopColor="#e7ebfa" />
            </linearGradient>
            <linearGradient id="pm-chrome-v" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#8f9bc8" />
              <stop offset=".35" stopColor="#ffffff" />
              <stop offset=".7" stopColor="#c9d0ea" />
              <stop offset="1" stopColor="#7d89b8" />
            </linearGradient>
            <linearGradient id="pm-barrel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6f7db4" />
              <stop offset=".4" stopColor="#3b4a91" />
              <stop offset="1" stopColor="#1c2663" />
            </linearGradient>
            <linearGradient id="pm-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e9f1ff" />
              <stop offset=".55" stopColor="#9db9f2" />
              <stop offset="1" stopColor="#6f8fe0" />
            </linearGradient>
            <linearGradient id="pm-tube" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f3f6ff" />
              <stop offset=".5" stopColor="#c4d0f5" />
              <stop offset="1" stopColor="#92a3dc" />
            </linearGradient>
            <radialGradient id="pm-rim" cx=".4" cy=".35" r=".8">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#aab4dc" />
            </radialGradient>
            <linearGradient id="pm-concrete" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#cfd5e6" />
              <stop offset="1" stopColor="#8e97b5" />
            </linearGradient>
            <clipPath id="pm-arch">
              <rect x="60" y="240" width="130" height="46" />
            </clipPath>
            <clipPath id="pm-hopper">
              <path d="M458 192h104l-12 42h-80z" />
            </clipPath>
            <linearGradient id="pm-vol" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".16" />
              <stop offset=".45" stopColor="#fff" stopOpacity="0" />
              <stop offset="1" stopColor="#000" stopOpacity=".28" />
            </linearGradient>
            <radialGradient id="pm-lamp" cx=".35" cy=".35" r=".8">
              <stop offset="0" stopColor="#fffbe0" />
              <stop offset="1" stopColor="#ffc94a" />
            </radialGradient>
            <radialGradient id="pm-gfade" cx="320" cy="352" r="330" gradientUnits="userSpaceOnUse">
              <stop offset=".3" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="pm-gmask" maskUnits="userSpaceOnUse" x="-60" y="338" width="760" height="64">
              <rect x="-60" y="338" width="760" height="64" fill="url(#pm-gfade)" />
            </mask>
            <clipPath id="pm-plane">
              <rect x="-60" y="342" width="760" height="54" />
            </clipPath>
            <pattern id="pm-hazard" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="8" fill="#ffc72c" />
              <rect x="4" width="4" height="8" fill="#141b44" />
            </pattern>
            <filter id="pm-blur" x="-20%" y="-200%" width="140%" height="500%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* ground: perspective grid plane that fades out, contact shadows */}
          <g mask="url(#pm-gmask)">
            <g clipPath="url(#pm-plane)" stroke="#5f78d8" strokeWidth=".8" fill="none">
              {[342, 349, 358, 371, 390].map((y) => (
                <line key={y} x1="-60" y1={y} x2="700" y2={y} opacity={y === 342 ? 0.9 : 0.5} />
              ))}
              {Array.from({ length: 24 }, (_, k) => {
                const xb = -500 + k * 70;
                return <line key={k} x1="320" y1="300" x2={xb + 0} y2="396" opacity=".4" />;
              })}
            </g>
          </g>
          <ellipse cx="320" cy="346" rx="272" ry="7" fill="#0e1659" opacity=".28" filter="url(#pm-blur)" />
          {[118, 400, 462].map((x) => (
            <ellipse key={x} cx={x} cy="343" rx="34" ry="3.4" fill="#0e1659" opacity=".35" />
          ))}
          {/* drawing frame: registration marks and a dash-dot axle line */}
          <g stroke="#1c2b8e" strokeOpacity=".4" strokeWidth="1.2" fill="none" strokeLinecap="square">
            <path d="M30 46V34H42M598 34H610V46M30 376V388H42M610 376V388H598" />
            <line x1="52" y1="312" x2="578" y2="312" strokeDasharray="14 3 2 3" strokeOpacity=".28" />
          </g>

          {/* overall-length dimension line */}
          <g stroke="#1c2b8e" strokeOpacity=".55" strokeWidth="1" fill="none">
            <path d="M54 361H578M54 355V367M578 355V367" />
            <path d="M54 361l7-3v6zM578 361l-7-3v6z" fill="#1c2b8e" fillOpacity=".55" stroke="none" />
          </g>

          {/* exhaust stack behind the cab, with a little smoke */}
          <rect x="175" y="150" width="7" height="118" rx="3" fill="url(#pm-chrome-v)" />
          <path d="M174 152q5-8 10 0z" fill="#566083" />
          {[0, 1, 2].map((n) => (
            <circle key={n} className="puff" cx="179" cy="146" r="4" fill="#8d99c7" style={{ animationDelay: `${n * 0.9}s` }} />
          ))}

          {/* outriggers (chrome rams, foot pads) */}
          {[201, 538].map((x) => (
            <g key={x}>
              <rect x={x - 6} y="282" width="12" height="26" rx="3" fill="url(#pm-barrel)" />
              <rect x={x - 3.5} y="306" width="7" height="30" rx="2" fill="url(#pm-chrome-v)" />
              <rect x={x - 17} y="335" width="34" height="7" rx="3" fill="#1c2663" />
              <rect x={x - 15} y="336.5" width="30" height="4" rx="1.5" fill="url(#pm-hazard)" />
            </g>
          ))}

          {/* underbody: drive shaft, fuel tank */}
          <rect x="130" y="302" width="276" height="4" rx="2" fill="#2a3470" />
          <rect x="186" y="288" width="40" height="16" rx="8" fill="url(#pm-steel)" stroke="#8d99c7" strokeWidth="1" />
          <rect x="196" y="288" width="3" height="16" fill="#8d99c7" opacity=".6" />

          {/* chassis */}
          <rect x="172" y="264" width="398" height="22" rx="5" fill="#1d2766" />
          <rect x="172" y="264" width="398" height="5" rx="2.5" fill="#4a5ab0" opacity=".7" />
          <rect x="172" y="264" width="398" height="22" rx="5" fill="url(#pm-vol)" />
          <path d="M172 281H570" stroke="#0e1659" strokeOpacity=".5" strokeWidth="1" />
          {[220, 300, 380, 450, 540].map((x) => (
            <circle key={x} cx={x} cy="276" r="1.8" fill="#8d99c7" />
          ))}

          {/* cab: forward-control cab facing left, windscreen raked at the front, flat roof, upright rear */}
          <path d="M62 286V234Q62 228 66 224L88 200Q92 196 98 196H158Q172 196 172 210V286Z" fill="url(#pm-blue)" />
          <path d="M90 199Q93 196 98 196H158Q171 196 172 207L100 203Z" fill="#fff" opacity=".14" />
          <path d="M62 286V234Q62 228 66 224L88 200Q92 196 98 196H158Q172 196 172 210V286Z" fill="url(#pm-vol)" />
          <path d="M100 203V196M158 203V196" stroke="#0e1659" strokeOpacity=".35" strokeWidth="1" />
          <circle cx="118" cy="312" r="36" fill="#0a0f2b" clipPath="url(#pm-arch)" />
          <path d="M72 229L92 206Q94 203 98 203H148Q154 203 154 209V229Z" fill="url(#pm-glass)" stroke="#0e1659" strokeWidth="2" strokeLinejoin="round" />
          <path d="M101 205h10l-12 23h-9z" fill="#fff" opacity=".5" />
          <path d="M96 234v48h56v-48" fill="none" stroke="#0e1659" strokeOpacity=".55" strokeWidth="1.6" />
          <rect x="136" y="246" width="12" height="3" rx="1.5" fill="#cfd6f0" />
          <rect x="62" y="238" width="12" height="18" rx="2" fill="#0e1659" />
          {[242, 247, 252].map((y) => (
            <line key={y} x1="63" y1={y} x2="73" y2={y} stroke="#566083" strokeWidth="1.2" />
          ))}
          <rect x="62" y="259" width="10" height="7" rx="2" fill="url(#pm-lamp)" stroke="#8c6a10" strokeWidth=".6" />
          <rect x="62" y="268" width="110" height="5" fill="#e0222b" />
          <rect x="54" y="276" width="22" height="9" rx="3" fill="url(#pm-chrome)" />
          <rect x="53" y="224" width="9" height="15" rx="3" fill="#0e1659" />
          <ellipse className="blink" cx="130" cy="193" rx="7" ry="3.6" fill="#ffb020" />

          <Wheel cx={118} />

          {/* electrical cabinet */}
          <g className={`part${on("electrical")}`}>
            <rect x="180" y="238" width="28" height="28" rx="4" fill="url(#pm-steel)" stroke="#1c2b8e" strokeWidth="1.6" />
            <rect x="185" y="243" width="18" height="9" rx="2" fill="#0e1659" />
            <circle className="blink" cx="190" cy="247.5" r="2" fill="#35d07f" />
            <circle cx="197" cy="247.5" r="2" fill="#ffb020" />
            <line x1="185" y1="258" x2="203" y2="258" stroke="#8d99c7" strokeWidth="1.6" />
            <line x1="185" y1="262" x2="198" y2="262" stroke="#8d99c7" strokeWidth="1.6" />
          </g>

          {/* hydraulic tank, filter */}
          <rect x="214" y="238" width="48" height="28" rx="6" fill="url(#pm-steel)" stroke="#1c2b8e" strokeWidth="1.6" />
          <rect x="221" y="245" width="10" height="14" rx="2.5" fill="#1c2b8e" opacity=".85" />
          <rect x="222" y="252" width="8" height="7" rx="1.5" fill="#7fa0ff" />
          <rect x="238" y="234" width="12" height="6" rx="2" fill="#566083" />
          <g className={`part${on("filters")}`}>
            <rect x="268" y="240" width="22" height="26" rx="5" fill="url(#pm-blue)" stroke="#0e1659" strokeWidth="1" />
            <rect x="271" y="240" width="4" height="26" rx="2" fill="#fff" opacity=".3" />
            {[248, 253, 258].map((y) => (
              <line key={y} x1="278" y1={y} x2="287" y2={y} stroke="#fff" strokeWidth="1.4" opacity=".6" />
            ))}
          </g>

          {/* slewing ring + turret column */}
          <rect x="310" y="244" width="56" height="22" rx="4" fill="#0e1659" />
          <g className={`part${on("bearings")}`}>
            <ellipse cx="338" cy="246" rx="46" ry="7" fill="#1c2b8e" />
            <ellipse cx="338" cy="244" rx="44" ry="6" fill="url(#pm-chrome)" />
            {[-34, -20, -6, 8, 22, 34].map((dx) => (
              <circle key={dx} cx={338 + dx} cy="245" r="1.6" fill="#566083" />
            ))}
          </g>
          <rect x="310" y="214" width="56" height="30" rx="9" fill="url(#pm-redm)" stroke="#6f0a11" strokeWidth="1.4" />
          <rect x="318" y="219" width="22" height="4" rx="2" fill="#fff" opacity=".4" />

          {/* hydraulic pump + motor */}
          <g className={`part${on("pumps")}`}>
            <rect x="388" y="240" width="48" height="26" rx="6" fill="url(#pm-barrel)" stroke="#0e1659" strokeWidth="1" />
            <rect x="392" y="243" width="40" height="3" rx="1.5" fill="#fff" opacity=".35" />
            <circle cx="412" cy="255" r="10.5" fill="url(#pm-rim)" stroke="#1c2b8e" strokeWidth="1.4" />
            <g className="spin spin-fast">
              <circle cx="412" cy="255" r="8" fill="none" />
              {[0, 120, 240].map((a) => (
                <path key={a} d="M412 255q-3-4-1-8q4 1 4 5z" fill="#1c2b8e" transform={`rotate(${a} 412 255)`} />
              ))}
            </g>
            <circle cx="412" cy="255" r="2.6" fill="#0e1659" />
          </g>

          {/* pumping unit: delivery cylinders and pistons */}
          <rect x="452" y="236" width="116" height="30" rx="6" fill="url(#pm-steel)" stroke="#1c2b8e" strokeWidth="1.6" />
          <g className={`part${on("seals")}`}>
            <rect x="460" y="240" width="100" height="10" rx="5" fill="url(#pm-tube)" stroke="#566083" strokeWidth="1" />
            <rect x="460" y="252" width="100" height="10" rx="5" fill="url(#pm-tube)" stroke="#566083" strokeWidth="1" />
            <g className="pis pis-a">
              <rect x="454" y="243.5" width="16" height="3" fill="url(#pm-chrome)" />
              <rect x="468" y="241" width="14" height="8" rx="2" fill="url(#pm-redm)" stroke="#6f0a11" strokeWidth=".8" />
            </g>
            <g className="pis pis-b">
              <rect x="454" y="255.5" width="16" height="3" fill="url(#pm-chrome)" />
              <rect x="468" y="253" width="14" height="8" rx="2" fill="url(#pm-redm)" stroke="#6f0a11" strokeWidth=".8" />
            </g>
          </g>

          {/* hopper: slurry, agitator, S-valve */}
          <path d="M452 186h116l-14 50h-88z" fill="#0e1659" />
          <path d="M458 192h104l-12 42h-80z" fill="#16227f" />
          <g clipPath="url(#pm-hopper)">
            <path className="slurry" d="M440 208q20-8 40-2t40-2q22-4 40 4v40h-120z" fill="url(#pm-concrete)" />
            <g className="spin spin-slow" transform="translate(510 216)">
              <circle r="34" fill="none" />
              <rect x="-34" y="-2.6" width="68" height="5.2" rx="2.6" fill="url(#pm-chrome)" stroke="#566083" strokeWidth=".8" />
              <rect x="-34" y="-7" width="7" height="14" rx="2" fill="#9fb0ff" />
              <rect x="27" y="-7" width="7" height="14" rx="2" fill="#9fb0ff" />
            </g>
            <circle cx="510" cy="216" r="4.6" fill="url(#pm-chrome)" stroke="#566083" strokeWidth="1" />
          </g>
          <rect x="450" y="183" width="120" height="6" rx="3" fill="url(#pm-chrome)" />
          {/* spectacle (wear) plate and cutting ring at the hopper outlet */}
          <g className={`part${on("wear")}`}>
            <rect x="466" y="229" width="92" height="8" rx="3" fill="url(#pm-chrome)" stroke="#566083" strokeWidth="1" />
            <ellipse cx="490" cy="233" rx="10" ry="2.8" fill="#0e1659" />
            <ellipse cx="534" cy="233" rx="10" ry="2.8" fill="#0e1659" />
            <rect x="466" y="229" width="92" height="2" rx="1" fill="#fff" opacity=".7" />
          </g>
          <g className={`part${on("valves")}`}>
            <g className="svalve">
              <path d="M500 222c0 11 28 5 28 15" fill="none" stroke="#6f0a11" strokeWidth="9" strokeLinecap="round" />
              <path d="M500 222c0 11 28 5 28 15" fill="none" stroke="url(#pm-redm)" strokeWidth="6.5" strokeLinecap="round" />
            </g>
          </g>

          <Wheel cx={400} />
          <Wheel cx={462} />

          {/* delivery pipe from the hopper to the boom base */}
          <path d="M490 232H352" fill="none" stroke="#566083" strokeWidth="8" strokeLinecap="round" />
          <path d="M490 230.6H352" fill="none" stroke="#e7ebfa" strokeWidth="2" strokeLinecap="round" opacity=".75" />
          {[440, 396].map((x) => (
            <rect key={x} x={x - 3} y="227" width="6" height="10" rx="2" fill="#1c2b8e" />
          ))}

          {/* boom cylinders */}
          <g className={`part${on("pistons")}`}>
            <Cyl a={[320, 238]} b={[298, 160]} w={10} />
            <Cyl a={[284, 140]} b={[224, 92]} w={9} delay={-1.6} />
            <Cyl a={[178, 86]} b={[124, 96]} w={8} delay={-3.2} />
          </g>

          {/* boom */}
          <g className={`part${on("pipes")}`}>
            <Boom a={[338, 232]} b={[276, 110]} w1={24} w2={19} />
            <Boom a={[276, 110]} b={[150, 66]} w1={19} w2={15} />
            <Boom a={[150, 66]} b={[84, 104]} w1={15} w2={12} />
          </g>
          <path className="flow" d="M486 231H352L338 232L276 110L150 66L84 104" fill="none" stroke="#f4f6ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".9" />
          {(
            [
              [276, 110],
              [150, 66],
              [84, 104],
              [338, 232],
            ] as P[]
          ).map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="10.5" fill="url(#pm-barrel)" stroke="#0e1659" strokeWidth="1.5" />
              <circle cx={x} cy={y} r="6" fill="url(#pm-chrome)" />
              <circle cx={x} cy={y} r="2.2" fill="#0e1659" />
              <Bolts x={x} y={y} r={8.2} />
            </g>
          ))}

          {/* end hose */}
          <g className={`part${on("hoses")}`}>
            <g className="hose">
              <path d="M84 104Q68 128 76 168" fill="none" stroke="#070b22" strokeWidth="10" strokeLinecap="round" />
              <path d="M84 104Q68 128 76 168" fill="none" stroke="#3a4678" strokeWidth="10" strokeLinecap="round" strokeDasharray="1.8 4.2" />
              <path d="M82 106Q67 128 74 166" fill="none" stroke="#fff" strokeOpacity=".22" strokeWidth="2" strokeLinecap="round" />
              <rect x="69" y="164" width="14" height="10" rx="2.5" fill="url(#pm-redm)" stroke="#6f0a11" strokeWidth="1" />
            </g>
          </g>
        </svg>

        <ol className="pump-dots">
          {list.map((s, n) => (
            <li key={s.slug} style={{ left: `${((s.x - VB.x) / VB.w) * 100}%`, top: `${((s.y - VB.y) / VB.h) * 100}%` }}>
              <Link
                href={s.part.href}
                aria-label={`${n + 1}. ${s.part.name}`}
                data-on={i === n ? "" : undefined}
                className="pump-dot"
                onMouseEnter={() => mouse() && pick(n, 6000)}
                onFocus={() => pick(n)}
                onClick={(e) => {
                  // Phones and tablets: a tap only selects the point. The Browse button below opens the category.
                  if (!mouse()) {
                    e.preventDefault();
                    pick(n, 12000);
                  }
                }}
              >
                <span className="t-num">{n + 1}</span>
              </Link>
            </li>
          ))}
        </ol>
        </div>

        {cur && lead && (
          <svg aria-hidden className="pump-lead" key={`l-${cur.slug}`}>
            <line className="halo" x1={lead.x1} y1={lead.y1} x2={lead.x2} y2={lead.y2} pathLength={1} />
            <line x1={lead.x1} y1={lead.y1} x2={lead.x2} y2={lead.y2} pathLength={1} />
            <circle cx={lead.x2} cy={lead.y2} r="3.5" />
          </svg>
        )}

        {cur && (
          <div
            key={`c-${cur.slug}`}
            ref={cardRef}
            dir={rtl ? "rtl" : "ltr"}
            className={`pump-card${docked ? " is-docked" : ""}`}
            style={docked ? undefined : { left: box.left, top: box.top, width: Math.min(CARD_W, art.w - 16) }}
            onMouseEnter={() => (hold.current = Date.now() + 9000)}
          >
            <div className="flex items-center gap-3">
              <span className="pump-cap-n t-num" aria-hidden>
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[1.0625rem] leading-snug text-ink">{cur.part.name}</span>
                <span className="t-num block text-sm text-steel">
                  {cur.part.count} {itemsWord}
                </span>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              {cur.part.thumbs.length > 0 && (
                <span className="flex shrink-0 gap-2" aria-hidden>
                  {cur.part.thumbs.map((t) => (
                    <span key={t} className="pump-thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={t} alt="" width={44} height={44} loading="lazy" decoding="async" />
                    </span>
                  ))}
                </span>
              )}
              <Link href={cur.part.href} className="btn btn-brand ms-auto !min-h-10 !px-4 text-[0.9375rem]">
                {browse}
                <ArrowRight size={18} aria-hidden className="rtl:-scale-x-100" />
              </Link>
            </div>
          </div>
        )}
      </div>

      <p className="sr-only" aria-live="polite">
        {cur ? `${i + 1}. ${cur.part.name}, ${cur.part.count} ${itemsWord}` : ""}
      </p>
      <p className="pump-cap text-[0.9375rem] text-steel">{hint}</p>
    </figure>
  );
}

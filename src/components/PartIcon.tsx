import {
  Cube,
  Disc,
  Drop,
  Engine,
  Faders,
  Fan,
  Funnel,
  Gauge,
  GearSix,
  Hexagon,
  Lightning,
  LinkSimple,
  LockKey,
  Nut,
  Package,
  Pipe,
  PlugsConnected,
  Spiral,
  Tire,
  Timer,
  ToggleLeft,
  Waveform,
  Waves,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import BearingIcon from "./BearingIcon";
import CatIcon from "./CatIcon";

type I = ComponentType<{ size?: number; weight?: "light" | "regular" | "bold" | "fill"; "aria-hidden"?: boolean }>;

// First match wins. Names are the English item names, which are what the catalog is built from.
const BY_NAME: [RegExp, I][] = [
  [/bearing/i, BearingIcon as I],
  [/\bchain|sprocket/i, LinkSimple],
  [/\bbelt/i, LinkSimple],
  [/vibrator/i, Waveform],
  [/filter|strainer/i, Funnel],
  [/hose|fitting|nipple|reel/i, Waves],
  [/valve|bulf/i, Faders],
  [/piston|cylinder|ram\b/i, Engine],
  [/seal|o-?ring|gasket|packing|kit/i, Disc],
  [/\bfan\b|cooler|radiator|raditor/i, Fan],
  [/tyre|tire|wheel|caster/i, Tire],
  [/\bpump|dynamo|motor/i, Drop],
  [/meter|gauge|pressure/i, Gauge],
  [/plug|socket|karaba|fish|cable|connector/i, PlugsConnected],
  [/switch|contactor|relay|breaker|button|sensor/i, ToggleLeft],
  [/timer/i, Timer],
  [/lock|key/i, LockKey],
  [/gear|coupling|shaft/i, GearSix],
  [/paddle|blade|mixer|agitator/i, Spiral],
  [/pipe|elbow|flange|clamp|tube/i, Pipe],
  [/nut|bolt|screw|washer|pin\b/i, Nut],
  [/rubber|pad|buffer|disc/i, Cube],
  [/wear|plate|ring|sleeve|liner|jaw|tip/i, Hexagon],
  [/spanner|wrench|tool/i, Wrench],
  [/electric|wire|lamp|light/i, Lightning],
];

/** Icon for a part that has no photo: picked from the item name first, then from its category. */
export default function PartIcon({ name, cat, size = 24 }: { name: string; cat: string; size?: number }) {
  const hit = BY_NAME.find(([rx]) => rx.test(name));
  if (hit) {
    const Icon = hit[1];
    return <Icon size={size} weight="regular" aria-hidden />;
  }
  if (cat === "other") return <Package size={size} weight="regular" aria-hidden />;
  return <CatIcon slug={cat} size={size} />;
}

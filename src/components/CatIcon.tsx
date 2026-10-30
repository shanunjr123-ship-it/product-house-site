import {
  Cube,
  Drop,
  Faders,
  Fan,
  Funnel,
  Gear,
  GearSix,
  Lightning,
  LinkSimple,
  Package,
  Pipe,
  Spiral,
  Tire,
  Waveform,
  CircleNotch,
  Disc,
  Engine,
  SquaresFour,
  Hexagon,
  Nut,
  PipeWrench,
  Waves,
} from "@phosphor-icons/react/dist/ssr";
import type { ComponentType } from "react";
import BearingIcon from "./BearingIcon";

type I = ComponentType<{ size?: number; weight?: "light" | "regular" | "bold" | "fill"; "aria-hidden"?: boolean }>;

const MAP: Record<string, I> = {
  bearings: CircleNotch,
  filters: Funnel,
  seals: Disc,
  vibrators: Waveform,
  valves: Faders,
  pistons: Engine,
  pumps: Drop,
  cooling: Fan,
  hoses: Waves,
  pipes: Pipe,
  wear: Hexagon,
  hardware: Nut,
  electrical: Lightning,
  gears: GearSix,
  chains: LinkSimple,
  wheels: Tire,
  rubber: Cube,
  mixer: Spiral,
  other: Package,
  all: SquaresFour,
};

export default function CatIcon({ slug, size = 24 }: { slug: string; size?: number }) {
  if (slug === "bearings") return <BearingIcon size={size} />;
  const Icon = MAP[slug] ?? Gear;
  return <Icon size={size} weight="regular" aria-hidden />;
}

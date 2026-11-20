// Numbers for the home-page stats band. Every value is real: the years come from the confirmed opening date,
// the rest are counted from the catalogue when the site is built.
export type StatDef = { key: "years" | "parts" | "types" | "brands"; suffix?: string };

/** Opening date confirmed by the owner. */
export const OPENED = "2010-04-05";

/** Full years since the opening date, counted on the day the site is built. */
export function yearsInBusiness(now = new Date()) {
  const o = new Date(OPENED);
  let y = now.getUTCFullYear() - o.getUTCFullYear();
  if (now.getUTCMonth() < o.getUTCMonth() || (now.getUTCMonth() === o.getUTCMonth() && now.getUTCDate() < o.getUTCDate())) y--;
  return y;
}

export const STATS: StatDef[] = [{ key: "years" }, { key: "parts", suffix: "+" }, { key: "types" }, { key: "brands" }];

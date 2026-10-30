// Numbers for the home-page stats band.
// DUMMY: every entry marked DUMMY is a placeholder. Replace with the client's real figures before launch.
// `real: true` means the value is computed from the catalog and is already correct.
export type StatDef = {
  key: "years" | "parts" | "customers" | "reply";
  value: number | null; // null = taken from the catalog size
  prefix?: string;
  suffix?: string;
  real?: boolean;
};

export const STATS: StatDef[] = [
  { key: "years", value: 15, suffix: "+" }, // DUMMY: years in business
  { key: "parts", value: null, suffix: "+", real: true }, // real: number of parts in the catalog
  { key: "customers", value: 850, suffix: "+" }, // DUMMY: contractors and workshops served
  { key: "reply", value: 10, prefix: "<" }, // DUMMY: average WhatsApp reply time in minutes
];

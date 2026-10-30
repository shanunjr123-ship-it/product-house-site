// Arabic-aware text normalisation for the client-side search.
export function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, "") // diacritics, tatweel
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/["'`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
/** Code with separators removed so "101040001" finds "101040-001". */
export const squash = (s: string) => norm(s).replace(/[^a-z0-9؀-ۿ]/g, "");

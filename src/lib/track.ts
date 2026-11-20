// Sends a Google Analytics 4 event. Does nothing when analytics is off or blocked.
export function track(name: string, params: Record<string, string | number> = {}) {
  try {
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    if (g) g("event", name, params);
  } catch {
    /* analytics must never break the page */
  }
}

/** Simple forklift pictogram (no forklift glyph exists in the icon set). Draws in currentColor. */
export default function ForkliftIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-brand">
      <path d="M5 25V11h7l3 7v7" />
      <path d="M8 14h4" />
      <path d="M5 25h10" />
      <path d="M22 4v21" />
      <path d="M22 22h6" />
      <path d="M15 18h5" />
      <circle cx="9" cy="25" r="2.4" fill="currentColor" />
      <circle cx="17" cy="25" r="2.4" fill="currentColor" />
    </svg>
  );
}

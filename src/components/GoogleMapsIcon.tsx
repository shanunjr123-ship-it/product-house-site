/** Google Maps pin in Google's four colours, on a small white chip so it stays readable on coloured buttons. */
export default function GoogleMapsIcon({ size = 28 }: { size?: number }) {
  return (
    <span aria-hidden className="grid shrink-0 place-items-center rounded-full bg-white" style={{ width: size, height: size }}>
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24">
        <defs>
          <clipPath id="gm-pin">
            <path d="M12 1.5c-4.4 0-8 3.5-8 7.9 0 5.6 6.2 11.5 7.3 12.6.4.4 1 .4 1.4 0C13.8 20.9 20 15 20 9.4c0-4.4-3.6-7.9-8-7.9z" />
          </clipPath>
        </defs>
        <g clipPath="url(#gm-pin)">
          <rect x="0" y="0" width="12" height="9.4" fill="#4285F4" />
          <rect x="12" y="0" width="12" height="9.4" fill="#EA4335" />
          <rect x="12" y="9.4" width="12" height="16" fill="#FBBC04" />
          <rect x="0" y="9.4" width="12" height="16" fill="#34A853" />
        </g>
        <circle cx="12" cy="9.4" r="3.1" fill="#fff" />
      </svg>
    </span>
  );
}

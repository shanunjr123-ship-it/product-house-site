/** Instagram glyph in the app's own colours: rounded square with the yellow-to-purple gradient and a white camera outline. */
export default function InstagramIcon({ size = 24 }: { size?: number }) {
  return (
    <svg aria-hidden width={size} height={size} viewBox="0 0 24 24" className="shrink-0">
      <defs>
        <radialGradient id="ig-grad" cx="0.3" cy="1.07" r="1.1" fx="0.3" fy="1.07">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.05" stopColor="#fdf497" />
          <stop offset="0.45" stopColor="#fd5949" />
          <stop offset="0.6" stopColor="#d6249f" />
          <stop offset="0.9" stopColor="#285aeb" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.2" fill="url(#ig-grad)" />
      <rect x="5.1" y="5.1" width="13.8" height="13.8" rx="4.1" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.15" cy="7.85" r="1" fill="#fff" />
    </svg>
  );
}

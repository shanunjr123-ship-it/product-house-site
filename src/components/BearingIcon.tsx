/** Ball bearing: fixed rings, balls that orbit slowly. Used for the Bearings category. */
export default function BearingIcon({ size = 24 }: { size?: number }) {
  const balls = Array.from({ length: 7 }, (_, i) => {
    const a = (i / 7) * Math.PI * 2;
    return [12 + Math.cos(a) * 6.9, 12 + Math.sin(a) * 6.9] as const;
  });
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3.6" />
      <g className="bearing-balls" fill="currentColor" stroke="none">
        {balls.map(([x, y], i) => (
          <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r="1.55" />
        ))}
      </g>
    </svg>
  );
}

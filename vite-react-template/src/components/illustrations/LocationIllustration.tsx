function Pin({ x, y, primary = false }: { x: number; y: number; primary?: boolean }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {primary && <ellipse rx="30" ry="11" className="animate-ripple svg-center fill-highlight opacity-40" />}
      <ellipse rx="12" ry="4" className="fill-fg opacity-15" />
      <path
        d="M0 0 C-14 -18 -20 -26 -20 -36 a20 20 0 1 1 40 0 c0 10 -6 18 -20 36z"
        className={primary ? 'fill-highlight' : 'fill-primary'}
      />
      <circle cy="-36" r="8" className="fill-surface" />
    </g>
  )
}

/** Decorative map of the three EQISI offices. */
export function LocationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false" className={className}>
      <rect x="16" y="16" width="448" height="328" rx="24" className="fill-surface-muted stroke-border" strokeWidth="3" />

      {/* Roads */}
      <g className="stroke-surface" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M30 120 H450" />
        <path d="M30 250 H450" />
        <path d="M150 30 V330" />
        <path d="M330 30 V330" />
      </g>

      {/* Route between offices */}
      <path
        d="M330 100 L240 190 L150 300"
        fill="none"
        className="animate-belt stroke-primary"
        strokeWidth="3"
        strokeDasharray="12 12"
        strokeLinecap="round"
      />

      <Pin x={150} y={300} />
      <Pin x={240} y={190} />
      <Pin x={330} y={100} primary />
    </svg>
  )
}
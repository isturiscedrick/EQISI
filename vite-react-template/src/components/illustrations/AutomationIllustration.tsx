/** Decorative warehouse-automation scene. Colors come from the design tokens. */
export function AutomationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 360" aria-hidden="true" focusable="false" className={className}>
      <circle cx="240" cy="170" r="150" className="fill-surface-muted" />

      {/* Shelving rack */}
      <rect x="48" y="64" width="170" height="210" rx="10" className="fill-surface stroke-border" strokeWidth="3" />
      <line x1="48" y1="128" x2="218" y2="128" className="stroke-border" strokeWidth="3" />
      <line x1="48" y1="196" x2="218" y2="196" className="stroke-border" strokeWidth="3" />
      <rect x="64" y="96" width="40" height="32" rx="3" className="fill-primary" />
      <rect x="112" y="104" width="36" height="24" rx="3" className="fill-highlight" />
      <rect x="156" y="92" width="48" height="36" rx="3" className="fill-primary opacity-70" />
      <rect x="64" y="156" width="56" height="40" rx="3" className="fill-highlight" />
      <rect x="128" y="164" width="40" height="32" rx="3" className="fill-primary" />
      <rect x="176" y="148" width="30" height="48" rx="3" className="fill-primary opacity-70" />
      <rect x="64" y="232" width="48" height="42" rx="3" className="fill-primary" />
      <rect x="124" y="244" width="40" height="30" rx="3" className="fill-highlight" />
      <rect x="176" y="236" width="30" height="38" rx="3" className="fill-primary opacity-70" />

      {/* Gears */}
      <g className="animate-spin-slow svg-center">
        <circle cx="350" cy="110" r="38" fill="none" className="stroke-primary" strokeWidth="14" strokeDasharray="5.97 5.97" />
        <circle cx="350" cy="110" r="32" className="fill-primary" />
        <circle cx="350" cy="110" r="12" className="fill-surface" />
      </g>
      <g className="animate-spin-slow-reverse svg-center">
        <circle cx="414" cy="176" r="22" fill="none" className="stroke-highlight" strokeWidth="10" strokeDasharray="4.93 4.93" />
        <circle cx="414" cy="176" r="18" className="fill-highlight" />
        <circle cx="414" cy="176" r="7" className="fill-surface" />
      </g>

      {/* Floating parcels */}
      <g className="animate-float">
        <rect x="272" y="232" width="52" height="44" rx="4" className="fill-highlight" />
        <line x1="272" y1="248" x2="324" y2="248" className="stroke-surface" strokeWidth="3" />
      </g>
      <g className="animate-float" style={{ animationDelay: '-3s' }}>
        <rect x="352" y="240" width="40" height="34" rx="4" className="fill-primary" />
        <line x1="352" y1="253" x2="392" y2="253" className="stroke-surface" strokeWidth="3" />
      </g>

      {/* Conveyor belt */}
      <rect x="32" y="278" width="416" height="16" rx="8" className="fill-primary" />
      <line
        x1="46"
        y1="286"
        x2="434"
        y2="286"
        className="animate-belt stroke-primary-fg"
        strokeWidth="3"
        strokeDasharray="12 12"
        strokeLinecap="round"
      />
      <line x1="80" y1="294" x2="80" y2="332" className="stroke-border" strokeWidth="6" strokeLinecap="round" />
      <line x1="400" y1="294" x2="400" y2="332" className="stroke-border" strokeWidth="6" strokeLinecap="round" />
      <line x1="32" y1="334" x2="448" y2="334" className="stroke-border" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
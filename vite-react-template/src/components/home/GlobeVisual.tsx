import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/** Animated EQISI globe illustration for the homepage hero. */
export function GlobeVisual() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.globe-spin', { rotation: 360, transformOrigin: '50% 50%', duration: 42, repeat: -1, ease: 'none' })
      gsap.to('.globe-orbit', { rotation: -360, transformOrigin: '50% 50%', duration: 28, repeat: -1, ease: 'none' })
      gsap.to('.globe-pulse', { opacity: 0.35, scale: 1.45, transformOrigin: '50% 50%', duration: 2.2, repeat: -1, yoyo: true, stagger: 0.65, ease: 'sine.inOut' })
      gsap.fromTo('.globe-float', { y: 10, opacity: 0.65 }, { y: -9, opacity: 1, duration: 3.2, repeat: -1, yoyo: true, stagger: 0.45, ease: 'sine.inOut' })
      gsap.fromTo('.globe-core', { scale: 0.96 }, { scale: 1.025, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative mx-auto w-full max-w-5xl" aria-label="Animated globe representing EQISI's connected industrial operations">
      <div className="pointer-events-none absolute inset-x-[12%] top-[12%] h-[72%] rounded-full bg-primary/15 blur-3xl" />
      <svg viewBox="0 0 900 560" role="img" aria-labelledby="eqisi-globe-title" className="relative z-10 mx-auto block w-full overflow-visible">
        <title id="eqisi-globe-title">EQISI connected world globe</title>
        <defs>
          <radialGradient id="eqisi-globe-fill" cx="35%" cy="28%" r="72%">
            <stop offset="0%" stopColor="#f8fbff" />
            <stop offset="48%" stopColor="#a9c5e5" />
            <stop offset="100%" stopColor="#234c83" />
          </radialGradient>
          <linearGradient id="eqisi-globe-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset="100%" stopColor="#5c87bd" stopOpacity=".35" />
          </linearGradient>
          <clipPath id="eqisi-globe-clip"><circle cx="450" cy="278" r="190" /></clipPath>
          <filter id="eqisi-globe-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <ellipse cx="450" cy="486" rx="230" ry="23" fill="#163c6d" opacity=".13" filter="url(#eqisi-globe-shadow)" />
        <g className="globe-orbit" fill="none" stroke="#6e91c4" strokeWidth="1.4" opacity=".72">
          <ellipse cx="450" cy="278" rx="365" ry="104" transform="rotate(-13 450 278)" />
          <ellipse cx="450" cy="278" rx="315" ry="150" transform="rotate(24 450 278)" strokeDasharray="4 9" opacity=".65" />
        </g>

        <g className="globe-core">
          <circle cx="450" cy="278" r="194" fill="#193e6e" opacity=".18" />
          <circle cx="450" cy="278" r="190" fill="url(#eqisi-globe-fill)" stroke="url(#eqisi-globe-edge)" strokeWidth="3" />
          <g clipPath="url(#eqisi-globe-clip)">
            <g className="globe-spin">
              <g fill="none" stroke="#eaf4ff" strokeWidth="1.5" opacity=".52">
                <ellipse cx="450" cy="278" rx="62" ry="190" />
                <ellipse cx="450" cy="278" rx="125" ry="190" />
                <ellipse cx="450" cy="278" rx="178" ry="190" />
                <ellipse cx="450" cy="278" rx="190" ry="60" />
                <ellipse cx="450" cy="278" rx="190" ry="122" />
                <path d="M260 278H640M274 210H626M274 346H626" />
              </g>
              <g fill="#f2f7fc" opacity=".82" stroke="#6d93c1" strokeWidth="1.2">
                <path d="M332 142l26 9 17 23-7 20 21 12 4 20-22 13-11 30-25 5-17-25-29-9-5-27 20-16-5-25z" />
                <path d="M390 268l24 8 15 26-9 30 11 23-15 45-20 30-18-26 4-34-16-27 6-42z" />
                <path d="M464 145l33-13 40 11 19 25 36 5 22 28-18 20-35-7-14 21-28-5-15 23-24-12-18-35-25-13 5-26z" />
                <path d="M515 276l38-18 43 15 17 33-19 35-31 7-22 31-24-13-14-39z" />
                <path d="M595 388l22 8 9 19-20 11-22-12z" />
              </g>
              <g fill="none" stroke="#ffffff" strokeWidth="2" opacity=".35">
                <path d="M295 242q95-72 186-34t153 4M304 321q90 50 168 12t160 4" />
              </g>
            </g>
            <g fill="#fff">
              <circle cx="365" cy="220" r="4" />
              <circle cx="510" cy="190" r="4" />
              <circle cx="546" cy="330" r="4" />
              <circle cx="418" cy="370" r="3.5" />
            </g>
            <g fill="none" stroke="#fff" strokeWidth="1.5" opacity=".75">
              <path d="M365 220Q430 160 510 190T546 330Q480 390 418 370" strokeDasharray="3 7" />
            </g>
          </g>
          <circle cx="450" cy="278" r="190" fill="none" stroke="#fff" strokeWidth="2" opacity=".48" />
          <ellipse cx="392" cy="190" rx="80" ry="35" fill="#fff" opacity=".13" transform="rotate(-28 392 190)" />
        </g>

        <g className="globe-float">
          <circle cx="246" cy="260" r="7" fill="#f5a623" />
          <circle className="globe-pulse" cx="246" cy="260" r="14" fill="none" stroke="#f5a623" strokeWidth="2" />
          <path d="M246 260Q320 170 365 220" fill="none" stroke="#f5a623" strokeWidth="1.5" strokeDasharray="4 6" />
        </g>
        <g className="globe-float">
          <circle cx="660" cy="303" r="7" fill="#f5a623" />
          <circle className="globe-pulse" cx="660" cy="303" r="14" fill="none" stroke="#f5a623" strokeWidth="2" />
          <path d="M660 303Q602 375 546 330" fill="none" stroke="#f5a623" strokeWidth="1.5" strokeDasharray="4 6" />
        </g>
        <g className="globe-float">
          <rect x="86" y="180" width="148" height="62" rx="13" fill="#fff" stroke="#d9e2ef" />
          <circle cx="108" cy="202" r="6" fill="#f5a623" />
          <text x="124" y="206" fontSize="12" fontWeight="700" fill="#1e3554">CONNECTED</text>
          <text x="104" y="226" fontSize="10" fill="#64748b">People &amp; operations</text>
        </g>
        <g className="globe-float">
          <rect x="670" y="350" width="145" height="62" rx="13" fill="#fff" stroke="#d9e2ef" />
          <circle cx="692" cy="372" r="6" fill="#416da5" />
          <text x="708" y="376" fontSize="12" fontWeight="700" fill="#1e3554">INTEGRATED</text>
          <text x="688" y="396" fontSize="10" fill="#64748b">Supply chain systems</text>
        </g>
      </svg>
      <p className="relative z-10 -mt-3 text-center text-xs font-semibold tracking-[0.22em] text-fg-muted uppercase sm:text-sm">
        One connected world · One integrated partner
      </p>
    </div>
  )
}

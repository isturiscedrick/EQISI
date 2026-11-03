import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

/** Logo-inspired wireframe globe, animated with GSAP. */
export function GlobeVisual() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      gsap.to('.globe-spin', {
        rotation: 360,
        transformOrigin: '50% 50%',
        duration: 58,
        repeat: -1,
        ease: 'none',
      })
      gsap.to('.globe-orbit', {
        rotation: -360,
        transformOrigin: '50% 50%',
        duration: 36,
        repeat: -1,
        ease: 'none',
      })
      gsap.to('.globe-pulse', {
        opacity: 0.25,
        scale: 1.55,
        transformOrigin: '50% 50%',
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.7,
        ease: 'sine.inOut',
      })
      gsap.fromTo(
        '.globe-float',
        { y: 8, opacity: 0.72 },
        { y: -7, opacity: 1, duration: 3.6, repeat: -1, yoyo: true, stagger: 0.5, ease: 'sine.inOut' },
      )
      gsap.fromTo(
        '.globe-core',
        { scale: 0.985 },
        { scale: 1.015, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut' },
      )
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={root} className="relative mx-auto w-full max-w-5xl" aria-label="Animated EQISI wireframe globe">
      <div className="pointer-events-none absolute inset-x-[18%] top-[14%] h-[68%] rounded-full bg-primary/10 blur-3xl" />
      <svg
        viewBox="0 0 900 560"
        role="img"
        aria-labelledby="eqisi-globe-title"
        className="relative z-10 mx-auto block h-[clamp(330px,42vh,450px)] w-full max-w-[860px] overflow-visible"
      >
        <title id="eqisi-globe-title">EQISI logo-inspired blue wireframe globe</title>
        <defs>
          <radialGradient id="eqisi-wire-globe-glow" cx="38%" cy="34%" r="68%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity=".9" />
            <stop offset="72%" stopColor="#dbe8fb" stopOpacity=".25" />
            <stop offset="100%" stopColor="#9db8e8" stopOpacity=".06" />
          </radialGradient>
          <clipPath id="eqisi-wire-globe-clip">
            <circle cx="450" cy="278" r="184" />
          </clipPath>
          <filter id="eqisi-wire-globe-shadow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="17" />
          </filter>
        </defs>

        <ellipse cx="450" cy="484" rx="205" ry="20" fill="#1b326e" opacity=".10" filter="url(#eqisi-wire-globe-shadow)" />

        <g className="globe-orbit" fill="none" stroke="#7894cb" strokeWidth="1.4" opacity=".62">
          <ellipse cx="450" cy="278" rx="354" ry="104" transform="rotate(-13 450 278)" />
          <ellipse cx="450" cy="278" rx="310" ry="145" transform="rotate(23 450 278)" strokeDasharray="4 9" />
        </g>

        <g className="globe-core">
          <circle cx="450" cy="278" r="185" fill="url(#eqisi-wire-globe-glow)" />
          <circle cx="450" cy="278" r="184" fill="none" stroke="#1c3478" strokeWidth="4" opacity=".9" />
          <g clipPath="url(#eqisi-wire-globe-clip)">
            <g className="globe-spin" fill="none" stroke="#1b3479" strokeWidth="3" strokeLinecap="round" opacity=".88">
              {/* Meridians: curved longitude lines like the EQISI logo mark. */}
              <ellipse cx="450" cy="278" rx="54" ry="183" />
              <ellipse cx="450" cy="278" rx="105" ry="183" />
              <ellipse cx="450" cy="278" rx="151" ry="183" />
              <path d="M450 94 C370 132 338 204 338 278 C338 352 370 424 450 462" opacity=".8" />
              <path d="M450 94 C530 132 562 204 562 278 C562 352 530 424 450 462" opacity=".8" />

              {/* Curved latitude bands create the recognizable wireframe sphere. */}
              <path d="M274 205 C365 238 535 238 626 205" />
              <path d="M266 246 C365 267 535 267 634 246" />
              <path d="M266 310 C365 289 535 289 634 310" />
              <path d="M274 351 C365 318 535 318 626 351" />
              <path d="M296 160 C370 191 530 191 604 160" opacity=".7" />
              <path d="M296 396 C370 365 530 365 604 396" opacity=".7" />
              <path d="M267 278 H633" strokeWidth="2.5" opacity=".72" />
            </g>

            {/* Fine inner arcs add depth without filling the globe with a map. */}
            <g fill="none" stroke="#5575b6" strokeWidth="1.25" opacity=".52">
              <path d="M314 130 Q450 204 586 130" />
              <path d="M286 178 Q450 244 614 178" />
              <path d="M286 378 Q450 312 614 378" />
              <path d="M314 426 Q450 352 586 426" />
            </g>
          </g>
          <circle cx="450" cy="278" r="184" fill="none" stroke="#172d70" strokeWidth="2.5" opacity=".9" />
          <path d="M330 150 C370 116 410 100 450 96" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
        </g>

        <g className="globe-float">
          <circle cx="263" cy="260" r="6" fill="#f15a2a" />
          <circle className="globe-pulse" cx="263" cy="260" r="13" fill="none" stroke="#f15a2a" strokeWidth="2" />
          <path d="M263 260 Q330 182 365 220" fill="none" stroke="#f15a2a" strokeWidth="1.5" strokeDasharray="4 6" />
        </g>
        <g className="globe-float">
          <circle cx="637" cy="303" r="6" fill="#f15a2a" />
          <circle className="globe-pulse" cx="637" cy="303" r="13" fill="none" stroke="#f15a2a" strokeWidth="2" />
          <path d="M637 303 Q575 370 535 330" fill="none" stroke="#f15a2a" strokeWidth="1.5" strokeDasharray="4 6" />
        </g>

        <g className="globe-float">
          <rect x="86" y="180" width="148" height="62" rx="13" fill="#fff" stroke="#d9e2ef" />
          <circle cx="108" cy="202" r="6" fill="#f15a2a" />
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

import { useEffect, useRef } from 'react'
import alfariz from '@/assets/eqisi/team/team- blue and white/Alfariz — blue and white.png'
import cajigal from '@/assets/eqisi/team/team- blue and white/Cajigal — blue and white.png'
import flores from '@/assets/eqisi/team/team- blue and white/Flores — blue and white.png'
import joy from '@/assets/eqisi/team/team- blue and white/Joy — blue and white.png'
import malaca from '@/assets/eqisi/team/team- blue and white/Malaca — blue and white.png'
import manuel from '@/assets/eqisi/team/team- blue and white/Manuel — blue and white.png'
import trinidad from '@/assets/eqisi/team/team- blue and white/Trinidad — blue and white.png'
import tugas from '@/assets/eqisi/team/team- blue and white/Tugas — blue and white.png'

// Order = slot: 1 back/top, 2 outer side, 3 lower, 4 front (see hero CSS).
const leftTeam = [
  { name: 'Alfariz', image: alfariz },
  { name: 'Tugas', image: tugas },
  { name: 'Manuel', image: manuel },
  { name: 'Cajigal', image: cajigal },
]
const rightTeam = [
  { name: 'Flores', image: flores },
  { name: 'Trinidad', image: trinidad },
  { name: 'Malaca', image: malaca },
  { name: 'Joy', image: joy },
]


type Measure = { top: number; visibleHeight: number }

/** Finds the visible (non-transparent) area of a PNG: where it starts and how tall it is, as fractions of the image height. */
function measure(img: HTMLImageElement): Measure | null {
  const w = img.naturalWidth
  const h = img.naturalHeight
  if (!w || !h) return null

  const width = Math.min(w, 240)
  const height = Math.max(1, Math.round((h * width) / w))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return null

  ctx.drawImage(img, 0, 0, width, height)
  const { data } = ctx.getImageData(0, 0, width, height)

  let top = -1
  let bottom = -1
  for (let y = 0; y < height; y++) {
    let hit = false
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 40) {
        hit = true
        break
      }
    }
    if (hit) {
      if (top < 0) top = y
      bottom = y
    }
  }
  if (top < 0) return null

  return {
    top: top / height,
    // Include the PNG's aspect ratio: equal alpha-height percentages alone
    // do not produce equal on-screen portrait heights.
    visibleHeight: ((bottom - top + 1) / height) * (h / w),
  }
}

function PortraitGroup({ people, side }: { people: typeof leftTeam; side: 'left' | 'right' }) {
  return (
    <div className={`hero-team-group hero-team-group-${side}`}>
      {people.map((person, index) => (
        <figure className="hero-team-person" key={person.name} data-person={person.name} style={{ '--person-index': index } as React.CSSProperties}>
          <img src={person.image} alt="" loading="eager" />
        </figure>
      ))}
    </div>
  )
}

/** Matching portrait groups that frame the centered homepage message. */
export function TeamHeroVisual() {
  const frame = useRef<HTMLDivElement>(null)

  // PNGs have different canvas proportions and transparent padding. Measure the actual visible
  // subject height in each file, normalize all eight to one shared target, and align their heads.
  useEffect(() => {
    const root = frame.current
    if (!root) return
    let cancelled = false

    const figures = Array.from(root.querySelectorAll<HTMLElement>('.hero-team-person'))

    Promise.all(
      figures.map(async (figure) => {
        const img = figure.querySelector('img')
        if (!img) return null
        try {
          await img.decode()
        } catch {
          return null
        }
        const m = measure(img)
        return m ? { figure, m } : null
      }),
    ).then((results) => {
      if (cancelled) return

      const measured: Array<{ figure: HTMLElement; m: Measure }> = []
      for (const result of results) if (result) measured.push(result)
      if (!measured.length) return

      const heights = measured.map((item) => item.m.visibleHeight).sort((a, b) => a - b)
      const targetHeight = heights[Math.floor(heights.length / 2)] ?? 1

      for (const { figure, m } of measured) {
        const baseFit = targetHeight / m.visibleHeight
        // Alfariz gets a subtle 6% reduction while keeping the shared visible-height normalization.
        const personAdjustment = figure.dataset.person === 'Alfariz' ? 0.94 : 1
        const fit = baseFit * personAdjustment
        figure.style.setProperty('--fit', fit.toFixed(3))
        figure.style.setProperty('--lift', m.top.toFixed(3))
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="hero-team-frame" ref={frame}>
      <PortraitGroup people={leftTeam} side="left" />
      <PortraitGroup people={rightTeam} side="right" />
    </div>
  )
}
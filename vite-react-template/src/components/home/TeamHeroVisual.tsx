import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import alfariz from '@/assets/eqisi/team/team- blue and white/Alfariz — blue and white.png'
import cajigal from '@/assets/eqisi/team/team- blue and white/Cajigal — blue and white.png'
import flores from '@/assets/eqisi/team/team- blue and white/Flores — blue and white.png'
import joy from '@/assets/eqisi/team/team- blue and white/Joy — blue and white.png'
import malaca from '@/assets/eqisi/team/team- blue and white/Malaca — blue and white.png'
import manuel from '@/assets/eqisi/team/team- blue and white/Manuel — blue and white.png'
import trinidad from '@/assets/eqisi/team/team- blue and white/Trinidad — blue and white.png'
import tugas from '@/assets/eqisi/team/team- blue and white/Tugas — blue and white.png'

type Person = { name: string; fullName: string; role: string; image: string }

// Order = slot: 1 back/top, 2 outer side, 3 lower, 4 front (see hero CSS).
<<<<<<< HEAD
// `name` (surname) is the key used by the CSS in data-person. fullName and role match AboutPage's executiveTeam.
const leftTeam: Person[] = [
  { name: 'Alfariz', fullName: 'Gretchen Alfariz', role: 'Chief Finance Officer', image: alfariz },
  { name: 'Tugas', fullName: 'Gigy Josephine Tugas', role: 'Chief HR Officer', image: tugas },
  { name: 'Manuel', fullName: 'Jelle Jasmin Manuel', role: 'Chief Operating Officer', image: manuel },
  { name: 'Cajigal', fullName: 'Aniceto Apollo L. Cajigal Jr.', role: 'Chairman & CEO', image: cajigal },
]
const rightTeam: Person[] = [
  { name: 'Flores', fullName: 'Atty. Edgardo Flores Jr.', role: 'Chief Legal Officer', image: flores },
  { name: 'Trinidad', fullName: 'Annabel S. Trinidad', role: 'Chief IT Officer', image: trinidad },
  { name: 'Malaca', fullName: 'Rodulfo Mejes Malaca', role: 'General Manager', image: malaca },
  { name: 'Joy', fullName: 'Joy Catherine P. Lopez', role: 'President for Operations', image: joy },
=======
const leftTeam = [
  { name: 'Gretchen Alfariz', role: 'Chief Finance Officer', image: alfariz },
  { name: 'Gigy Josephine Tugas', role: 'Chief HR Officer', image: tugas },
  { name: 'Jelle Jasmin Manuel', role: 'Chief Operating Officer', image: manuel },
  { name: 'Aniceto Apollo L. Cajigal Jr.', role: 'Chairman & CEO', image: cajigal },
]
const rightTeam = [
  { name: 'Atty. Edgardo Flores Jr.', role: 'Chief Legal Officer', image: flores },
  { name: 'Annabel S. Trinidad', role: 'Chief IT Officer', image: trinidad },
  { name: 'Rodulfo Mejes Malaca', role: 'General Manager', image: malaca },
  { name: 'Joy Catherine P. Lopez', role: 'President for Operations', image: joy },
>>>>>>> feature/mobile-team-portrait-layout
]

// Half of the tooltip's max width (12rem), used to keep it inside the viewport.
const TIP_HALF_WIDTH = 96

type Tip = { name: string; fullName: string; role: string; x: number; y: number; visible: boolean }

type Measure = { top: number; bottom: number; visibleHeight: number }

/** Finds the visible (non-transparent) area of a PNG: where it starts and ends, and how tall it is, as fractions of the image height. */
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
    bottom: (bottom + 1) / height,
    // Include the PNG's aspect ratio: equal alpha-height percentages alone
    // do not produce equal on-screen portrait heights.
    visibleHeight: ((bottom - top + 1) / height) * (h / w),
  }
}

function PortraitGroup({
  people,
  side,
  activeName,
  onShow,
  onHide,
}: {
  people: Person[]
  side: 'left' | 'right'
  activeName: string | null
  onShow: (person: Person, figure: HTMLElement) => void
  onHide: () => void
}) {
  return (
    <div className={`hero-team-group hero-team-group-${side}`}>
      {people.map((person, index) => (
        <figure
          className="hero-team-person"
          key={person.name}
          data-person={person.name}
<<<<<<< HEAD
          data-active={activeName === person.name || undefined}
          onPointerEnter={(event) => onShow(person, event.currentTarget)}
          onPointerLeave={onHide}
=======
          tabIndex={0}
          aria-label={`${person.name}, ${person.role}`}
>>>>>>> feature/mobile-team-portrait-layout
          style={{ '--person-index': index } as React.CSSProperties}
        >
          <img src={person.image} alt="" loading="eager" />
          <figcaption className="hero-team-person-caption">
            <span className="hero-team-person-name">{person.name}</span>
            <span className="hero-team-person-role">{person.role}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/** Matching portrait groups that frame the centered homepage message. */
export function TeamHeroVisual() {
  const frame = useRef<HTMLDivElement>(null)
  const [tip, setTip] = useState<Tip | null>(null)

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
        // Enlarge the whole team by 10%; Alfariz retains his subtle 6% relative reduction.
        const personAdjustment = (figure.dataset.person === 'Alfariz' ? 0.94 : 1) * 1.22
        const fit = baseFit * personAdjustment
        figure.style.setProperty('--fit', fit.toFixed(3))
        figure.style.setProperty('--lift', m.top.toFixed(3))
        // Where the name tag sits: about 78% of the way down the visible subject, as a fraction of the image height.
        figure.dataset.labelY = (m.top + (m.bottom - m.top) * 0.78).toFixed(3)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  // The tooltip is position: fixed, so it is hidden as soon as the page scrolls.
  const visible = tip?.visible ?? false
  useEffect(() => {
    if (!visible) return
    const hide = () => setTip((current) => (current ? { ...current, visible: false } : current))
    window.addEventListener('scroll', hide, { passive: true })
    return () => window.removeEventListener('scroll', hide)
  }, [visible])

  function showTip(person: Person, figure: HTMLElement) {
    const img = figure.querySelector('img')
    if (!img) return
    // The bounding box of the transformed image maps linearly to image fractions, so labelY works directly.
    const rect = img.getBoundingClientRect()
    const labelY = Number(figure.dataset.labelY) || 0.8
    const x = Math.min(
      Math.max(rect.left + rect.width / 2, TIP_HALF_WIDTH + 8),
      window.innerWidth - TIP_HALF_WIDTH - 8,
    )
    const y = rect.top + rect.height * labelY
    setTip({ name: person.name, fullName: person.fullName, role: person.role, x, y, visible: true })
  }

  function hideTip() {
    setTip((current) => (current ? { ...current, visible: false } : current))
  }

  const activeName = tip?.visible ? tip.name : null

  return (
    <div className="hero-team-frame" ref={frame}>
      <PortraitGroup people={leftTeam} side="left" activeName={activeName} onShow={showTip} onHide={hideTip} />
      <PortraitGroup people={rightTeam} side="right" activeName={activeName} onShow={showTip} onHide={hideTip} />
      {tip &&
        createPortal(
          <div
            className="hero-team-tip"
            data-visible={tip.visible || undefined}
            aria-hidden="true"
            style={{ '--tip-x': `${tip.x}px`, '--tip-y': `${tip.y}px` } as React.CSSProperties}
          >
            <p className="hero-team-tip-name">{tip.fullName}</p>
            <p className="hero-team-tip-role">{tip.role}</p>
          </div>,
          document.body,
        )}
    </div>
  )
}
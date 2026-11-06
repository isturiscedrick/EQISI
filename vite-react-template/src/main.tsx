import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/router'
import '@/lib/gsap'
import '@/styles/index.css'

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

/** Distance to keep above a target: the same scroll-padding-top that index.css sets for the sticky header. */
function scrollOffset(): number {
  const value = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)
  return Number.isFinite(value) ? value : 80
}

/** Where the window must be scrolled for `target` to sit just below the header, measured right now. */
function destinationFor(target: HTMLElement): number {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const y = target.getBoundingClientRect().top + window.scrollY - scrollOffset()
  return Math.max(0, Math.min(y, max))
}

let cancelActiveScroll: (() => void) | null = null

/**
 * Scrolls to `target` and keeps chasing it. The page height changes while scrolling (lazy images, reveal
 * animations, ScrollTrigger refreshes), so the destination is re-measured on every frame instead of once.
 * After arriving it keeps correcting for a short settle period. Wheel, touch or keyboard input cancels it.
 */
function scrollToTarget(target: HTMLElement) {
  cancelActiveScroll?.()

  const start = window.scrollY
  const startTime = performance.now()
  const duration = Math.min(1400, Math.max(600, Math.abs(destinationFor(target) - start) * 0.6))
  const SETTLE_MS = 400

  let frame = 0
  let settleUntil = 0
  let done = false

  const jumpTo = (top: number) => window.scrollTo({ top, behavior: 'instant' })

  const cleanup = () => {
    done = true
    cancelAnimationFrame(frame)
    window.removeEventListener('wheel', cancel)
    window.removeEventListener('touchstart', cancel)
    window.removeEventListener('keydown', cancel)
    if (cancelActiveScroll === cancel) cancelActiveScroll = null
  }

  function cancel() {
    cleanup()
  }

  const step = (now: number) => {
    if (done) return
    const dest = destinationFor(target)
    const t = Math.min(1, (now - startTime) / duration)

    if (t < 1) {
      jumpTo(start + (dest - start) * easeInOutCubic(t))
      frame = requestAnimationFrame(step)
      return
    }

    if (Math.abs(window.scrollY - dest) > 1) jumpTo(dest)
    if (settleUntil === 0) settleUntil = now + SETTLE_MS

    if (now < settleUntil) {
      frame = requestAnimationFrame(step)
      return
    }

    cleanup()
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }

  cancelActiveScroll = cancel
  window.addEventListener('wheel', cancel, { passive: true })
  window.addEventListener('touchstart', cancel, { passive: true })
  window.addEventListener('keydown', cancel)
  frame = requestAnimationFrame(step)
}

// Same-page anchors (e.g. "Meet Our Team" -> #leadership) scroll smoothly without hijacking
// external links, modified clicks, or browser-history navigation.
function handleSmoothAnchorClick(event: MouseEvent) {
  if (
    REDUCED_MOTION ||
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) return

  const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]')
  if (!anchor) return

  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return

  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
  if (!target) return

  event.preventDefault()
  // Keep history.state as-is so React Router's own bookkeeping is not wiped.
  window.history.pushState(window.history.state, '', url.hash)
  scrollToTarget(target)
}

document.addEventListener('click', handleSmoothAnchorClick)

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root was not found in index.html')

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
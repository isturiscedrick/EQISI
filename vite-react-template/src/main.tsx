import { gsap, ScrollToPlugin } from '@/lib/gsap'

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const HEADER_OFFSET = 88

// Smoothly animate same-page anchor navigation without hijacking normal wheel,
// touch, keyboard, external-link, or browser-history scrolling.
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
  window.history.pushState(null, '', url.hash)

  gsap.to(window, {
    duration: 1.15,
    ease: 'power3.inOut',
    overwrite: 'auto',
    scrollTo: {
      y: target,
      offsetY: HEADER_OFFSET,
      autoKill: true,
    },
    onComplete: () => {
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    },
  })
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin)
  document.addEventListener('click', handleSmoothAnchorClick)
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from '@/app/router'
import '@/lib/gsap'
import '@/styles/index.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root was not found in index.html')

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { BackToTop } from '@/components/ui/BackToTop'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useMagneticButtons } from '@/lib/useMagneticButtons'
import { Footer } from './Footer'
import { SiteLoader } from './SiteLoader'
import { Header } from './Header'
import { NavigationProgress } from './NavigationProgress'

export function RootLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const lastPathname = useRef(pathname)

  useMagneticButtons()

  // GSAP provides a short, consistent transition whenever the route changes.
  useEffect(() => {
    const main = mainRef.current
    if (!main || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.fromTo(
        main,
        { autoAlpha: 0, y: 10 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: 'power2.out',
          clearProps: 'opacity,visibility,transform',
          // Triggers measured while main was offset by 10px are re-measured once it settles.
          onComplete: () => ScrollTrigger.refresh(),
        },
      )
    }, main)

    return () => context.revert()
  }, [pathname])

  // Lazy routes and lazy images change the page height after first paint, which would leave
  // every ScrollTrigger (parallax, progress bar, timelines) measuring a stale height.
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return

    let frame = 0
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    })
    observer.observe(document.body)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  // Keep keyboard focus aligned with the newly navigated page.
  useEffect(() => {
    if (lastPathname.current === pathname) return

    lastPathname.current = pathname
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 font-medium text-primary-fg focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <SiteLoader />
      <NavigationProgress />
      <Header />

      <main
        id="main"
        ref={mainRef}
        tabIndex={-1}
        className="flex-1 focus:outline-none"
      >
        <Outlet />
      </main>

      <Footer />
      <BackToTop />
      <ScrollRestoration />
    </div>
  )
}
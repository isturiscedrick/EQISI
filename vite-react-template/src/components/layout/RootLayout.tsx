import { useEffect, useRef } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { gsap } from 'gsap'
import { animate, stagger } from 'animejs'
import { BackToTop } from '@/components/ui/BackToTop'
import { Footer } from './Footer'
import { Header } from './Header'
import { NavigationProgress } from './NavigationProgress'

export function RootLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const lastPathname = useRef(pathname)

  // GSAP controls the page-level entrance animation.
  useEffect(() => {
    const main = mainRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!main || reduceMotion) return

    const context = gsap.context(() => {
      gsap.fromTo(
        main,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.42,
          ease: 'power2.out',
          clearProps: 'opacity,visibility,transform',
        },
      )
    }, main)

    return () => context.revert()
  }, [pathname])

  // Anime.js animates headings and non-lazy images without competing with GSAP.
  useEffect(() => {
    const main = mainRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!main || reduceMotion) return

    const headings = main.querySelectorAll('h1, h2')
    const images = main.querySelectorAll('img:not([loading="lazy"])')

    const headingAnimation =
      headings.length > 0
        ? animate(headings, {
            opacity: [0, 1],
            translateY: [14, 0],
            duration: 560,
            delay: stagger(65),
            ease: 'out(3)',
          })
        : null

    const imageAnimation =
      images.length > 0
        ? animate(images, {
            opacity: [0, 1],
            scale: [0.985, 1],
            duration: 720,
            delay: 100,
            ease: 'out(3)',
          })
        : null

    return () => {
      headingAnimation?.revert()
      imageAnimation?.revert()
    }
  }, [pathname])

  // Move keyboard focus to the new page after client-side navigation.
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

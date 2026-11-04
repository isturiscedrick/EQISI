import { ArrowRight, BriefcaseBusiness, Building2, Home, Mail, Menu, MessageCircle, UsersRound, X } from 'lucide-react'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { animate } from 'animejs'
import { Link, NavLink } from 'react-router'
import { buttonStyles } from '@/components/ui/button-styles'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'
import { gsap } from '@/lib/gsap'
import { Logo } from './Logo'

const navIcons = {
  '/': Home,
  '/about': Building2,
  '/services': BriefcaseBusiness,
  '/careers': UsersRound,
  '/contacts': Mail,
} as const

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Anime.js gives the mobile navigation a quick, lightweight entrance.
  useEffect(() => {
    const nav = navRef.current
    if (!open || !nav || window.matchMedia('(min-width: 768px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const menuAnimation = animate(nav, {
      opacity: [0, 1],
      translateX: [-24, 0],
      duration: 240,
      ease: 'out(3)',
    })

    return () => {
      menuAnimation.revert()
    }
  }, [open])

  // Escape closes the mobile menu and returns focus to its toggle.
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  // Shrinks the header after the first few pixels.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reading progress: a scrubbed tween across the whole document. ScrollTrigger re-measures the page
  // on resize and when RootLayout refreshes it. This is progress, not decoration, so it also runs
  // under reduced motion (it follows the scroll position exactly and has no easing).
  useLayoutEffect(() => {
    const bar = barRef.current
    if (!bar) return

    const context = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        },
      )
    }, bar)

    return () => context.revert()
  }, [])

  return (
    <>
      {open && <button type="button" aria-label="Close navigation menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] md:hidden" />}
      <header
        className={cn(
          'sticky top-0 z-40 border-b border-border backdrop-blur transition-all duration-200',
          scrolled ? 'bg-canvas/95 shadow-card' : 'bg-canvas/85',
        )}
      >
        <div
          className={cn(
            'mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 transition-all duration-200 sm:px-6 lg:px-8',
            scrolled ? 'h-14' : 'h-16',
          )}
        >
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="mr-2 inline-flex size-11 items-center justify-center rounded-md transition-colors hover:bg-surface-muted md:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>

          <Link to="/" viewTransition aria-label={`${siteConfig.name} home`} className="shrink-0 rounded-md">
            <Logo className={cn('transition-all duration-200', scrolled ? 'h-9' : 'h-11')} />
          </Link>

          <nav
            ref={navRef}
            id={menuId}
            aria-label="Main"
            className={cn(
              open ? 'flex' : 'hidden',
              'fixed inset-y-0 left-0 right-auto z-50 h-dvh w-[min(82vw,320px)] flex-col gap-2 overflow-y-auto border-r border-border bg-canvas px-5 pb-6 pt-5 shadow-elevated md:static md:z-auto md:h-auto md:w-auto md:overflow-visible md:border-0 md:p-1',
              'md:flex md:flex-row md:items-center md:gap-1 md:rounded-full md:border md:border-border/70 md:bg-surface-muted/75 md:px-2 md:py-1 md:shadow-none',
            )}
          >
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4 text-left md:hidden">
              <span className="text-xs font-bold tracking-[0.18em] text-fg-muted uppercase">Main menu</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex size-10 items-center justify-center rounded-full bg-surface-muted text-fg transition-colors hover:bg-border">
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            {siteConfig.nav.map((item) => {
              const Icon = navIcons[item.to as keyof typeof navIcons] ?? ArrowRight
              return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                viewTransition
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'relative inline-flex min-h-12 w-full items-center rounded-xl px-4 text-sm font-semibold transition-all duration-200 hover:translate-x-0.5 md:min-h-9 md:w-auto md:rounded-full',
                    'after:hidden',
                    isActive
                      ? 'bg-surface text-primary shadow-subtle'
                      : 'text-fg-muted hover:bg-surface hover:text-fg',
                  )
                }
              >
                <Icon aria-hidden="true" className="mr-2 size-4 shrink-0" />
                {item.label}
              </NavLink>
              )
            })}
            <Link to="/contacts" viewTransition onClick={() => setOpen(false)} className={cn(buttonStyles({ size: 'lg' }), 'mt-3 min-h-10 w-full justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold sm:text-sm md:hidden')}>
              <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
              <span>Request a Consultation</span>
              <ArrowRight aria-hidden="true" className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </nav>

          <Link to="/contacts" viewTransition className={cn(buttonStyles(), 'hidden shrink-0 lg:inline-flex')}>
            <MessageCircle aria-hidden="true" className="size-4" />
            Request a Consultation
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Reading progress */}
        <div
          ref={barRef}
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-highlight"
          style={{ transform: 'scaleX(0)' }}
        />
      </header>
    </>
  )
}
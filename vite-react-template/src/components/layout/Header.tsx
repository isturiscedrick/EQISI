import { ArrowRight, BriefcaseBusiness, Building2, ChevronDown, Home, Mail, Menu, MessageCircle, UsersRound, X } from 'lucide-react'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { animate, stagger } from 'animejs'
import { Link, NavLink, useLocation } from 'react-router'
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

interface SubItem {
  to: string
  label: string
}

/** Mobile-only section shortcuts. Every hash is a section id that exists on that page. */
const subNav: Record<string, SubItem[] | undefined> = {
  '/about': [
    { to: '/about#company-overview', label: 'Who we are' },
    { to: '/about#mission-vision', label: 'Mission & vision' },
    { to: '/about#leadership', label: 'Leadership' },
  ],
  '/services': [
    { to: '/services#capability-explorer', label: 'Capabilities' },
    { to: '/services#systems', label: 'Six systems' },
    { to: '/services#industries', label: 'Industries' },
    { to: '/services#clients', label: 'Clients' },
  ],
  '/careers': [
    { to: '/careers#benefits', label: 'Benefits' },
    { to: '/careers#recruitment-process', label: 'Recruitment process' },
    { to: '/careers#open-roles', label: 'Open roles' },
  ],
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const activePillRef = useRef<HTMLSpanElement>(null)
  const lastScrollY = useRef(0)

  const closeMenu = () => setOpen(false)

  // Anime.js gives the mobile navigation a quick, lightweight entrance.
  useEffect(() => {
    const nav = navRef.current
    if (!open || !nav || window.matchMedia('(min-width: 768px)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const menuAnimation = animate(nav, {
      opacity: [0, 1],
      translateX: [-48, 0],
      duration: 300,
      ease: 'out(3)',
    })
    const menuItems = animate(nav.querySelectorAll('a'), {
      opacity: [0, 1],
      translateX: [-10, 0],
      duration: 260,
      delay: stagger(38, { start: 45 }),
      ease: 'out(3)',
    })

    return () => {
      menuAnimation.revert()
      menuItems.revert()
    }
  }, [open])

  // Move focus into the sidebar when it opens, because the sidebar covers the header toggle.
  useEffect(() => {
    if (!open || window.matchMedia('(min-width: 768px)').matches) return
    closeRef.current?.focus({ preventScroll: true })
  }, [open])

  // Keep the page from scrolling behind the open mobile drawer.
  // html and body both need locking: index.css sets overflow-x: clip on html, so the browser
  // treats html as the viewport's scroller and ignores overflow on body alone.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previousRootOverflow = root.style.overflow
    const previousRootOverscroll = root.style.overscrollBehavior
    const previousBodyOverflow = document.body.style.overflow
    root.style.overflow = 'hidden'
    root.style.overscrollBehavior = 'none'
    document.body.style.overflow = 'hidden'

    // If the window is resized to desktop width while open, close the menu so the lock never sticks.
    const desktop = window.matchMedia('(min-width: 768px)')
    const onChange = (event: MediaQueryListEvent) => { if (event.matches) setOpen(false) }
    desktop.addEventListener('change', onChange)

    return () => {
      desktop.removeEventListener('change', onChange)
      root.style.overflow = previousRootOverflow
      root.style.overscrollBehavior = previousRootOverscroll
      document.body.style.overflow = previousBodyOverflow
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

  // Compact the header near the top; reveal it when scrolling upward.
  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY
      setScrolled(currentY > 8)
      const delta = currentY - lastScrollY.current
      if (open || currentY < 96) setHidden(false)
      else if (Math.abs(delta) > 5) setHidden(delta > 0 && currentY > 180)
      lastScrollY.current = currentY
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Keep the active-page capsule aligned with the current desktop link.
  useLayoutEffect(() => {
    const nav = navRef.current
    const pill = activePillRef.current
    if (!nav || !pill) return
    const update = () => {
      if (window.matchMedia('(max-width: 767px)').matches) {
        pill.style.opacity = '0'
        return
      }
      const active = nav.querySelector<HTMLElement>('[aria-current="page"]')
      if (!active) { pill.style.opacity = '0'; return }
      const navRect = nav.getBoundingClientRect()
      const rect = active.getBoundingClientRect()
      pill.style.width = `${rect.width}px`
      pill.style.height = `${rect.height}px`
      pill.style.transform = `translate(${rect.left - navRect.left}px, ${rect.top - navRect.top}px)`
      pill.style.opacity = '1'
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(nav)
    window.addEventListener('resize', update)
    return () => { observer.disconnect(); window.removeEventListener('resize', update) }
  }, [location.pathname])

  // Fine-pointer magnetic response stays subtle and is disabled for touch/reduced motion.
  function moveNavItem(event: React.PointerEvent<HTMLAnchorElement>) {
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left - rect.width / 2) * 0.10
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12
    gsap.to(event.currentTarget, { x, y, duration: 0.22, ease: 'power2.out', overwrite: true })
  }
  function resetNavItem(event: React.PointerEvent<HTMLAnchorElement>) {
    gsap.to(event.currentTarget, { x: 0, y: 0, duration: 0.42, ease: 'elastic.out(1, 0.55)', overwrite: true })
  }

  // Entrance motion for the brand, desktop links and consultation action.
  useLayoutEffect(() => {
    const header = headerRef.current
    if (!header || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const desktop = gsap.matchMedia()
      desktop.add('(min-width: 768px)', () => {
        const links = header.querySelectorAll<HTMLElement>('[data-nav-link]')
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
        timeline.fromTo(header.querySelector('[data-header-brand]'),
          { autoAlpha: 0, y: -10, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 },
        )
        timeline.fromTo(links,
          { autoAlpha: 0, y: -8 },
          { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.065, clearProps: 'all' },
          '-=0.28',
        )
        timeline.fromTo(header.querySelector('[data-header-cta]'),
          { autoAlpha: 0, x: 12, scale: 0.96 },
          { autoAlpha: 1, x: 0, scale: 1, duration: 0.42, clearProps: 'all' },
          '-=0.2',
        )
        return () => timeline.kill()
      })
      return () => desktop.revert()
    }, header)

    return () => context.revert()
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
    <header
      ref={headerRef}
      className={cn(
        // No backdrop-blur below md: a backdrop-filter makes the header the containing block for
        // `fixed` children, which would stop the mobile sidebar from anchoring to the viewport.
        'sticky top-0 z-40 border-b border-border transition-all duration-300 md:backdrop-blur',
        scrolled ? 'shadow-card max-md:bg-canvas md:bg-canvas/95' : 'max-md:bg-canvas md:bg-canvas/85',
        hidden && !open && 'header-smart-hidden',
      )}
    >
      {/* Scrim lives inside the header so it dims the header too, and sits below the sidebar (z-50). */}
      {open && (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close navigation menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] md:hidden"
        />
      )}

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
          onClick={() => {
            // Open with the current page's section list already expanded.
            if (!open) setExpanded(subNav[location.pathname] ? location.pathname : null)
            setOpen((value) => !value)
          }}
          className={cn('header-menu-toggle mr-2 inline-flex size-11 items-center justify-center rounded-md transition-colors hover:bg-surface-muted md:hidden', open && 'is-open')}
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>

        <Link data-header-brand to="/" viewTransition aria-label={`${siteConfig.name} home`} className="shrink-0 rounded-md">
          <Logo className={cn('header-brand-mark transition-all duration-200', scrolled ? 'h-9' : 'h-11')} />
        </Link>

        <nav
          ref={navRef}
          id={menuId}
          aria-label="Main"
          onPointerMove={(event) => {
            if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
            const rect = event.currentTarget.getBoundingClientRect()
            event.currentTarget.style.setProperty('--nav-glow-x', `${event.clientX - rect.left}px`)
            event.currentTarget.style.setProperty('--nav-glow-y', `${event.clientY - rect.top}px`)
          }}
          className={cn(
            'header-nav-motion mobile-nav-drawer',
            open ? 'flex' : 'hidden',
            'fixed inset-y-0 left-0 z-50 h-dvh w-[min(78vw,320px)] flex-col overflow-y-auto bg-canvas shadow-elevated',
            'md:static md:z-auto md:h-auto md:w-auto md:overflow-visible md:border-0 md:p-1',
            'md:flex md:flex-row md:items-center md:gap-1 md:rounded-full md:border md:border-border/70 md:bg-surface-muted/75 md:px-2 md:py-1 md:shadow-none',
          )}
        >
          <span ref={activePillRef} aria-hidden="true" className="nav-active-pill" />
          <div className="nav-pointer-glow" aria-hidden="true" />

          {/* Mobile sidebar header: centered logo plus a close button. */}
          <div className="mobile-nav-head md:hidden">
            <Link to="/" viewTransition onClick={closeMenu} aria-label={`${siteConfig.name} home`}>
              <Logo className="h-12" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={() => {
                setOpen(false)
                toggleRef.current?.focus()
              }}
              className="mobile-nav-close"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          {siteConfig.nav.map((item, index) => {
            const Icon = navIcons[item.to as keyof typeof navIcons] ?? ArrowRight
            const sub = subNav[item.to]
            const isExpanded = expanded === item.to
            const subId = `${menuId}-sub-${index}`
            // md:contents makes both wrappers disappear on desktop, so the pill nav layout is unchanged.
            return (
              <div key={item.to} className="mobile-nav-group md:contents">
                <div className="mobile-nav-row md:contents">
                  <NavLink
                    data-nav-link
                    to={item.to}
                    end={item.to === '/'}
                    viewTransition
                    onClick={closeMenu}
                    onPointerMove={moveNavItem}
                    onPointerLeave={resetNavItem}
                    className={({ isActive }) =>
                      cn(
                        'nav-item-link group/nav relative inline-flex min-h-12 items-center rounded-xl px-4 text-sm font-semibold transition-all duration-200 hover:translate-x-0.5 md:min-h-9 md:rounded-full',
                        isActive
                          ? 'bg-surface text-primary shadow-subtle after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-5 after:rounded-full after:bg-highlight md:after:bottom-0 md:after:left-1/2 md:after:w-5 md:after:-translate-x-1/2'
                          : 'text-fg-muted after:absolute after:bottom-1 after:left-4 after:h-0.5 after:w-0 after:rounded-full after:bg-highlight after:transition-all after:duration-300 hover:bg-surface hover:text-fg hover:after:w-5 md:after:bottom-0 md:after:left-1/2 md:after:-translate-x-1/2',
                      )
                    }
                  >
                    <Icon aria-hidden="true" className="nav-item-icon mr-2 size-4 shrink-0" />
                    <span className="nav-label" aria-label={item.label}>
                      {item.label.split('').map((character, charIndex) => (
                        <span key={`${item.to}-${charIndex}`} className="nav-label-char" aria-hidden="true" style={{ '--char-index': charIndex } as React.CSSProperties}>
                          {character === ' ' ? '\u00a0' : character}
                        </span>
                      ))}
                    </span>
                  </NavLink>

                  {sub && (
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      aria-controls={subId}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label} sections`}
                      onClick={() => setExpanded(isExpanded ? null : item.to)}
                      className="mobile-nav-expand md:hidden"
                    >
                      <ChevronDown aria-hidden="true" className="size-4" />
                    </button>
                  )}
                </div>

                {sub && (
                  <div id={subId} className="mobile-nav-sub md:hidden" data-open={isExpanded} inert={!isExpanded}>
                    <ul>
                      {sub.map((entry) => (
                        <li key={entry.to}>
                          <Link to={entry.to} onClick={closeMenu}>
                            {entry.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}

          <Link
            to="/contacts"
            viewTransition
            onClick={closeMenu}
            className={cn(buttonStyles({ size: 'lg' }), 'min-h-11 w-full justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold sm:text-sm md:hidden')}
          >
            <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
            <span>Request a Consultation</span>
            <ArrowRight aria-hidden="true" className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </nav>

        <Link
          data-header-cta
          to="/contacts"
          viewTransition
          aria-label="Request a Consultation"
          title="Request a Consultation"
          className={cn(
            buttonStyles({ size: 'md' }),
            'header-cta magnetic inline-flex size-10 min-h-10 shrink-0 items-center justify-center rounded-lg p-0 lg:h-11 lg:w-auto lg:gap-2 lg:rounded-md lg:px-4',
          )}
        >
          <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
          <span className="hidden whitespace-nowrap lg:inline">Request a Consultation</span>
          <ArrowRight aria-hidden="true" className="hidden size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 lg:inline" />
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
  )
}
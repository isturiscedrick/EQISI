import { ArrowRight, Clock, Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { buttonStyles } from '@/components/ui/button-styles'
import { siteConfig } from '@/config/site'
import * as c from '@/content/eqisi'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'

const topLink = 'inline-flex items-center gap-2 transition-colors hover:text-white'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

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

  // Shrinks the header after the first few pixels and drives the reading-progress bar.
  // The bar is updated through a ref so scrolling never re-renders the header.
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      {/* Utility bar: desktop only, scrolls away with the page. */}
      <div className="hidden bg-fg text-sm text-white/85 md:block">
        <div className="mx-auto flex h-10 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-4 text-highlight" />
            Mon &ndash; Fri, 8:00 AM &ndash; 5:00 PM (Philippine time)
          </p>
          <div className="flex items-center gap-6">
            <a href={c.contact.phone.href} className={topLink}>
              <Phone aria-hidden="true" className="size-4 text-highlight" />
              {c.contact.phone.label}
            </a>
            <a href={`mailto:${c.contact.email}`} className={cn(topLink, 'hidden lg:inline-flex')}>
              <Mail aria-hidden="true" className="size-4 text-highlight" />
              {c.contact.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 border-b border-border backdrop-blur transition-all duration-200',
          scrolled ? 'bg-canvas/95 shadow-card' : 'bg-canvas/90',
        )}
      >
        <div
          className={cn(
            'mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 transition-all duration-200 sm:px-6 lg:px-8',
            scrolled ? 'h-14' : 'h-16',
          )}
        >
          <Link to="/" aria-label={`${siteConfig.name} home`} className="shrink-0 rounded-md">
            <Logo className={cn('transition-all duration-200', scrolled ? 'h-9' : 'h-11')} />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-md transition-colors hover:bg-surface-muted md:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>

          <nav
            id={menuId}
            aria-label="Main"
            className={cn(
              open ? 'animate-menu-in flex' : 'hidden',
              'absolute inset-x-0 top-full flex-col gap-1 border-b border-border bg-canvas p-4 shadow-elevated',
              'md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none',
            )}
          >
            {siteConfig.nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'relative inline-flex min-h-11 items-center rounded-md px-3 font-medium transition-colors',
                    'after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:rounded-full after:bg-highlight after:transition-transform after:duration-200',
                    isActive
                      ? 'font-bold text-primary after:scale-x-100'
                      : 'text-fg-muted after:scale-x-0 hover:bg-surface-muted hover:text-fg hover:after:scale-x-100',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/contacts" onClick={() => setOpen(false)} className={cn(buttonStyles(), 'mt-2 md:hidden')}>
              Request a Consultation
              <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </nav>

          <Link to="/contacts" className={cn(buttonStyles(), 'hidden shrink-0 lg:inline-flex')}>
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
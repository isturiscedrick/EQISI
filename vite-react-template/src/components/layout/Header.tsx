import { Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)

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

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="rounded-md text-lg font-bold tracking-tight">
          {siteConfig.name}
        </Link>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-11 items-center justify-center rounded-md hover:bg-surface-muted md:hidden"
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>

        <nav
          id={menuId}
          aria-label="Main"
          className={cn(
            open ? 'flex' : 'hidden',
            'absolute inset-x-0 top-full flex-col gap-1 border-b border-border bg-canvas p-4',
            'md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0',
          )}
        >
          {siteConfig.nav.map((item) =>
            item.to.includes('#') ? (
              // In-page anchors use a plain Link: NavLink would mark every anchor active whenever the path is "/".
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center rounded-md px-3 font-medium text-fg-muted hover:bg-surface-muted hover:text-fg"
              >
                {item.label}
              </Link>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'inline-flex min-h-11 items-center rounded-md px-3 font-medium',
                    isActive
                      ? 'underline decoration-2 underline-offset-8'
                      : 'text-fg-muted hover:bg-surface-muted hover:text-fg',
                  )
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </div>
    </header>
  )
}

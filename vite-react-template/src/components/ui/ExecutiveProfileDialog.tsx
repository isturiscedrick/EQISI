import { useEffect } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router'

type ExecutiveProfile = { name: string; role: string; photo: string }

export function ExecutiveProfileDialog({ profile, onClose }: { profile: ExecutiveProfile | null; onClose: () => void }) {
  useEffect(() => {
    if (!profile) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [profile, onClose])

  if (!profile) return null

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-fg/55 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="executive-profile-title"
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface shadow-modal animate-page-in"
      >
        <button type="button" onClick={onClose} aria-label="Close executive profile" className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-border bg-surface text-fg transition-colors hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-primary">
          <X aria-hidden="true" className="size-5" />
        </button>
        <div className="grid sm:grid-cols-[0.8fr_1.2fr]">
          <div className="aspect-[4/5] overflow-hidden bg-surface-muted sm:aspect-auto">
            <img src={profile.photo} alt="" className="h-full w-full object-cover object-top" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <p className="text-xs font-extrabold tracking-[0.16em] text-warning uppercase">EQISI Leadership</p>
            <h2 id="executive-profile-title" className="mt-3 text-2xl font-bold leading-tight text-fg">{profile.name}</h2>
            <p className="mt-2 font-semibold text-primary">{profile.role}</p>
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">Connect with EQISI to learn more about our leadership, service capabilities, and how our team can support your business requirements.</p>
            <Link to="/contacts" onClick={onClose} className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
              Contact EQISI <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

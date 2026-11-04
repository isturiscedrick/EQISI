import { ChevronRight, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from '@/lib/gsap'
import { Link } from 'react-router'
import { siteConfig } from '@/config/site'
import * as c from '@/content/eqisi'
import { Container } from './Container'
import { Logo } from './Logo'

const year = new Date().getFullYear()

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-sm font-bold tracking-widest text-white uppercase">
      <span aria-hidden="true" className="h-1 w-6 rounded-full bg-highlight" />
      {children}
    </h2>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      viewTransition
      className="group inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-white hover:underline"
    >
      <ChevronRight
        aria-hidden="true"
        className="-ml-4 size-3.5 text-highlight opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-100"
      />
      {children}
    </Link>
  )
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const footer = footerRef.current
    if (!footer) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const groups = footer.querySelectorAll<HTMLElement>('[data-footer-reveal]')
      gsap.fromTo(groups, { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: footer, start: 'top 88%', once: true },
        clearProps: 'opacity,visibility,transform',
      })
    })
    return () => mm.revert()
  }, [])

  const hq = c.contact.offices.find((office) => office.name === 'Head Quarters') ?? c.contact.offices[0]

  return (
    <footer ref={footerRef} className="bg-fg text-white/80">
      <div aria-hidden="true" className="h-1 bg-linear-to-r from-primary via-highlight to-primary" />

      <Container data-footer-reveal className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">
        {/* Brand */}
        <div>
          <span className="inline-block rounded-lg bg-white p-2">
            <Logo className="h-12" />
          </span>
          <p className="mt-5 text-sm leading-relaxed">
            Excel Quality Integrated Solutions Inc. &mdash; {siteConfig.description}
          </p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white">
            <ShieldCheck aria-hidden="true" className="size-4 text-highlight" />
            DO-174 Compliant
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Footer">
          <FooterHeading>Explore</FooterHeading>
          <ul className="mt-5 space-y-3 pl-4 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.to}>
                <FooterLink to={item.to}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Systems */}
        <div>
          <FooterHeading>Our Systems</FooterHeading>
          <ul className="mt-5 space-y-3 pl-4 text-sm">
            {c.systems.map((system) => (
              <li key={system}>
                <FooterLink to="/services#systems">{system}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-highlight" />
              <a href={c.contact.phone.href} className="underline-offset-4 transition-colors hover:text-white hover:underline">
                {c.contact.phone.label}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-highlight" />
              <a
                href={`mailto:${c.contact.email}`}
                className="break-all underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {c.contact.email}
              </a>
            </li>
            {hq && (
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-highlight" />
                <span>
                  <span className="font-semibold text-white">{hq.name}</span>
                  <br />
                  {hq.address}
                </span>
              </li>
            )}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container data-footer-reveal className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            &copy; {year} {siteConfig.name} &mdash; Excel Quality Integrated Solutions Inc. All rights reserved.
          </p>
          <p>Warehousing, Manpower &amp; Supply Chain Automation</p>
        </Container>
      </div>
    </footer>
  )
}
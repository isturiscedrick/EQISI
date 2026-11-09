import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  Check,
  ChevronRight,
  ClipboardList,
  Clock,
  Cloud,
  LifeBuoy,
  Megaphone,
  MapPin,
  Receipt,
  ScanFace,
  Smartphone,
  Stethoscope,
  User,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { Reveal } from '@/components/ui/Reveal'
import { ScrollProgressTrack } from '@/components/ui/ScrollProgressTrack'
import { bannerButton, card, iconTile } from '@/components/ui/surface-styles'
import * as c from '@/content/eqisi'
import { cn } from '@/lib/cn'

const benefitIcons: Record<string, LucideIcon> = {
  'Easy payroll system': Wallet,
  'Account per employee': User,
  'Top-notch cloud servers': Cloud,
  'Top-notch GPS monitoring': MapPin,
  'High-resolution facial recognition': ScanFace,
  'Real-time payslips': Receipt,
  'Real-time announcements': Megaphone,
  'Real-time checking of schedules': CalendarClock,
  'Online attachments via mobile phones': Smartphone,
}

// Same order as c.benefitReasons and c.recruitment.
const reasonIcons: LucideIcon[] = [LifeBuoy, UserCheck, Clock]
const stageIcons: LucideIcon[] = [ClipboardList, Users, UserCheck, Stethoscope]


function CareersIllustration() {
  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden">
      <svg viewBox="0 0 640 420" role="img" aria-labelledby="careers-illustration-title" className="illustration-motion h-full w-full">
        <title id="careers-illustration-title">Illustration of employees connected to digital payroll, welfare and career support</title>
        <defs><linearGradient id="careers-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#4860AC" stopOpacity=".15"/><stop offset="1" stopColor="#F05424" stopOpacity=".12"/></linearGradient></defs>
        <rect x="12" y="12" width="616" height="396" rx="28" fill="url(#careers-bg)"/>
        <rect x="164" y="48" width="312" height="235" rx="20" fill="#fff" stroke="#4860AC" strokeOpacity=".3" strokeWidth="4"/>
        <rect x="164" y="48" width="312" height="46" rx="18" fill="#4860AC"/><path d="M164 76h312v18H164z" fill="#4860AC"/>
        <circle cx="190" cy="71" r="5" fill="#fff"/><circle cx="208" cy="71" r="5" fill="#fff" opacity=".65"/><circle cx="226" cy="71" r="5" fill="#fff" opacity=".4"/>
        <rect x="190" y="114" width="116" height="70" rx="11" fill="#4860AC" opacity=".1"/><rect x="320" y="114" width="130" height="70" rx="11" fill="#F05424" opacity=".12"/>
        <text x="205" y="138" fill="#4860AC" fontSize="11" fontWeight="700" letterSpacing="1">PAYROLL</text><text x="205" y="166" fill="#24365F" fontSize="22" fontWeight="800">On time</text>
        <text x="334" y="138" fill="#C64A25" fontSize="11" fontWeight="700" letterSpacing="1">WELFARE</text><text x="334" y="166" fill="#24365F" fontSize="20" fontWeight="800">Supported</text>
        <path d="M193 211h250" stroke="#4860AC" strokeOpacity=".16" strokeWidth="8" strokeLinecap="round"/><path d="M193 211h176" stroke="#4860AC" strokeWidth="8" strokeLinecap="round"/><path d="M193 236h210" stroke="#F05424" strokeOpacity=".65" strokeWidth="8" strokeLinecap="round"/>
        <g transform="translate(65 166)"><circle cx="43" cy="28" r="23" fill="#F4B38F"/><path d="M20 26c3-22 43-32 51-1-12-5-20-13-24-20-7 10-15 17-27 21z" fill="#24365F"/><path d="M7 117c2-40 16-61 36-61s34 21 36 61" fill="#4860AC"/><path d="M25 80h37" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round"/></g>
        <g transform="translate(472 166)"><circle cx="43" cy="28" r="23" fill="#D99570"/><path d="M20 25c4-25 42-32 50-1-12-3-22-10-28-18-5 10-12 16-22 19z" fill="#24365F"/><path d="M7 117c2-40 16-61 36-61s34 21 36 61" fill="#F05424"/><path d="M25 80h37" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round"/></g>
        <path d="M108 150c18-27 30-37 52-43m373 43c-18-26-31-37-56-43" fill="none" stroke="#F05424" strokeWidth="4" strokeDasharray="7 9" strokeLinecap="round"/>
        <rect x="253" y="315" width="134" height="34" rx="17" fill="#F05424"/><path d="m275 332 8 7 13-15" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/><text x="307" y="337" fill="#fff" fontSize="11" fontWeight="700" letterSpacing=".8">CONNECTED</text>
      </svg>
    </div>
  )
}

export function Component() {
  return (
    <>
      <PageMeta
        title="Careers & Talent Management"
        description="Explore career opportunities at EQISI, our employee benefits including real-time mobile pay, and our fast 15-day recruitment and talent deployment pipeline."
      />

      <PageHero
        id="careers-hero"
        eyebrow="People & Culture"
        title="Build Your Career with EQISI"
        description="Discover opportunities, employee support, and the path to joining our team."
        actions={
          <>
            <a href="#recruitment-process" className={buttonStyles({ size: 'lg' })}>
              Recruitment Timeline
            </a>
            <Link to="/contacts" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
              Apply / Hire Talent
            </Link>
          </>
        }
        visual={<CareersIllustration />}
      />

      {/* Employee Benefits & Tech */}
      <Section
        id="benefits"
        muted
        eyebrow="Employee Advantages"
        title="Digital-first welfare and benefits"
        lead="We believe a financially secure, informed workforce is a productive workforce. Our mobile-first platform guarantees full transparency."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.benefits.map((b, i) => {
            const Icon = benefitIcons[b] ?? Check
            return (
              <Reveal key={b} delay={(i % 3) * 100} className="h-full">
                <div className={cn(card, 'flex items-center gap-4')}>
                  <span className={iconTile}>
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <p className="font-semibold text-fg">{b}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.benefitReasons.map((reason, i) => {
            const Icon = reasonIcons[i] ?? Check
            return (
              <Reveal key={reason} delay={i * 100} className="h-full">
                <div className={cn(card, 'shadow-card')}>
                  <div className="flex items-center justify-between">
                    <span className={iconTile}>
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="text-xs font-bold tracking-widest text-warning uppercase">Impact 0{i + 1}</span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-fg-muted">{reason}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Recruitment Pipeline */}
      <Section
        id="recruitment-process"
        eyebrow="Talent Deployment"
        title="From new client to deployed team in 15 days"
        lead="Our standardized 4-stage talent management process ensures comprehensive screening, complete 201 compliance, and rapid workplace deployment."
      >
        <ScrollProgressTrack steps={c.recruitment.length}>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.recruitment.map((step, idx) => {
              const Icon = stageIcons[idx] ?? Check
              return (
                <li key={step.title} className="h-full">
                  <Reveal delay={idx * 100} className="relative h-full">
                    <div className={cn(card, 'border-t-4 border-t-primary')}>
                      <div className="flex items-center justify-between">
                        <span className={iconTile}>
                          <Icon aria-hidden="true" className="size-6" />
                        </span>
                        <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-bold text-fg">
                          {step.duration}
                        </span>
                      </div>
                      <span className="mt-4 block text-xs font-bold tracking-widest text-primary">STAGE 0{idx + 1}</span>
                      <h4 className="mt-1 text-lg font-bold text-fg">{step.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.text}</p>
                    </div>
                    {idx < c.recruitment.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 -right-4 z-10 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface text-primary shadow-subtle lg:grid"
                      >
                        <ChevronRight className="size-4" />
                      </span>
                    )}
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </ScrollProgressTrack>

        <Reveal className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-surface p-6 shadow-subtle sm:flex-row">
          <div>
            <h4 className="text-lg font-bold text-fg">Total deployment timeline: {c.recruitmentTimeline}</h4>
            <p className="text-sm text-fg-muted">
              From signed Manpower Request Form to fully badged, cleared personnel on your floor.
            </p>
          </div>
          <Link to="/contacts" className={buttonStyles()}>
            Request Manpower Deployment
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Section>

      {/* Positions Regularly Recruited */}
      <Section
        id="open-roles"
        muted
        eyebrow="Available Roles"
        title="Positions we recruit and manage"
        lead="Whether you are an experienced machine operator looking for your next role or an enterprise requiring licensed professionals, we have opportunities."
      >
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {c.workforce.map((role, i) => (
            <Reveal key={role} delay={(i % 5) * 60} className="h-full">
              <div className="group flex h-full flex-col items-center gap-2 rounded-lg border border-border bg-surface p-4 text-center shadow-subtle transition-all duration-200 hover:border-primary/50 hover:shadow-card motion-safe:hover:-translate-y-1">
                <Briefcase
                  aria-hidden="true"
                  className="size-5 text-fg-muted transition-colors duration-200 group-hover:text-primary"
                />
                <p className="text-sm font-semibold text-fg">{role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBanner
        title="Looking for employment or needing a workforce?"
        description="Send your resume, portfolio, or recruitment inquiry directly to our Human Resources Department."
      >
        <Link to="/contacts" className={bannerButton}>
          Submit Application / Inquiry
          <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </CtaBanner>
    </>
  )
}
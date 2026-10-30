import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'

const card = 'rounded-xl border border-border bg-surface p-6 shadow-subtle'

export function Component() {
  return (
    <>
      <PageMeta
        title="Careers & Talent Management"
        description="Explore career opportunities at EQISI, our employee benefits including real-time mobile pay, and our fast 15-day recruitment and talent deployment pipeline."
      />

      {/* Hero Section */}
      <section className="border-b border-border bg-canvas py-16 sm:py-24" aria-labelledby="careers-hero">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-bold tracking-wider text-warning uppercase">
              <span className="size-2 rounded-full bg-highlight" />
              People &amp; Culture
            </div>
            <h1 id="careers-hero" className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Real-Time Pay &amp; Benefits, From Any Phone
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              At EQISI, our people are the core of our business. We leverage modern cloud systems so our employees can view their schedules, access payslips, receive emergency assistance, and track statutory benefits right from their mobile devices.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#recruitment-process" className={buttonStyles({ size: 'lg' })}>
                Recruitment Timeline
              </a>
              <Link to="/contacts" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
                Apply / Hire Talent
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
            <img
              src={asset('benefits.webp')}
              alt="Workers on a production floor"
              width={900}
              height={507}
              className="w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Employee Benefits & Tech */}
      <Section
        id="benefits"
        muted
        eyebrow="Employee Advantages"
        title="Digital-first welfare and benefits"
        lead="We believe a financially secure, informed workforce is a productive workforce. Our mobile-first platform guarantees full transparency."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.benefits.map((b, i) => (
            <div key={b} className={cn(card, 'flex items-center gap-4')}>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-sm font-bold text-warning">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-semibold text-fg">{b}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.benefitReasons.map((reason, i) => (
            <div key={reason} className="rounded-xl border border-border bg-surface p-6 shadow-card">
              <span className="text-xs font-bold text-highlight uppercase">Impact 0{i + 1}</span>
              <p className="mt-3 text-base leading-relaxed text-fg-muted">{reason}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Recruitment Pipeline */}
      <Section
        id="recruitment-process"
        eyebrow="Talent Deployment"
        title="From new client to deployed team in 15 days"
        lead="Our standardized 4-stage talent management process ensures comprehensive screening, complete 201 compliance, and rapid workplace deployment."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.recruitment.map((step, idx) => (
            <div
              key={step.title}
              className="flex flex-col justify-between rounded-xl border border-t-4 border-border border-t-primary bg-surface p-6 shadow-subtle"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary">STAGE 0{idx + 1}</span>
                  <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-bold text-fg">
                    {step.duration}
                  </span>
                </div>
                <h4 className="mt-3 text-lg font-bold text-fg">{step.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold text-fg">Total deployment timeline: {c.recruitmentTimeline}</h4>
            <p className="text-sm text-fg-muted">From signed Manpower Request Form to fully badged, cleared personnel on your floor.</p>
          </div>
          <Link to="/contacts" className={buttonStyles()}>
            Request Manpower Deployment
          </Link>
        </div>
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
          {c.workforce.map((role) => (
            <div key={role} className="rounded-lg border border-border bg-surface p-4 text-center shadow-subtle">
              <p className="font-semibold text-fg text-sm">{role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Application CTA */}
      <section className="bg-primary py-16 text-primary-fg sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Looking for employment or needing a workforce?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-fg/90">
            Send your resume, portfolio, or recruitment inquiry directly to our Human Resources Department.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contacts"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-surface px-6 font-semibold text-fg shadow-elevated transition-colors hover:bg-surface-muted"
            >
              Submit Application / Inquiry
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

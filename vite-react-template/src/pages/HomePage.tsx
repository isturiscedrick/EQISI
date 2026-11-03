import { ArrowRight, CalendarDays, Cpu, Handshake, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { GlobeVisual } from '@/components/home/GlobeVisual'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { Reveal } from '@/components/ui/Reveal'
import { bannerButton, card, iconTile } from '@/components/ui/surface-styles'
import { siteConfig } from '@/config/site'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'
import { systemIcon } from '@/lib/icons'

const stats = [
  { value: '1986', label: 'Industry Heritage (JRS Group)', icon: CalendarDays, tone: 'border-primary' },
  { value: 'DO-174', label: 'Full DOLE Compliance', icon: ShieldCheck, tone: 'border-highlight' },
  { value: '6', label: 'Core Management Systems', icon: Cpu, tone: 'border-primary' },
  { value: '26+', label: 'Multinational & Local Clients', icon: Handshake, tone: 'border-highlight' },
]

export function Component() {
  return (
    <>
      <PageMeta title={siteConfig.name} description={siteConfig.description} />

      <PageHero
        id="home-hero"
        large
        centered
        eyebrow="Integrated Industrial &amp; Workforce Solutions"
        title="We deliver with automation."
        description="Smarter warehousing, manpower, logistics and facility solutions—connected by technology, powered by people, and built around your operations."
        actions={
          <>
            <Link to="/services" className={buttonStyles({ size: 'lg' })}>
              Explore our solutions
              <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link to="/contacts" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
              Talk to our team
            </Link>
          </>
        }
        visual={<GlobeVisual />}
      />

      {/* Key stats: a card that overlaps the hero */}
      <section className="relative z-10 py-12 sm:py-16" aria-label="Key Highlights">
        <Container>
          <div className="grid grid-cols-2 gap-6 rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className={cn('border-l-4 pl-4', s.tone)}>
                <s.icon aria-hidden="true" className="mb-2 size-5 text-fg-muted" />
                <p className="text-3xl font-extrabold text-primary sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm font-medium text-fg-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border/70 bg-surface py-8" aria-label="Selected clients">
        <Container>
          <p className="mb-6 text-center text-xs font-bold tracking-[0.18em] text-fg-muted uppercase">Trusted by teams across industries</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 sm:gap-x-12">
            {c.clients.slice(0, 8).map((client) => (
              <img
                key={client.name}
                src={asset(client.logo)}
                alt={client.name}
                title={client.name}
                loading="lazy"
                className={cn('h-7 max-w-24 object-contain grayscale opacity-65 transition-all duration-300 hover:grayscale-0 hover:opacity-100 sm:h-8', client.padded && 'p-1')}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Services Teaser */}
      <Section
        id="systems-preview"
        muted
        eyebrow="Core Competencies"
        title="Six systems that run your workforce and supply chain"
        lead="Our integrated software platforms streamline daily operations, minimize human error, and provide real-time management visibility."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.systems.map((system, i) => {
            const Icon = systemIcon(system)
            return (
              <Reveal key={system} delay={(i % 3) * 100} className="h-full">
                <div className={card}>
                  <div className="flex items-center justify-between">
                    <span className={iconTile}>
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="text-sm font-bold tracking-widest text-warning">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-fg">{system}</h3>
                </div>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="mt-8 flex justify-center sm:justify-start">
          <Link to="/services" className={buttonStyles({ variant: 'secondary' })}>
            Explore All Services &amp; Capabilities
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Section>

      {/* About Teaser */}
      <section className="border-b border-border bg-canvas py-16 sm:py-20" aria-labelledby="home-about-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="flex items-center gap-3 text-sm font-bold tracking-widest text-warning uppercase">
              <span aria-hidden="true" className="h-1 w-8 rounded-full bg-highlight" />
              About EQISI
            </p>
            <h2 id="home-about-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Innovative services for manufacturers and warehouses
            </h2>
            {c.about.map((p) => (
              <p key={p} className="mt-4 text-base leading-relaxed text-fg-muted">
                {p}
              </p>
            ))}
            <div className="mt-8">
              <Link to="/about" className={buttonStyles()}>
                Learn More About Our Heritage &amp; Team
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="overflow-hidden rounded-2xl border border-border shadow-card">
            <img
              src={asset('industry.webp')}
              alt="Industrial plant with steel structures"
              width={900}
              height={1012}
              loading="lazy"
              className="max-h-104 w-full object-cover transition-transform duration-500 motion-safe:hover:scale-105"
            />
          </Reveal>
        </Container>
      </section>

      {/* Careers & Benefits Teaser */}
      <section className="border-b border-border bg-surface-muted py-16 sm:py-20" aria-labelledby="home-careers-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-2xl border border-border shadow-card">
            <img
              src={asset('benefits.webp')}
              alt="Workers on a production floor"
              width={900}
              height={507}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 motion-safe:hover:scale-105"
            />
          </Reveal>
          <Reveal delay={150}>
            <p className="flex items-center gap-3 text-sm font-bold tracking-widest text-warning uppercase">
              <span aria-hidden="true" className="h-1 w-8 rounded-full bg-highlight" />
              Careers &amp; Welfare
            </p>
            <h2 id="home-careers-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Real-time pay, welfare and fast recruitment
            </h2>
            <p className="mt-4 text-base leading-relaxed text-fg-muted">
              We empower our workforce with automated mobile-accessible payroll, emergency financial support, and real-time payslips. For clients, our streamlined 15-day deployment pipeline ensures qualified talent is ready without delay.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/careers" className={buttonStyles()}>
                View Careers &amp; Benefits
              </Link>
              <Link to="/contacts" className={buttonStyles({ variant: 'secondary' })}>
                Deploy a Team
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner
        title="Ready to upgrade your supply chain & workforce?"
        description="Get in touch with President Rodulfo Mejes Malaca and our leadership team to discuss how EQISI can optimize your operations."
      >
        <Link to="/contacts" className={bannerButton}>
          Contact Our Team
          <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </CtaBanner>
    </>
  )
}
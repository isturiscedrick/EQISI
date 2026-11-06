import { ArrowRight, CalendarDays, Cpu, Handshake, ShieldCheck, UsersRound } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { TeamHeroVisual } from '@/components/home/TeamHeroVisual'
import { GlobeVisual } from '@/components/home/GlobeVisual'
import { LogoMarquee } from '@/components/home/LogoMarquee'
import { ScrollStory } from '@/components/ui/ScrollStory'
import { ServiceExplorer } from '@/components/ui/ServiceExplorer'
import { SystemsScroll } from '@/components/home/SystemsScroll'
import { CompanyShowcase } from '@/components/home/CompanyShowcase'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { CountUp } from '@/components/ui/CountUp'
import { Reveal } from '@/components/ui/Reveal'
import { bannerButton } from '@/components/ui/surface-styles'
import { siteConfig } from '@/config/site'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'

// `from` is the number the count-up starts at. "DO-174" is a regulation name, not a quantity, so it has none.
const stats = [
  { value: '1986', from: 1900, label: 'Industry Heritage (JRS Group)', icon: CalendarDays, tone: 'border-primary' },
  { value: 'DO-174', from: undefined, label: 'Full DOLE Compliance', icon: ShieldCheck, tone: 'border-highlight' },
  { value: '6', from: 0, label: 'Core Management Systems', icon: Cpu, tone: 'border-primary' },
  { value: '26+', from: 0, label: 'Multinational & Local Clients', icon: Handshake, tone: 'border-highlight' },
]

export function Component() {
  return (
    <>
      <PageMeta title={siteConfig.name} description={siteConfig.description} />

      <PageHero
        id="home-hero"
        className="home-showcase-hero"
        large
        centered
        eyebrow="Integrated Industrial & Workforce Solutions"
        title={<>We deliver with<br className="hidden sm:block" /> automation.</>}
        description="Connected operations. Powered by people and technology."
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
        sideVisual={<TeamHeroVisual />}
        visual={<GlobeVisual />}
      />

      {/* Key stats: a card that overlaps the hero */}
      <section className="home-showcase-stats relative z-10 border-b border-border/70 bg-surface-muted/55 py-8 sm:py-10" aria-label="Key Highlights">
        <Container>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2.5 rounded-2xl border border-border/80 bg-surface p-3 shadow-[0_10px_30px_-18px_rgba(30,53,84,0.35)] sm:gap-3 sm:rounded-3xl sm:p-4 md:grid-cols-4 md:p-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className={cn('min-w-0 rounded-xl border border-border/70 bg-canvas/80 p-3 shadow-[0_3px_12px_-9px_rgba(30,53,84,0.28)] sm:rounded-xl sm:p-3.5', s.tone)}>
                <s.icon aria-hidden="true" className="mb-2 size-4 text-primary sm:size-5" />
                <CountUp
                  value={s.value}
                  from={s.from}
                  className="block text-[1.55rem] font-extrabold tabular-nums leading-none text-primary sm:text-4xl"
                />
                <span aria-hidden="true" className="stat-accent" />
                <p className="mt-2 text-[11px] font-medium leading-snug text-fg-muted sm:text-sm">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-showcase-clients border-b border-border/70 bg-surface py-7 sm:py-8" aria-label="Selected clients">
        <Container>
          <p className="mb-6 text-center text-xs font-bold tracking-[0.18em] text-fg-muted uppercase">Trusted by teams across industries</p>
          <LogoMarquee />
        </Container>
      </section>

      <CompanyShowcase />

      <ScrollStory
        eyebrow="Connected Operations"
        title="People, processes and technology working as one"
        description="EQISI brings workforce services and operational systems together, helping teams coordinate day-to-day work with clearer visibility."
        steps={[
          { title: 'Organize the workforce', description: 'Coordinate people, schedules and employee information through connected workforce management practices.' },
          { title: 'Connect operational systems', description: 'Bring payroll, human resources, warehouse, inventory, benefits and GPS management into one integrated service model.' },
          { title: 'Support informed decisions', description: 'Give operations teams clearer information to manage service delivery, workforce needs and supply-chain activity.' },
        ]}
        visual={
          <div className="grid gap-3">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><UsersRound aria-hidden="true" className="size-5" /></span>
                <div><p className="text-xs font-bold tracking-wider text-fg-muted uppercase">Workforce</p><p className="font-bold text-fg">People &amp; schedules</p></div>
                <span className="ml-auto size-2 rounded-full bg-highlight" />
              </div>
            </div>
            <div className="ml-7 rounded-2xl border border-border bg-surface p-5 shadow-card sm:ml-12">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-highlight/15 text-accent"><Cpu aria-hidden="true" className="size-5" /></span>
                <div><p className="text-xs font-bold tracking-wider text-fg-muted uppercase">Systems</p><p className="font-bold text-fg">Connected operations</p></div>
                <span className="ml-auto size-2 rounded-full bg-highlight" />
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><ShieldCheck aria-hidden="true" className="size-5" /></span>
                <div><p className="text-xs font-bold tracking-wider text-fg-muted uppercase">Management</p><p className="font-bold text-fg">Clearer visibility</p></div>
                <span className="ml-auto size-2 rounded-full bg-highlight" />
              </div>
            </div>
            <p className="pt-2 text-center text-[10px] font-bold tracking-[0.2em] text-fg-muted uppercase">Integrated service ecosystem</p>
          </div>
        }
      />

      <Section id="service-explorer" eyebrow="Find the right support" title="Explore how EQISI can support your operation" lead="Select a capability to see how people, facilities, logistics and technology work together.">
        <ServiceExplorer />
      </Section>

      {/* Core Competencies: pinned horizontal scroll scene on desktop */}
      <Section
        id="systems-preview"
        muted
        overflowVisible
        eyebrow="Core Competencies"
        title="Six systems that run your workforce and supply chain"
        lead="Scroll to explore each system. Open any card for more details."
      >
        <SystemsScroll />
      </Section>

      {/* About Teaser */}
      <section className="border-b border-border bg-canvas py-12 sm:py-16" aria-labelledby="home-about-heading">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <p className="flex items-center gap-3 text-sm font-bold tracking-widest text-warning uppercase">
              <span aria-hidden="true" className="h-1 w-8 rounded-full bg-highlight" />
              About EQISI
            </p>
            <h2 id="home-about-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Innovative services for manufacturers and warehouses
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">Integrated workforce, warehousing and operational support backed by decades of industry experience.</p>
            <div className="mt-8">
              <Link to="/about" className={buttonStyles()}>
                View our story
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150} className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-card sm:aspect-[5/4]">
            <img
              src={asset('industry.webp')}
              alt="Industrial plant with steel structures"
              width={900}
              height={1012}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-500 motion-safe:hover:scale-[1.03]"
            />
          </Reveal>
        </Container>
      </section>

      {/* Careers & Benefits Teaser */}
      <section className="border-b border-border bg-surface-muted py-12 sm:py-16" aria-labelledby="home-careers-heading">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-card">
            <img
              src={asset('benefits.webp')}
              alt="Workers on a production floor"
              width={900}
              height={507}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-500 motion-safe:hover:scale-[1.03]"
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
              Workforce support, accessible payroll tools and a streamlined recruitment process.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/careers" className={buttonStyles()}>
                Explore careers
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
        description="Let’s find the right support for your operation."
      >
        <Link to="/contacts" className={bannerButton}>
          Contact Our Team
          <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </CtaBanner>
    </>
  )
}
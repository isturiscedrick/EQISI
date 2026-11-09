import { ArrowRight, CalendarDays, Cpu, Handshake, ShieldCheck, UsersRound } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { TeamHeroVisual } from '@/components/home/TeamHeroVisual'
import { GlobeVisual } from '@/components/home/GlobeVisual'
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
import { cn } from '@/lib/cn'

// `from` is the number the count-up starts at. "DO-174" is a regulation name, not a quantity, so it has none.
const stats = [
  { value: '1986', from: 1900, label: 'Industry Heritage (JRS Group)', icon: CalendarDays, tone: 'border-primary' },
  { value: 'DO-174', from: undefined, label: 'Full DOLE Compliance', icon: ShieldCheck, tone: 'border-highlight' },
  { value: '6', from: 0, label: 'Core Management Systems', icon: Cpu, tone: 'border-primary' },
  { value: '26+', from: 0, label: 'Multinational & Local Clients', icon: Handshake, tone: 'border-highlight' },
]

function WarehouseIllustration() {
  return (
    <div className="home-feature-illustration flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-muted p-3 shadow-card sm:aspect-[5/4] sm:p-5">
      <svg viewBox="0 0 640 500" role="img" aria-labelledby="warehouse-illustration-title" className="h-full w-full">
        <title id="warehouse-illustration-title">Illustration of a modern warehouse with organized inventory and logistics equipment</title>
        <defs>
          <linearGradient id="warehouse-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4860AC" stopOpacity=".13" />
            <stop offset="1" stopColor="#F05424" stopOpacity=".08" />
          </linearGradient>
          <linearGradient id="warehouse-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4860AC" stopOpacity=".13" />
            <stop offset="1" stopColor="#4860AC" stopOpacity=".02" />
          </linearGradient>
        </defs>
        <rect x="18" y="18" width="604" height="464" rx="30" fill="url(#warehouse-bg)" />
        <circle cx="515" cy="94" r="43" fill="#F05424" opacity=".12" />
        <circle cx="103" cy="365" r="58" fill="#4860AC" opacity=".08" />
        <path d="M76 184 320 66l244 118v225H76z" fill="#fff" fillOpacity=".8" stroke="#4860AC" strokeOpacity=".35" strokeWidth="5" strokeLinejoin="round" />
        <path d="M76 184 320 66l244 118" fill="none" stroke="#4860AC" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M112 196v194M528 196v194M320 103v287" stroke="#4860AC" strokeOpacity=".24" strokeWidth="5" />
        <path d="M95 390h450l44 39H51z" fill="url(#warehouse-floor)" />
        <g stroke="#4860AC" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M130 219v150M245 219v150M130 254h115M130 310h115" />
          <path d="M394 219v150M509 219v150M394 254h115M394 310h115" />
        </g>
        <g>
          <rect x="143" y="224" width="88" height="25" rx="5" fill="#F05424" />
          <rect x="143" y="261" width="88" height="42" rx="5" fill="#4860AC" opacity=".88" />
          <rect x="143" y="318" width="88" height="43" rx="5" fill="#F05424" opacity=".8" />
          <rect x="407" y="224" width="88" height="25" rx="5" fill="#4860AC" opacity=".8" />
          <rect x="407" y="261" width="88" height="42" rx="5" fill="#F05424" />
          <rect x="407" y="318" width="88" height="43" rx="5" fill="#4860AC" opacity=".88" />
          <path d="M156 236h61M156 280h61M156 338h61M420 236h61M420 280h61M420 338h61" stroke="#fff" strokeOpacity=".55" strokeWidth="3" />
        </g>
        <g transform="translate(248 290)">
          <rect x="0" y="40" width="126" height="58" rx="13" fill="#F05424" />
          <path d="M20 40 38 8h45l24 32" fill="#F8B28F" stroke="#F05424" strokeWidth="5" strokeLinejoin="round" />
          <rect x="44" y="16" width="35" height="24" rx="5" fill="#fff" fillOpacity=".8" />
          <circle cx="29" cy="101" r="15" fill="#24365F" />
          <circle cx="99" cy="101" r="15" fill="#24365F" />
          <path d="M118 48h20v-8M138 40v58" stroke="#24365F" strokeWidth="7" strokeLinecap="round" />
          <rect x="-18" y="8" width="43" height="32" rx="4" fill="#4860AC" />
          <path d="M-10 18h27M-10 27h27" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g fill="#4860AC">
          <rect x="91" y="126" width="70" height="10" rx="5" opacity=".35" />
          <rect x="479" y="143" width="64" height="10" rx="5" opacity=".35" />
        </g>
        <path d="M278 428h84" stroke="#F05424" strokeWidth="8" strokeLinecap="round" />
        <circle cx="320" cy="428" r="7" fill="#F05424" />
      </svg>
    </div>
  )
}

function WorkforceIllustration() {
  return (
    <div className="home-feature-illustration flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-canvas p-3 shadow-card sm:p-5">
      <svg viewBox="0 0 640 400" role="img" aria-labelledby="workforce-illustration-title" className="h-full w-full">
        <title id="workforce-illustration-title">Illustration of a connected workforce, payroll dashboard and employee support</title>
        <defs>
          <linearGradient id="workforce-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#4860AC" stopOpacity=".15" />
            <stop offset="1" stopColor="#F05424" stopOpacity=".1" />
          </linearGradient>
        </defs>
        <rect x="15" y="15" width="610" height="370" rx="28" fill="url(#workforce-panel)" />
        <circle cx="532" cy="87" r="38" fill="#F05424" opacity=".12" />
        <circle cx="91" cy="308" r="45" fill="#4860AC" opacity=".08" />
        <rect x="165" y="58" width="322" height="238" rx="20" fill="#fff" stroke="#4860AC" strokeOpacity=".24" strokeWidth="4" />
        <rect x="165" y="58" width="322" height="48" rx="18" fill="#4860AC" />
        <path d="M165 88h322v18H165z" fill="#4860AC" />
        <circle cx="191" cy="82" r="5" fill="#fff" opacity=".9" />
        <circle cx="210" cy="82" r="5" fill="#fff" opacity=".6" />
        <circle cx="229" cy="82" r="5" fill="#fff" opacity=".35" />
        <rect x="191" y="126" width="118" height="69" rx="11" fill="#4860AC" opacity=".1" />
        <rect x="324" y="126" width="137" height="69" rx="11" fill="#F05424" opacity=".11" />
        <text x="207" y="151" fill="#4860AC" fontSize="11" fontWeight="700" letterSpacing="1">PAYROLL</text>
        <text x="207" y="178" fill="#24365F" fontSize="23" fontWeight="800">On time</text>
        <text x="340" y="151" fill="#C64A25" fontSize="11" fontWeight="700" letterSpacing="1">WELFARE</text>
        <text x="340" y="178" fill="#24365F" fontSize="23" fontWeight="800">Supported</text>
        <path d="M194 222h260" stroke="#4860AC" strokeOpacity=".15" strokeWidth="8" strokeLinecap="round" />
        <path d="M194 222h183" stroke="#4860AC" strokeWidth="8" strokeLinecap="round" />
        <path d="M194 246h218" stroke="#F05424" strokeOpacity=".6" strokeWidth="8" strokeLinecap="round" />
        <rect x="248" y="274" width="156" height="12" rx="6" fill="#24365F" opacity=".16" />
        <g transform="translate(63 173)">
          <circle cx="45" cy="30" r="24" fill="#F4B38F" />
          <path d="M21 28c2-22 45-35 52-1-11-6-19-15-23-21-8 11-16 18-29 22z" fill="#24365F" />
          <path d="M8 115c2-40 16-61 37-61s35 21 37 61" fill="#4860AC" />
          <path d="M26 78h39" stroke="#fff" strokeOpacity=".65" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g transform="translate(467 171)">
          <circle cx="48" cy="31" r="23" fill="#D99570" />
          <path d="M25 27c4-26 43-34 51-3-12-2-23-10-29-18-5 10-12 17-22 21z" fill="#24365F" />
          <path d="M9 115c2-39 17-60 39-60s37 21 39 60" fill="#F05424" />
          <path d="M28 80h40" stroke="#fff" strokeOpacity=".65" strokeWidth="5" strokeLinecap="round" />
        </g>
        <path d="M111 158c18-31 30-43 52-47M487 111c25 5 39 17 51 39" fill="none" stroke="#F05424" strokeWidth="4" strokeDasharray="7 9" strokeLinecap="round" />
        <circle cx="163" cy="111" r="7" fill="#F05424" />
        <circle cx="538" cy="151" r="7" fill="#4860AC" />
        <rect x="267" y="326" width="106" height="28" rx="14" fill="#F05424" />
        <path d="m288 340 8 7 14-15" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <text x="321" y="345" fill="#fff" fontSize="10" fontWeight="700" letterSpacing=".8">CONNECTED</text>
      </svg>
    </div>
  )
}

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
          <Reveal delay={150}>
            <WarehouseIllustration />
          </Reveal>
        </Container>
      </section>

      {/* Careers & Benefits Teaser */}
      <section className="border-b border-border bg-surface-muted py-12 sm:py-16" aria-labelledby="home-careers-heading">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <Reveal>
            <WorkforceIllustration />
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
import { useState } from 'react'
import { ArrowRight, Church, Eye, HeartHandshake, ShieldCheck, Sparkles, Target, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { Reveal } from '@/components/ui/Reveal'
import { ExecutiveProfileDialog } from '@/components/ui/ExecutiveProfileDialog'
import { ScrollStory } from '@/components/ui/ScrollStory'
import { bannerButton, card, iconTile } from '@/components/ui/surface-styles'
import * as c from '@/content/eqisi'
import alfariz from '@/assets/eqisi/team/alfariz.png'
import ann from '@/assets/eqisi/team/ann.png'
import cajigal from '@/assets/eqisi/team/cajigal.png'
import flores from '@/assets/eqisi/team/flores.png'
import joy from '@/assets/eqisi/team/joy.png'
import malaca from '@/assets/eqisi/team/malaca.png'
import manuel from '@/assets/eqisi/team/manuel.png'
import tugas from '@/assets/eqisi/team/tugas.png'

const executiveTeam = [
  { name: 'Aniceto Apollo L. Cajigal Jr.', role: 'Chairman & CEO', photo: cajigal, group: 'executive' },
  { name: 'Joy Catherine P. Lopez', role: 'President for Operations', photo: joy, group: 'executive' },
  { name: 'Rodulfo Mejes Malaca', role: 'General Manager', photo: malaca, group: 'management' },
  { name: 'Jelle Jasmin Manuel', role: 'Chief Operating Officer', photo: manuel, group: 'management' },
  { name: 'Atty. Edgardo Flores Jr.', role: 'Chief Legal Officer', photo: flores, group: 'management' },
  { name: 'Gretchen Alfariz', role: 'Chief Finance Officer', photo: alfariz, group: 'management' },
  { name: 'Gigy Josephine Tugas', role: 'Chief HR Officer', photo: tugas, group: 'management' },
  { name: 'Annabel S. Trinidad', role: 'Chief IT Officer', photo: ann, group: 'management' },
] as const
import { cn } from '@/lib/cn'

const valueIcons: Record<string, LucideIcon> = {
  'Maka-Diyos': Church,
  Malasakit: HeartHandshake,
  Maaasahan: ShieldCheck,
}


function AboutWarehouseIllustration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("about-illustration relative flex w-full items-center justify-center overflow-hidden", compact ? "aspect-[5/4]" : "aspect-[16/10] sm:aspect-[5/4] lg:aspect-[4/3]")}>
      <svg viewBox="0 0 640 460" role="img" aria-labelledby="about-warehouse-title" className="h-full w-full">
        <title id="about-warehouse-title">Illustration of an organized warehouse and connected industrial operations</title>
        <defs>
          <linearGradient id="about-warehouse-glow" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#4860AC" stopOpacity=".16"/><stop offset="1" stopColor="#F05424" stopOpacity=".13"/></linearGradient>
          <linearGradient id="about-warehouse-floor" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#4860AC" stopOpacity=".14"/><stop offset="1" stopColor="#4860AC" stopOpacity=".02"/></linearGradient>
        </defs>
        <rect x="12" y="12" width="616" height="436" rx="28" fill="url(#about-warehouse-glow)"/>
        <circle cx="530" cy="94" r="46" fill="#F05424" opacity=".12"/><circle cx="98" cy="360" r="58" fill="#4860AC" opacity=".08"/>
        <path d="M70 170 320 55l250 115v210H70z" fill="#fff" fillOpacity=".82" stroke="#4860AC" strokeOpacity=".32" strokeWidth="5" strokeLinejoin="round"/>
        <path d="m70 170 250-115 250 115M110 188v180m420-180v180M320 88v280" fill="none" stroke="#4860AC" strokeWidth="7" strokeLinejoin="round" opacity=".7"/>
        <path d="M92 368h456l44 35H48z" fill="url(#about-warehouse-floor)"/>
        <g stroke="#4860AC" strokeWidth="7" strokeLinecap="round"><path d="M125 210v145m112-145v145m-112-104h112m-112 55h112M403 210v145m112-145v145m-112-104h112m-112 55h112"/></g>
        <g><rect x="138" y="215" width="86" height="28" rx="5" fill="#F05424"/><rect x="138" y="257" width="86" height="39" rx="5" fill="#4860AC"/><rect x="138" y="310" width="86" height="39" rx="5" fill="#F05424" opacity=".8"/><rect x="416" y="215" width="86" height="28" rx="5" fill="#4860AC"/><rect x="416" y="257" width="86" height="39" rx="5" fill="#F05424"/><rect x="416" y="310" width="86" height="39" rx="5" fill="#4860AC" opacity=".85"/></g>
        <g transform="translate(252 292)"><rect y="37" width="135" height="56" rx="12" fill="#F05424"/><path d="m20 37 19-31h46l26 31" fill="#F7B38F" stroke="#F05424" strokeWidth="5" strokeLinejoin="round"/><rect x="45" y="14" width="38" height="22" rx="4" fill="#fff" fillOpacity=".8"/><circle cx="31" cy="96" r="15" fill="#24365F"/><circle cx="105" cy="96" r="15" fill="#24365F"/><path d="M126 47h17v49" stroke="#24365F" strokeWidth="7" strokeLinecap="round"/><rect x="-18" y="7" width="42" height="30" rx="4" fill="#4860AC"/><path d="M-10 17h26m-26 9h26" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></g>
        <path d="M274 414h92" stroke="#F05424" strokeWidth="8" strokeLinecap="round"/><circle cx="320" cy="414" r="7" fill="#F05424"/>
      </svg>
    </div>
  )
}

function InnovationIllustration() {
  return (
    <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden">
      <svg viewBox="0 0 640 420" role="img" aria-labelledby="innovation-illustration-title" className="h-full w-full">
        <title id="innovation-illustration-title">Illustration of industrial automation, robotics and connected technology</title>
        <defs><linearGradient id="innovation-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#4860AC" stopOpacity=".15"/><stop offset="1" stopColor="#F05424" stopOpacity=".12"/></linearGradient></defs>
        <rect x="12" y="12" width="616" height="396" rx="28" fill="url(#innovation-bg)"/>
        <path d="M75 330h490" stroke="#4860AC" strokeOpacity=".35" strokeWidth="8" strokeLinecap="round"/>
        <rect x="92" y="235" width="456" height="78" rx="14" fill="#fff" stroke="#4860AC" strokeOpacity=".3" strokeWidth="4"/>
        <path d="M116 270h408M145 246v48m82-48v48m82-48v48m82-48v48m82-48v48" stroke="#4860AC" strokeOpacity=".25" strokeWidth="4"/>
        <g transform="translate(184 78)" stroke="#4860AC" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none"><path d="M70 145 112 91l78 8 47-53"/><path d="m218 46 28-20 28 18-12 35-36-2z" fill="#F05424" stroke="#F05424"/><path d="M70 145 34 177" strokeWidth="23"/><circle cx="70" cy="145" r="19" fill="#F05424"/><circle cx="112" cy="91" r="16" fill="#fff"/><circle cx="190" cy="99" r="16" fill="#fff"/></g>
        <rect x="110" y="104" width="72" height="54" rx="10" fill="#fff" stroke="#4860AC" strokeWidth="4"/><path d="M127 122h38m-38 15h25" stroke="#F05424" strokeWidth="5" strokeLinecap="round"/>
        <rect x="402" y="72" width="128" height="110" rx="16" fill="#fff" stroke="#4860AC" strokeOpacity=".3" strokeWidth="4"/>
        <path d="M426 145v-22l20-16 18 13 23-28 20 16" fill="none" stroke="#F05424" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="446" cy="123" r="6" fill="#4860AC"/><circle cx="464" cy="120" r="6" fill="#4860AC"/><circle cx="487" cy="92" r="6" fill="#4860AC"/>
        <g fill="#4860AC"><circle cx="118" cy="204" r="6"/><circle cx="522" cy="204" r="6"/><circle cx="320" cy="53" r="6"/></g>
        <path d="M150 188c34-29 54-36 80-36m190 36c-25-26-42-35-64-39" fill="none" stroke="#F05424" strokeWidth="4" strokeDasharray="7 9" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

export function Component() {
  const [selectedExecutive, setSelectedExecutive] = useState<(typeof executiveTeam)[number] | null>(null)

  return (
    <>
      <PageMeta
        title="About Us"
        description="Learn about Excel Quality Integrated Solutions Inc. (EQISI), our leadership team, company heritage since 1986, and core values."
      />

      <PageHero
        id="about-hero"
        eyebrow="Company Heritage"
        title="Rooted in Heritage, Powered by Innovation"
        description="A legacy of service. A focus on what comes next."
        actions={
          <>
            <a href="#leadership" className={buttonStyles({ size: 'lg' })}>
              Meet Our Team
            </a>
            <Link to="/contacts" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
              Contact Us
            </Link>
          </>
        }
        visual={<AboutWarehouseIllustration />}
      />

      <Section id="company-overview" muted eyebrow="Who We Are" title="Experience that moves businesses forward">
        <div className="grid gap-5 md:grid-cols-2">
          {c.about.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 90}>
              <p className="h-full rounded-xl border border-border bg-surface p-6 text-sm leading-7 text-fg-muted shadow-subtle sm:p-7">{paragraph}</p>
            </Reveal>
          ))}
          <Reveal className="md:col-span-2">
            <p className="rounded-xl border border-primary/15 bg-primary/5 p-6 text-sm leading-7 text-fg sm:p-7">
              From nationwide warehousing management to technical staffing, EQISI brings industry experience and integrated systems together to support connected operations.
            </p>
          </Reveal>
        </div>
      </Section>

      <ScrollStory
        eyebrow="Our Heritage"
        title="A foundation built over time"
        description="EQISI's story connects a long-standing industry foundation with the people, services and systems supporting operations today."
        steps={[
          { title: '1986 — A group foundation', description: "Our industry heritage traces back to the establishment of the JRS (Jose R. Simeon) Group of Companies, formerly Matrix Group of Companies." },
          { title: 'Connected capabilities', description: 'EQISI brings workforce, warehousing, logistics, facility support and management systems together for clients.' },
          { title: 'Supporting what comes next', description: 'Our focus is to help businesses coordinate people, processes and technology as operational needs evolve.' },
        ]}
        visual={
          <div className="about-story-visual overflow-hidden">
            <AboutWarehouseIllustration compact />
            <div className="grid grid-cols-2 gap-3 p-4 sm:p-5">
              <div className="rounded-xl bg-canvas p-4"><span className="text-xs font-bold tracking-wider text-fg-muted uppercase">Heritage</span><p className="mt-1 text-2xl font-extrabold text-primary">1986</p></div>
              <div className="rounded-xl bg-canvas p-4"><span className="text-xs font-bold tracking-wider text-fg-muted uppercase">Systems</span><p className="mt-1 text-2xl font-extrabold text-primary">06</p></div>
            </div>
          </div>
        }
      />

      {/* Mission & Vision */}
      <Section id="mission-vision" muted eyebrow="Direction & Purpose" title="Where we are headed">
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-xl border border-border bg-primary p-8 text-primary-fg shadow-card transition-all duration-200 hover:shadow-elevated motion-safe:hover:-translate-y-1">
              <span className="grid size-12 place-items-center rounded-lg bg-primary-fg/15 text-primary-fg">
                <Target aria-hidden="true" className="size-6" />
              </span>
              <span className="mt-5 block text-xs font-bold tracking-widest text-primary-fg/80 uppercase">Our Purpose</span>
              <h3 className="mt-2 text-2xl font-bold">Mission</h3>
              <p className="mt-4 text-lg leading-relaxed text-primary-fg/90">{c.mission}</p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="group h-full rounded-xl border border-border bg-surface p-8 shadow-card transition-all duration-200 hover:border-primary/50 hover:shadow-elevated motion-safe:hover:-translate-y-1">
              <span className={iconTile}>
                <Eye aria-hidden="true" className="size-6" />
              </span>
              <span className="mt-5 block text-xs font-bold tracking-widest text-warning uppercase">Our Goal</span>
              <h3 className="mt-2 text-2xl font-bold text-primary">Vision</h3>
              <p className="mt-4 text-lg leading-relaxed text-fg-muted">{c.vision}</p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <h3 className="mt-14 mb-6 text-2xl font-bold text-fg">Our Core Values</h3>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {c.values.map((v, i) => {
            const Icon = valueIcons[v.name] ?? Sparkles
            return (
              <Reveal key={v.name} delay={i * 100} className="h-full">
                <div className={cn(card, 'border-t-4 border-t-highlight')}>
                  <span className={iconTile}>
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h4 className="mt-4 text-xl font-bold text-primary">{v.name}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">{v.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Leadership Team */}
      <Section
        id="leadership"
        eyebrow="Leadership"
        title="Our Executive Team"
        lead="Meet the experienced executives guiding EQISI's strategy, client partnerships, compliance, and nationwide operations."
      >
        <div className="space-y-8">
          <ul className="grid gap-5 md:grid-cols-2">
            {executiveTeam.filter((member) => member.group === 'executive').map((member, i) => (
              <li key={member.name}>
                <Reveal delay={i * 120} className="h-full">
                  <article role="button" tabIndex={0} onClick={() => setSelectedExecutive(member)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedExecutive(member) } }} aria-label={`View profile for ${member.name}`} className="group relative isolate flex min-h-[190px] h-full cursor-pointer overflow-hidden sm:min-h-[220px] rounded-2xl border border-border/80 bg-surface shadow-[0_8px_28px_-16px_rgba(20,35,75,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[0_22px_48px_-22px_rgba(20,35,75,0.38)] focus-visible:-translate-y-1.5 focus-visible:border-primary/35 focus-visible:shadow-elevated">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 z-20 w-1 bg-highlight transition-all duration-300 group-hover:w-1.5" />
                    <div className="relative w-[38%] min-w-[108px] shrink-0 sm:w-[42%] sm:min-w-[130px] overflow-hidden bg-surface-muted">
                      <img src={member.photo} alt={`Portrait of ${member.name}`} width={420} height={525} className="h-full min-h-[190px] w-full sm:min-h-[220px] object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-110" />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/20" />
                    </div>
                    <div className="relative flex min-w-0 flex-1 flex-col justify-center p-3 sm:p-7">
                      <span className="mb-3 inline-flex w-fit items-center rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-primary uppercase">Executive Leadership</span>
                      <p className="text-[10px] font-bold tracking-[0.14em] text-highlight uppercase">{member.role}</p>
                      <h3 className="mt-2 text-sm font-extrabold leading-tight tracking-tight text-fg sm:text-xl">{member.name}</h3>
                      <span aria-hidden="true" className="mt-4 h-[2px] w-8 rounded-full bg-highlight transition-all duration-300 group-hover:w-14" />
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>

          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-xs font-bold tracking-[0.18em] text-primary uppercase">Management Team</h3>
                <p className="mt-1 text-sm text-fg-muted">The leaders behind our day-to-day excellence.</p>
              </div>
              <span className="hidden rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-fg-muted sm:inline-flex">06 Leaders</span>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {executiveTeam.filter((member) => member.group === 'management').map((member, i) => (
                <li key={member.name}>
                  <Reveal delay={(i % 3) * 90} className="h-full">
                    <article role="button" tabIndex={0} onClick={() => setSelectedExecutive(member)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setSelectedExecutive(member) } }} aria-label={`View profile for ${member.name}`} className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_8px_24px_-16px_rgba(20,35,75,0.32)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[0_20px_42px_-20px_rgba(20,35,75,0.38)] focus-visible:-translate-y-1.5 focus-visible:border-primary/35 focus-visible:shadow-elevated">
                      <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[4/3] bg-surface-muted">
                        <img src={member.photo} alt={`Portrait of ${member.name}`} width={420} height={525} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-105" />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/35 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-[9px] font-bold tracking-[0.12em] text-primary uppercase shadow-sm backdrop-blur">Management</span>
                      </div>
                      <div className="relative min-h-[96px] p-3 sm:min-h-[104px] sm:p-5">
                        <span aria-hidden="true" className="absolute left-0 top-5 h-8 w-[3px] rounded-r-full bg-highlight transition-all duration-300 group-hover:h-11" />
                        <h4 className="pl-2 text-sm font-extrabold leading-snug tracking-tight text-fg sm:text-base">{member.name}</h4>
                        <p className="mt-2 pl-2 text-xs font-medium leading-relaxed text-fg-muted">{member.role}</p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Market Edge */}
      <section className="border-t border-border bg-surface-muted py-16 sm:py-20" aria-labelledby="edge-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="flex items-center gap-3 text-sm font-bold tracking-widest text-warning uppercase">
                <span aria-hidden="true" className="h-1 w-8 rounded-full bg-highlight" />
                Market Advantage
              </p>
              <h2 id="edge-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Why leading enterprises partner with EQISI
              </h2>
              <p className="mt-4 text-base text-fg-muted">
                We provide the legal assurance, technological infrastructure, and customized operating procedures that modern enterprises demand.
              </p>
            </Reveal>
            <ol className="mt-8 space-y-4">
              {c.edge.map((item, i) => (
                <li key={item}>
                  <Reveal delay={i * 100}>
                    <div className="group flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-subtle transition-all duration-200 hover:border-primary/50 hover:shadow-card motion-safe:hover:translate-x-1">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-fg">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base font-semibold text-fg">{item}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <Reveal delay={150}>
            <InnovationIllustration />
          </Reveal>
        </Container>
      </section>

      <ExecutiveProfileDialog profile={selectedExecutive} onClose={() => setSelectedExecutive(null)} />

      <CtaBanner
        title="Partner with our leadership team"
        description="Let us show you how EQISI can support your manufacturing or warehousing facility with dedicated, compliant teams."
      >
        <Link to="/contacts" className={bannerButton}>
          Contact Us Today
          <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </CtaBanner>
    </>
  )
}
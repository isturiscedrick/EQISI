import { ArrowRight, CalendarDays, Church, Eye, HeartHandshake, ShieldCheck, Sparkles, Target, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { Reveal } from '@/components/ui/Reveal'
import { ScrollProgressTrack } from '@/components/ui/ScrollProgressTrack'
import { bannerButton, card, iconTile } from '@/components/ui/surface-styles'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
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

export function Component() {
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
        description={
          <div className="space-y-4">
            {c.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p>
              From nationwide warehousing management to comprehensive technical staffing, our operational model combines deep industry experience with proprietary automation tools to deliver measurable business outcomes.
            </p>
          </div>
        }
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
        visual={
          <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-elevated sm:aspect-[5/4] lg:aspect-[4/3]">
            <img
              src={asset('industry.webp')}
              alt="Industrial manufacturing and warehousing facility"
              width={900}
              height={1012}
              loading="eager"
              decoding="async"
              className="h-full w-full object-contain object-center"
            />
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

      <Section id="heritage-timeline" muted eyebrow="Our Journey" title="Experience built on a lasting foundation">
        <ScrollProgressTrack steps={2}>
          <ol className="grid gap-5 md:grid-cols-2">
            <li>
              <Reveal className="h-full">
                <article className="motion-border h-full rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
                  <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CalendarDays aria-hidden="true" className="size-6" />
                  </span>
                  <p className="mt-5 text-sm font-extrabold tracking-[0.16em] text-warning uppercase">1986</p>
                  <h3 className="mt-2 text-xl font-bold text-fg">The JRS Group was established</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    EQISI's industry heritage traces back to the establishment of the JRS (Jose R. Simeon) Group of Companies, formerly Matrix Group of Companies.
                  </p>
                </article>
              </Reveal>
            </li>
            <li>
              <Reveal delay={120} className="h-full">
                <article className="motion-border h-full rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
                  <span className="grid size-12 place-items-center rounded-xl bg-highlight/15 text-accent">
                    <Target aria-hidden="true" className="size-6" />
                  </span>
                  <p className="mt-5 text-sm font-extrabold tracking-[0.16em] text-warning uppercase">Today</p>
                  <h3 className="mt-2 text-xl font-bold text-fg">Integrated solutions for modern operations</h3>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    EQISI combines warehousing, manpower, logistics, facility support, and management systems to help clients run connected operations.
                  </p>
                </article>
              </Reveal>
            </li>
          </ol>
        </ScrollProgressTrack>
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
                  <article tabIndex={0} className="group relative isolate flex min-h-[190px] h-full overflow-hidden sm:min-h-[220px] rounded-2xl border border-border/80 bg-surface shadow-[0_8px_28px_-16px_rgba(20,35,75,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[0_22px_48px_-22px_rgba(20,35,75,0.38)] focus-visible:-translate-y-1.5 focus-visible:border-primary/35 focus-visible:shadow-elevated">
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
                    <article tabIndex={0} className="group relative h-full overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_8px_24px_-16px_rgba(20,35,75,0.32)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/35 hover:shadow-[0_20px_42px_-20px_rgba(20,35,75,0.38)] focus-visible:-translate-y-1.5 focus-visible:border-primary/35 focus-visible:shadow-elevated">
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
          <Reveal delay={150} className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface-muted shadow-elevated">
            <img
              src={asset('edge.webp')}
              alt="High technology automation and robotics"
              width={900}
              height={506}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-500 motion-safe:hover:scale-[1.03]"
            />
          </Reveal>
        </Container>
      </section>

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
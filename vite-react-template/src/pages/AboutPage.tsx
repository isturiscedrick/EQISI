import { ArrowRight, Church, Eye, HeartHandshake, ShieldCheck, Sparkles, Target, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { Reveal } from '@/components/ui/Reveal'
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

const executivePortraits = [cajigal, malaca, manuel, flores, alfariz, tugas, joy, ann]
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
          <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
            <img
              src={asset('industry.webp')}
              alt="Industrial manufacturing and warehousing facility"
              width={900}
              height={1012}
              className="max-h-120 w-full object-cover transition-transform duration-500 motion-safe:hover:scale-105"
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

      {/* Leadership Team */}
      <Section
        id="leadership"
        eyebrow="Leadership"
        title="Our Executive Team"
        lead="Meet the experienced executives guiding EQISI's strategy, client partnerships, compliance, and nationwide operations."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.team.map((m, i) => (
            <li key={m.name} className="h-full">
              <Reveal delay={(i % 4) * 100} className="h-full">
                <div className="group h-full overflow-hidden rounded-xl border border-b-4 border-border border-b-highlight bg-surface shadow-subtle transition-all duration-200 hover:shadow-card motion-safe:hover:-translate-y-1">
                  <div className="overflow-hidden">
                    <img
                      src={executivePortraits[i] ?? asset(m.photo)}
                      alt={`Portrait of ${m.name}`}
                      width={420}
                      height={525}
                      loading="lazy"
                      className="aspect-4/5 w-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-fg">{m.name}</h4>
                    <p className="mt-1 text-sm font-medium text-fg-muted">{m.role}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
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
          <Reveal delay={150} className="overflow-hidden rounded-2xl border border-border shadow-elevated">
            <img
              src={asset('edge.webp')}
              alt="High technology automation and robotics"
              width={900}
              height={506}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 motion-safe:hover:scale-105"
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
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
        title="About Us"
        description="Learn about Excel Quality Integrated Solutions Inc. (EQISI), our leadership team, company heritage since 1986, and core values."
      />

      {/* Hero / Heritage */}
      <section className="border-b border-border bg-canvas py-16 sm:py-24" aria-labelledby="about-hero-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-bold tracking-wider text-warning uppercase">
              <span className="size-2 rounded-full bg-highlight" />
              Company Heritage
            </div>
            <h1 id="about-hero-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Rooted in Heritage, Powered by Innovation
            </h1>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-muted">
              {c.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
              <p>
                From nationwide warehousing management to comprehensive technical staffing, our operational model combines deep industry experience with proprietary automation tools to deliver measurable business outcomes.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
            <img
              src={asset('industry.webp')}
              alt="Industrial manufacturing and warehousing facility"
              width={900}
              height={1012}
              className="max-h-[30rem] w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section id="mission-vision" muted eyebrow="Direction & Purpose" title="Where we are headed">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-primary p-8 text-primary-fg shadow-card">
            <span className="text-xs font-bold tracking-widest text-warning uppercase">Our Purpose</span>
            <h3 className="mt-2 text-2xl font-bold">Mission</h3>
            <p className="mt-4 text-lg leading-relaxed text-primary-fg/90">{c.mission}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-8 shadow-card">
            <span className="text-xs font-bold tracking-widest text-warning uppercase">Our Goal</span>
            <h3 className="mt-2 text-2xl font-bold text-primary">Vision</h3>
            <p className="mt-4 text-lg leading-relaxed text-fg-muted">{c.vision}</p>
          </div>
        </div>

        <h3 className="mt-14 mb-6 text-2xl font-bold text-fg">Our Core Values</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {c.values.map((v) => (
            <div key={v.name} className={cn(card, 'border-t-4 border-t-highlight')}>
              <h4 className="text-xl font-bold text-primary">{v.name}</h4>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{v.text}</p>
            </div>
          ))}
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
          {c.team.map((m) => (
            <li
              key={m.name}
              className="overflow-hidden rounded-xl border border-b-4 border-border border-b-highlight bg-surface shadow-subtle transition-transform hover:-translate-y-1"
            >
              <img
                src={asset(m.photo)}
                alt={`Portrait of ${m.name}`}
                width={420}
                height={525}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="p-5">
                <h4 className="font-bold text-fg">{m.name}</h4>
                <p className="mt-1 text-sm font-medium text-fg-muted">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* Market Edge */}
      <section className="border-t border-border bg-surface-muted py-16 sm:py-20" aria-labelledby="edge-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-warning uppercase">Market Advantage</p>
            <h2 id="edge-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Why leading enterprises partner with EQISI
            </h2>
            <p className="mt-4 text-base text-fg-muted">
              We provide the legal assurance, technological infrastructure, and customized operating procedures that modern enterprises demand.
            </p>
            <ol className="mt-8 space-y-4">
              {c.edge.map((item, i) => (
                <li key={item} className="flex items-center gap-4 rounded-xl border border-border bg-surface p-4 shadow-subtle">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base font-semibold text-fg">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-elevated">
            <img
              src={asset('edge.webp')}
              alt="High technology automation and robotics"
              width={900}
              height={506}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="border-t border-border bg-primary py-16 text-primary-fg sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Partner with our leadership team</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-fg/90">
            Let us show you how EQISI can support your manufacturing or warehousing facility with dedicated, compliant teams.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contacts"
              className={buttonStyles({ size: 'lg' })}
            >
              Contact Us Today
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

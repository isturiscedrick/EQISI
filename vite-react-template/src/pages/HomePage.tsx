import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { siteConfig } from '@/config/site'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'

const card = 'rounded-xl border border-border bg-surface p-6 shadow-subtle transition-all hover:border-primary/50'

export function Component() {
  return (
    <>
      <PageMeta title={siteConfig.name} description={siteConfig.description} />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-canvas">
        <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-bold tracking-wider text-warning uppercase">
              <span className="size-2 rounded-full bg-highlight" />
              Company Profile 2025
            </div>
            <h1 className="mt-4 text-display text-balance font-extrabold text-primary">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-fg-muted">
              EQISI delivers integrated warehousing, manpower, logistics, and facility solutions backed by automation systems that keep payroll, people, and inventory moving on time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/services" className={buttonStyles({ size: 'lg' })}>
                Our Services &amp; Systems
              </Link>
              <Link to="/contacts" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={asset('factory.webp')}
              alt="Inside a busy manufacturing and warehouse facility"
              width={900}
              height={1029}
              className="aspect-[16/10] w-full rounded-2xl border-b-8 border-highlight object-cover shadow-elevated lg:aspect-[4/5]"
            />
          </div>
        </Container>
      </section>

      {/* Trust & Key Stats Strip */}
      <section className="border-b border-border bg-surface py-10" aria-label="Key Highlights">
        <Container>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="border-l-4 border-primary pl-4">
              <p className="text-3xl font-extrabold text-primary sm:text-4xl">1986</p>
              <p className="mt-1 text-sm text-fg-muted font-medium">Industry Heritage (JRS Group)</p>
            </div>
            <div className="border-l-4 border-highlight pl-4">
              <p className="text-3xl font-extrabold text-primary sm:text-4xl">DO-174</p>
              <p className="mt-1 text-sm text-fg-muted font-medium">Full DOLE Compliance</p>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <p className="text-3xl font-extrabold text-primary sm:text-4xl">6</p>
              <p className="mt-1 text-sm text-fg-muted font-medium">Core Management Systems</p>
            </div>
            <div className="border-l-4 border-highlight pl-4">
              <p className="text-3xl font-extrabold text-primary sm:text-4xl">26+</p>
              <p className="mt-1 text-sm text-fg-muted font-medium">Multinational &amp; Local Clients</p>
            </div>
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
          {c.systems.map((system, i) => (
            <div key={system} className={card}>
              <span className="text-sm font-bold tracking-widest text-warning">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-fg">{system}</h3>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:justify-start">
          <Link to="/services" className={buttonStyles({ variant: 'secondary' })}>
            Explore All Services &amp; Capabilities &rarr;
          </Link>
        </div>
      </Section>

      {/* About Teaser */}
      <section className="py-16 sm:py-20 border-b border-border bg-canvas" aria-labelledby="home-about-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-warning uppercase">About EQISI</p>
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
                Learn More About Our Heritage &amp; Team &rarr;
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <img
              src={asset('industry.webp')}
              alt="Industrial plant with steel structures"
              width={900}
              height={1012}
              loading="lazy"
              className="max-h-[26rem] w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Clients Section */}
      <Section
        id="clients"
        muted
        eyebrow="Our Clients"
        title="Trusted by leading brands nationwide"
        lead="We partner with top-tier multinational corporations, food service leaders, industrial manufacturers, and retail chains across the Philippines."
      >
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          {c.clients.map((client) => (
            <li
              key={client.name}
              title={client.name}
              className="grid aspect-square place-items-center overflow-hidden rounded-full border-4 border-border bg-white shadow-subtle transition-transform hover:scale-105"
            >
              <img
                src={asset(client.logo)}
                alt={client.name}
                width={150}
                height={150}
                loading="lazy"
                className={cn('size-full object-contain', 'padded' in client && client.padded && 'p-[14%]')}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Careers & Benefits Teaser */}
      <section className="py-16 sm:py-20 border-b border-border bg-canvas" aria-labelledby="home-careers-heading">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <img
              src={asset('benefits.webp')}
              alt="Workers on a production floor"
              width={900}
              height={507}
              loading="lazy"
              className="w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold tracking-widest text-warning uppercase">Careers &amp; Welfare</p>
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
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-primary py-16 text-primary-fg sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to upgrade your supply chain &amp; workforce?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-fg/90">
            Get in touch with President Rodulfo Mejes Malaca and our leadership team to discuss how EQISI can optimize your operations.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contacts"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-surface px-6 font-semibold text-fg shadow-elevated transition-colors hover:bg-surface-muted"
            >
              Contact Our Team
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

import { Link } from 'react-router'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'

const systemDetails: Record<string, string> = {
  'Payroll Management System': 'Automated timekeeping and wage computations with real-time disbursement to guarantee 100% on-time payroll for thousands of personnel.',
  'Human Resource Information System': 'Centralized employee profiles, 201 filing, performance monitoring, and compliance tracking accessible across remote facilities.',
  'Warehouse Management System': 'Real-time stock movement, bin allocation, pick-and-pack routing, and barcode tracking to eliminate logistics bottlenecks.',
  'Compensation & Benefits System': 'Seamless processing of statutory contributions (SSS, PhilHealth, Pag-IBIG), healthcare coverage, and rapid emergency payouts.',
  'Inventory Management System': 'Continuous ledger auditing, inventory velocity analytics, loss reduction, and automated stock replenishment workflows.',
  'Global Positioning System': 'High-accuracy vehicle fleet tracking, delivery route optimization, and live dispatch monitoring nationwide.',
}

const card = 'rounded-xl border border-border bg-surface p-6 shadow-subtle'
const chip = 'rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg'

export function Component() {
  return (
    <>
      <PageMeta
        title="Our Services"
        description="Explore EQISI's six management automation systems, warehousing solutions, multi-industry workforce staffing, and multinational support."
      />

      {/* Hero Section */}
      <section className="border-b border-border bg-canvas py-16 sm:py-24" aria-labelledby="services-hero">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-bold tracking-wider text-warning uppercase">
              <span className="size-2 rounded-full bg-highlight" />
              Integrated Solutions
            </div>
            <h1 id="services-hero" className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
              End-to-End Warehousing, Workforce &amp; Automation
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              We engineer specialized operational frameworks tailored to your supply chain requirements. By combining proprietary management software with trained industrial personnel, we ensure reliable, high-yield results.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contacts" className={buttonStyles({ size: 'lg' })}>
                Request a Consultation
              </Link>
              <a href="#systems" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
                View Our 6 Systems
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Six Systems Section */}
      <Section
        id="systems"
        muted
        eyebrow="Proprietary Technology"
        title="Six systems that power your workforce and supply chain"
        lead="Our custom digital architecture keeps payroll, inventory, and operations running with precision and zero downtime."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.systems.map((name, i) => (
            <div key={name} className={cn(card, 'flex flex-col justify-between border-t-4 border-t-primary')}>
              <div>
                <span className="text-sm font-extrabold tracking-widest text-warning">
                  SYSTEM {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-xl font-bold text-fg">{name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                  {systemDetails[name] ?? 'Enterprise-grade software designed to optimize productivity and eliminate operational friction.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Industries Section */}
      <Section
        id="industries"
        eyebrow="Industry Reach"
        title="We operate in these essential industries"
        lead="From cold chain food distribution to high-tech manufacturing, our capabilities span key commercial and industrial sectors."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.industries.map((ind, i) => (
            <div key={ind} className={cn(card, 'transition-all hover:border-primary/50')}>
              <span className="text-xs font-bold text-warning">{String(i + 1).padStart(2, '0')}</span>
              <h4 className="mt-1 font-semibold text-fg">{ind}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-surface-muted p-8 shadow-card">
          <h3 className="text-2xl font-bold text-fg">Not limited to blue collar workers</h3>
          <p className="mt-2 max-w-2xl text-base text-fg-muted">
            In addition to trained floor operators, we source, qualify, and manage specialized technical and white-collar personnel for multinational clients.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {c.workforce.map((role) => (
              <li key={role} className={chip}>
                {role}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Multinational Leverage Section */}
      <Section
        id="leverage"
        muted
        eyebrow="Multinational Support"
        title="Built for global enterprise standards"
        lead={c.leverageIntro}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.leverage.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-5 shadow-subtle">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-xs font-bold text-highlight">
                &#10003;
              </span>
              <p className="font-medium text-fg">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clients Grid */}
      <Section
        id="clients"
        eyebrow="Client Portfolio"
        title="Trusted by industry leaders"
        lead="A track record of reliable service across 26+ major Philippine and multinational enterprises."
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

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-fg sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to design your custom service model?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-fg/90">
            Tell us about your inventory, facility footprint, or staffing requirements, and we will formulate an integrated service package.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/contacts"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-surface px-6 font-semibold text-fg shadow-elevated transition-colors hover:bg-surface-muted"
            >
              Contact Our Operations Team
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}

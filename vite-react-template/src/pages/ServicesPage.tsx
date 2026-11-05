import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router'
import { AutomationIllustration } from '@/components/illustrations/AutomationIllustration'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { Reveal } from '@/components/ui/Reveal'
import { ServiceExplorer } from '@/components/ui/ServiceExplorer'
import { bannerButton, card, chip, iconTile } from '@/components/ui/surface-styles'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'
import { industryIcon, systemIcon } from '@/lib/icons'

const systemDetails: Record<string, string> = {
  'Payroll Management System': 'Automated timekeeping and wage computations with real-time disbursement to guarantee 100% on-time payroll for thousands of personnel.',
  'Human Resource Information System': 'Centralized employee profiles, 201 filing, performance monitoring, and compliance tracking accessible across remote facilities.',
  'Warehouse Management System': 'Real-time stock movement, bin allocation, pick-and-pack routing, and barcode tracking to eliminate logistics bottlenecks.',
  'Compensation & Benefits System': 'Seamless processing of statutory contributions (SSS, PhilHealth, Pag-IBIG), healthcare coverage, and rapid emergency payouts.',
  'Inventory Management System': 'Continuous ledger auditing, inventory velocity analytics, loss reduction, and automated stock replenishment workflows.',
  'Global Positioning System': 'High-accuracy vehicle fleet tracking, delivery route optimization, and live dispatch monitoring nationwide.',
}

export function Component() {
  return (
    <>
      <PageMeta
        title="Our Services"
        description="Explore EQISI's six management automation systems, warehousing solutions, multi-industry workforce staffing, and multinational support."
      />

      <PageHero
        id="services-hero"
        eyebrow="Integrated Solutions"
        title="Integrated Workforce & Supply Chain Solutions"
        description="Explore the services and systems behind connected operations."
        actions={
          <>
            <Link to="/contacts" className={buttonStyles({ size: 'lg' })}>
              Request a Consultation
              <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <a href="#systems" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>
              View Our 6 Systems
            </a>
          </>
        }
        visual={<AutomationIllustration className="mx-auto w-full max-w-lg" />}
      />

      <Section id="capability-explorer" eyebrow="Choose a capability" title="Explore our integrated service model" lead="Start with the operational area you need help with and discover the capabilities EQISI brings together.">
        <ServiceExplorer />
      </Section>

      {/* Six Systems Section */}
      <Section
        id="systems"
        muted
        eyebrow="Proprietary Technology"
        title="Six systems that power your workforce and supply chain"
        lead="Our custom digital architecture keeps payroll, inventory, and operations running with precision and zero downtime."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {c.systems.map((name, i) => {
            const Icon = systemIcon(name)
            return (
              <Reveal key={name} delay={(i % 3) * 100} className="h-full">
                <details data-service-card className={cn(card, 'service-system-card group/service motion-border border-t-4 border-t-primary open:shadow-elevated')}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                    <span className="flex min-w-0 items-center gap-4">
                      <span className={cn(iconTile, 'service-system-icon')}>
                        <Icon aria-hidden="true" className="size-6" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-extrabold tracking-widest text-warning">SYSTEM {String(i + 1).padStart(2, '0')}</span>
                        <span className="mt-1 block text-base font-bold leading-snug text-fg sm:text-lg">{name}</span>
                      </span>
                    </span>
                    <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-primary transition-transform duration-300 group-open/service:rotate-45">+</span>
                  </summary>
                  <div className="service-card-content">
                    <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-fg-muted">
                      {systemDetails[name] ?? 'Enterprise-grade software designed to optimize productivity and eliminate operational friction.'}
                    </p>
                    <Link to="/contacts" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary underline-offset-4 hover:underline">
                      Discuss this system <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  </div>
                </details>
              </Reveal>
            )
          })}
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
          {c.industries.map((ind, i) => {
            const Icon = industryIcon(ind)
            return (
              <Reveal key={ind} delay={(i % 4) * 80} className="h-full">
                <div className={cn(card, "motion-border")}>
                  <div className="flex items-center justify-between">
                    <span className={iconTile}>
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <span className="text-xs font-bold text-warning">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h4 className="mt-3 font-semibold text-fg">{ind}</h4>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mt-16 rounded-2xl border border-border bg-surface-muted p-8 shadow-card">
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
        </Reveal>
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
          {c.leverage.map((item, i) => (
            <Reveal key={item} delay={(i % 3) * 80} className="h-full">
              <div className="group flex h-full items-start gap-3 rounded-xl border border-border bg-surface p-5 shadow-subtle transition-all duration-200 hover:border-primary/50 hover:shadow-card motion-safe:hover:-translate-y-1">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-highlight/20 text-highlight transition-colors duration-200 group-hover:bg-highlight group-hover:text-white">
                  <Check aria-hidden="true" className="size-4" strokeWidth={3} />
                </span>
                <p className="font-medium text-fg">{item}</p>
              </div>
            </Reveal>
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
              className="grid aspect-square place-items-center overflow-hidden rounded-full border-4 border-border bg-white shadow-subtle transition-all duration-200 hover:border-primary/50 hover:shadow-card motion-safe:hover:scale-105"
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

      <CtaBanner
        title="Ready to design your custom service model?"
        description="Tell us about your inventory, facility footprint, or staffing requirements, and we will formulate an integrated service package."
      >
        <Link to="/contacts" className={bannerButton}>
          Contact Our Operations Team
          <ArrowRight aria-hidden="true" className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </CtaBanner>
    </>
  )
}
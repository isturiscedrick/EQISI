import { Building2, Clock, ExternalLink, Mail, Phone } from 'lucide-react'
import { LocationIllustration } from '@/components/illustrations/LocationIllustration'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { PageHero } from '@/components/layout/PageHero'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { Reveal } from '@/components/ui/Reveal'
import { FAQList } from '@/components/ui/FAQList'
import * as c from '@/content/eqisi'

const contactRow =
  'group flex items-center gap-4 rounded-xl border border-border bg-canvas p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-subtle'
const contactIcon =
  'flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-fg'

export function Component() {
  return (
    <>
      <PageMeta
        title="Contact Us"
        description="Get in touch with EQISI executive leadership or visit our offices in Quezon City, Cabuyao Laguna, and Bulacan."
      />

      <PageHero
        id="contact-hero"
        eyebrow="Direct Communication"
        title="Get in Touch with EQISI"
        description="Whether you are exploring warehouse automation, require manpower deployments, or have general business inquiries, our executive team is ready to assist you."
        visual={<LocationIllustration className="mx-auto w-full max-w-lg" />}
      />

      {/* Direct Contact & Offices */}
      <Section id="direct-contact" muted eyebrow="Direct Contacts" title="Executive Inquiries &amp; Office Locations">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Executive Direct Card */}
          <Reveal className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-8 shadow-card">
            <div>
              <span className="text-xs font-bold tracking-wider text-warning uppercase">Executive Contact</span>
              <h3 className="mt-2 text-2xl font-bold text-fg">{c.contact.person}</h3>
              <p className="text-base font-semibold text-primary">{c.contact.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Reach out directly for partnership proposals, manpower service agreements, nationwide warehousing inquiries, and enterprise solutions.
              </p>

              <div className="mt-8 space-y-5">
                <div className={contactRow}>
                  <span className={contactIcon}>
                    <Phone aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-fg-muted uppercase">Direct Mobile / Phone</p>
                    <a
                      href={c.contact.phone.href}
                      className="text-base font-bold text-fg underline transition-colors hover:text-primary"
                    >
                      {c.contact.phone.label}
                    </a>
                  </div>
                </div>

                <div className={contactRow}>
                  <span className={contactIcon}>
                    <Mail aria-hidden="true" className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-wider text-fg-muted uppercase">Official Email</p>
                    <a
                      href={`mailto:${c.contact.email}`}
                      className="text-base font-bold break-all text-fg underline transition-colors hover:text-primary"
                    >
                      {c.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-xl bg-surface-muted p-4 text-xs font-medium text-fg-muted">
              <Clock aria-hidden="true" className="size-4 shrink-0" />
              Operational Hours: Monday &ndash; Friday, 8:00 AM &ndash; 5:00 PM (Philippine Standard Time).
            </div>
          </Reveal>

          {/* Offices List */}
          <div className="flex flex-col gap-4">
            {c.contact.offices.map((office, idx) => (
              <Reveal key={office.name} delay={idx * 100}>
                <div className="group rounded-2xl border border-border bg-surface p-6 shadow-subtle transition-all duration-200 hover:border-primary/50 hover:shadow-card motion-safe:hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-highlight/15 text-accent transition-colors duration-200 group-hover:bg-highlight group-hover:text-white">
                      <Building2 aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-xs font-bold tracking-wider text-warning uppercase">
                      {office.name === 'Head Quarters' ? 'Main Headquarters' : 'Branch Facility'}
                    </span>
                  </div>
                  <h4 className="mt-3 text-xl font-bold text-fg">{office.name}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{office.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    View on map
                    <ExternalLink aria-hidden="true" className="size-4" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contact-faq" muted eyebrow="Quick Answers" title="Common questions before getting in touch">
        <div className="mx-auto max-w-4xl">
          <FAQList items={[
            {
              question: 'What services can EQISI help our company with?',
              answer: 'EQISI provides warehousing, manpower, logistics, facility support, and integrated workforce and supply-chain management systems. Share your operational requirements so the team can discuss a suitable service model.',
            },
            {
              question: 'How can we request a manpower deployment or consultation?',
              answer: 'Contact the executive office by phone or email using the details on this page. Include your facility location, workforce requirements, and preferred start date so the team can understand your request.',
            },
            {
              question: 'Where are EQISI offices located?',
              answer: 'EQISI lists its strategic office in Quezon City, satellite office in Cabuyao, Laguna, and headquarters in San Jose del Monte, Bulacan. Use the map links above for directions.',
            },
            {
              question: 'When can we reach the executive office?',
              answer: 'The listed operational hours are Monday to Friday, 8:00 AM to 5:00 PM Philippine Standard Time.',
            },
          ]} />
        </div>
      </Section>

      <CtaBanner
        title="Have an urgent requirement or facility visit request?"
        description={
          <>
            Call or email our executive office directly at{' '}
            <a href={c.contact.phone.href} className="font-semibold underline hover:text-white">
              {c.contact.phone.label}
            </a>{' '}
            or{' '}
            <a href={`mailto:${c.contact.email}`} className="font-semibold underline hover:text-white">
              {c.contact.email}
            </a>
            .
          </>
        }
      />
    </>
  )
}
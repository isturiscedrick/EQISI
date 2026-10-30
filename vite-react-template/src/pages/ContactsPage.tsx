import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import * as c from '@/content/eqisi'

export function Component() {
  return (
    <>
      <PageMeta
        title="Contact Us"
        description="Get in touch with EQISI executive leadership or visit our offices in Quezon City, Cabuyao Laguna, and Bulacan."
      />

      {/* Hero Section */}
      <section className="border-b border-border bg-canvas py-16 sm:py-24" aria-labelledby="contact-hero">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1 text-xs font-bold tracking-wider text-warning uppercase">
              <span className="size-2 rounded-full bg-highlight" />
              Direct Communication
            </div>
            <h1 id="contact-hero" className="mt-4 text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">
              Get in Touch with EQISI
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              Whether you are exploring warehouse automation, require manpower deployments, or have general business inquiries, our executive team is ready to assist you.
            </p>
          </div>
        </Container>
      </section>

      {/* Direct Contact & Offices */}
      <Section id="direct-contact" muted eyebrow="Direct Contacts" title="Executive Inquiries &amp; Office Locations">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Executive Direct Card */}
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-8 shadow-card">
            <div>
              <span className="text-xs font-bold text-warning uppercase tracking-wider">Executive Contact</span>
              <h3 className="mt-2 text-2xl font-bold text-fg">{c.contact.person}</h3>
              <p className="text-base font-semibold text-primary">{c.contact.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                Reach out directly for partnership proposals, manpower service agreements, nationwide warehousing inquiries, and enterprise solutions.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-center gap-4 rounded-xl border border-border bg-canvas p-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                    &#9742;
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">Direct Mobile / Phone</p>
                    <a
                      href={c.contact.phone.href}
                      className="text-base font-bold text-fg hover:text-primary transition-colors underline"
                    >
                      {c.contact.phone.label}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border bg-canvas p-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                    &#9993;
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-fg-muted">Official Email</p>
                    <a
                      href={`mailto:${c.contact.email}`}
                      className="text-base font-bold text-fg hover:text-primary transition-colors underline break-all"
                    >
                      {c.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-surface-muted p-4 text-xs font-medium text-fg-muted">
              Operational Hours: Monday &ndash; Friday, 8:00 AM &ndash; 5:00 PM (Philippine Standard Time).
            </div>
          </div>

          {/* Offices List */}
          <div className="flex flex-col gap-4">
            {c.contact.offices.map((office, idx) => (
              <div key={office.name} className="rounded-2xl border border-border bg-surface p-6 shadow-subtle">
                <div className="flex items-center gap-2">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-highlight/20 text-xs font-bold text-highlight">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold text-warning uppercase tracking-wider">
                    {office.name === 'Head Quarters' ? 'Main Headquarters' : 'Branch Facility'}
                  </span>
                </div>
                <h4 className="mt-2 text-xl font-bold text-fg">{office.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Direct Communication Strip */}
      <section className="bg-primary py-16 text-primary-fg sm:py-20">
        <Container className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Have an urgent requirement or facility visit request?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-fg/90">
            Call or email our executive office directly at{' '}
            <a href={c.contact.phone.href} className="underline font-semibold hover:text-white">
              {c.contact.phone.label}
            </a>{' '}
            or{' '}
            <a href={`mailto:${c.contact.email}`} className="underline font-semibold hover:text-white">
              {c.contact.email}
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  )
}

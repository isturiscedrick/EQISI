import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import { siteConfig } from '@/config/site'
import * as c from '@/content/eqisi'
import { asset } from '@/lib/assets'
import { cn } from '@/lib/cn'

const card = 'rounded-lg border border-border bg-surface p-6'
const chip = 'rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold'

function NumberedGrid({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <li key={item} className={card}>
          <span className="text-sm font-bold tracking-widest text-warning">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="mt-1 text-lg font-semibold">{item}</h3>
        </li>
      ))}
    </ul>
  )
}

export function Component() {
  return (
    <>
      <PageMeta title={siteConfig.name} description={siteConfig.description} />

      <section id="home" className="border-b border-border">
        <Container className="grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-bold tracking-widest text-warning uppercase">Company profile 2025</p>
            <h1 className="mt-3 text-display text-balance text-primary">{siteConfig.tagline}</h1>
            <p className="mt-6 max-w-prose text-lg text-fg-muted">
              EQISI provides warehousing, manpower and supply chain services, backed by technology that keeps payroll,
              people and inventory moving on time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className={buttonStyles({ size: 'lg' })}>Contact us</a>
              <a href="#systems" className={buttonStyles({ size: 'lg', variant: 'secondary' })}>Our systems</a>
            </div>
          </div>
          <img
            src={asset('factory.webp')}
            alt="Inside a busy manufacturing and warehouse facility"
            width={900}
            height={1029}
            className="aspect-[16/10] w-full rounded-xl border-b-8 border-highlight object-cover shadow-elevated lg:aspect-[4/5]"
          />
        </Container>
      </section>

      <section id="about" aria-labelledby="about-heading" className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-warning uppercase">Get to know us</p>
            <h2 id="about-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              Innovative services for manufacturers and warehouses
            </h2>
            {c.about.map((p) => (
              <p key={p} className="mt-4 max-w-prose text-fg-muted">{p}</p>
            ))}
          </div>
          <img src={asset('industry.webp')} alt="Industrial plant with steel structures" width={900} height={1012} loading="lazy" className="max-h-[30rem] w-full rounded-xl object-cover" />
        </Container>
      </section>

      <Section id="systems" muted eyebrow="Systems" title="Six systems that run your workforce and supply chain">
        <NumberedGrid items={c.systems} />
      </Section>

      <Section id="mission" eyebrow="Mission & vision" title="Where we are headed">
        <div className="grid gap-4 md:grid-cols-2">
          {[['Mission', c.mission], ['Vision', c.vision]].map(([title, text]) => (
            <div key={title} className="rounded-lg bg-primary p-8 text-primary-fg">
              <h3 className="text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-lg">{text}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-12 mb-4 text-2xl font-bold">Our values</h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {c.values.map((v) => (
            <li key={v.name} className={card}>
              <h4 className="text-lg font-semibold">{v.name}</h4>
              <p className="mt-2 text-fg-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="team" muted eyebrow="Leadership" title="Our executive team">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.team.map((m) => (
            <li key={m.name} className="overflow-hidden rounded-lg border border-b-4 border-border border-b-highlight bg-surface">
              <img src={asset(m.photo)} alt={`Portrait of ${m.name}`} width={420} height={525} loading="lazy" className="aspect-[4/5] w-full object-cover object-top" />
              <div className="p-4">
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-fg-muted">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="industries" eyebrow="Industries" title="We operate in these industries">
        <NumberedGrid items={c.industries} />
        <h3 className="mt-14 text-2xl font-bold">We are not limited to blue collar workers</h3>
        <p className="mt-2 mb-5 max-w-prose text-fg-muted">We also provide white collar personnel across various multinational industries.</p>
        <ul className="flex flex-wrap gap-3">
          {c.workforce.map((w) => (
            <li key={w} className={chip}>{w}</li>
          ))}
        </ul>
      </Section>

      <Section id="clients" muted eyebrow="Our clients" title="Trusted by leading brands">
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
          {c.clients.map((client) => (
            <li key={client.name} className="grid aspect-square place-items-center overflow-hidden rounded-full border-4 border-border bg-white">
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

      <section id="edge" aria-labelledby="edge-heading" className="py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-warning uppercase">Edge in the market</p>
            <h2 id="edge-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Why companies choose EQISI</h2>
            <ol className="mt-8 space-y-4">
              {c.edge.map((e, i) => (
                <li key={e} className={cn(card, 'py-4')}>
                  <span className="mr-3 text-sm font-bold tracking-widest text-warning">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-lg font-semibold">{e}</span>
                </li>
              ))}
            </ol>
          </div>
          <img src={asset('edge.webp')} alt="Robotic arm on a production line" width={900} height={506} loading="lazy" className="w-full rounded-xl object-cover" />
        </Container>
      </section>

      <Section id="leverage" muted eyebrow="Leverage" title="Ready for multinational companies" lead={c.leverageIntro}>
        <ul className="flex flex-wrap gap-3">
          {c.leverage.map((l) => (
            <li key={l} className={chip}>{l}</li>
          ))}
        </ul>
      </Section>

      <section id="benefits" aria-labelledby="benefits-heading" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold tracking-widest text-warning uppercase">Employee benefits</p>
            <h2 id="benefits-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Real-time pay and benefits, from any phone</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.benefits.map((b, i) => (
                <li key={b} className={cn(card, 'p-4 text-sm font-semibold')}>
                  <span className="mr-2 font-bold text-warning">{String(i + 1).padStart(2, '0')}</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img src={asset('benefits.webp')} alt="Workers on a production floor" width={900} height={507} loading="lazy" className="w-full rounded-xl object-cover" />
            <ul className="mt-5 space-y-3">
              {c.benefitReasons.map((r) => (
                <li key={r} className={cn(card, 'p-4 text-fg-muted')}>{r}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <Section id="recruitment" muted eyebrow="Recruitment & talent management" title="From new client to deployed team">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.recruitment.map((s) => (
            <li key={s.title} className="rounded-lg border border-t-4 border-border border-t-primary bg-surface p-5">
              <span className="inline-block rounded-full bg-surface-muted px-3 py-0.5 text-sm font-bold">{s.duration}</span>
              <h3 className="mt-3 font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-fg-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 font-bold text-primary">Total timeline: {c.recruitmentTimeline}</p>
      </Section>

      <section id="contact" aria-labelledby="contact-heading" className="bg-primary py-16 text-primary-fg sm:py-20">
        <Container>
          <p className="text-sm font-bold tracking-widest uppercase">Contact us</p>
          <h2 id="contact-heading" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Thank you!</h2>
          <p className="mt-3 max-w-prose">Reach out to {c.contact.person}, {c.contact.role}.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-primary-fg/30 bg-primary-fg/10 p-6">
              <h3 className="font-semibold">Phone</h3>
              <a className="mt-1 block underline" href={c.contact.phone.href}>{c.contact.phone.label}</a>
            </div>
            <div className="rounded-lg border border-primary-fg/30 bg-primary-fg/10 p-6">
              <h3 className="font-semibold">Email</h3>
              <a className="mt-1 block break-all underline" href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
            </div>
            {c.contact.offices.map((o) => (
              <div key={o.name} className="rounded-lg border border-primary-fg/30 bg-primary-fg/10 p-6">
                <h3 className="font-semibold">{o.name}</h3>
                <p className="mt-1">{o.address}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}

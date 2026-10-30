import { useState, type FormEvent } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { PageMeta } from '@/components/seo/PageMeta'
import { buttonStyles } from '@/components/ui/button-styles'
import * as c from '@/content/eqisi'
import { cn } from '@/lib/cn'

export function Component() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: 'Business Proposal / Services',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = 'Full name is required'
    if (!formData.email.trim()) {
      errs.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address'
    }
    if (!formData.phone.trim()) errs.phone = 'Contact number is required'
    if (!formData.message.trim()) errs.message = 'Please provide a brief message or description of your needs'
    return errs
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStatus('submitting')

    // Simulate submission
    setTimeout(() => {
      setStatus('success')
    }, 600)
  }

  function handleReset() {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      inquiryType: 'Business Proposal / Services',
      message: '',
    })
    setStatus('idle')
    setErrors({})
  }

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
              Whether you are exploring warehouse automation, require manpower deployments, or have general business inquiries, our executive team is here to assist you.
            </p>
          </div>
        </Container>
      </section>

      {/* Direct Contact & Offices */}
      <Section id="direct-contact" muted eyebrow="Direct Contacts" title="Executive Inquiries &amp; Office Locations">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Executive Direct */}
          <div className="rounded-xl border border-border bg-surface p-8 shadow-card flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-warning uppercase tracking-wider">Executive Contact</span>
              <h3 className="mt-2 text-2xl font-bold text-fg">{c.contact.person}</h3>
              <p className="text-sm font-medium text-primary">{c.contact.role}</p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    &#9742;
                  </span>
                  <div>
                    <p className="text-xs font-medium text-fg-muted">Phone / Mobile</p>
                    <a
                      href={c.contact.phone.href}
                      className="font-semibold text-fg hover:text-primary transition-colors underline"
                    >
                      {c.contact.phone.label}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm">
                    &#9993;
                  </span>
                  <div>
                    <p className="text-xs font-medium text-fg-muted">Official Email</p>
                    <a
                      href={`mailto:${c.contact.email}`}
                      className="font-semibold text-fg hover:text-primary transition-colors underline break-all"
                    >
                      {c.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg bg-surface-muted p-4 text-xs text-fg-muted">
              Office Hours: Monday &ndash; Friday, 8:00 AM &ndash; 5:00 PM PHT.
            </div>
          </div>

          {/* Offices List */}
          <div className="flex flex-col gap-4">
            {c.contact.offices.map((office, idx) => (
              <div key={office.name} className="rounded-xl border border-border bg-surface p-6 shadow-subtle">
                <span className="text-xs font-bold text-highlight uppercase tracking-wider">
                  Location 0{idx + 1}
                </span>
                <h4 className="mt-1 text-lg font-bold text-fg">{office.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Interactive Form Section */}
      <section className="py-16 sm:py-24 bg-canvas" aria-labelledby="form-heading">
        <Container>
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p className="text-sm font-bold tracking-widest text-warning uppercase">Send A Message</p>
              <h2 id="form-heading" className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                Submit an Online Inquiry
              </h2>
              <p className="mt-3 text-base text-fg-muted">
                Complete the form below and an EQISI representative will contact you promptly.
              </p>
            </div>

            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="mt-10 rounded-2xl border border-success/40 bg-success/10 p-8 text-center shadow-card"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success text-xl text-white font-bold">
                  &#10003;
                </div>
                <h3 className="mt-4 text-2xl font-bold text-fg">Message Received!</h3>
                <p className="mt-2 text-base text-fg-muted">
                  Thank you, <strong className="text-fg">{formData.name}</strong>. Your message regarding{' '}
                  <em>{formData.inquiryType}</em> has been recorded. Our team will get in touch via{' '}
                  <strong className="text-fg">{formData.email}</strong> or <strong className="text-fg">{formData.phone}</strong>.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleReset}
                    className={buttonStyles({ variant: 'secondary' })}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-6 rounded-2xl border border-border bg-surface p-8 shadow-card">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-semibold text-fg">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={cn(
                        'mt-2 block w-full rounded-lg border bg-canvas px-4 py-2.5 text-base text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
                        errors.name ? 'border-danger' : 'border-border',
                      )}
                      placeholder="Juan Dela Cruz"
                    />
                    {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-semibold text-fg">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={cn(
                        'mt-2 block w-full rounded-lg border bg-canvas px-4 py-2.5 text-base text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
                        errors.email ? 'border-danger' : 'border-border',
                      )}
                      placeholder="name@company.com"
                    />
                    {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-semibold text-fg">
                      Contact Number <span className="text-danger">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={cn(
                        'mt-2 block w-full rounded-lg border bg-canvas px-4 py-2.5 text-base text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
                        errors.phone ? 'border-danger' : 'border-border',
                      )}
                      placeholder="+63 9XX XXX XXXX"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-semibold text-fg">
                      Company / Organization
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-2 block w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-base text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Company Inc."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-inquiry" className="block text-sm font-semibold text-fg">
                    Inquiry Type
                  </label>
                  <select
                    id="contact-inquiry"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="mt-2 block w-full rounded-lg border border-border bg-canvas px-4 py-2.5 text-base text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Business Proposal / Services">Warehousing &amp; Supply Chain Services</option>
                    <option value="Manpower Request / Staffing">Manpower &amp; Staffing Deployment</option>
                    <option value="Automation & Systems">Automation Systems (Payroll, HRIS, WMS)</option>
                    <option value="Career / Job Application">Career / Job Application</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-fg">
                    Your Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={cn(
                      'mt-2 block w-full rounded-lg border bg-canvas px-4 py-2.5 text-base text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
                      errors.message ? 'border-danger' : 'border-border',
                    )}
                    placeholder="Tell us about your operational requirements, timeline, or inquiries..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={cn(buttonStyles({ size: 'lg' }), 'w-full')}
                  >
                    {status === 'submitting' ? 'Submitting Inquiry...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
    </>
  )
}

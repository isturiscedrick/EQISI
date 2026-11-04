import { useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Send } from 'lucide-react'
import { contact } from '@/content/eqisi'
import { cn } from '@/lib/cn'

const services = ['Manpower deployment', 'Warehousing', 'Logistics and fleet support', 'Management systems', 'General business inquiry']

export function SmartInquiryForm() {
  const [step, setStep] = useState(0)
  const [service, setService] = useState(services[0])
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState('')

  const next = () => {
    setError('')
    if (step === 1 && (!name.trim() || !company.trim() || !email.trim())) {
      setError('Please complete your name, company, and email address.')
      return
    }
    setStep((current) => Math.min(2, current + 1))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const subject = encodeURIComponent(`EQISI inquiry: ${service}`)
    const body = encodeURIComponent(
      `Service: ${service}\nName: ${name}\nCompany: ${company}\nEmail: ${email}\nLocation: ${location || 'Not provided'}\nRequirements: ${details || 'Not provided'}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-surface p-5 shadow-card sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold tracking-[0.16em] text-warning uppercase">Guided inquiry</p>
          <h3 className="mt-1 text-xl font-bold text-fg sm:text-2xl">Tell us what your operation needs</h3>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><ClipboardList aria-hidden="true" className="size-5" /></span>
      </div>
      <ol aria-label="Inquiry steps" className="mt-6 grid grid-cols-3 gap-2">
        {['Service', 'Your details', 'Review'].map((label, index) => (
          <li key={label} className={cn('rounded-lg px-2 py-2 text-center text-xs font-bold', step >= index ? 'bg-primary text-primary-fg' : 'bg-surface-muted text-fg-muted')}>
            {index + 1}. {label}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <fieldset className="mt-6">
          <legend className="text-sm font-bold text-fg">What can we help you with?</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {services.map((item) => (
              <label key={item} className={cn('flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm font-medium transition-colors', service === item ? 'border-primary bg-primary/5 text-primary' : 'border-border text-fg hover:border-primary/40')}>
                <input type="radio" name="service" value={item} checked={service === item} onChange={() => setService(item)} className="accent-[var(--primary)]" />
                {item}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold text-fg">Your name <input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="min-h-11 rounded-lg border border-border bg-canvas px-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
          <label className="grid gap-1.5 text-sm font-semibold text-fg">Company <input required autoComplete="organization" value={company} onChange={(event) => setCompany(event.target.value)} className="min-h-11 rounded-lg border border-border bg-canvas px-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
          <label className="grid gap-1.5 text-sm font-semibold text-fg">Work email <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-11 rounded-lg border border-border bg-canvas px-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
          <label className="grid gap-1.5 text-sm font-semibold text-fg">Facility / project location <input value={location} onChange={(event) => setLocation(event.target.value)} className="min-h-11 rounded-lg border border-border bg-canvas px-3 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
          <label className="grid gap-1.5 text-sm font-semibold text-fg sm:col-span-2">Briefly describe your requirements <textarea rows={3} value={details} onChange={(event) => setDetails(event.target.value)} className="rounded-lg border border-border bg-canvas px-3 py-2 font-normal outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /></label>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 rounded-2xl bg-surface-muted p-5">
          <span className="flex items-center gap-2 text-sm font-bold text-primary"><CheckCircle2 aria-hidden="true" className="size-5" /> Review your inquiry</span>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div><dt className="text-fg-muted">Service</dt><dd className="font-semibold text-fg">{service}</dd></div>
            <div><dt className="text-fg-muted">Contact</dt><dd className="font-semibold text-fg">{name} · {company}</dd></div>
            <div><dt className="text-fg-muted">Email</dt><dd className="break-all font-semibold text-fg">{email}</dd></div>
            <div><dt className="text-fg-muted">Location</dt><dd className="font-semibold text-fg">{location || 'Not provided'}</dd></div>
          </dl>
          {details && <p className="mt-4 whitespace-pre-wrap text-sm text-fg-muted">{details}</p>}
          <p className="mt-4 text-xs leading-relaxed text-fg-muted">Continue to open your email app with these details addressed to EQISI. Nothing is sent or stored by this website.</p>
        </div>
      )}

      {error && <p role="alert" className="mt-4 text-sm font-semibold text-danger">{error}</p>}
      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <button type="button" disabled={step === 0} onClick={() => { setError(''); setStep((current) => Math.max(0, current - 1)) }} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-bold text-fg transition-colors hover:bg-surface-muted disabled:invisible">
          <ArrowLeft aria-hidden="true" className="size-4" /> Back
        </button>
        {step < 2 ? (
          <button type="button" onClick={next} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-fg transition-transform hover:-translate-y-0.5">
            Continue <ArrowRight aria-hidden="true" className="size-4" />
          </button>
        ) : (
          <button type="submit" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-fg transition-transform hover:-translate-y-0.5">
            Open email draft <Send aria-hidden="true" className="size-4" />
          </button>
        )}
      </div>
    </form>
  )
}

import { useState } from 'react'
import { ArrowRight, Boxes, Truck, UsersRound, Workflow } from 'lucide-react'
import { Link } from 'react-router'
import { buttonStyles } from '@/components/ui/button-styles'
import { cn } from '@/lib/cn'

const offerings = [
  {
    id: 'manpower',
    label: 'Manpower',
    icon: UsersRound,
    title: 'A workforce built around your operation',
    description: 'Workforce sourcing, screening, deployment, and ongoing support for industrial, technical, and administrative roles.',
    points: ['Workforce planning and deployment', 'Applicant screening and onboarding', 'Training, compliance, and employee support'],
  },
  {
    id: 'warehousing',
    label: 'Warehousing',
    icon: Boxes,
    title: 'More visibility across your facility',
    description: 'Warehousing support paired with inventory and warehouse management systems for more coordinated day-to-day operations.',
    points: ['Warehouse operations support', 'Inventory and stock movement visibility', 'Warehouse management systems'],
  },
  {
    id: 'logistics',
    label: 'Logistics',
    icon: Truck,
    title: 'Keep goods and teams moving',
    description: 'Logistics and fleet support designed to help coordinate people, facilities, vehicles, and delivery activity.',
    points: ['Fleet and dispatch coordination', 'GPS-enabled monitoring capabilities', 'Operational support across locations'],
  },
  {
    id: 'technology',
    label: 'Technology',
    icon: Workflow,
    title: 'Connect the systems behind the work',
    description: 'Integrated management tools that support payroll, HR, warehouse activity, compensation, inventory, and GPS monitoring.',
    points: ['Six integrated management systems', 'Workforce and operational information', 'Connected reporting and monitoring'],
  },
] as const

export function ServiceExplorer() {
  const [active, setActive] = useState<(typeof offerings)[number]['id']>('manpower')
  const selected = offerings.find((item) => item.id === active) ?? offerings[0]
  const ActiveIcon = selected.icon

  return (
    <div className="grid gap-6 overflow-hidden rounded-3xl border border-border bg-surface p-5 shadow-card sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-xs font-extrabold tracking-[0.18em] text-warning uppercase">Explore by need</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">One partner. Connected capabilities.</h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">Choose an area to see how EQISI's services can support your operation.</p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {offerings.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(item.id)}
                className={cn(
                  'flex min-h-12 items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-bold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  isActive ? 'border-primary bg-primary text-primary-fg shadow-card' : 'border-border bg-canvas text-fg hover:border-primary/50 hover:bg-primary/5',
                )}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>
      <div key={selected.id} className="service-explorer-panel relative flex flex-col justify-between rounded-2xl bg-surface-muted p-6 sm:p-8">
        <div>
          <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-fg shadow-subtle">
            <ActiveIcon aria-hidden="true" className="size-6" />
          </span>
          <h4 className="mt-5 text-xl font-bold text-fg sm:text-2xl">{selected.title}</h4>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">{selected.label} solutions for connected operations.</p>
          <details className="mt-5 rounded-xl border border-border/80 bg-surface/70 p-4 group/details">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
              View full details
              <span aria-hidden="true" className="text-lg transition-transform group-open/details:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{selected.description}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {selected.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm font-medium text-fg">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-highlight" />
                  {point}
                </li>
              ))}
            </ul>
          </details>
        </div>
        <Link to="/contacts" className={cn(buttonStyles({ size: 'md' }), 'mt-8 w-fit')}>
          Discuss this capability <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  )
}

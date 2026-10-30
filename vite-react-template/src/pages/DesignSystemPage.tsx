import type { ReactNode } from 'react'
import { Container } from '@/components/layout/Container'
import { PageMeta } from '@/components/seo/PageMeta'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'

// Class names are written out in full so Tailwind can detect them.
const colors = [
  { token: 'canvas', swatch: 'bg-canvas' },
  { token: 'surface', swatch: 'bg-surface' },
  { token: 'surface-muted', swatch: 'bg-surface-muted' },
  { token: 'fg', swatch: 'bg-fg' },
  { token: 'fg-muted', swatch: 'bg-fg-muted' },
  { token: 'border', swatch: 'bg-border' },
  { token: 'primary', swatch: 'bg-primary' },
  { token: 'accent', swatch: 'bg-accent' },
  { token: 'success', swatch: 'bg-success' },
  { token: 'warning', swatch: 'bg-warning' },
  { token: 'danger', swatch: 'bg-danger' },
  { token: 'info', swatch: 'bg-info' },
]

const radii = [
  { token: 'sm', className: 'rounded-sm' },
  { token: 'md', className: 'rounded-md' },
  { token: 'lg', className: 'rounded-lg' },
  { token: 'xl', className: 'rounded-xl' },
]

const shadows = [
  { token: 'subtle', className: 'shadow-subtle' },
  { token: 'card', className: 'shadow-card' },
  { token: 'elevated', className: 'shadow-elevated' },
  { token: 'modal', className: 'shadow-modal' },
]

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-border py-12 first:border-t-0">
      <h2 id={id} className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  )
}

export function Component() {
  return (
    <Container className="py-12">
      <PageMeta title="Design system" description="Color, type, shape and component reference for this project." />
      <h1 className="text-4xl font-bold tracking-tight">Design system</h1>
      <p className="mt-3 max-w-prose text-fg-muted">
        Every value here comes from the tokens in src/styles/index.css. Switch your operating system between light and
        dark to see both palettes.
      </p>

      <div className="mt-8">
        <Section id="colors" title="Colors">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {colors.map(({ token, swatch }) => (
              <li key={token}>
                <div className={`h-16 rounded-md border border-border ${swatch}`} />
                <p className="mt-2 font-mono text-sm">{token}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="type" title="Typography">
          <div className="space-y-4">
            <p className="text-display">Display</p>
            <p className="text-4xl font-bold tracking-tight">Heading 1</p>
            <p className="text-2xl font-bold tracking-tight">Heading 2</p>
            <p className="text-lg font-semibold">Heading 3</p>
            <p className="max-w-prose">
              Body text uses the sans stack at a comfortable line height, and keeps lines to a readable length.
            </p>
            <p className="text-sm text-fg-muted">Caption and helper text</p>
            <p className="font-mono text-sm">Monospace for code</p>
          </div>
        </Section>

        <Section id="shape" title="Radius and shadow">
          <div className="flex flex-wrap gap-6">
            {radii.map(({ token, className }) => (
              <div key={token} className="text-center">
                <div className={`size-20 border border-border bg-surface-muted ${className}`} />
                <p className="mt-2 font-mono text-sm">{token}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {shadows.map(({ token, className }) => (
              <div key={token} className="text-center">
                <div className={`size-20 rounded-lg bg-surface ${className}`} />
                <p className="mt-2 font-mono text-sm">{token}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="buttons" title="Buttons">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button loading>Saving</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </Section>

        <Section id="alerts" title="Alerts">
          <div className="max-w-2xl space-y-3">
            <Alert variant="info" title="Information">
              Neutral context that helps someone decide what to do next.
            </Alert>
            <Alert variant="success" title="Changes saved">
              Confirms that an action worked.
            </Alert>
            <Alert variant="warning" title="Storage almost full">
              Explains a risk and what to do about it.
            </Alert>
            <Alert variant="danger" title="Couldn&rsquo;t save changes">
              Says what failed and how to fix it.
            </Alert>
          </div>
        </Section>
      </div>
    </Container>
  )
}

import { Atom, Braces, Paintbrush, Route, Shapes, Zap } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { PageMeta } from '@/components/seo/PageMeta'
import { ButtonLink } from '@/components/ui/Button'
import { siteConfig } from '@/config/site'

const stack = [
  { icon: Zap, name: 'Vite', detail: 'Dev server with instant updates, and the production build.' },
  { icon: Atom, name: 'React 19', detail: 'Components, with page titles and meta tags set from the component itself.' },
  { icon: Braces, name: 'TypeScript', detail: 'Strict type checking runs as part of npm run build.' },
  { icon: Paintbrush, name: 'Tailwind CSS 4', detail: 'Colors, type, radius and shadows are tokens in src/styles/index.css.' },
  { icon: Route, name: 'React Router', detail: 'Lazy-loaded pages, an error boundary, and focus handling on navigation.' },
  { icon: Shapes, name: 'lucide-react', detail: 'Icons that are imported one by one, so unused icons stay out of the bundle.' },
]

const layout = `src/
  app/          router and route definitions
  components/
    layout/     header, footer, page shell
    ui/         buttons, alerts and other reusable pieces
    seo/        page title and meta tags
  config/       site name and navigation
  lib/          small helpers
  pages/        one file per route
  styles/       design tokens and global styles`

export function Component() {
  return (
    <>
      <PageMeta title={siteConfig.name} description={siteConfig.description} />

      <section className="border-b border-border">
        <Container className="py-16 sm:py-24">
          <h1 className="max-w-3xl text-display text-balance">{siteConfig.tagline}</h1>
          <p className="mt-6 max-w-prose text-lg text-fg-muted">
            Routing, design tokens, an accessible page shell and a small set of components are already wired up.
            Replace this page and start building.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink to="/design-system" size="lg">
              View the design system
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-labelledby="stack-heading">
        <Container className="py-16">
          <h2 id="stack-heading" className="text-2xl font-bold tracking-tight">
            What is included
          </h2>
          <dl className="mt-8 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {stack.map(({ icon: Icon, name, detail }) => (
              <div key={name} className="flex gap-4">
                <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                <div>
                  <dt className="font-semibold">{name}</dt>
                  <dd className="text-fg-muted">{detail}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="layout-heading" className="border-t border-border">
        <Container className="py-16">
          <h2 id="layout-heading" className="text-2xl font-bold tracking-tight">
            Project layout
          </h2>
          <p className="mt-2 max-w-prose text-fg-muted">
            Code is grouped by responsibility. Add feature folders under src when the app grows.
          </p>
          <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm leading-relaxed sm:p-6">
            <code>{layout}</code>
          </pre>
        </Container>
      </section>
    </>
  )
}

import { Link } from 'react-router'
import { siteConfig } from '@/config/site'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-fg-muted sm:flex-row sm:px-6 lg:px-8">
        <div>
          <p className="font-semibold text-fg">
            &copy; {year} {siteConfig.name} &mdash; Excel Quality Integrated Solutions Inc.
          </p>
          <p className="mt-1 text-xs text-fg-muted">
            DO-174 Compliant &bull; Warehousing, Manpower &amp; Supply Chain Automation
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-xs">
          {siteConfig.nav.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-fg">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}

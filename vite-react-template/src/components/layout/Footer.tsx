import { siteConfig } from '@/config/site'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 text-sm text-fg-muted sm:px-6 lg:px-8">
        <p>
          &copy; {year} {siteConfig.name}
        </p>
      </div>
    </footer>
  )
}

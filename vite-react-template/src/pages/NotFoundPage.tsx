import { Container } from '@/components/layout/Container'
import { PageMeta } from '@/components/seo/PageMeta'
import { ButtonLink } from '@/components/ui/Button'

export function Component() {
  return (
    <Container className="py-24">
      <PageMeta title="Page not found" noIndex />
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-prose text-fg-muted">
        This address doesn&rsquo;t match any page. Check the link for typos, or go back to the home page.
      </p>
      <ButtonLink to="/" className="mt-8">
        Go to the home page
      </ButtonLink>
    </Container>
  )
}

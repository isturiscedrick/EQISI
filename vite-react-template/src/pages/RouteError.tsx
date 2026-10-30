import { RotateCcw } from 'lucide-react'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Container } from '@/components/layout/Container'
import { PageMeta } from '@/components/seo/PageMeta'
import { Alert } from '@/components/ui/Alert'
import { Button, ButtonLink } from '@/components/ui/Button'

export function Component() {
  const error = useRouteError()

  if (import.meta.env.DEV) console.error(error)

  // Show a status when the router provides one. Never render raw error messages or stacks to users.
  const detail = isRouteErrorResponse(error)
    ? `The server responded with status ${error.status}.`
    : 'An unexpected problem stopped this page from loading.'

  return (
    <Container className="max-w-3xl py-24">
      <PageMeta title="Something went wrong" noIndex />
      <h1 className="text-4xl font-bold tracking-tight">Something went wrong</h1>
      <div className="mt-6">
        <Alert variant="danger" title="This page couldn&rsquo;t be shown">
          {detail} Reload the page to try again. If it keeps happening, go back to the home page.
        </Alert>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => window.location.reload()}>
          <RotateCcw aria-hidden="true" className="size-4" />
          Reload the page
        </Button>
        <ButtonLink to="/" variant="secondary">
          Go to the home page
        </ButtonLink>
      </div>
    </Container>
  )
}

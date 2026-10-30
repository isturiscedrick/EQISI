import { siteConfig } from '@/config/site'

interface PageMetaProps {
  title: string
  description?: string
  noIndex?: boolean
}

/** React 19 hoists <title> and <meta> into <head>, so no helmet library is needed. */
export function PageMeta({ title, description = siteConfig.description, noIndex = false }: PageMetaProps) {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {noIndex && <meta name="robots" content="noindex" />}
    </>
  )
}

export interface NavItem {
  to: string
  label: string
}

export const siteConfig = {
  name: 'EQISI',
  tagline: 'We deliver with automation',
  description: 'EQISI delivers warehousing, manpower, logistics and automation services to multinational and Philippine companies.',
  nav: [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/careers', label: 'Careers' },
    { to: '/contacts', label: 'Contacts' },
  ] satisfies NavItem[],
} as const

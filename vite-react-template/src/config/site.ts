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
    { to: '/#about', label: 'About' },
    { to: '/#systems', label: 'Systems' },
    { to: '/#team', label: 'Team' },
    { to: '/#clients', label: 'Clients' },
    { to: '/#recruitment', label: 'Recruitment' },
    { to: '/#contact', label: 'Contact' },
  ] satisfies NavItem[],
} as const

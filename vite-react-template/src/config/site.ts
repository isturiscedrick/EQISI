export interface NavItem {
  to: string
  label: string
}

export const siteConfig = {
  name: 'Starter',
  tagline: 'A working starting point for your next interface',
  description: 'A Vite, React 19, TypeScript and Tailwind CSS 4 starter.',
  nav: [
    { to: '/', label: 'Home' },
    { to: '/design-system', label: 'Design system' },
  ] satisfies NavItem[],
} as const

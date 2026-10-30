import { Navigate, type RouteObject } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { Component as RouteError } from '@/pages/RouteError'

/**
 * Route definitions, kept separate from the router so tests can use createMemoryRouter.
 * Pages are lazy-loaded: each page module exports a `Component`.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        // Pathless route: errors in a page render inside the layout, so navigation stays usable.
        ErrorBoundary: RouteError,
        children: [
          { index: true, lazy: () => import('@/pages/HomePage') },
          { path: 'about', lazy: () => import('@/pages/AboutPage') },
          { path: 'services', lazy: () => import('@/pages/ServicesPage') },
          { path: 'careers', lazy: () => import('@/pages/CareersPage') },
          { path: 'contacts', lazy: () => import('@/pages/ContactsPage') },
          { path: 'contact', element: <Navigate to="/contacts" replace /> },
          { path: 'design-system', lazy: () => import('@/pages/DesignSystemPage') },
          { path: '*', lazy: () => import('@/pages/NotFoundPage') },
        ],
      },
    ],
  },
]

import type { RouteObject } from 'react-router'
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
          { path: 'design-system', lazy: () => import('@/pages/DesignSystemPage') },
          { path: '*', lazy: () => import('@/pages/NotFoundPage') },
        ],
      },
    ],
  },
]

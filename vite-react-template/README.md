# Starter

Vite, React 19, TypeScript, Tailwind CSS 4, lucide-react and React Router.

## Commands

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server                          |
| `npm run build`   | Type-check, then build for production         |
| `npm run preview` | Serve the production build locally            |
| `npm run lint`    | Lint with oxlint                              |

## Structure

```
src/
  app/          router and route definitions
  components/
    layout/     header, footer, page shell
    ui/         Button, ButtonLink, Alert
    seo/        PageMeta (title and meta tags)
  config/       site name and navigation
  lib/          small helpers
  pages/        one file per route, each exporting `Component`
  styles/       design tokens and global styles
```

## Conventions

- **Design tokens** live in `src/styles/index.css`. Edit the CSS variables there; light and dark palettes are both defined, and dark follows the operating system setting.
- **Adding a page:** create `src/pages/XPage.tsx` that exports `Component`, add a lazy route in `src/app/routes.tsx`, and add a link in `src/config/site.ts`.
- **Page titles and meta tags:** render `<PageMeta />` in each page. React 19 moves them into `<head>`.
- **Imports:** `@/` points to `src/`. Keep `vite.config.ts` and `tsconfig.app.json` in sync if you change it.
- **Deploying:** this is a single-page app using browser history, so the host must serve `index.html` for unknown paths.

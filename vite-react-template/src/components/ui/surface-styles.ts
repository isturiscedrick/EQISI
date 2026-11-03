/** Hoverable card. Pair with <Reveal className="h-full"> in grids. Add `group` behavior for icon tiles. */
export const card =
  'group h-full rounded-2xl border border-border/80 bg-gradient-to-br from-surface via-surface to-surface-muted/45 p-6 shadow-subtle transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/45 hover:shadow-elevated motion-reduce:transform-none'

/** Icon square that inverts to solid blue when its parent `group` is hovered. */
export const iconTile =
  'grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-fg group-hover:ring-primary'

/** Small pill, e.g. job roles. */
export const chip =
  'rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg transition-all duration-200 hover:border-primary/60 hover:bg-primary/5 hover:text-primary'

/** Light button for use on the blue CTA banner (a primary button would be blue on blue). */
export const bannerButton =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-surface px-6 font-semibold text-fg shadow-elevated transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface-muted hover:shadow-modal motion-reduce:transform-none'

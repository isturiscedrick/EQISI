/** Hoverable card. Pair with <Reveal className="h-full"> in grids. Add `group` behavior for icon tiles. */
export const card =
  'group h-full rounded-xl border border-border bg-surface p-6 shadow-subtle transition-all duration-200 hover:border-primary/50 hover:shadow-card motion-safe:hover:-translate-y-1'

/** Icon square that inverts to solid blue when its parent `group` is hovered. */
export const iconTile =
  'grid size-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-fg'

/** Small pill, e.g. job roles. */
export const chip =
  'rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-fg transition-colors duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary'

/** Light button for use on the blue CTA banner (a primary button would be blue on blue). */
export const bannerButton =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-surface px-6 font-semibold text-fg shadow-elevated transition-all duration-200 hover:bg-surface-muted motion-safe:hover:-translate-y-0.5'
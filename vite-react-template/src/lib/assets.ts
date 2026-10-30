const modules = import.meta.glob<string>('../assets/eqisi/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** Returns the built URL of an image in src/assets/eqisi, e.g. asset('team/gigy.webp'). */
export function asset(path: string): string {
  const url = modules[`../assets/eqisi/${path}`]
  if (!url) throw new Error(`Image not found in src/assets/eqisi: ${path}`)
  return url
}

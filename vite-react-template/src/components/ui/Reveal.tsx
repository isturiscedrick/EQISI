import { useEffect, useRef, useState, type ComponentProps, type CSSProperties } from 'react'
import { cn } from '@/lib/cn'

interface RevealProps extends ComponentProps<'div'> {
  /** Stagger delay in milliseconds. */
  delay?: number
}

/** Fades its children up once, the first time they scroll into view. */
export function Reveal({ delay = 0, className, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </div>
  )
}
import { useEffect, useRef, useState, type ComponentProps, type CSSProperties } from 'react'
import { gsap } from 'gsap'
import { animate, stagger } from 'animejs'
import { cn } from '@/lib/cn'

interface RevealProps extends ComponentProps<'div'> {
  /** Stagger delay in milliseconds. */
  delay?: number
}

/**
 * Scroll reveal: GSAP animates the section wrapper while Anime.js staggers
 * its immediate children. Both animations are reverted when unmounted.
 */
export function Reveal({ delay = 0, className, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

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
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node || !visible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      gsap.fromTo(
        node,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          delay: delay / 1000,
          ease: 'power3.out',
          clearProps: 'opacity,visibility,transform',
        },
      )
    }, node)

    const childrenToAnimate = Array.from(node.children).filter(
      (child): child is HTMLElement => child instanceof HTMLElement,
    )

    const childAnimation =
      childrenToAnimate.length > 0
        ? animate(childrenToAnimate, {
            opacity: [0, 1],
            translateY: [14, 0],
            duration: 620,
            delay: stagger(75),
            ease: 'out(3)',
          })
        : null

    return () => {
      context.revert()
      childAnimation?.revert()
    }
  }, [visible, delay])

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

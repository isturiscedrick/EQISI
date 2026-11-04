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
    const images = Array.from(node.querySelectorAll<HTMLImageElement>('img'))
    const imageContext = gsap.context(() => {
      if (!images.length) return
      gsap.fromTo(images, { yPercent: 0 }, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
      gsap.fromTo(
        images,
        { clipPath: 'inset(0 0 12% 0)', scale: 1.035 },
        {
          clipPath: 'inset(0 0 0% 0)',
          scale: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'clipPath,transform',
        },
      )
    }, node)

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

    // Anime.js adds a small pointer-only lift to interactive cards. Touch users
    // keep the existing CSS feedback without hover-only movement.
    const cards = Array.from(node.querySelectorAll<HTMLElement>('.group'))
    const hoverAnimations = new Map<HTMLElement, { revert: () => void }>()
    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const card = event.currentTarget as HTMLElement
      hoverAnimations.get(card)?.revert()
      hoverAnimations.set(card, animate(card, {
        translateY: -4,
        scale: 1.008,
        duration: 220,
        ease: 'out(3)',
      }))
    }
    const onLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement
      hoverAnimations.get(card)?.revert()
      hoverAnimations.delete(card)
      animate(card, { translateY: 0, scale: 1, duration: 260, ease: 'out(3)' })
    }
    cards.forEach((card) => {
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
      })
      hoverAnimations.forEach((animation) => animation.revert())
      hoverAnimations.clear()
      imageContext.revert()
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

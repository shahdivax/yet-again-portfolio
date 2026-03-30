"use client"

import { useLayoutEffect, useRef } from "react"
import type React from "react"
import { useInView } from "framer-motion"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  trigger?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  trigger = true,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = (!isView || isInView) && trigger

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: any = null
    let resizeObserver: any = null

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const currentAnnotation = annotate(element, annotationConfig)
      annotation = currentAnnotation
      currentAnnotation.show()

      // RoughNotation draws SVG overlays on top of the DOM using fixed absolute positions
      // relative to the parent. Because the Hero container uses Framer Motion scroll parallax
      // or re-renders during responsive events, we MUST constantly update the annotation's
      // SVG position on any scroll or window resize.
      const handleScroll = () => {
        if (currentAnnotation) {
          // RoughNotation can be heavy on scroll. Only update position, don't reanimate.
          currentAnnotation.hide()
          requestAnimationFrame(() => {
              currentAnnotation.show()
          })
        }
      }

      resizeObserver = new ResizeObserver(handleScroll)
      resizeObserver.observe(element)
      resizeObserver.observe(document.body)
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })

      return () => {
        annotation?.remove()
        if (resizeObserver) {
          resizeObserver.disconnect()
        }
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }

    return () => {
      annotation?.remove()
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    trigger,
  ])

  return (
    <span ref={elementRef} className="relative inline bg-transparent">
      {children}
    </span>
  )
}

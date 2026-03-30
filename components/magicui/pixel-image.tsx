"use client"

import { useEffect, useMemo, useState } from "react"

import { cn } from "@/lib/utils"

type Grid = {
  rows: number
  cols: number
}

const DEFAULT_GRIDS: Record<string, Grid> = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
}

type PredefinedGridKey = keyof typeof DEFAULT_GRIDS

interface PixelImageProps {
  src: string
  grid?: PredefinedGridKey
  customGrid?: Grid
  grayscaleAnimation?: boolean
  pixelFadeInDuration?: number // in ms
  maxAnimationDelay?: number // in ms
  colorRevealDelay?: number // in ms
  className?: string
}

export const PixelImage = ({
  src,
  grid = "6x4",
  customGrid,
  grayscaleAnimation = false,
  pixelFadeInDuration = 300,
  maxAnimationDelay = 1500,
  colorRevealDelay = 500,
  className,
}: PixelImageProps) => {
  const MIN_GRID = 1
  const MAX_GRID = 16

  const [isVisible, setIsVisible] = useState(false)
  const [showColor, setShowColor] = useState(false)
  const [animationTrigger, setAnimationTrigger] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Initial trigger to start animation after mount
    setTimeout(() => {
      setAnimationTrigger(1)
    }, 100)
  }, [])

  const { rows, cols } = useMemo(() => {
    const isValidGrid = (grid?: Grid) => {
      if (!grid) return false
      const { rows, cols } = grid
      return (
        Number.isInteger(rows) &&
        Number.isInteger(cols) &&
        rows >= MIN_GRID &&
        cols >= MIN_GRID &&
        rows <= MAX_GRID &&
        cols <= MAX_GRID
      )
    }

    return isValidGrid(customGrid) ? customGrid! : DEFAULT_GRIDS[grid]
  }, [customGrid, grid])

  const triggerAnimation = () => {
    setIsAnimationComplete(false)
    setIsVisible(false)
    setShowColor(false)
    // Small delay to allow opacity-0 to apply before re-triggering
    setTimeout(() => {
      setAnimationTrigger(prev => prev + 1)
    }, 50)
  }

  useEffect(() => {
    if (!mounted) return
    
    setIsVisible(true)
    const colorTimeout = setTimeout(() => {
      setShowColor(true)
    }, colorRevealDelay)
    
    // Fully render the solid image once all grid pieces have finished animating
    const completeTimeout = setTimeout(() => {
      setIsAnimationComplete(true)
    }, maxAnimationDelay + pixelFadeInDuration)

    return () => {
      clearTimeout(colorTimeout)
      clearTimeout(completeTimeout)
    }
  }, [colorRevealDelay, animationTrigger, grayscaleAnimation, mounted, maxAnimationDelay, pixelFadeInDuration])

  const pieces = useMemo(() => {
    const total = rows * cols
    return Array.from({ length: total }, (_, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      // Ensure stable clip-path format without variable string interpolation formatting differences
      const colStep = 100 / cols
      const rowStep = 100 / rows
      const clipPath = `polygon(${col * colStep}% ${row * rowStep}%, ${(col + 1) * colStep}% ${row * rowStep}%, ${(col + 1) * colStep}% ${(row + 1) * rowStep}%, ${col * colStep}% ${(row + 1) * rowStep}%)`

      // Use index-based deterministic pseudo-random delay to prevent hydration mismatches
      const deterministicRandom = ((index * 137) % 100) / 100
      const delay = deterministicRandom * maxAnimationDelay
      
      return {
        clipPath,
        delay,
      }
    })
  }, [rows, cols, maxAnimationDelay])

  if (!mounted) {
    return null
  }

  return (
    <div 
      className={cn("relative w-full h-full select-none", className)}
      onMouseEnter={triggerAnimation}
    >
      {/* Solid image overlay to hide grid seams after animation */}
      <img
        src={src}
        alt="Full image"
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-10 transition-all duration-300",
          isAnimationComplete ? "opacity-100" : "opacity-0 pointer-events-none",
          grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
        )}
        style={{
          transition: grayscaleAnimation
            ? `opacity 300ms ease-out, filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "opacity 300ms ease-out",
        }}
        draggable={false}
      />

      {/* Animated grid pieces */}
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all ease-out",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{
            clipPath: piece.clipPath,
            transitionDelay: `${piece.delay}ms`,
            transitionDuration: `${pixelFadeInDuration}ms`,
          }}
        >
          <img
            src={src}
            alt={`Pixel image piece ${index + 1}`}
            className={cn(
              "z-1 object-cover w-full h-full",
              grayscaleAnimation && (showColor ? "grayscale-0" : "grayscale")
            )}
            style={{
              transition: grayscaleAnimation
                ? `filter ${pixelFadeInDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : "none",
            }}
            draggable={false}
          />
        </div>
      ))}
    </div>
  )
}

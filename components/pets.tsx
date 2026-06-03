"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PetState = "idle" | "walk" | "run" | "swipe" | "wallclimb" | "wallgrab" | "fall_from_grab";
type CursorTarget = { xPercent: number; yFromBottom: number };

interface PetProps {
  type: string;
  color: string;
  initialX: number;
  className?: string; // To allow hiding on mobile
  yOffset?: string; // Fine-tune vertical alignment per animal
  canClimb?: boolean;
  followCursor?: boolean;
  cursorTarget?: CursorTarget | null;
}

const Pet = ({ type, color, initialX, className = "", yOffset = "0px", canClimb = false, followCursor = false, cursorTarget = null }: PetProps) => {
  const [state, setState] = useState<PetState>("walk");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 for right/up, -1 for left/down
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(0); // 0 is ground (viewport bottom)
  const [onWall, setOnWall] = useState<"none" | "left" | "right">("none");
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Move loop
  useEffect(() => {
    if (isDragging) return;
    if (followCursor && cursorTarget) {
      setState("run");
      setOnWall("none");
      setDirection(cursorTarget.xPercent >= x ? 1 : -1);
    } else if (state === "swipe" || state === "wallgrab" || state === "idle") {
      return;
    }

    const moveInterval = setInterval(() => {
      if (followCursor && cursorTarget) {
        setX((prevX) => {
          const nextX = prevX + (cursorTarget.xPercent - prevX) * 0.08;
          return Math.min(96, Math.max(4, nextX));
        });
        setY((prevY) => {
          const nextY = prevY + (Math.max(0, cursorTarget.yFromBottom - 32) - prevY) * 0.08;
          return Math.min(900, Math.max(0, nextY));
        });
        return;
      }

      if (y > 0 && onWall === "none") {
        setY((prevY) => Math.max(0, prevY - 8));
      }

      if (state === "fall_from_grab") {
        setY((prevY) => {
          const newY = prevY - 15; // Fall fast (px per tick)
          if (newY <= 0) {
            setState("walk");
            setOnWall("none");
            return 0;
          }
          return newY;
        });
        return;
      }

      if (onWall !== "none") {
        // Climbing
        setY((prevY) => {
          const speed = state === "run" ? 12 : 5; // px per tick
          let newY = prevY + speed * direction;
          
          if (newY > 800) { // Max climb height (800px up the page)
            setDirection(-1); // Climb down
            newY = 800;
          } else if (newY <= 0) {
            // Hit ground
            setOnWall("none");
            setState("walk");
            setDirection(onWall === "left" ? 1 : -1);
            newY = 0;
          }
          return newY;
        });
      } else {
        // Walking on ground
        setX((prevX) => {
          const speed = state === "run" ? 1.0 : 0.4;
          let newX = prevX + speed * direction;
          
          if (newX >= 96) {
            newX = 96;
            if (canClimb && Math.random() > 0.4) {
              setOnWall("right");
              setState("wallclimb");
              setDirection(1);
            } else {
              setDirection(-1);
            }
          } else if (newX <= 4) {
            newX = 4;
            if (canClimb && Math.random() > 0.4) {
              setOnWall("left");
              setState("wallclimb");
              setDirection(1);
            } else {
              setDirection(1);
            }
          }
          
          return newX;
        });
      }
    }, 100);

    return () => clearInterval(moveInterval);
  }, [state, direction, onWall, canClimb, followCursor, cursorTarget, x, y, isDragging]);

  // State loop
  useEffect(() => {
    if (isDragging) return;

    const stateInterval = setInterval(() => {
      if (state === "swipe" || state === "fall_from_grab") return;

      if (onWall !== "none") {
        const states: PetState[] = ["wallclimb", "wallgrab"];
        const randomState = states[Math.floor(Math.random() * states.length)];
        setState(randomState);
        
        if (randomState === "wallgrab" && Math.random() > 0.6) {
           setTimeout(() => setState("fall_from_grab"), 1000);
        } else if (randomState === "wallclimb" && Math.random() > 0.7) {
           setDirection((prev) => (prev === 1 ? -1 : 1));
        }
      } else {
        const states: PetState[] = ["idle", "walk", "run"];
        const randomState = states[Math.floor(Math.random() * states.length)];
        setState(randomState);
        
        if (Math.random() > 0.7) {
          setDirection((prev) => (prev === 1 ? -1 : 1));
        }
      }
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(stateInterval);
  }, [state, onWall, isDragging]);

  const handleInteract = () => {
    if (isDragging) return;
    if (state === "swipe" || state === "fall_from_grab") return;
    
    if (onWall !== "none") {
      setState("fall_from_grab");
    } else {
      const prevState = state;
      setState("swipe");
      setTimeout(() => {
        setState(prevState === "idle" ? "walk" : prevState);
      }, 2500);
    }
  };

  const moveToPointer = (clientX: number, clientY: number) => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    setX(Math.min(96, Math.max(4, ((clientX - parentRect.left) / parentRect.width) * 100)));
    setY(Math.min(parentRect.height - 32, Math.max(0, parentRect.bottom - clientY - 32)));
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
    setState("idle");
    setOnWall("none");
    moveToPointer(event.clientX, event.clientY);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    moveToPointer(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    setState("walk");
  };

  const getSpriteSrc = () => {
    return `/pets/${type}/${color}_${state}_8fps.gif`;
  };

  // Determine scaling based on wall state and direction
  let scaleX = direction === 1 ? 1 : -1;
  let scaleY = 1;
  const rotate = "0deg";
  
  if (onWall === "right") {
    // Natively, wallclimb sprites face right (paws on right)
    scaleX = 1;
    scaleY = direction === 1 ? 1 : -1;
  } else if (onWall === "left") {
    // Flip X so paws are on the left
    scaleX = -1;
    scaleY = direction === 1 ? 1 : -1;
  }

  // If falling, revert to upright walking pose but offset
  if (state === "fall_from_grab") {
    scaleX = onWall === "right" ? -1 : 1;
    scaleY = 1;
  }

  const translateX = "-50%"; // Always center to prevent snapping

  return (
    <motion.div
      ref={containerRef}
      className={`absolute cursor-grab active:cursor-grabbing pointer-events-auto flex touch-none select-none flex-col items-center ${className}`}
      style={{ 
        left: `${x}%`, 
        bottom: `${y}px`,
        transform: `translate(${translateX}, ${onWall === "none" ? yOffset : "0px"})`,
        zIndex: onWall !== "none" ? 50 : 10
      }}
      onHoverStart={handleInteract}
      onClick={handleInteract}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      whileHover={{ scale: 1.1 }}
    >
      <div 
        className="relative h-16 w-16 transition-transform duration-200"
        style={{ transform: `scaleX(${scaleX}) scaleY(${scaleY}) rotate(${rotate})` }}
      >
        <Image
          src={getSpriteSrc()}
          alt={`${color} ${type} pet`}
          fill
          unoptimized
          draggable={false}
          className="object-contain drop-shadow-md"
        />
      </div>
    </motion.div>
  );
};

export default function RoamingPets() {
  const [cursorTarget, setCursorTarget] = useState<CursorTarget | null>(null);
  const [catFollowsCursor, setCatFollowsCursor] = useState(false);
  const petLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const rect = petLayerRef.current?.getBoundingClientRect();
      if (!rect) return;

      setCursorTarget({
        xPercent: ((event.clientX - rect.left) / rect.width) * 100,
        yFromBottom: rect.bottom - event.clientY,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useEffect(() => {
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;

    const followInterval = setInterval(() => {
      setCatFollowsCursor(true);
      releaseTimer = setTimeout(() => setCatFollowsCursor(false), 5000 + Math.random() * 3000);
    }, 12000 + Math.random() * 8000);

    return () => {
      clearInterval(followInterval);
      if (releaseTimer) clearTimeout(releaseTimer);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <div ref={petLayerRef} className="absolute inset-y-0 w-full max-w-[1000px] left-1/2 -translate-x-1/2 pointer-events-none border-none">
        {/* Always visible (Mobile & Desktop) */}
        <Pet type="cat" color="orange" initialX={20} yOffset="0px" canClimb={true} followCursor={catFollowsCursor} cursorTarget={cursorTarget} />
        <Pet type="panda" color="brown" initialX={50} yOffset="-4px" />
        
        {/* Hidden on mobile, visible on desktop */}
        <Pet type="cat" color="lightbrown" initialX={70} yOffset="0px" className="hidden md:flex" canClimb={true} />
        <Pet type="dog" color="akita" initialX={90} yOffset="0px" className="hidden md:flex" />
      </div>
    </div>
  );
}

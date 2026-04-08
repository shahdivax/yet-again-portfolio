"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PetState = "idle" | "walk" | "run" | "swipe" | "wallclimb" | "wallgrab" | "fall_from_grab";

interface PetProps {
  type: string;
  color: string;
  initialX: number;
  className?: string; // To allow hiding on mobile
  yOffset?: string; // Fine-tune vertical alignment per animal
  canClimb?: boolean;
}

const Pet = ({ type, color, initialX, className = "", yOffset = "0px", canClimb = false }: PetProps) => {
  const [state, setState] = useState<PetState>("walk");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 for right/up, -1 for left/down
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(0); // 0 is ground (viewport bottom)
  const [onWall, setOnWall] = useState<"none" | "left" | "right">("none");
  const containerRef = useRef<HTMLDivElement>(null);

  // Move loop
  useEffect(() => {
    if (state === "swipe" || state === "wallgrab" || state === "idle") return;

    const moveInterval = setInterval(() => {
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
  }, [state, direction, onWall, canClimb]);

  // State loop
  useEffect(() => {
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
  }, [state, onWall]);

  const handleInteract = () => {
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
      className={`absolute cursor-pointer pointer-events-auto flex flex-col items-center ${className}`}
      style={{ 
        left: `${x}%`, 
        bottom: `${y}px`,
        transform: `translate(${translateX}, ${onWall === "none" ? yOffset : "0px"})`,
        zIndex: onWall !== "none" ? 50 : 10
      }}
      onHoverStart={handleInteract}
      onClick={handleInteract}
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
          className="object-contain drop-shadow-md"
        />
      </div>
    </motion.div>
  );
};

export default function RoamingPets() {
  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      <div className="absolute bottom-0 w-full max-w-[1000px] left-1/2 -translate-x-1/2 h-full pointer-events-none border-none">
        {/* Always visible (Mobile & Desktop) */}
        <Pet type="cat" color="orange" initialX={20} yOffset="0px" canClimb={true} />
        <Pet type="panda" color="brown" initialX={50} yOffset="-4px" />
        
        {/* Hidden on mobile, visible on desktop */}
        <Pet type="cat" color="lightbrown" initialX={70} yOffset="0px" className="hidden md:flex" canClimb={true} />
        <Pet type="dog" color="akita" initialX={90} yOffset="0px" className="hidden md:flex" />
      </div>
    </div>
  );
}

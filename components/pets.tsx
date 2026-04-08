"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PetState = "idle" | "walk" | "run" | "swipe";

interface PetProps {
  type: string;
  color: string;
  initialX: number;
  className?: string; // To allow hiding on mobile
  yOffset?: string; // Fine-tune vertical alignment per animal
}

const Pet = ({ type, color, initialX, className = "", yOffset = "0px" }: PetProps) => {
  const [state, setState] = useState<PetState>("walk");
  const [direction, setDirection] = useState<1 | -1>(1); // 1 for right, -1 for left
  const [x, setX] = useState(initialX);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simple state machine loop for roaming
  useEffect(() => {
    if (state === "swipe") return; // Don't move while interacting

    const moveInterval = setInterval(() => {
      setX((prevX) => {
        let speed = 0;
        
        // Only assign speed if actually moving
        if (state === "run") speed = 1.0;
        else if (state === "walk") speed = 0.4;

        if (speed === 0) return prevX;

        let newX = prevX + speed * direction;
        
        // Let them walk through each other but bounce off walls
        if (newX > 92) {
          setDirection(-1);
          newX = 92;
        } else if (newX < 2) {
          setDirection(1);
          newX = 2;
        }
        
        return newX;
      });
    }, 100);

    // Randomly change states
    const stateInterval = setInterval(() => {
      const states: PetState[] = ["idle", "walk", "run"];
      const randomState = states[Math.floor(Math.random() * states.length)];
      setState(randomState);
      
      // 30% chance to flip direction when changing state
      if (Math.random() > 0.7) {
        setDirection((prev) => (prev === 1 ? -1 : 1));
      }
    }, 3000 + Math.random() * 4000);

    return () => {
      clearInterval(moveInterval);
      clearInterval(stateInterval);
    };
  }, [state, direction]);

  const handleInteract = () => {
    if (state === "swipe") return;
    const prevState = state;
    setState("swipe");
    
    // Reset back to previous state after swipe animation finishes
    setTimeout(() => {
      setState(prevState === "idle" ? "walk" : prevState);
    }, 2500);
  };

  const getSpriteSrc = () => {
    // Maps states to the actual file names in public/pets/
    return `/pets/${type}/${color}_${state === "run" ? "run" : state === "swipe" ? "swipe" : state === "walk" ? "walk" : "idle"}_8fps.gif`;
  };

  return (
    <motion.div
      ref={containerRef}
      className={`absolute bottom-0 cursor-pointer flex flex-col items-center ${className}`}
      style={{ left: `${x}%`, transform: `translateY(${yOffset})` }}
      onHoverStart={handleInteract}
      onClick={handleInteract}
      whileHover={{ scale: 1.1 }}
    >
      <div 
        className="relative h-16 w-16 transition-transform duration-200"
        style={{ transform: `scaleX(${direction === 1 ? 1 : -1})` }} // Flip image based on direction
      >
        <Image
          src={getSpriteSrc()}
          alt={`${color} ${type} pet`}
          fill
          unoptimized // Need this for GIFs
          className="object-contain drop-shadow-md"
        />
      </div>
    </motion.div>
  );
};

export default function RoamingPets() {
  return (
    <div className="relative w-full h-16 flex justify-center">
      {/* Inner container provides the walking boundary, but NO visible lines/borders */}
      <div className="absolute bottom-0 w-full max-w-4xl mx-auto h-full pointer-events-auto border-none">
        {/* Always visible (Mobile & Desktop) */}
        <Pet type="cat" color="orange" initialX={20} yOffset="0px" />
        <Pet type="panda" color="brown" initialX={50} yOffset="-4px" />
        
        {/* Hidden on mobile (sm and smaller), visible on medium screens and larger */}
        <Pet type="cat" color="lightbrown" initialX={70} yOffset="0px" className="hidden md:flex" />
        <Pet type="dog" color="akita" initialX={90} yOffset="0px" className="hidden md:flex" />
      </div>
    </div>
  );
}
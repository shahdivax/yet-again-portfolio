"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "next-themes";

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [cursorText, setCursorText] = useState("");
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const { theme } = useTheme();

    // Faster and more responsive spring config
    const springConfig = { damping: 20, stiffness: 800, mass: 0.1 };
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        setMounted(true);
        const moveCursor = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if we are hovering over an element that wants a custom cursor state
            const cursorTarget = target.closest('[data-cursor="view"]');
            
            if (cursorTarget) {
                setIsHoveringCard(true);
                setCursorText("👀");
                // Center the 80px cursor correctly (80/2 = 40)
                cursorX.set(e.clientX - 40);
                cursorY.set(e.clientY - 40);
            } else {
                setIsHoveringCard(false);
                setCursorText("");
                // Normal 32px cursor (32/2 = 16)
                cursorX.set(e.clientX - 16);
                cursorY.set(e.clientY - 16);
            }
            
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseLeave = () => setIsVisible(false);

        window.addEventListener("mousemove", moveCursor);
        document.body.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!mounted) return null;

    const isDark = theme === "dark";

    return (
        <motion.div
            className={`pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full overflow-hidden transition-colors duration-300 ${
                isHoveringCard 
                    ? (isDark ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.4)]")
                    : "bg-white mix-blend-difference text-black"
            }`}
            initial={{ width: 32, height: 32 }}
            animate={{
                width: isHoveringCard ? 80 : 32,
                height: isHoveringCard ? 80 : 32,
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.4,
            }}
            transition={{
                width: { type: "spring", stiffness: 300, damping: 20 },
                height: { type: "spring", stiffness: 300, damping: 20 },
                opacity: { duration: 0.2 }
            }}
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        >
            <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                    opacity: isHoveringCard ? 1 : 0, 
                    scale: isHoveringCard ? 1 : 0.5 
                }}
                transition={{ duration: 0.2 }}
                className="text-2xl whitespace-nowrap"
            >
                {cursorText}
            </motion.span>
        </motion.div>
    );
}

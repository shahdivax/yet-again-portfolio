"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Faster and more responsive spring config
    const springConfig = { damping: 20, stiffness: 800, mass: 0.1 };
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        setMounted(true);
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
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

    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.4,
            }}
        />
    );
}

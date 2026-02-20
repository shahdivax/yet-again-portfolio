"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className={`min-h-screen w-full flex flex-col justify-center relative pt-20 overflow-hidden bg-[var(--background)] z-10 box-border border-b ${isDark ? "border-[#262626]" : "border-transparent"}`}
        >
            <motion.div
                style={{ y: y1, opacity }}
                className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full z-20"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <h1 className={`-ml-[0.05em] text-[12vw] sm:text-[10vw] font-bold tracking-tight leading-[0.85] uppercase mb-4 font-[family-name:var(--font-syne)] ${isDark ? "brutalist-outline" : "text-[var(--foreground)]"}`}>
                        <span className="block overflow-hidden pb-4">
                            <motion.span
                                className="block"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                            >
                                DIVAX SHAH
                            </motion.span>
                        </span>
                    </h1>
                    <h2 className={`text-[6vw] sm:text-[4vw] font-mono font-bold tracking-wider leading-[1] uppercase mb-8 ${isDark ? "text-[#c2410c]" : "text-[var(--accent)]"}`}>
                        <span className="block overflow-hidden pb-4">
                            <motion.span
                                className="block"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            >
                                AI & ML ENGINEER.
                            </motion.span>
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mt-12 sm:mt-24"
                >
                    <div className="max-w-xl">
                        <p className={`text-xl sm:text-2xl font-mono uppercase transition-colors duration-[800ms] ${isDark ? "text-zinc-500 font-bold tracking-wide" : "text-zinc-500"}`}>
                            Developing premium LLM, NLP, and Generative experiences. Building precision AI systems that transcend standard metrics.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a
                            href="https://huggingface.co/datasets/diabolic6045/divax-portfolio/resolve/main/public/resume.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className={`group flex items-center gap-4 relative overflow-hidden font-mono text-sm tracking-[0.2em] font-bold uppercase pb-1 transition-colors duration-[800ms] ${isDark ? "text-[var(--foreground)]" : "text-black"}`}
                        >
                            <span className={`w-6 h-[1px] ${isDark ? "bg-[var(--accent)]" : "bg-[var(--accent)]"} group-hover:scale-x-150 transform origin-left transition-transform duration-500`} />
                            <span className="relative z-10 group-hover:text-[var(--accent)] transition-colors duration-500">DOWNLOAD RESUME</span>
                        </a>
                    </div>
                </motion.div>
            </motion.div>

            {/* Extreme Physical Graphics - No glow, pure matte industrial shapes */}
            {isDark && (
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] pointer-events-none opacity-20 -z-10">
                    <div className="absolute top-0 right-0 w-full h-full border-[8px] border-[#c2410c] transform rotate-12 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <div className="absolute bottom-[-10%] left-[-20%] w-[400px] h-[400px] bg-[#1a1a1a] transform -skew-x-12" />
                </div>
            )}

            {/* Clean Light Mode Graphics */}
            {!isDark && (
                <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-gradient-to-l from-blue-50 to-transparent pointer-events-none -z-10" />
            )}
        </section>
    );
}

"use client";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";

export default function Footer() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    // Minimalistic Variables
    const boxBg = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const boxBorder = isDark ? "border-[#404040]" : "border-gray-300";
    const accentText = isDark ? "text-[#ea580c]" : "text-[#2563eb]";
    const textPrimary = isDark ? "text-white" : "text-black";
    const textSecondary = isDark ? "text-zinc-500" : "text-zinc-400";

    const socials = [
        { label: "GITHUB", handle: "SHAHDIVAX", href: "https://github.com/shahdivax" },
        { label: "LINKEDIN", handle: "DIVAX-SHAH", href: "https://www.linkedin.com/in/divax-shah/" },
        { label: "TWITTER", handle: "DIVAX_SHAH_", href: "https://x.com/divax_shah_" },
        { label: "HUGGINGFACE", handle: "DIABOLIC6045", href: "https://huggingface.co/diabolic6045" },
    ];

    if (!mounted) return null;

    return (
        <>
        <footer id="contact" className="w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,1000px)_1fr] border-b border-t border-[var(--border)] relative z-10 bg-transparent py-0">
            {/* Left Blueprint Gutter */}
            <div className="hidden xl:block border-r border-[var(--border)]" />

            {/* Core 1000px Grid Zone */}
            <div className="w-full border-x xl:border-x-0 border-[var(--border)] bg-[var(--background)] grid grid-cols-1 md:grid-cols-12 gap-0">
                
                {/* 1. Main CTA Box */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`col-span-1 md:col-span-8 border-b md:border-b-0 md:border-r border-[var(--border)] p-8 sm:p-12 flex flex-col justify-center relative bg-[var(--background)]`}
                >
                    <a href="mailto:divax12345@gmail.com" className="group w-full block">
                        <h2 className={`text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.85] transition-colors duration-500 font-[family-name:var(--font-syne)] ${textPrimary} group-hover:${accentText}`}>
                            LET'S<br />BUILD.
                        </h2>
                    </a>
                </motion.div>

                {/* 2. Social Links Box */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className={`col-span-1 md:col-span-4 p-6 sm:p-8 flex flex-col justify-between gap-8 relative bg-[var(--background)]`}
                >
                    <div className="flex flex-col gap-4">
                        <span className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase ${textSecondary}`}>
                            // NETWORKS
                        </span>
                        
                        <div className="flex flex-col gap-3">
                            {socials.map((s) => (
                                <a 
                                    key={s.label} 
                                    href={s.href} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className={`group flex items-baseline justify-between transition-colors ${textSecondary} hover:${textPrimary}`}
                                >
                                    <span className="font-mono text-xs md:text-sm font-bold tracking-widest">{s.label}</span>
                                    <span className={`font-mono text-[9px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity ${accentText}`}>
                                        @{s.handle} ↗
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-6 border-t border-dashed border-[var(--border)]">
                        <span className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase ${textSecondary}`}>
                            // DIRECT
                        </span>
                        <a 
                            href="mailto:divax12345@gmail.com" 
                            className={`font-mono text-[10px] md:text-xs tracking-widest break-all ${textPrimary} hover:${accentText} transition-colors`}
                        >
                            DIVAX12345@GMAIL.COM
                        </a>
                    </div>
                </motion.div>

                {/* 3. Bottom Footer Strip */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className={`col-span-1 md:col-span-12 border-t border-[var(--border)] p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative bg-[var(--background)]`}
                >
                    <span className={`font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${textPrimary}`}>
                        DIVAX SHAH
                    </span>
                    <span className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase ${textSecondary}`}>
                        {Math.floor((new Date().getTime() - new Date('2002-07-01').getTime()) / 31557600000)} Y/O, AI/ML ENGINEER
                    </span>
                </motion.div>

            </div>

            {/* Right Blueprint Gutter */}
            <div className="hidden xl:block border-l border-[var(--border)]" />
        </footer>
        <div className="w-full h-32 bg-transparent border-t border-[var(--border)]" />
        </>
    );
}
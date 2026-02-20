"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "EXPERIENCE", href: "#experience" },
        { name: "PROJECTS", href: "#projects" },
        { name: "SKILLS", href: "#skills" },
    ];

    const handleToggleTheme = () => {
        if (theme === "dark") setTheme("light");
        else setTheme("dark");
    };

    const isDark = mounted && theme === "dark";

    return (
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1 }}
            className={`fixed top-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled
                ? "py-6 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]"
                : "py-10 bg-transparent"
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex justify-between items-center text-[var(--foreground)]">

                {/* LOGO POSTER placeholder */}
                <a href="#" className="flex items-center justify-center relative z-50 overflow-hidden w-8 h-8">
                    <div className={`absolute inset-0 transition-colors duration-500 ${isDark ? "bg-[#c2410c]" : "bg-black"}`} />
                </a>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-12 group">
                    <ul className="flex items-center gap-8 font-sans text-[10px] tracking-[0.2em] font-bold uppercase transition-colors duration-500">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="relative overflow-hidden inline-block hover:opacity-100 opacity-60 transition-opacity duration-300 transform-gpu"
                                >
                                    <span className={`relative z-10 ${isDark ? "hover:text-[var(--accent)]" : ""}`}>{link.name}</span>
                                    <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent)] translate-x-[-100%] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-0 bg-[var(--accent)]`} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CONTROLS */}
                <div className="flex items-center gap-6 z-50">

                    {/* THEME TOGGLE (BRUTALIST SWITCH) */}
                    {mounted && (
                        <div
                            onClick={handleToggleTheme}
                            className="flex items-center gap-3 group cursor-pointer"
                        >
                            <div className="hidden sm:flex flex-col items-end">
                                <span className={`text-[8px] font-mono font-bold tracking-widest uppercase transition-colors duration-500 ${isDark ? "text-zinc-500" : "text-zinc-600"}`}>STATE</span>
                                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-colors duration-500 ${isDark ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>
                                    {isDark ? "HARDWARE" : "CANVAS"}
                                </span>
                            </div>
                            <div className={`relative w-12 h-6 border-2 flex items-center p-1 transition-colors duration-500 ${isDark ? "border-[#c2410c] bg-[#1a1a1a]" : "border-[var(--foreground)] bg-white rounded-full"}`}>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        x: isDark ? 20 : 0,
                                        rotate: isDark ? 180 : 0,
                                        borderRadius: isDark ? "0%" : "50%"
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className={`w-3 h-3 ${isDark ? "bg-[#c2410c]" : "bg-[var(--foreground)]"}`}
                                />
                            </div>
                        </div>
                    )}

                    {/* LET'S TALK */}
                    <a
                        href="mailto:divax12345@gmail.com"
                        className={`hidden sm:inline-block group relative px-5 py-3 border border-[var(--border)] hover:border-transparent overflow-hidden ${isDark ? "rounded-none" : "rounded-full"} font-sans text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-500`}
                    >
                        <div className={`absolute inset-0 bg-[var(--accent)] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0`} />
                        <span className={`relative z-10 transition-colors duration-500 ${isDark ? "group-hover:text-black" : "group-hover:text-white"}`}>
                            LET'S TALK
                        </span>
                    </a>
                </div>
            </div>
        </motion.header>
    );
}

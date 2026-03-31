"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { flushSync } from "react-dom";

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
        { name: "HOME", href: "/" },
        { name: "EXPERIENCE", href: "/#experience" },
        { name: "PROJECTS", href: "/#projects" },
        { name: "SKILLS", href: "/skills" },
    ];

    const handleToggleTheme = () => {
        const nextTheme = theme === "dark" ? "light" : "dark";
        
        if (!document.startViewTransition) {
            setTheme(nextTheme);
            return;
        }

        document.startViewTransition(() => {
            flushSync(() => {
                setTheme(nextTheme);
            });
        });
    };

    const isDark = mounted && theme === "dark";

    // Minimalistic Variables
    const boxBg = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const boxBorder = isDark ? "border-[#404040]" : "border-gray-300";
    const accentText = isDark ? "text-[#ea580c]" : "text-[#2563eb]";
    const textPrimary = isDark ? "text-white" : "text-black";
    const textSecondary = isDark ? "text-zinc-500" : "text-zinc-400";

    if (!mounted) return null;

    return (
        <>
        <div className="w-full h-8 bg-transparent" />
        <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeOut", duration: 0.6 }}
            className={`navbar-fixed fixed top-8 left-0 right-0 z-50 transition-all duration-500 pt-0 bg-transparent pointer-events-none`}
        >
            {/* Architectural Grid Match */}
            <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,1000px)_1fr] relative h-full">
                
                {/* Left Blueprint Gutter */}
                <div className="hidden xl:block border-r border-[var(--border)] border-dashed opacity-50" />

                <div className={`w-full grid grid-cols-12 gap-0 border-x xl:border-x-0 border-[var(--border)] transition-all duration-500 pointer-events-auto ${isScrolled ? "opacity-95 hover:opacity-100" : "opacity-100"}`}>

                    {/* 1. Logo Box */}
                    <div 
                        className={`col-span-4 sm:col-span-3 border-b md:border-r border-[var(--border)] bg-[var(--background)] px-4 sm:px-6 py-4 flex items-center justify-center relative`}
                    >
                        <a href="/" className={`font-[family-name:var(--font-syne)] text-sm sm:text-base font-bold tracking-tighter uppercase ${textPrimary}`}>
                            DJS.
                        </a>
                    </div>

                    {/* 2. Navigation Box */}
                    <nav 
                        className={`col-span-4 sm:col-span-6 border-b md:border-r border-[var(--border)] bg-[var(--background)] px-4 py-4 flex items-center justify-center relative`}
                    >
                        {/* Mobile nav (dots) */}
                        <div className="flex sm:hidden items-center gap-3">
                            {navLinks.map((link, i) => (
                                <a key={link.name} href={link.href} className={`w-2 h-2 rounded-none border border-[var(--border)] ${i === 0 ? accentText : textSecondary}`} />
                            ))}
                        </div>

                        {/* Desktop nav */}
                        <ul className="hidden sm:flex items-center justify-center gap-6 md:gap-8 font-mono text-[9px] md:text-[10px] tracking-widest font-bold uppercase">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={`relative overflow-hidden inline-block transition-colors duration-300 ${textSecondary} hover:${textPrimary}`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* 3. Controls Box */}
                    <div 
                        className={`col-span-4 sm:col-span-3 border-b border-[var(--border)] bg-[var(--background)] px-4 py-4 flex items-center justify-center relative cursor-pointer group`}
                        onClick={handleToggleTheme}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`hidden sm:inline-block font-mono text-[9px] font-bold tracking-widest uppercase transition-colors duration-300 ${textSecondary} group-hover:${textPrimary}`}>
                                THEME
                            </span>
                            <div className={`relative w-8 h-4 border flex items-center p-0.5 transition-colors duration-500 border-[var(--border)]`}>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        x: isDark ? 16 : 0,
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className={`w-2.5 h-2.5 ${isDark ? "bg-[#ea580c]" : "bg-[#2563eb]"}`}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Blueprint Gutter */}
                <div className="hidden xl:block border-l border-[var(--border)] border-dashed opacity-50" />
            </div>
        </motion.header>
        </>
    );
}

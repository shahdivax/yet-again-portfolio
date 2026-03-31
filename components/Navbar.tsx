"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [maskBlob, setMaskBlob] = useState<Blob | null>(null);

    useEffect(() => {
        setMounted(true);
        fetch("https://i.imgur.com/NoEj2Lv.gif")
            .then(res => res.blob())
            .then(blob => setMaskBlob(blob))
            .catch(err => console.error("Failed to load mask gif", err));
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

        if (maskBlob) {
            // Generate a fresh unique Object URL from the loaded Blob
            // This forces the browser to treat the GIF as a brand new image,
            // resetting the internal playback frame to 0 instantly.
            const url = URL.createObjectURL(maskBlob);
            document.documentElement.style.setProperty('--theme-mask', `url(${url})`);
            
            // Clean up the generated URL to prevent memory leaks
            setTimeout(() => URL.revokeObjectURL(url), 2000);
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
                        className={`col-span-3 sm:col-span-3 border-b md:border-r border-[var(--border)] bg-[var(--background)] px-2 sm:px-6 py-4 flex items-center justify-center relative`}
                    >
                        <a href="/" className={`font-[family-name:var(--font-syne)] text-sm sm:text-base font-bold tracking-tighter uppercase ${textPrimary}`}>
                            DJS.
                        </a>
                    </div>

                    {/* 2. Navigation Box */}
                    <nav 
                        className={`col-span-6 sm:col-span-6 border-b md:border-r border-[var(--border)] bg-[var(--background)] px-2 sm:px-4 py-4 flex items-center justify-center relative`}
                    >
                        {/* Mobile nav (dots) */}
                        <div className="flex sm:hidden items-center justify-center gap-3 w-full">
                            {navLinks.map((link, i) => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    className={`text-[8px] font-mono font-bold tracking-widest uppercase transition-colors duration-300 ${i === 0 ? accentText : textSecondary} hover:${textPrimary}`}
                                >
                                    {link.name.slice(0, 3)}
                                </a>
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
                        className={`col-span-3 sm:col-span-3 border-b border-[var(--border)] bg-[var(--background)] px-1 sm:px-4 py-4 flex items-center justify-center relative cursor-pointer group`}
                        onClick={handleToggleTheme}
                    >
                        <div className="flex items-center justify-center w-full">
                            <div className={`relative w-6 h-6 flex items-center justify-center transition-all duration-500`}>
                                {/* Abstract Light Mode (Sun / Aperture) */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isDark ? 0 : 1,
                                        rotate: isDark ? 90 : 0,
                                        opacity: isDark ? 0 : 1,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="absolute inset-0 flex items-center justify-center text-zinc-900"
                                >
                                    <Sun size={18} strokeWidth={2.5} className="transition-transform group-hover:rotate-45 duration-500" />
                                </motion.div>

                                {/* Abstract Dark Mode (Moon / Eclipse) */}
                                <motion.div
                                    initial={false}
                                    animate={{
                                        scale: isDark ? 1 : 0,
                                        rotate: isDark ? 0 : -90,
                                        opacity: isDark ? 1 : 0,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="absolute inset-0 flex items-center justify-center text-zinc-200"
                                >
                                    <Moon size={18} strokeWidth={2.5} className="transition-transform group-hover:-rotate-12 duration-500" />
                                </motion.div>
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

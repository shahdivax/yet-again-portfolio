"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";

const creditCategories = [
    {
        title: "CORE STACK",
        items: [
            { name: "NEXT.JS 15", desc: "React Framework for SSR & Routing", url: "https://nextjs.org/" },
            { name: "TAILWIND CSS V4", desc: "Utility-first CSS Framework", url: "https://tailwindcss.com/" },
            { name: "TYPESCRIPT", desc: "Static Typing for JavaScript", url: "https://www.typescriptlang.org/" },
            { name: "VERCEL", desc: "Deployment & Edge Infrastructure", url: "https://vercel.com/" }
        ]
    },
    {
        title: "UI & ANIMATION",
        items: [
            { name: "FRAMER MOTION", desc: "Declarative Animations for React", url: "https://www.framer.com/motion/" },
            { name: "MAGIC UI", desc: "Premium React Components & Effects", url: "https://magicui.design/" },
            { name: "REACT BITS", desc: "Interactive UI Elements", url: "https://www.reactbits.dev/" },
            { name: "LUCIDE REACT", desc: "Beautiful & Consistent Iconset", url: "https://lucide.dev/" }
        ]
    },
    {
        title: "ASSETS & MISC",
        items: [
            { name: "VSCODE-PETS", desc: "Roaming Pets Assets (Extracted)", url: "https://marketplace.visualstudio.com/items?itemName=tonybaloney.vscode-pets" },
            { name: "GEIST FONT", desc: "Default Sans/Mono Vercel Fonts", url: "https://vercel.com/font" },
            { name: "SYNE FONT", desc: "Display Typeface for Headings", url: "https://fonts.google.com/specimen/Syne" },
            { name: "NEXT-THEMES", desc: "Dark Mode Abstraction", url: "https://github.com/pacocoursey/next-themes" }
        ]
    }
];

export default function Credits() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";
    const bg = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const textPrimary = isDark ? "text-white" : "text-black";
    const textSecondary = isDark ? "text-zinc-500" : "text-zinc-400";
    const accentText = isDark ? "text-[#ea580c]" : "text-[#2563eb]";
    const accentBorder = isDark ? "border-[#ea580c]" : "border-[#2563eb]";

    if (!mounted) return null;

    return (
        <section className="w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,1000px)_1fr] border-b border-[var(--border)] relative z-10 bg-transparent pt-10">
            {/* Left Blueprint Gutter */}
            <div className="hidden xl:block border-r border-[var(--border)]" />

            {/* Core 1000px Grid Zone */}
            <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-0 border-x xl:border-x-0 border-[var(--border)] bg-[var(--background)]">
                
                {/* Header Container */}
                <div className="col-span-1 md:col-span-12 border-b border-[var(--border)] p-6 sm:p-12 relative overflow-hidden bg-[var(--background)]">
                    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter uppercase font-[family-name:var(--font-syne)] leading-none ${textPrimary}`}>
                        <TextAnimate animation="blurInUp" by="character" duration={1}>
                            SYSTEM CREDITS
                        </TextAnimate>
                    </h1>
                    <p className={`mt-4 font-mono text-xs sm:text-sm max-w-xl leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                        This portfolio was built using a carefully selected stack of modern web technologies, open-source libraries, and design systems.
                    </p>
                </div>

                {/* Grid Sections */}
                {creditCategories.map((category, idx) => (
                    <div key={idx} className={`col-span-1 md:col-span-4 border-b md:border-b-0 ${idx !== 2 ? 'md:border-r' : ''} border-[var(--border)] p-6 sm:p-8 flex flex-col gap-6 relative bg-[var(--background)] min-h-[400px]`}>
                        <h2 className={`font-mono text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase ${textSecondary}`}>
                            // {category.title}
                        </h2>
                        <div className="flex flex-col gap-6">
                            {category.items.map((item, i) => (
                                <a 
                                    key={i} 
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`group flex flex-col gap-1 border-l-2 border-transparent hover:${accentBorder} pl-3 -ml-3 transition-all duration-300`}
                                >
                                    <h3 className={`font-bold text-sm sm:text-base tracking-tight uppercase ${textPrimary} group-hover:${accentText} transition-colors duration-300`}>
                                        {item.name} ↗
                                    </h3>
                                    <p className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase ${textSecondary}`}>
                                        {item.desc}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Blueprint Gutter */}
            <div className="hidden xl:block border-l border-[var(--border)]" />
        </section>
    );
}

"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";

const experiences = [
    {
        role: "JR. AI/ML DEVELOPER",
        company: "AVINYAA EDTECH",
        date: "2025 - PRESENT",
        impact: "Fine-tuning LLMs and VLMs. Building native pipelines for robust inference.",
    },
    {
        role: "JR. PYTHON DEVELOPER",
        company: "THINKBIZ TECH",
        date: "2024 - 2025",
        impact: "Developed LangChain-powered pipelines. Implemented custom OCR models.",
    },
    {
        role: "AI & SYNTH DATA INTERN",
        company: "DMI FINANCE",
        date: "2024",
        impact: "Trained PyTorch models. Generated synthetic data arrays. Built Gradio interfaces.",
    }
];

export default function Experience() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute("data-visible", "true");
                    observer.unobserve(entry.target); 
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        const timeout = setTimeout(() => {
            document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, []);

    const isDark = mounted && theme === "dark";

    const bg = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const border = isDark ? "border-[#404040]" : "border-gray-300";
    const textPrimary = isDark ? "text-white" : "text-black";
    const textSecondary = isDark ? "text-zinc-500" : "text-zinc-400";
    const accentText = isDark ? "text-[#ea580c]" : "text-[#2563eb]";

    if (!mounted) return null;

    return (
        <section id="experience" className="w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,1000px)_1fr] border-b border-[var(--border)] relative z-10 bg-transparent py-0">
            {/* Left Blueprint Gutter */}
            <div className="hidden xl:block border-r border-[var(--border)]" />

            {/* Core 1000px Grid Zone */}
            <div className="w-full border-x xl:border-x-0 border-[var(--border)] bg-[var(--background)]">
                
                {/* Header Container */}
                <div className={`flex flex-col border-b border-[var(--border)] p-6 sm:p-8 relative overflow-hidden bg-[var(--background)]`}>
                    <div className="flex justify-between items-center w-full">
                        <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter uppercase font-[family-name:var(--font-syne)] leading-none ${textPrimary}`}>
                            EXPERIENCE
                        </h2>
                    </div>
                </div>

                {/* Vertical Timeline Container */}
                <div className="flex flex-col relative w-full mx-auto">
                    {/* The Continuous Timeline Line */}
                    <div className={`absolute top-0 bottom-0 left-[27px] sm:left-[39px] w-[1px] bg-dashed border-l border-dashed border-[var(--border)] opacity-50`} />

                    {experiences.map((exp, i) => {
                        const isActive = i === 0;

                        return (
                            <div
                                key={`exp-${i}`} 
                                data-reveal
                                className={`relative pl-16 sm:pl-24 pb-6 opacity-0 translate-y-4 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 group border-b border-[var(--border)] last:border-b-0`}
                                style={{ transitionDelay: `${i * 150}ms` }}
                            >
                                {/* Timeline Node/Dot */}
                                <div 
                                    className={`absolute left-[24px] sm:left-[36px] top-6 w-[7px] h-[7px] rounded-full transition-all duration-500 z-10 
                                        ${isActive ? `bg-[#ea580c] shadow-[0_0_10px_rgba(234,88,12,0.8)] dark:bg-[#ea580c] dark:shadow-[0_0_10px_rgba(234,88,12,0.8)]` : `bg-gray-400 dark:bg-zinc-600 group-hover:scale-150`}`} 
                                />

                                {/* The Bento Card */}
                                <div 
                                    className={`flex flex-col p-4 sm:p-6 transition-colors duration-500`}
                                >
                                    <div className="flex flex-col gap-2">
                                        {/* Top Row: Date & Status */}
                                        <div className="flex justify-between items-start">
                                            <span className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase ${isActive ? accentText : textSecondary}`}>
                                                {exp.date}
                                            </span>
                                            {isActive && (
                                                <span className={`font-mono text-[9px] tracking-widest uppercase flex items-center gap-2 ${accentText} opacity-80`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                                    ACTIVE
                                                </span>
                                            )}
                                        </div>

                                        {/* Middle: Role & Company */}
                                        <div className="flex flex-col gap-1">
                                            <h3 className={`text-lg sm:text-xl font-bold tracking-tighter uppercase leading-none transition-colors duration-500 ${isActive ? textPrimary : textSecondary + " group-hover:" + textPrimary}`}>
                                                {exp.role}
                                            </h3>
                                            <h4 className={`font-mono text-[9px] sm:text-[10px] tracking-widest uppercase ${isActive ? textPrimary : textSecondary}`}>
                                                @ {exp.company}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Bottom: Impact */}
                                    <div className="mt-4 pt-3 border-t border-dashed border-[var(--border)] opacity-50 group-hover:opacity-100 transition-opacity">
                                        <p className={`font-mono text-[9px] sm:text-[10px] leading-relaxed ${isActive ? (isDark ? "text-zinc-400" : "text-zinc-600") : textSecondary + " group-hover:" + (isDark ? "text-zinc-400" : "text-zinc-600")}`}>
                                            {exp.impact}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Blueprint Gutter */}
            <div className="hidden xl:block border-l border-[var(--border)]" />
        </section>
    );
}

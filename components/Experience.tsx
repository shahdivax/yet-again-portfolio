"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const experiences = [
    {
        role: "JR. AI/ML DEVELOPER",
        company: "AVINYAA EDTECH",
        date: "2025 - PRESENT",
        tags: ["LLMs", "Fine-tuning", "NLP"]
    },
    {
        role: "JR. PYTHON DEVELOPER",
        company: "THINKBIZ TECH",
        date: "2024 - 2025",
        tags: ["LangChain", "OCR", "Pipelines"]
    },
    {
        role: "AI & SYNTH DATA INTERN",
        company: "DMI FINANCE",
        date: "2024",
        tags: ["PyTorch", "Synth Data", "Gradio"]
    }
];

export default function Experience() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Native Intersection Observer for flawless, non-flickering reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute("data-visible", "true");
                    observer.unobserve(entry.target); // Run once
                }
            });
        }, { threshold: 0, rootMargin: "-50px" });

        // Small timeout to ensure DOM elements are rendered
        const timeout = setTimeout(() => {
            document.querySelectorAll("[data-reveal]").forEach(el => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timeout);
            observer.disconnect();
        };
    }, []);

    const isDark = mounted && theme === "dark";

    // Earthy, organic, natural paper/ink color palette
    const bg = isDark ? "bg-[#161615]" : "bg-[#F4F1EA]";
    const border = isDark ? "border-[#363532]" : "border-[#DCD8CD]";
    const line = isDark ? "bg-[#363532]" : "bg-[#DCD8CD]";
    const textPrimary = isDark ? "text-[#E8E6DF]" : "text-[#2B2A27]";
    const textSecondary = isDark ? "text-[#8C8A82]" : "text-[#6E6A60]";
    const textMuted = isDark ? "text-[#A3A095]" : "text-[#827E73]";
    const nodeColor = isDark ? "bg-[#8C8A82]" : "bg-[#827E73]";

    return (
        <section id="experience" className={`w-full py-16 md:py-24 transition-colors duration-700 ${bg}`}>
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                
                {/* Header */}
                <div
                    data-reveal
                    className={`mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-6 gap-4 ${border} opacity-0 translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0`}
                >
                    <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter leading-none uppercase ${textPrimary}`}>
                        EXPERIENCE.
                    </h2>
                </div>

                {/* VERTICAL TRACK (Desktop & Mobile) */}
                <div className="flex flex-col relative w-full max-w-4xl mx-auto mt-12">
                    {/* Vertical Line */}
                    <div className={`absolute top-2 bottom-0 left-[3px] md:left-[5px] w-[1px] ${line}`} />
                    
                    {experiences.map((exp, i) => (
                        <div
                            key={`exp-${i}`} 
                            data-reveal
                            className={`opacity-0 translate-y-5 -translate-x-3 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 data-[visible=true]:translate-x-0`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div 
                                className={`relative pl-8 md:pl-12 pb-16 flex flex-col group ${i === 0 ? "" : "opacity-80 hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-2"}`}
                            >
                            {/* Visual separator line between items (except the last one) */}
                            {i < experiences.length - 1 && (
                                <div className={`absolute bottom-8 left-8 md:left-12 right-0 h-[1px] ${isDark ? "bg-[#525252]" : "bg-[#c4c4c4]"}`} />
                            )}
                            
                            {/* Static Node */}
                            <div 
                                className={`absolute left-0 top-1.5 md:top-2 w-[7px] h-[7px] md:w-[11px] md:h-[11px] rounded-full -translate-x-[0.5px] transition-transform duration-500 group-hover:scale-150 ${i === 0 ? (isDark ? "bg-[#c2410c]" : "bg-[var(--accent)]") : nodeColor}`} 
                            />
                            
                            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8 mb-3">
                                <h3 className={`text-2xl md:text-4xl font-black tracking-tighter uppercase leading-none transition-colors duration-500 ${i === 0 ? textPrimary : textSecondary}`}>
                                    {exp.company}
                                </h3>
                                <span className={`font-mono text-[10px] md:text-xs font-bold tracking-widest uppercase md:shrink-0 ${i === 0 ? (isDark ? "text-[#c2410c]" : "text-[var(--accent)]") : textMuted}`}>
                                    {exp.date}
                                </span>
                            </div>

                            <h4 className={`text-sm md:text-base font-bold tracking-wider uppercase mb-6 ${i === 0 ? textSecondary : textMuted}`}>
                                {exp.role}
                            </h4>
                            
                            <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2 mt-auto">
                                {exp.tags.map((tag, j) => (
                                    <span key={j} className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${textMuted} transition-colors duration-300 group-hover:${textSecondary}`}>
                                        <span className={`w-1 h-1 rounded-full ${i === 0 ? (isDark ? "bg-[#c2410c]" : "bg-[var(--accent)]") : nodeColor}`} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const experiences = [
    {
        role: "JR. AI/ML DEVELOPER",
        company: "AVINYAA EDTECH",
        date: "2025 - PRESENT",
        description: "Architecting advanced grammar checkers and fine-tuning LLMs for pristine natural language output. Designing multilingual AI classification systems with 95%+ accuracy.",
    },
    {
        role: "JR. PYTHON DEVELOPER",
        company: "THINKBIZ TECH",
        date: "2024 - 2025",
        description: "Constructed scalable chatbot PoCs utilizing 17+ LangChain Agents with structured/unstructured ingestion. Engineered OCR-LLM pipelines improving invoice parsing from 15% to 85% accuracy.",
    },
    {
        role: "AI & SYNTH DATA INTERN",
        company: "DMI FINANCE",
        date: "2024",
        description: "Engineered generative pipelines for synthetic structured data via Gradio & Python. Leveraged PyTorch to dramatically increase dataset throughput and deduplication algorithms.",
    }
];

import { useState, useEffect } from "react";

export default function Experience() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    return (
        <section id="experience" className={`w-full py-40 ${isDark ? "bg-[#0a0a0a] relative overflow-hidden" : "bg-[var(--background)] border-y border-[var(--border)]"}`}>
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`mb-32 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-12 gap-8 ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}
                >
                    <h2 className={`text-[10vw] sm:text-[6vw] font-bold tracking-tighter leading-none uppercase ${isDark ? "brutalist-outline" : "editorial-text text-black"}`}>
                        EXPERIENCE.
                    </h2>
                    <span className="font-mono text-[var(--muted)] text-sm tracking-[0.2em] uppercase pb-2">
                        01 - TIMELINE
                    </span>
                </motion.div>

                <div className="w-full flex flex-col group/list relative">
                    {/* Central Structural line for Light Mode */}
                    {!isDark && (
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--border)] -translate-x-1/2" />
                    )}

                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                            className={`group relative flex flex-col md:flex-row justify-between items-start py-16 transition-colors duration-500 overflow-hidden ${isDark
                                ? "border-b border-[#262626] hover:bg-[#c2410c] px-6 -mx-6 md:items-center"
                                : "border-b border-[var(--border)] md:border-none md:relative"
                                }`}
                        >
                            {/* LIGHT MODE STRUCTURE */}
                            {!isDark && (
                                <>
                                    <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border border-[var(--accent)] z-20 group-hover:scale-150 group-hover:bg-[var(--accent)] transition-all`} />
                                </>
                            )}

                            <div className={`flex flex-col relative z-10 gap-2 mb-6 md:mb-0 ${!isDark ? (i % 2 === 0 ? "md:w-1/2 md:pr-16 md:text-right" : "md:w-1/2 md:pl-16 md:ml-auto") : "md:w-[40%]"}`}>
                                <span className={`font-mono font-bold text-xs tracking-[0.2em] ${isDark ? "text-[var(--accent)] group-hover:text-black transition-colors" : "text-[var(--accent)]"}`}>
                                    {exp.date}
                                </span>
                                <h3 className={`text-3xl md:text-5xl font-bold tracking-tighter uppercase transition-colors duration-500 ${isDark ? "text-white group-hover:text-white" : "text-black group-hover:text-[var(--accent)]"}`}>
                                    {exp.company}
                                </h3>
                                <span className={`font-sans font-semibold tracking-wider text-sm mt-2 uppercase transition-colors ${isDark ? "text-[#737373] group-hover:text-white/80" : "text-zinc-500"}`}>
                                    {exp.role}
                                </span>
                            </div>

                            <div className={`relative z-10 ${!isDark ? (i % 2 === 0 ? "md:absolute md:left-1/2 md:w-1/2 md:pl-16 md:top-1/2 md:-translate-y-1/2" : "md:absolute md:right-1/2 md:w-1/2 md:pr-16 md:text-right md:top-1/2 md:-translate-y-1/2") : "md:w-[50%]"}`}>
                                <p className={`text-lg md:text-xl font-mono leading-relaxed transition-colors duration-500 uppercase ${isDark ? "text-[#a3a3a3] group-hover:text-white" : "text-zinc-600 group-hover:text-black"}`}>
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

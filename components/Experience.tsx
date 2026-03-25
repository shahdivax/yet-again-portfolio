"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const experiences = [
    {
        role: "JR. AI/ML DEVELOPER",
        company: "AVINYAA EDTECH",
        date: "2025 - PRESENT",
        description: "Architecting advanced grammar checkers and fine-tuning LLMs for pristine natural language output. Designing multilingual AI classification systems with 95%+ accuracy.",
        tags: ["LLMs", "Fine-tuning", "NLP"]
    },
    {
        role: "JR. PYTHON DEVELOPER",
        company: "THINKBIZ TECH",
        date: "2024 - 2025",
        description: "Constructed scalable chatbot PoCs utilizing 17+ LangChain Agents with structured/unstructured ingestion. Engineered OCR-LLM pipelines improving invoice parsing from 15% to 85% accuracy.",
        tags: ["LangChain", "OCR", "Pipelines"]
    },
    {
        role: "AI & SYNTH DATA INTERN",
        company: "DMI FINANCE",
        date: "2024",
        description: "Engineered generative pipelines for synthetic structured data via Gradio & Python. Leveraged PyTorch to dramatically increase dataset throughput and deduplication algorithms.",
        tags: ["PyTorch", "Synth Data", "Gradio"]
    }
];

export default function Experience() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
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
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className={`mb-16 md:mb-20 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-6 gap-4 ${border}`}
                >
                    <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter leading-none uppercase ${textPrimary}`}>
                        EXPERIENCE.
                    </h2>
                    <span className={`font-mono text-sm tracking-[0.2em] uppercase pb-2 ${textSecondary}`}>
                        01 - CHRONOLOGY
                    </span>
                </motion.div>

                {/* DESKTOP HORIZONTAL TRACK (Cardless, pure editorial) */}
                <div className="hidden md:flex flex-col w-full relative">
                    
                    {/* Top Half (Company Info) */}
                    <div className="grid grid-cols-3 gap-8 lg:gap-12 mb-6">
                        {experiences.map((exp, i) => (
                            <motion.div 
                                key={`top-${i}`} 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col justify-end"
                            >
                                <span className={`font-mono text-[10px] lg:text-xs font-bold tracking-widest mb-3 ${textMuted}`}>
                                    {exp.date}
                                </span>
                                <h3 className={`text-2xl lg:text-3xl font-black tracking-tighter uppercase leading-none mb-2 ${textPrimary}`}>
                                    {exp.company}
                                </h3>
                                <h4 className={`text-sm font-bold tracking-wider uppercase ${textSecondary}`}>
                                    {exp.role}
                                </h4>
                            </motion.div>
                        ))}
                    </div>

                    {/* The Track Line */}
                    <div className={`w-full h-[1px] relative mb-8 ${line}`}>
                        {experiences.map((_, i) => (
                            <motion.div 
                                key={`node-${i}`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className={`absolute top-0 w-3 h-3 -translate-y-[6px] rounded-full transition-transform hover:scale-150 cursor-default ${nodeColor}`}
                                style={{ left: i === 0 ? '0' : `calc(${i * 33.333}% + 2px)` }}
                            />
                        ))}
                    </div>

                    {/* Bottom Half (Descriptions) */}
                    <div className="grid grid-cols-3 gap-8 lg:gap-12">
                        {experiences.map((exp, i) => (
                            <motion.div 
                                key={`bottom-${i}`} 
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.2 }}
                                className="flex flex-col pr-4 lg:pr-8"
                            >
                                <p className={`text-xs lg:text-sm font-mono leading-relaxed mb-6 ${textSecondary}`}>
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                                    {exp.tags.map((tag, j) => (
                                        <span key={j} className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${textMuted}`}>
                                            <span className={`w-1 h-1 rounded-full ${nodeColor}`} />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* MOBILE VERTICAL TRACK */}
                <div className="md:hidden flex flex-col relative w-full">
                    {/* Vertical Line */}
                    <div className={`absolute top-2 bottom-0 left-[3px] w-[1px] ${line}`} />
                    
                    {experiences.map((exp, i) => (
                        <motion.div 
                            key={`mob-${i}`} 
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative pl-8 pb-12 flex flex-col"
                        >
                            {/* Node */}
                            <div className={`absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full -translate-x-[0.5px] ${nodeColor}`} />
                            
                            <span className={`font-mono text-[10px] font-bold tracking-widest mb-2 ${textMuted}`}>
                                {exp.date}
                            </span>
                            <h3 className={`text-xl font-black tracking-tighter uppercase leading-none mb-1 ${textPrimary}`}>
                                {exp.company}
                            </h3>
                            <h4 className={`text-xs font-bold tracking-wider uppercase mb-4 ${textSecondary}`}>
                                {exp.role}
                            </h4>
                            
                            <p className={`text-xs font-mono leading-relaxed mb-4 ${textSecondary}`}>
                                {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-x-3 gap-y-2 mt-auto">
                                {exp.tags.map((tag, j) => (
                                    <span key={j} className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${textMuted}`}>
                                        <span className={`w-1 h-1 rounded-full ${nodeColor}`} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

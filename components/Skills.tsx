"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const skillCategories = [
    {
        category: "DEEP LEARNING",
        items: ["PYTORCH", "TENSORFLOW", "KERAS", "SCIKIT-LEARN"],
        tag: "SYS.01"
    },
    {
        category: "AI INFRASTRUCTURE",
        items: ["HUGGING FACE", "AXOLOTL", "UNSLOTH", "DEEPSPEED"],
        tag: "SYS.02"
    },
    {
        category: "DOMAINS",
        items: ["LLM FINE-TUNING", "NLP", "GENERATIVE AI", "RAG"],
        tag: "SYS.03"
    },
    {
        category: "LANGUAGES & OPS",
        items: ["PYTHON", "LANGCHAIN", "AWS", "TYPESCRIPT"],
        tag: "SYS.04"
    }
];

export default function Skills() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    return (
        <section id="skills" className={`w-full py-40 ${isDark ? "bg-[#0a0a0a]" : "bg-[var(--background)] inset-shadow-sm"}`}>
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-12 gap-8 ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}
                >
                    <h2 className={`text-[10vw] sm:text-[6vw] font-bold tracking-tighter leading-none uppercase ${isDark ? "brutalist-outline" : "editorial-text text-black"}`}>
                        ARSENAL.
                    </h2>
                    <span className="font-mono text-[var(--muted)] text-sm tracking-[0.2em] uppercase pb-2">
                        03 - SKILLS MATRIX
                    </span>
                </motion.div>

                <div className="flex flex-col w-full border-t mt-12 border-[var(--border)] dark:border-[#262626]">
                    {skillCategories.map((group, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={`group relative flex flex-col lg:flex-row items-start lg:items-center justify-between py-12 lg:py-16 border-b transition-colors duration-500 overflow-hidden ${isDark
                                ? "border-[#262626] hover:bg-[#111]"
                                : "border-[var(--border)] hover:bg-zinc-50"
                                }`}
                        >
                            {/* Extreme mechanical details in Dark Mode */}
                            {isDark && (
                                <>
                                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-0 group-hover:h-[80%] bg-[#c2410c] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_15px_#c2410c] opacity-0 group-hover:opacity-100" />
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#c2410c]/10 to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none" />
                                    <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-[0.4em] text-[#333] group-hover:text-[#c2410c] transition-colors duration-500">
                                        DATA_STREAM_{i + 1}00_ACTIVE
                                    </div>
                                </>
                            )}

                            {/* Clean editorial details in Light Mode */}
                            {!isDark && (
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            )}

                            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-16 w-full lg:w-2/3 relative z-10 px-4 md:px-0">
                                <span className={`font-mono text-xs sm:text-sm font-bold tracking-[0.4em] uppercase transition-colors duration-500 shrink-0 ${isDark ? "text-[#555] group-hover:text-[#c2410c]" : "text-[var(--muted)] group-hover:text-[var(--accent)]"}`}>
                                    {group.tag}
                                </span>

                                <h3 className={`font-bold tracking-tighter text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-[0.85] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${isDark
                                    ? "text-zinc-700 group-hover:text-white group-hover:scale-[1.02]"
                                    : "text-zinc-300 editorial-text group-hover:text-black group-hover:scale-[1.02]"
                                    }`}>
                                    {group.category}
                                </h3>
                            </div>

                            <div className="relative z-10 flex flex-wrap gap-3 mt-10 lg:mt-0 w-full lg:w-1/3 justify-start lg:justify-end opacity-60 group-hover:opacity-100 transition-all duration-500 px-4 md:px-0">
                                {group.items.map((skill, si) => (
                                    <span
                                        key={si}
                                        className={`font-mono text-[10px] sm:text-xs uppercase font-bold tracking-widest px-4 py-2 border transition-all duration-500 transform lg:-translate-x-4 lg:group-hover:translate-x-0 ${isDark
                                            ? "border-[#333] text-[#737373] group-hover:border-[#c2410c] group-hover:text-white group-hover:bg-[#c2410c]/10 shadow-[0_0_0_#c2410c] group-hover:shadow-[0_0_15px_rgba(194,65,12,0.3)]"
                                            : "border-gray-200 text-gray-500 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] group-hover:bg-[var(--accent)]/5 hover:scale-105"
                                            }`}
                                        style={{ transitionDelay: `${si * 75}ms` }}
                                    >
                                        {skill}
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

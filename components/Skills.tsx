"use client";

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
    const isDark = theme === "dark";

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((group, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className={`relative overflow-hidden flex flex-col p-8 md:p-10 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[320px] justify-between group ${isDark
                                    ? "bg-[#111] border border-[#262626] hover:border-[#c2410c] hover:bg-[#1a1a1a]"
                                    : "bg-white border border-gray-200 hover:border-[var(--accent)] hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] hover:-translate-y-2"
                                }`}
                        >
                            {/* Extreme mechanical details in Dark Mode */}
                            {isDark && (
                                <>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#333] group-hover:border-[#c2410c] transition-colors m-4" />
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c2410c] to-transparent transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                    <div className="absolute bottom-4 right-4 w-12 h-1 bg-[#262626] group-hover:bg-[#c2410c] transition-colors shadow-[0_0_10px_#c2410c] opacity-0 group-hover:opacity-100" />
                                </>
                            )}

                            {/* Clean editorial grid in Light Mode */}
                            {!isDark && (
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity" />
                            )}

                            <div className="relative z-10 flex flex-col gap-2">
                                <div className="flex justify-between items-center mb-6">
                                    <span className={`font-mono text-[10px] font-bold tracking-[0.3em] uppercase transition-colors ${isDark ? "text-[#c2410c]" : "text-[var(--accent)]"}`}>
                                        {group.tag}
                                    </span>
                                    <div className={`w-2 h-2 rounded-full ${isDark ? "bg-[#333] group-hover:bg-[#c2410c]" : "bg-gray-200 group-hover:bg-[var(--accent)]"} transition-colors`} />
                                </div>

                                <h3 className={`font-bold tracking-tighter text-3xl uppercase leading-none transition-colors ${isDark ? "text-white group-hover:text-[#c2410c]" : "text-black editorial-text group-hover:text-[var(--accent)]"}`}>
                                    {group.category}
                                </h3>
                            </div>

                            <div className="relative z-10 flex flex-wrap gap-2 mt-8 group-hover:translate-y-0 transition-transform duration-500">
                                {group.items.map((skill, si) => (
                                    <span
                                        key={si}
                                        className={`font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 border transition-all duration-300 ${isDark
                                                ? "border-[#333] text-[#737373] group-hover:border-[#c2410c]/30 group-hover:text-white bg-[#0a0a0a]"
                                                : "border-gray-200 text-gray-500 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] bg-white"
                                            }`}
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

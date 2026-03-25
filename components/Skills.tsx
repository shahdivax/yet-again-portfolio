"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const arsenal = [
    {
        category: "PROGRAMMING LANGUAGES",
        skills: ["Python"],
        shape: "rounded-[1.5rem] md:rounded-tl-[4rem] md:rounded-br-[4rem]",
        align: "items-start text-left"
    },
    {
        category: "FRAMEWORKS & LIBRARIES",
        skills: ["PyTorch", "TensorFlow / Keras", "scikit-learn", "Hugging Face Transformers", "LangChain", "NumPy", "Pandas", "Fastapi", "AWS"],
        shape: "rounded-[1.5rem] md:rounded-tr-[4rem] md:rounded-bl-[4rem]",
        align: "items-end text-right"
    },
    {
        category: "AI DOMAINS",
        skills: ["Generative AI", "LLM/VLLM Fine-Tuning", "Reinforcement Learning (RL)", "NLP", "Prompt Engineering", "Axolotl AI", "Unsloth AI"],
        shape: "rounded-[1.5rem] md:rounded-tr-[4rem] md:rounded-bl-[4rem]",
        align: "items-start text-left"
    },
    {
        category: "APIs & SERVICES",
        skills: ["OpenAI", "Google Gemini", "Anthropic", "Mistral AI", "Groq", "OpenRouter"],
        shape: "rounded-[1.5rem] md:rounded-tl-[4rem] md:rounded-br-[4rem]",
        align: "items-end text-right"
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
        <section id="skills" className={`relative w-full py-12 md:py-16 overflow-hidden transition-colors duration-700 ${isDark ? "bg-[#0a0a0a]" : "bg-[var(--background)]"}`}>
            
            {/* Background Ambient Monochrome Glow for Glassmorphism effect */}
            <div className="absolute top-[10%] left-[15%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-zinc-400/20 dark:bg-zinc-600/10 rounded-full mix-blend-normal blur-[60px] md:blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[5%] right-[10%] w-[35vw] h-[35vw] max-w-[350px] max-h-[350px] bg-zinc-300/20 dark:bg-zinc-700/10 rounded-full mix-blend-normal blur-[60px] md:blur-[100px] pointer-events-none" />

            <div className="w-full flex flex-col relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12">
                {/* Section Title replacing the full bleed hero to match Projects */}
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0 }}
                    className={`mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-4 md:pb-6 gap-4 md:gap-6 ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}
                >
                    <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter leading-none uppercase ${isDark ? "brutalist-outline" : "editorial-text text-black"}`}>
                        ARSENAL.
                    </h2>
                    <span className="font-mono text-[var(--muted)] text-sm tracking-[0.2em] uppercase pb-2">
                        03 - TECHNICAL CAPABILITIES
                    </span>
                </motion.div>

                {/* Symmetric Masonry-ish Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start pb-8">
                    {arsenal.map((group, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 1, y: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0 }}
                            className={`flex flex-col p-5 md:p-6 transition-all duration-500 hover:scale-[1.01] overflow-hidden relative
                                backdrop-blur-2xl border ${isDark ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.04]" : "bg-black/[0.02] border-black/10 hover:bg-black/[0.04]"} 
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]
                                ${group.shape} ${group.align} 
                                ${i % 2 === 1 ? 'md:mt-16' : ''}`}
                        >
                            {/* Inner subtle highlight for glass edge */}
                            <div className="absolute inset-0 rounded-[inherit] pointer-events-none border border-white/5 md:border-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                            
                            <h3 className={`text-base md:text-lg font-bold tracking-widest mb-6 uppercase ${isDark ? "text-zinc-200" : "text-zinc-800"}`}>
                                {group.category}
                            </h3>
                            
                            <div className={`flex flex-wrap gap-2 ${group.align.includes('end') ? 'justify-end' : 'justify-start'} relative z-10`}>
                                {group.skills.map((skill, j) => (
                                    <div 
                                        key={j}
                                        className={`px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono font-medium transition-colors cursor-default border
                                            backdrop-blur-md
                                            ${isDark 
                                                ? "bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20" 
                                                : "bg-black/5 border-black/10 text-zinc-700 hover:text-black hover:bg-black/10 hover:border-black/20"}`}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

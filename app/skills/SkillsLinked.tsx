"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";

const arsenal = [
    {
        category: "PROGRAMMING LANGUAGES",
        skills: [
            { name: "Python", projects: ["SANSKRIT QWEN2.5-7B CHAT", "CUSTOM GPT 100M MODEL", "WORLD SIM", "SANSKRIT TOKENIZER"] }
        ]
    },
    {
        category: "FRAMEWORKS & LIBRARIES",
        skills: [
            { name: "PyTorch", projects: ["GITAWHISPER (WHISPER TINY)", "CUSTOM GPT 100M MODEL", "SANSKRIT QWEN2.5-VL OCR"] },
            { name: "Hugging Face Transformers", projects: ["SANSKRIT QWEN2.5-7B CHAT", "GITAWHISPER (WHISPER TINY)"] },
            { name: "LangChain", projects: ["LORE KEEPER"] },
            { name: "Fastapi", projects: ["AURA VIBES"] },
            { name: "AWS", projects: ["AURA VIBES"] },
            { name: "TensorFlow / Keras", projects: [] },
            { name: "scikit-learn", projects: [] }
        ]
    },
    {
        category: "AI DOMAINS",
        skills: [
            { name: "Generative AI", projects: ["FLUX LORAS", "SANSKRIT QWEN2.5-7B CHAT"] },
            { name: "LLM/VLLM Fine-Tuning", projects: ["SANSKRIT QWEN2.5-7B CHAT", "GITAWHISPER (WHISPER TINY)"] },
            { name: "NLP", projects: ["SANSKRIT TOKENIZER"] },
            { name: "Prompt Engineering", projects: ["WORLD SIM", "LORE KEEPER"] },
            { name: "Axolotl / Unsloth AI", projects: ["SANSKRIT QWEN2.5-7B CHAT"] }
        ]
    },
    {
        category: "APIs & SERVICES",
        skills: [
            { name: "OpenAI", projects: ["LORE KEEPER"] },
            { name: "Google Gemini", projects: ["WORLD SIM"] },
            { name: "Anthropic", projects: ["LORE KEEPER"] },
            { name: "OpenRouter", projects: ["AURA VIBES"] }
        ]
    }
];

export default function SkillsLinked() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    return (
        <section className={`w-full min-h-screen flex flex-col items-center pt-32 pb-24 transition-colors duration-700 ${isDark ? "bg-[#0a0a0a]" : "bg-[var(--background)]"}`}>
            <div className="w-full max-w-4xl px-6 flex flex-col items-center">
                
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center mb-16 text-center"
                >
                    <h1 className={`text-xl md:text-2xl font-bold tracking-tighter uppercase mb-2 ${isDark ? "text-white" : "text-black"}`}>
                        SKILLS & ARTIFACTS
                    </h1>
                </motion.div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {arsenal.map((group, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.4 }}
                            className={`flex flex-col p-6 md:p-8 border transition-colors ${isDark ? "border-[#262626] bg-[#111]" : "border-zinc-200 bg-white"}`}
                        >
                            <h3 className={`font-mono text-sm font-bold tracking-widest uppercase mb-6 pb-3 border-b ${isDark ? "text-zinc-300 border-[#262626]" : "text-zinc-800 border-zinc-100"}`}>
                                {group.category}
                            </h3>
                            
                            <div className="flex flex-col gap-6">
                                {group.skills.map((skill, j) => (
                                    <div key={j} className="flex flex-col gap-2">
                                        <div className={`text-xs font-bold font-sans uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                                            {skill.name}
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-2">
                                            {skill.projects.length > 0 ? (
                                                skill.projects.map((proj, k) => (
                                                    <Link 
                                                        href="/#projects" 
                                                        key={k} 
                                                        className={`text-[9px] font-mono px-2.5 py-1 border transition-colors ${isDark ? "border-[#333] text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-[#222]" : "border-zinc-200 text-zinc-500 hover:text-black hover:border-zinc-400 hover:bg-zinc-50"}`}
                                                    >
                                                        {proj}
                                                    </Link>
                                                ))
                                            ) : (
                                                <span className={`text-[9px] font-mono px-2.5 py-1 border border-dashed ${isDark ? "border-[#333] text-zinc-600" : "border-zinc-200 text-zinc-400"}`}>
                                                    VARIOUS / INTERNAL
                                                </span>
                                            )}
                                        </div>
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
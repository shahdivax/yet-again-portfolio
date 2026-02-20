"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const categories = [
    {
        title: "LLMS & AI ARCHITECTURES",
        projects: [
            {
                name: "SANSKRIT QWEN2.5-7B CHAT",
                href: "https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-7B-chat",
                description: "Specialized language model for Sanskrit translation and transliteration. 100% success rate on test sequences.",
                details: "LLM CHAT / LORA",
                year: "2024"
            },
            {
                name: "SANSKRIT QWEN2.5-VL OCR",
                href: "https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-VL-7B-Instruct-OCR",
                description: "Vision-Language model adapted for Sanskrit OCR (Optical Character Recognition) tasks.",
                details: "VLM / OCR",
                year: "2025"
            },
            {
                name: "GITAWOTISPER (WHISPER TINY)",
                href: "https://huggingface.co/diabolic6045/GitaWhisper-tiny",
                description: "Fine-tuned Whisper-tiny for Sanskrit shloka transcription with IAST transliteration. 35% WER reduction.",
                details: "AUDIO / ASR / WHISPER",
                year: "2024"
            },
            {
                name: "CUSTOM GPT 100M MODEL",
                href: "#",
                description: "GPT-style Transformer built from scratch on Fineweb via DeepSpeed, ZeRO Stage-2, and FP16 precision.",
                details: "GPT / DEEPSPEED",
                year: "2024"
            },
            {
                name: "SANSKRIT TOKENIZER",
                href: "https://huggingface.co/diabolic6045/Sanskrit-English-qwen2-tokenizer",
                description: "Native tokenization offering 4.5x better efficiency over byte-level tokens, 120K vocab size.",
                details: "NLP / TOKENIZER",
                year: "2024"
            }
        ]
    },
    {
        title: "GENERATIVE & SIMULATIONS",
        projects: [
            {
                name: "FLUX LORAS",
                href: "https://flux-loras.divaxshah.com",
                description: "Specialized generative AI adapters fine-tuned on diverse image datasets for aesthetic scaling.",
                details: "IMAGE GENERATION",
                year: "2024"
            },
            {
                name: "LORE KEEPER",
                href: "https://lore-keeper.divaxshah.com",
                description: "Infinite structural narrative generator using custom LLM agents and creative generation constraints.",
                details: "LLM AGENTS / PROCEDURAL",
                year: "2024"
            },
            {
                name: "WORLD SIM",
                href: "https://world-sim.divaxshah.com",
                description: "CLI-native environment simulator allowing users to craft dynamic sandbox simulations via LLMs.",
                details: "SIMULATION",
                year: "2024"
            }
        ]
    },
    {
        title: "WEB & CREATIVE TECH",
        projects: [
            {
                name: "AURA VIBES",
                href: "https://random-quote-maker.divaxshah.com",
                description: "AI-powered personalized quote visualizer with Twitter extraction mapping and mood alignment.",
                details: "CREATIVE ENGINEERING",
                year: "2024"
            }
        ]
    }
];

import { useState, useEffect } from "react";

export default function Projects() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    return (
        <section id="projects" className={`w-full py-40 ${isDark ? "bg-[#0a0a0a]" : "bg-[var(--background)]"}`}>
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`mb-24 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-12 gap-8 ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}
                >
                    <h2 className={`text-[10vw] sm:text-[6vw] font-bold tracking-tighter leading-none uppercase ${isDark ? "brutalist-outline" : "editorial-text text-black"}`}>
                        PROJECTS.
                    </h2>
                    <span className="font-mono text-[var(--muted)] text-sm tracking-[0.2em] uppercase pb-2">
                        02 - ARCHITECTURAL SYSTEMS
                    </span>
                </motion.div>

                <div className="flex flex-col gap-32">
                    {categories.map((cat, ci) => (
                        <div key={ci} className="w-full">
                            {/* Category Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8 }}
                                className="mb-12 flex items-center gap-6 overflow-hidden"
                            >
                                <div className={`w-3 h-3 ${isDark ? "bg-[var(--accent)]" : "bg-black"}`} />
                                <h3 className={`font-mono tracking-[0.2em] font-bold uppercase ${isDark ? "text-[var(--foreground)]" : "text-black"}`}>
                                    {cat.title}
                                </h3>
                                <div className={`flex-1 h-[1px] ${isDark ? "bg-[#262626]" : "bg-[var(--border)]"}`} />
                            </motion.div>

                            <div className={`flex flex-col border-t ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}>
                                {cat.projects.map((proj, i) => (
                                    <motion.a
                                        href={proj.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                                        className={`group relative flex flex-col md:flex-row items-start md:items-center py-12 md:py-20 border-b transition-colors duration-500 overflow-hidden ${isDark
                                            ? "border-[#262626] hover:bg-white px-6 -mx-6"
                                            : "border-[var(--border)] hover:bg-[#111] hover:text-white px-6 -mx-6"
                                            }`}
                                    >
                                        {!isDark && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--accent)] translate-x-[-4px] group-hover:translate-x-0 transition-transform duration-300" />
                                        )}

                                        <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12">
                                            <div className="flex flex-col md:w-[60%] gap-4">
                                                <div className={`flex items-center gap-4 font-mono text-xs tracking-widest font-bold transition-colors ${isDark ? "text-[var(--accent)] group-hover:text-[var(--accent)]" : "text-[var(--accent)] group-hover:text-white/50"}`}>
                                                    <span>{`${String(i + 1).padStart(2, "0")}`}</span>
                                                    <span className={`w-8 h-[1px] ${isDark ? "bg-[var(--accent)] group-hover:bg-[#111]" : "bg-[var(--accent)]"}`} />
                                                    <span>{proj.details}</span>
                                                </div>
                                                <h4 className={`text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter uppercase transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isDark ? "text-[var(--foreground)] group-hover:text-[#111] group-hover:translate-x-4" : "text-[var(--foreground)] editorial-text group-hover:text-white group-hover:translate-x-4 transform origin-left"}`}>
                                                    {proj.name}
                                                </h4>
                                            </div>

                                            <div className="md:w-[30%] flex flex-col justify-end">
                                                <p className={`text-lg md:text-xl font-mono leading-relaxed uppercase transition-colors duration-500 text-balance ${isDark ? "text-[#737373] group-hover:text-[#333]" : "text-zinc-600 group-hover:text-white/80"}`}>
                                                    {proj.description}
                                                </p>
                                                <div className="mt-8 flex items-center justify-between">
                                                    <span className={`font-sans font-bold text-xs uppercase tracking-widest transition-colors ${isDark ? "text-[var(--foreground)] group-hover:text-[#111]" : "text-black group-hover:text-[var(--accent)]"}`}>
                                                        {proj.year}
                                                    </span>
                                                    <span className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 ${isDark ? "border-[#333] group-hover:bg-[#111] group-hover:border-[#111] text-[#737373] group-hover:text-white" : "border-[var(--border)] group-hover:bg-white text-[var(--muted)] group-hover:text-black group-hover:border-white"}`}>
                                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

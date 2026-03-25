"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

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
                name: "GITAWHISPER (WHISPER TINY)",
                href: "https://huggingface.co/diabolic6045/GitaWhisper-tiny",
                description: "Fine-tuned Whisper-tiny for Sanskrit shloka transcription with IAST transliteration. 35% WER reduction.",
                details: "AUDIO / ASR / WHISPER",
                year: "2024"
            },
            {
                name: "CUSTOM GPT 100M MODEL",
                href: "https://huggingface.co/diabolic6045/Ion-LLM-Base",
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
                href: "https://huggingface.co/collections/diabolic6045/flux-lora",
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

const bentoStyles = [
    // 0: Eco Modern (Organic leaf shape, soft green)
    {
        span: "md:col-span-2 md:row-span-2",
        shape: "rounded-[1.5rem] md:rounded-tl-[3rem] md:rounded-br-[3rem] md:rounded-tr-xl md:rounded-bl-xl",
        light: "bg-[#f4f9f0] border-[#dcebd2] hover:bg-[#ebf4e5]",
        dark: "bg-[#0d170f] border-[#1a2e1d] hover:bg-[#122115]",
        accentLight: "text-[#2e7d32]", accentDark: "text-[#81c784]",
        sticker: "-rotate-3"
    },
    // 1: Playful Arch (Warm clay/terracotta)
    {
        span: "md:col-span-1 md:row-span-2",
        shape: "rounded-[1.5rem] md:rounded-t-[4rem] md:rounded-b-xl",
        light: "bg-[#fdf6f0] border-[#f0dac7] hover:bg-[#faeedf]",
        dark: "bg-[#1c120c] border-[#362116] hover:bg-[#261710]",
        accentLight: "text-[#d84315]", accentDark: "text-[#ffab91]",
        sticker: "rotate-6"
    },
    // 2: Minimalist Brutalist (Sharp, stark)
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-sm md:rounded-md",
        light: "bg-white border-zinc-200 hover:bg-zinc-50",
        dark: "bg-[#0a0a0a] border-[#262626] hover:bg-[#111]",
        accentLight: "text-black", accentDark: "text-white",
        sticker: "rotate-0"
    },
    // 3: Wide Pill (Industrial stone)
    {
        span: "md:col-span-2 md:row-span-1",
        shape: "rounded-[1.5rem] md:rounded-[3rem]",
        light: "bg-[#f8f9fa] border-zinc-200 hover:bg-[#f1f3f5]",
        dark: "bg-[#141517] border-[#2c2e33] hover:bg-[#1b1c1f]",
        accentLight: "text-zinc-600", accentDark: "text-zinc-400",
        sticker: "-rotate-2"
    },
    // 4: Soft Playful Box (Lilac/slate)
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-[1.5rem] md:rounded-2xl",
        light: "bg-[#f5f6fc] border-[#d8dcf0] hover:bg-[#ecedf8]",
        dark: "bg-[#10111a] border-[#222538] hover:bg-[#161824]",
        accentLight: "text-[#3949ab]", accentDark: "text-[#7986cb]",
        sticker: "rotate-3"
    }
];

export default function Projects() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    return (
        <section id="projects" className={`w-full py-12 md:py-16 ${isDark ? "bg-[#0a0a0a]" : "bg-[var(--background)]"}`}>
            <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
                <motion.div
                    initial={{ opacity: 1, y: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0 }}
                    className={`mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-4 md:pb-6 gap-4 md:gap-6 ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}
                >
                    <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter leading-none uppercase ${isDark ? "brutalist-outline" : "editorial-text text-black"}`}>
                        PROJECTS.
                    </h2>
                    <span className="font-mono text-[var(--muted)] text-sm tracking-[0.2em] uppercase pb-2">
                        02 - ARCHITECTURAL SYSTEMS
                    </span>
                </motion.div>

                <div className="flex flex-col gap-8 md:gap-10">
                    {categories.map((cat, ci) => (
                        <div key={ci} className="w-full">
                            {/* Category Header */}
                            <motion.div
                                initial={{ opacity: 1, y: 0 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0 }}
                                className="mb-4 md:mb-6 flex items-center gap-3 md:gap-4 overflow-hidden"
                            >
                                <div className={`w-3 h-3 ${isDark ? "bg-[var(--accent)]" : "bg-black"}`} />
                                <h3 className={`font-mono tracking-[0.2em] font-bold uppercase ${isDark ? "text-[var(--foreground)]" : "text-black"}`}>
                                    {cat.title}
                                </h3>
                                <div className={`flex-1 h-[1px] ${isDark ? "bg-[#262626]" : "bg-[var(--border)]"}`} />
                            </motion.div>

                            {/* Bento Masonry Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[minmax(120px,auto)]">
                                {cat.projects.map((proj, i) => {
                                    const style = bentoStyles[i % bentoStyles.length];
                                    
                                    return (
                                        <motion.a
                                            href={proj.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={i}
                                            initial={{ opacity: 1, scale: 1, y: 0 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0 }}
                                            whileHover={{ scale: 0.98 }}
                                            className={`group relative flex flex-col justify-between p-4 md:p-5 border transition-all duration-500 overflow-hidden 
                                                ${style.span} ${style.shape} 
                                                ${isDark ? style.dark : style.light}`}
                                        >
                                            {/* Hover Glow Effect */}
                                            {isDark && (
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />
                                            )}

                                            {/* Top Row: Number & Floating Sticker */}
                                            <div className="relative z-10 w-full flex justify-between items-start mb-4">
                                                <div className={`font-mono text-xs tracking-widest font-bold opacity-50 transition-opacity group-hover:opacity-100 ${isDark ? "text-white" : "text-black"}`}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>

                                                <div className={`absolute top-0 right-0 z-20 px-2 py-0.5 text-[7px] sm:text-[8px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-sm transition-transform duration-500 origin-center group-hover:scale-110 
                                                    ${style.sticker} ${style.shape.includes('rounded-none') ? 'rounded-none' : 'rounded-full'} 
                                                    ${isDark ? "bg-black/40 border-white/10 text-white" : "bg-white/70 border-black/10 text-black"}`}
                                                >
                                                    {proj.details}
                                                </div>
                                            </div>

                                            {/* Bottom Row: Content */}
                                            <div className="relative z-10 flex flex-col gap-3 md:gap-4 mt-auto">
                                                <h4 className={`text-base md:text-lg lg:text-xl font-bold tracking-tighter uppercase leading-[0.9] transition-colors duration-500 text-balance ${isDark ? style.accentDark : style.accentLight}`}>
                                                    {proj.name}
                                                </h4>
                                                
                                                <p className={`text-[10px] md:text-xs font-mono leading-relaxed uppercase transition-colors duration-500 text-balance ${isDark ? "text-[#a3a3a3] group-hover:text-white" : "text-zinc-600 group-hover:text-black"}`}>
                                                    {proj.description}
                                                </p>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className={`font-sans font-bold text-[8px] uppercase tracking-widest transition-colors ${isDark ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-600"}`}>
                                                        {proj.year}
                                                    </span>
                                                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-45 ${isDark ? "border-[#333] group-hover:bg-white/10 group-hover:border-white/20 text-[#737373] group-hover:text-white" : "border-black/10 group-hover:bg-black/5 text-[var(--muted)] group-hover:text-black group-hover:border-black/20"}`}>
                                                        <svg width="8" height="8" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

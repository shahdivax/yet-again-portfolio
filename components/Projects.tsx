"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const categories = [
    {
        title: "FOUNDATION & ALIGNMENT",
        projects: [
            {
                name: "SANSKRIT QWEN2.5-7B TRANSLATE V2",
                href: "https://huggingface.co/diabolic6045/Sanskrit-qwen-7B-Translate-v2",
                description: "Optimized model for Sanskrit ↔ English bidirectional translation & IAST transliteration.",
                details: "LLM CHAT / LORA / TRANSLATION",
                year: "2024",
                tags: ["LLM", "Qwen2.5", "Sanskrit", "Flash Attention"]
            },
            {
                name: "SANSKRIT QWEN2.5-VL OCR",
                href: "https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-VL-7B-Instruct-OCR",
                description: "Vision-Language model fine-tuned for Sanskrit OCR tasks.",
                details: "VLM / OCR / PARALLEL CORPUS",
                year: "2025",
                tags: ["VLM", "OCR", "Vision", "Qwen2.5-VL"]
            },
            {
                name: "OPEN-LLAMA-3.2-1B-INSTRUCT",
                href: "https://huggingface.co/diabolic6045/open-llama-3.2-1B-Instruct",
                description: "Instruct-tuned LLaMA 3.2 1B on OpenHermes using Axolotl and DeepSpeed.",
                details: "LLM / INSTRUCT TUNING / AXOLOTL",
                year: "2024",
                tags: ["LLaMA", "Instruct", "DeepSpeed", "Axolotl"]
            },
            {
                name: "ION-LLM-BASE (100M)",
                href: "https://huggingface.co/diabolic6045/Ion-LLM-Base",
                description: "Custom GPT Transformer built from scratch on Fineweb via DeepSpeed ZeRO-2.",
                details: "GPT / PRE-TRAINING / DEEPSPEED",
                year: "2024",
                tags: ["GPT", "DeepSpeed", "FP16", "Transformers"]
            },
            {
                name: "GITAWHISPER (WHISPER TINY)",
                href: "https://huggingface.co/diabolic6045/GitaWhisper-tiny",
                description: "Fine-tuned Whisper model for Sanskrit shloka transcription and transliteration.",
                details: "AUDIO / ASR / WHISPER",
                year: "2024",
                tags: ["ASR", "Whisper", "Audio", "PyTorch"]
            },
            {
                name: "SANSKRIT NATIVE TOKENIZER",
                href: "https://huggingface.co/diabolic6045/Sanskrit-English-qwen2-tokenizer",
                description: "Highly efficient native Sanskrit tokenizer offering 4.5x better efficiency.",
                details: "NLP / TOKENIZER / 120K VOCAB",
                year: "2024",
                tags: ["NLP", "Tokenizer", "Efficiency"]
            }
        ]
    },
    {
        title: "APPLIED INTELLIGENCE & AGENTIC SYSTEMS",
        projects: [
            {
                name: "LORE KEEPER",
                href: "https://lore-keeper.divaxshah.com",
                description: "Infinite structural narrative AI generator using custom LLM agents and creative generation constraints.",
                details: "AI AGENTS / PROCEDURAL",
                year: "2024",
                tags: ["Agents", "Procedural", "LLM", "Narrative"]
            },
            {
                name: "WORLD SIM",
                href: "https://world-sim.divaxshah.com",
                description: "CLI-native dynamic sandbox environment simulator allowing users to craft dynamic sandbox simulations via LLMs.",
                details: "CLI / SIMULATION",
                year: "2024",
                tags: ["CLI", "Simulation", "Sandbox", "Python"]
            },
            {
                name: "FLUX LORA ECOSYSTEM",
                href: "https://huggingface.co/collections/diabolic6045/flux-lora",
                description: "Specialized generative AI adapters fine-tuned on diverse image datasets for aesthetic scaling (Wallpapers, Stickers, Canvas).",
                details: "VISION / LORA / GEN AI",
                year: "2024",
                tags: ["Flux", "LoRA", "GenAI", "Images"]
            }
        ]
    }
];

const bentoStyles = [
    // 0: Minimalist Brutalist Base
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-none",
        light: "bg-white border-[var(--border)] hover:border-gray-500 hover:bg-zinc-50",
        dark: "bg-[#0a0a0a] border-[var(--border)] hover:border-[#666666] hover:bg-[#111111]",
        accentLight: "text-black", accentDark: "text-white",
        sticker: "rotate-0",
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 24px 100%, 0 calc(100% - 24px))" // bottom-left chamfer
    },
    // 1: Minimalist Brutalist Alt
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-none",
        light: "bg-white border-[var(--border)] hover:border-gray-500 hover:bg-zinc-50",
        dark: "bg-[#0a0a0a] border-[var(--border)] hover:border-[#666666] hover:bg-[#111111]",
        accentLight: "text-black", accentDark: "text-white",
        sticker: "rotate-0",
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 0 100%)" // bottom-right chamfer
    },
    // 2: Minimalist Brutalist Top-Right
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-none",
        light: "bg-white border-[var(--border)] hover:border-gray-500 hover:bg-zinc-50",
        dark: "bg-[#0a0a0a] border-[var(--border)] hover:border-[#666666] hover:bg-[#111111]",
        accentLight: "text-black", accentDark: "text-white",
        sticker: "rotate-0",
        clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" // top-right chamfer
    },
    // 3: Minimalist Brutalist Top-Left
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-none",
        light: "bg-white border-[var(--border)] hover:border-gray-500 hover:bg-zinc-50",
        dark: "bg-[#0a0a0a] border-[var(--border)] hover:border-[#666666] hover:bg-[#111111]",
        accentLight: "text-black", accentDark: "text-white",
        sticker: "rotate-0",
        clipPath: "polygon(24px 0, 100% 0, 100% 100%, 0 100%, 0 24px)" // top-left chamfer
    }
];

// ─── Project Horizontal Scroll Component ───────────────────────────────────────

export default function Projects() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    const boxBg = isDark ? "bg-[#0a0a0a]" : "bg-white";
    const boxBorder = isDark ? "border-[#404040]" : "border-gray-300";
    const textPrimary = isDark ? "text-white" : "text-black";
    const accentText = isDark ? "text-[#ea580c]" : "text-[#2563eb]";

    return (
        <section id="projects" className="w-full grid grid-cols-1 xl:grid-cols-[1fr_minmax(auto,1000px)_1fr] border-b border-[var(--border)] relative z-10 bg-transparent py-0">
            {/* Left Blueprint Gutter */}
            <div className="hidden xl:block border-r border-[var(--border)]" />

            {/* Core 1000px Grid Zone */}
            <div className="w-full border-x xl:border-x-0 border-[var(--border)] bg-[var(--background)]">
                
                {/* Header Container */}
                <div className={`flex flex-col border-b border-[var(--border)] p-6 sm:p-8 relative overflow-hidden bg-[var(--background)]`}>
                    <div className="flex justify-between items-center w-full">
                        <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter uppercase font-[family-name:var(--font-syne)] leading-none ${textPrimary}`}>
                            PROJECTS
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col">
                    {categories.map((cat, ci) => (
                        <div key={ci} className="flex flex-col border-b border-[var(--border)] last:border-b-0">
                            
                            {/* Category Header */}
                            <div className="flex items-center px-6 sm:px-8 py-4 border-b border-[var(--border)] bg-[var(--background)]">
                                <h3 className={`font-mono text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                                    {cat.title}
                                </h3>
                            </div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                {cat.projects.map((proj, i) => {
                                    const style = bentoStyles[(ci + i) % bentoStyles.length];
                                    
                                    return (
                                        <motion.a
                                            href={proj.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={`${ci}-${i}`}
                                            data-cursor="view"
                                            initial="initial"
                                            whileHover="hover"
                                            variants={{
                                                initial: { y: 0 },
                                                hover: { y: -5 }
                                            }}
                                            className={`group relative flex flex-col justify-between p-4 sm:p-5 border-r border-[var(--border)] last:border-r-0 sm:even:border-r-0 border-b sm:border-b-0 transition-all duration-500 overflow-hidden cursor-none h-[220px] md:h-[240px] w-full
                                                ${style.shape} 
                                                ${isDark ? style.dark : style.light}`}
                                        >
                                            {/* Top Row: Number & Floating Sticker */}
                                            <div className="relative z-10 w-full flex justify-between items-start mb-3">
                                                <div className={`font-mono text-[10px] md:text-xs tracking-widest font-bold opacity-50 transition-opacity group-hover:opacity-100 ${isDark ? "text-white" : "text-black"}`}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>

                                                <div className={`absolute top-0 right-0 z-20 px-2 py-0.5 text-[7px] sm:text-[8px] font-bold tracking-widest uppercase border shadow-sm transition-transform duration-500 origin-center group-hover:scale-110 
                                                    ${style.sticker} rounded-full 
                                                    ${isDark ? "bg-black/80 border-[#333] text-white" : "bg-white border-gray-200 text-black"}`}
                                                >
                                                    {proj.details}
                                                </div>
                                            </div>

                                            {/* Bottom Row: Content */}
                                            <div className="relative z-10 flex flex-col gap-1.5 md:gap-2 mt-auto pointer-events-none group-hover:pointer-events-auto">
                                                <h4 className={`text-lg md:text-xl font-black tracking-tighter uppercase leading-[0.9] transition-colors duration-500 text-balance relative z-10 ${isDark ? style.accentDark : style.accentLight}`}>
                                                    {proj.name}
                                                </h4>
                                                
                                                <p className={`text-[8px] md:text-[9px] font-mono uppercase transition-colors duration-500 text-balance ${isDark ? "text-zinc-400 group-hover:text-zinc-300" : "text-zinc-600 group-hover:text-zinc-800"}`}>
                                                    {proj.description}
                                                </p>

                                                {/* Interactive Tags */}
                                                <div className="flex flex-wrap gap-1 mt-0.5">
                                                    {proj.tags?.map((tag, tIndex) => {
                                                        const tagShapes = [
                                                            'rounded-none', 
                                                            '[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]', 
                                                            '[clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]'
                                                        ];
                                                        
                                                        const isDarkText = isDark ? "text-white border-[#333]" : "text-black border-gray-300";

                                                        const tShape = tagShapes[tIndex % tagShapes.length];

                                                        return (
                                                            <div 
                                                                key={tIndex} 
                                                                className={`px-1.5 py-0.5 text-[6px] md:text-[7px] font-bold font-mono tracking-widest uppercase border transition-all duration-300 hover:-translate-y-1 cursor-default origin-center
                                                                ${tShape} ${isDarkText} ${isDark ? "bg-[#1a1a1a]" : "bg-gray-100"}`}
                                                            >
                                                                {tag}
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                                <div className="mt-2 flex items-center justify-between border-t pt-2 border-[var(--border)] opacity-50 group-hover:opacity-100 transition-opacity">
                                                    <span className={`font-sans font-bold text-[8px] uppercase tracking-widest transition-colors ${isDark ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-600"}`}>
                                                        {proj.year}
                                                    </span>
                                                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-45 ${isDark ? "border-[#333] group-hover:bg-white/10 group-hover:border-white/20 text-[#737373] group-hover:text-white" : "border-black/10 group-hover:bg-black/5 text-[var(--muted)] group-hover:text-black group-hover:border-black/20"}`}>
                                                        <svg width="6" height="6" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.22386 5.72386 3 6 3H11.5C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
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

            {/* Right Blueprint Gutter */}
            <div className="hidden xl:block border-l border-[var(--border)]" />
        </section>
    );
}

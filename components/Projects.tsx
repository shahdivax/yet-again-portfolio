"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";

const categories = [
    {
        title: "LLMS & AI ARCHITECTURES",
        projects: [
            {
                name: "SANSKRIT QWEN2.5-7B CHAT",
                href: "https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-7B-chat",
                description: "Sanskrit translation and transliteration model.",
                details: "LLM CHAT / LORA",
                year: "2024",
                tags: ["LLM", "Qwen2.5", "Sanskrit", "LoRA"]
            },
            {
                name: "SANSKRIT QWEN2.5-VL OCR",
                href: "https://huggingface.co/diabolic6045/Sanskrit-Qwen2.5-VL-7B-Instruct-OCR",
                description: "Vision-Language model for Sanskrit OCR.",
                details: "VLM / OCR",
                year: "2025",
                tags: ["VLM", "OCR", "Vision", "Sanskrit"]
            },
            {
                name: "GITAWHISPER (WHISPER TINY)",
                href: "https://huggingface.co/diabolic6045/GitaWhisper-tiny",
                description: "Sanskrit shloka transcription and transliteration.",
                details: "AUDIO / ASR / WHISPER",
                year: "2024",
                tags: ["ASR", "Whisper", "Audio", "PyTorch"]
            },
            {
                name: "CUSTOM GPT 100M MODEL",
                href: "https://huggingface.co/diabolic6045/Ion-LLM-Base",
                description: "GPT Transformer built from scratch.",
                details: "GPT / DEEPSPEED",
                year: "2024",
                tags: ["GPT", "DeepSpeed", "FP16", "Transformers"]
            },
            {
                name: "SANSKRIT TOKENIZER",
                href: "https://huggingface.co/diabolic6045/Sanskrit-English-qwen2-tokenizer",
                description: "Highly efficient native Sanskrit tokenizer.",
                details: "NLP / TOKENIZER",
                year: "2024",
                tags: ["NLP", "Tokenizer", "Efficiency", "120K Vocab"]
            }
        ]
    },
    {
        title: "GENERATIVE & SIMULATIONS",
        projects: [
            {
                name: "FLUX LORAS",
                href: "https://huggingface.co/collections/diabolic6045/flux-lora",
                description: "Generative AI adapters for aesthetics.",
                details: "IMAGE GENERATION",
                year: "2024",
                tags: ["Flux", "LoRA", "GenAI", "Images"]
            },
            {
                name: "LORE KEEPER",
                href: "https://lore-keeper.divaxshah.com",
                description: "Infinite structural narrative AI generator.",
                details: "LLM AGENTS / PROCEDURAL",
                year: "2024",
                tags: ["Agents", "Procedural", "LLM", "Narrative"]
            },
            {
                name: "WORLD SIM",
                href: "https://world-sim.divaxshah.com",
                description: "CLI-native dynamic sandbox environment simulator.",
                details: "SIMULATION",
                year: "2024",
                tags: ["CLI", "Simulation", "Sandbox", "Python"]
            }
        ]
    },
    {
        title: "WEB & CREATIVE TECH",
        projects: [
            {
                name: "AURA VIBES",
                href: "https://random-quote-maker.divaxshah.com",
                description: "Personalized AI quote and mood visualizer.",
                details: "CREATIVE ENGINEERING",
                year: "2024",
                tags: ["Creative", "FastAPI", "Web", "Visuals"]
            }
        ]
    }
];

const bentoStyles = [
    // 0: Eco Modern
    {
        span: "md:col-span-2 md:row-span-2",
        shape: "rounded-[1.5rem] md:rounded-tl-[3rem] md:rounded-br-[3rem] md:rounded-tr-xl md:rounded-bl-xl",
        light: "bg-[#f4f9f0] border-[#dcebd2] hover:bg-[#ebf4e5]",
        dark: "bg-[#0a120b] border-[#1f3d23] hover:bg-[#112414] hover:border-[#2e5c34]",
        accentLight: "text-[#2e7d32]", accentDark: "text-[#4ade80]",
        sticker: "-rotate-3"
    },
    // 1: Playful Arch
    {
        span: "md:col-span-1 md:row-span-2",
        shape: "rounded-[1.5rem] md:rounded-t-[4rem] md:rounded-b-xl",
        light: "bg-[#fdf6f0] border-[#f0dac7] hover:bg-[#faeedf]",
        dark: "bg-[#1c0f0a] border-[#4a2618] hover:bg-[#2e180f] hover:border-[#6b3621]",
        accentLight: "text-[#d84315]", accentDark: "text-[#fb923c]",
        sticker: "rotate-6"
    },
    // 2: Minimalist Brutalist
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-sm md:rounded-md",
        light: "bg-white border-zinc-200 hover:bg-zinc-50",
        dark: "bg-[#050505] border-[#333333] hover:bg-[#111111] hover:border-[#555555]",
        accentLight: "text-black", accentDark: "text-white",
        sticker: "rotate-0"
    },
    // 3: Wide Pill
    {
        span: "md:col-span-2 md:row-span-1",
        shape: "rounded-[1.5rem] md:rounded-[3rem]",
        light: "bg-[#f8f9fa] border-zinc-200 hover:bg-[#f1f3f5]",
        dark: "bg-[#111318] border-[#2a303c] hover:bg-[#1a1d24] hover:border-[#3b4353]",
        accentLight: "text-zinc-600", accentDark: "text-[#94a3b8]",
        sticker: "-rotate-2"
    },
    // 4: Soft Playful Box
    {
        span: "md:col-span-1 md:row-span-1",
        shape: "rounded-[1.5rem] md:rounded-2xl",
        light: "bg-[#f5f6fc] border-[#d8dcf0] hover:bg-[#ecedf8]",
        dark: "bg-[#0b0c16] border-[#282a4a] hover:bg-[#121424] hover:border-[#3d4073]",
        accentLight: "text-[#3949ab]", accentDark: "text-[#818cf8]",
        sticker: "rotate-3"
    }
];

// ─── Project Horizontal Scroll Component ───────────────────────────────────────

export default function Projects() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);

    const [windowWidth, setWindowWidth] = useState(1200);

    useEffect(() => {
        setMounted(true);
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate total number of projects to determine scroll length
    const totalProjects = categories.reduce((sum, cat) => sum + cat.projects.length, 0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // We use a completely different approach to fix the "empty scroll" bug once and for all.
    // Instead of doing arbitrary math on VW, we map the scroll progress from 0% to -100% of the *track width minus the viewport width*.
    // Since Framer Motion's `useTransform` can't easily do `calc(-100% + 100vw)`, we handle it in CSS.
    // 100% of the flex track is too far (it scrolls completely off screen).
    // We want it to scroll exactly (TrackWidth - 100vw).
    
    // We achieve this by mapping 0-1 to "0%" -> "-100%". 
    // And in the styles we will do: `translateX(calc(${x} + (100vw * ${scrollYProgress})))`
    // This perfectly offsets the width of the screen dynamically, regardless of card sizes!
    
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
    const xOffset = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);

    const isDark = mounted && theme === "dark";

    return (
        <section id="projects" className={`w-full ${isDark ? "bg-[#0a0a0a]" : "bg-[var(--background)]"}`}>
            {/* Hardcode a tall height so we have plenty of scroll runway */}
            <div ref={targetRef} className="relative w-full h-[500vh]">
                
                {/* The sticky viewport container */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                    
                    {/* Overall Section Header */}
                    <div className="absolute top-12 md:top-20 left-0 w-full px-6 sm:px-12 pointer-events-none z-20">
                        <div className="max-w-[1400px] mx-auto w-full">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`pb-4 md:pb-6 border-b ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}
                            >
                                <h2 className={`text-2xl md:text-3xl font-bold tracking-tighter leading-none uppercase ${isDark ? "brutalist-outline" : "editorial-text text-black"}`}>
                                    PROJECTS.
                                </h2>
                            </motion.div>
                        </div>
                    </div>

                    {/* Continuous Horizontal Track */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-full pt-20">
                        <motion.div 
                            style={{ 
                                x,
                                left: xOffset 
                            }} 
                            className="flex items-center gap-8 md:gap-12 pl-6 sm:pl-12 pr-6 w-max relative"
                        >
                            {categories.map((cat, ci) => (
                                <div key={ci} className="flex items-center gap-8 md:gap-12">
                                
                                {/* Category Vertical Title Separator */}
                                <div className="flex flex-col items-center justify-center shrink-0 w-16">
                                    <div className={`w-[1px] h-16 md:h-24 mb-4 ${isDark ? "bg-[#262626]" : "bg-[var(--border)]"}`} />
                                    <h3 className={`font-mono tracking-[0.2em] font-bold uppercase whitespace-nowrap -rotate-90 my-24 ${isDark ? "text-[var(--foreground)]" : "text-black"}`}>
                                        {cat.title}
                                    </h3>
                                    <div className={`w-[1px] h-16 md:h-24 mt-4 ${isDark ? "bg-[#262626]" : "bg-[var(--border)]"}`} />
                                </div>

                                {/* Category Projects */}
                                {cat.projects.map((proj, i) => {
                                    const style = bentoStyles[(ci + i) % bentoStyles.length];
                                    
                                    return (
                                        <motion.a
                                            href={proj.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            key={`${ci}-${i}`}
                                            whileHover={{ scale: 0.98, y: -5 }}
                                            className={`group relative flex flex-col justify-between p-6 md:p-8 border transition-all duration-500 overflow-hidden shrink-0 w-[85vw] max-w-[400px] h-[350px] md:h-[400px]
                                                rounded-[2rem] 
                                                ${isDark ? style.dark : style.light}`}
                                        >
                                            {/* Hover Glow Effect */}
                                            {isDark && (
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.04)_0%,_transparent_70%)] pointer-events-none" />
                                            )}

                                            {/* Top Row: Number & Floating Sticker */}
                                            <div className="relative z-10 w-full flex justify-between items-start mb-4">
                                                <div className={`font-mono text-sm md:text-base tracking-widest font-bold opacity-50 transition-opacity group-hover:opacity-100 ${isDark ? "text-white" : "text-black"}`}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>

                                                <div className={`absolute top-0 right-0 z-20 px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md shadow-sm transition-transform duration-500 origin-center group-hover:scale-110 
                                                    ${style.sticker} rounded-full 
                                                    ${isDark ? "bg-black/40 border-white/10 text-white" : "bg-white/70 border-black/10 text-black"}`}
                                                >
                                                    {proj.details}
                                                </div>
                                            </div>

                                            {/* Bottom Row: Content */}
                                            <div className="relative z-10 flex flex-col gap-3 md:gap-4 mt-auto">
                                                <h4 className={`text-2xl md:text-3xl font-black tracking-tighter uppercase leading-[0.9] transition-colors duration-500 text-balance ${isDark ? style.accentDark : style.accentLight}`}>
                                                    {proj.name}
                                                </h4>
                                                
                                                <p className={`text-[10px] md:text-xs font-mono uppercase transition-colors duration-500 text-balance ${isDark ? "text-zinc-400 group-hover:text-zinc-300" : "text-zinc-600 group-hover:text-zinc-800"}`}>
                                                    {proj.description}
                                                </p>

                                                {/* Interactive Tags */}
                                                <div className="flex flex-wrap gap-2 mt-1">
                                                    {proj.tags?.map((tag, tIndex) => {
                                                        const tagShapes = [
                                                            'rounded-none', 
                                                            'rounded-full', 
                                                            'rounded-sm', 
                                                            '[clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]', 
                                                            '[clip-path:polygon(0_0,calc(100%-8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%-8px))]'
                                                        ];
                                                        
                                                        // A robust color palette for tags that works well in both light and dark mode
                                                        const tagColors = [
                                                            // 0: Cyan / Teal
                                                            isDark ? "bg-[rgba(6,182,212,0.2)] text-[#ecfeff] border-cyan-500 hover:bg-[rgba(6,182,212,0.4)]" : "bg-[rgba(6,182,212,0.1)] text-cyan-900 border-cyan-400 hover:bg-[rgba(6,182,212,0.3)]",
                                                            // 1: Amber / Orange
                                                            isDark ? "bg-[rgba(245,158,11,0.2)] text-[#fffbeb] border-amber-500 hover:bg-[rgba(245,158,11,0.4)]" : "bg-[rgba(245,158,11,0.1)] text-amber-900 border-amber-400 hover:bg-[rgba(245,158,11,0.3)]",
                                                            // 2: Fuchsia / Purple
                                                            isDark ? "bg-[rgba(217,70,239,0.2)] text-[#fdf4ff] border-fuchsia-500 hover:bg-[rgba(217,70,239,0.4)]" : "bg-[rgba(217,70,239,0.1)] text-fuchsia-900 border-fuchsia-400 hover:bg-[rgba(217,70,239,0.3)]",
                                                            // 3: Emerald / Green
                                                            isDark ? "bg-[rgba(16,185,129,0.2)] text-[#ecfdf5] border-emerald-500 hover:bg-[rgba(16,185,129,0.4)]" : "bg-[rgba(16,185,129,0.1)] text-emerald-900 border-emerald-400 hover:bg-[rgba(16,185,129,0.3)]",
                                                            // 4: Rose / Pink
                                                            isDark ? "bg-[rgba(244,63,94,0.2)] text-[#fff1f2] border-rose-500 hover:bg-[rgba(244,63,94,0.4)]" : "bg-[rgba(244,63,94,0.1)] text-rose-900 border-rose-400 hover:bg-[rgba(244,63,94,0.3)]",
                                                            // 5: Indigo / Blue
                                                            isDark ? "bg-[rgba(99,102,241,0.2)] text-[#eef2ff] border-indigo-500 hover:bg-[rgba(99,102,241,0.4)]" : "bg-[rgba(99,102,241,0.1)] text-indigo-900 border-indigo-400 hover:bg-[rgba(99,102,241,0.3)]",
                                                            // 6: Lime / Light Green
                                                            isDark ? "bg-[rgba(132,204,22,0.2)] text-[#f7fee7] border-lime-500 hover:bg-[rgba(132,204,22,0.4)]" : "bg-[rgba(132,204,22,0.1)] text-lime-900 border-lime-400 hover:bg-[rgba(132,204,22,0.3)]"
                                                        ];

                                                        const tShape = tagShapes[tIndex % tagShapes.length];
                                                        // Distribute colors pseudo-randomly but consistently based on the tag text length and index
                                                        const colorIndex = (tag.length + tIndex * 3) % tagColors.length;
                                                        const tColor = tagColors[colorIndex];

                                                        return (
                                                            <div 
                                                                key={tIndex} 
                                                                className={`px-3 py-1.5 text-[8px] md:text-[9px] font-bold font-sans tracking-widest uppercase border backdrop-blur-md transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:rotate-1 cursor-default origin-center shadow-lg
                                                                ${tShape} ${tColor}`}
                                                            >
                                                                {tag}
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                                <div className="mt-4 flex items-center justify-between border-t pt-4 border-inherit">
                                                    <span className={`font-sans font-bold text-[10px] uppercase tracking-widest transition-colors ${isDark ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-400 group-hover:text-zinc-600"}`}>
                                                        {proj.year}
                                                    </span>
                                                    <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-45 ${isDark ? "border-[#333] group-hover:bg-white/10 group-hover:border-white/20 text-[#737373] group-hover:text-white" : "border-black/10 group-hover:bg-black/5 text-[var(--muted)] group-hover:text-black group-hover:border-black/20"}`}>
                                                        <svg width="10" height="10" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4H6C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3H11.5C11.7761 3 12 3.22386 12 3.5V9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

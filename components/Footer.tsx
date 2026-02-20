"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { useState, useEffect } from "react";

export default function Footer() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    return (
        <footer id="contact" className={`w-full py-40 overflow-hidden relative border-t ${isDark ? "bg-[#0a0a0a] text-white border-[#262626]" : "bg-[var(--background)] text-black border-[var(--border)]"}`}>
            <div className={`max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col justify-between items-start border-b pb-20 relative z-10 ${isDark ? "border-[#262626]" : "border-[var(--border)]"}`}>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                >
                    <a href="mailto:divax12345@gmail.com" className="group w-full block">
                        <h2 className={`text-[12vw] sm:text-[15vw] font-bold tracking-tighter uppercase leading-[0.85] transition-colors duration-700 ${isDark ? "text-white brutalist-outline" : "text-black editorial-text"}`}>
                            LET'S
                            <br />
                            BUILD<span className={`text-[var(--accent)] ${isDark ? "text-[#c2410c]" : ""}`}>.</span>
                        </h2>
                    </a>
                </motion.div>

                <div className={`w-full mt-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 font-mono uppercase text-sm tracking-widest ${isDark ? "text-zinc-500" : "text-[var(--muted)]"}`}>
                    <div className="flex flex-col gap-6 w-full md:w-auto">
                        <span className={`font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}>CONNECT</span>

                        {/* ── Mobile: 2×2 social card grid ── */}
                        {(() => {
                            const socials = [
                                { label: "GITHUB", handle: "@SHAHDIVAX", abbr: "GH", href: "https://github.com/shahdivax" },
                                { label: "LINKEDIN", handle: "@DIVAX-SHAH", abbr: "LI", href: "https://www.linkedin.com/in/divax-shah/" },
                                { label: "TWITTER", handle: "@DIVAX_SHAH_", abbr: "X", href: "https://x.com/divax_shah_" },
                                { label: "HUGGINGFACE", handle: "@DIABOLIC6045", abbr: "HF", href: "https://huggingface.co/diabolic6045" },
                            ];
                            return (
                                <>
                                    {/* Mobile grid */}
                                    <div className="grid grid-cols-2 gap-3 md:hidden">
                                        {socials.map((s) => (
                                            <a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`group relative flex flex-col justify-between p-4 border overflow-hidden transition-colors duration-300
                                                    ${isDark
                                                        ? "border-[#262626] bg-[#111] hover:border-[#c2410c]"
                                                        : "border-[var(--border)] bg-white hover:border-[var(--accent)]"
                                                    }`}
                                            >
                                                {/* Top accent bar on hover */}
                                                <div className={`absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ${isDark ? "bg-[#c2410c]" : "bg-[var(--accent)]"}`} />

                                                <span className={`text-[18px] font-bold leading-none mb-4 transition-colors duration-300 ${isDark ? "text-[#333] group-hover:text-[#c2410c]" : "text-gray-200 group-hover:text-[var(--accent)]"}`}>
                                                    {s.abbr}
                                                </span>
                                                <div>
                                                    <div className={`text-[9px] tracking-[0.2em] font-bold mb-0.5 ${isDark ? "text-zinc-600" : "text-zinc-400"}`}>{s.label}</div>
                                                    <div className={`text-[10px] tracking-[0.12em] transition-colors duration-300 ${isDark ? "text-zinc-400 group-hover:text-[#c2410c]" : "text-zinc-500 group-hover:text-[var(--accent)]"}`}>{s.handle}</div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>

                                    {/* Desktop text links */}
                                    <div className="hidden md:flex flex-col gap-6">
                                        {socials.map((s) => (
                                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                                                className={`transition-colors ${isDark ? "hover:text-[#c2410c]" : "hover:text-[var(--accent)]"}`}>
                                                {s.label} / {s.handle}
                                            </a>
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </div>

                    <div className="flex flex-col md:text-right gap-6">
                        <span className={`font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}>AVAILABILITY</span>
                        <p className="max-w-xs text-balance leading-relaxed">
                            CURRENTLY OPEN FOR NEW OPPORTUNITIES AND COLLABORATIONS IN AI/ML ENGINEERING.
                        </p>
                        <a href="mailto:divax12345@gmail.com" className={`transition-colors font-bold ${isDark ? "hover:text-[#c2410c] text-[#c2410c]" : "hover:text-[var(--accent)] text-black"}`}>DIVAX12345@GMAIL.COM</a>
                    </div>
                </div>
            </div>

            <div className={`relative z-10 w-full mt-12 px-6 sm:px-12 max-w-[1400px] mx-auto flex flex-col sm:flex-row justify-between items-center text-xs font-mono font-bold uppercase tracking-[0.2em] ${isDark ? "text-zinc-600" : "text-[var(--muted)]"}`}>
                <span>DIVAX SHAH</span>
                <span>Still learning. STILL BUILDING</span>
            </div>
        </footer>
    );
}

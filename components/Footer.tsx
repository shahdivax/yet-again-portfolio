"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function Footer() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

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
                        <h2 className={`text-[12vw] sm:text-[15vw] font-bold tracking-tighter uppercase leading-[0.85] transition-colors duration-700 ${isDark ? "text-white hover:text-[#c2410c] brutalist-outline hover:!text-[#c2410c]" : "text-black hover:text-[var(--accent)] editorial-text"}`}>
                            LET'S
                            <br />
                            BUILD<span className={`text-[var(--accent)] ${isDark ? "text-[#c2410c]" : ""}`}>.</span>
                        </h2>
                    </a>
                </motion.div>

                <div className={`w-full mt-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 font-mono uppercase text-sm tracking-widest ${isDark ? "text-zinc-500" : "text-[var(--muted)]"}`}>
                    <div className="flex flex-col gap-6">
                        <span className={`font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}>CONNECT</span>
                        <a href="https://github.com/shahdivax" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? "hover:text-[#c2410c]" : "hover:text-[var(--accent)]"}`}>GITHUB / @SHAHDIVAX</a>
                        <a href="https://www.linkedin.com/in/divax-shah/" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? "hover:text-[#c2410c]" : "hover:text-[var(--accent)]"}`}>LINKEDIN / @DIVAX-SHAH</a>
                        <a href="https://huggingface.co/diabolic6045" target="_blank" rel="noreferrer" className={`transition-colors ${isDark ? "hover:text-[#c2410c]" : "hover:text-[var(--accent)]"}`}>HUGGINGFACE / @DIABOLIC6045</a>
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
                <span>© {new Date().getFullYear()} DIVAX SHAH</span>
                <span>ENGINEERED TO PERFECTION</span>
            </div>

            {/* Light Mode Extra Decoration */}
            {!isDark && (
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[var(--border)] -translate-x-1/2 mix-blend-multiply pointer-events-none" />
            )}
        </footer>
    );
}

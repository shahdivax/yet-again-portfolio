"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

// ─── Types ───────────────────────────────────────────────────────────────────
interface ContributionDay {
    contributionCount: number;
    date: string;
    color: string;
}

interface ContributionWeek {
    contributionDays: ContributionDay[];
}

interface ContributionCalendar {
    totalContributions: number;
    weeks: ContributionWeek[];
}

// ─── GitHub Contribution Grid ────────────────────────────────────────────────
function ContributionGrid({
    calendar,
    isDark,
}: {
    calendar: ContributionCalendar;
    isDark: boolean;
}) {
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

    const CELL = 10;
    const GAP = 2;
    const COLS = calendar.weeks.length;
    const ROWS = 7;
    const W = COLS * (CELL + GAP) - GAP;
    const H = ROWS * (CELL + GAP) - GAP;

    // Day-of-week labels (Mon, Wed, Fri)
    const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

    // Month labels (derive from first day of each week)
    const monthLabels: { label: string; x: number }[] = [];
    let lastMonth = -1;
    calendar.weeks.forEach((week, wi) => {
        const firstDay = week.contributionDays[0];
        if (!firstDay) return;
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
            monthLabels.push({
                label: new Date(firstDay.date).toLocaleString("default", { month: "short" }),
                x: wi * (CELL + GAP),
            });
            lastMonth = month;
        }
    });

    // Only show months that have enough space (>3 weeks apart)
    const filteredMonths = monthLabels.filter((m, i) => {
        if (i === 0) return true;
        return m.x - monthLabels[i - 1].x > 3 * (CELL + GAP);
    });

    const emptyCellColor = isDark ? "#1a1a1a" : "#ebedf0";

    function getTooltipText(day: ContributionDay) {
        const date = new Date(day.date);
        const formatted = date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${formatted}`;
    }

    return (
        <div className="relative w-full">
            <div className="overflow-x-auto pb-1">
                {/* Tooltip */}
                {hoveredDay && (
                    <div
                        className={`absolute z-50 pointer-events-none px-2 py-1 text-[10px] font-mono whitespace-nowrap shadow-lg
                        ${isDark ? "bg-[#1a1a1a] text-[#f5f5f5] border border-[#262626]" : "bg-white text-[#111] border border-[#eaeaea]"}`}
                        style={{
                            left: tooltip.x,
                            top: tooltip.y - 36,
                            transform: "translateX(-50%)",
                        }}
                    >
                        {getTooltipText(hoveredDay)}
                    </div>
                )}

                <svg
                    width={W + 28}
                    height={H + 22}
                    viewBox={`0 0 ${W + 28} ${H + 22}`}
                    style={{ display: "block", minWidth: W + 28 }}
                >
                    {/* Month labels */}
                    {filteredMonths.map((m) => (
                        <text
                            key={m.label + m.x}
                            x={m.x + 26}
                            y={9}
                            fontSize={9}
                            fill={isDark ? "#737373" : "#888888"}
                            fontFamily="monospace"
                        >
                            {m.label}
                        </text>
                    ))}

                    {/* Day-of-week labels */}
                    {DAY_LABELS.map((label, di) => (
                        <text
                            key={di}
                            x={12}
                            y={14 + di * (CELL + GAP) + CELL / 2}
                            fontSize={8}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isDark ? "#525252" : "#aaaaaa"}
                            fontFamily="monospace"
                        >
                            {label}
                        </text>
                    ))}

                    {/* Grid cells */}
                    <g transform="translate(26, 13)">
                        {calendar.weeks.map((week, wi) =>
                            week.contributionDays.map((day, di) => {
                                const x = wi * (CELL + GAP);
                                const y = di * (CELL + GAP);
                                const isEmpty = day.contributionCount === 0;
                                const cellColor = isEmpty ? emptyCellColor : day.color;
                                return (
                                    <rect
                                        key={day.date}
                                        x={x}
                                        y={y}
                                        width={CELL}
                                        height={CELL}
                                        rx={2}
                                        ry={2}
                                        fill={cellColor}
                                        style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                                        onMouseEnter={(e) => {
                                            setHoveredDay(day);
                                            const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                                            const container = (e.currentTarget as SVGRectElement)
                                                .closest(".overflow-x-auto")
                                                ?.getBoundingClientRect();
                                            setTooltip({
                                                x: x + 26,
                                                y: y + 13,
                                            });
                                            // suppress unused warning
                                            void rect;
                                            void container;
                                        }}
                                        onMouseLeave={() => setHoveredDay(null)}
                                    />
                                );
                            })
                        )}
                    </g>
                </svg>
            </div>
        </div>
    );
}

// ─── Skeleton loader ─────────────────────────────────────────────────────────
function ContributionSkeleton({ isDark }: { isDark: boolean }) {
    return (
        <div className="w-full overflow-hidden">
            <div className={`animate-pulse h-[110px] w-full ${isDark ? "bg-[#1a1a1a]" : "bg-[#ebedf0]/60"}`}
                style={{ borderRadius: 2 }}
            />
        </div>
    );
}

// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
    const [calendarError, setCalendarError] = useState<string | null>(null);
    const [calendarLoading, setCalendarLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && theme === "dark";

    // Fetch contributions from our secure server-side proxy
    const fetchContributions = useCallback(async () => {
        try {
            setCalendarLoading(true);
            setCalendarError(null);
            const res = await fetch("/api/github");
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${res.status}`);
            }
            const data: ContributionCalendar = await res.json();
            setCalendar(data);
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : "Failed to load";
            setCalendarError(msg);
        } finally {
            setCalendarLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContributions();
    }, [fetchContributions]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col justify-center relative pt-20 overflow-hidden bg-[var(--background)] z-10 box-border section-border-bottom"
        >
            <motion.div
                style={{ y: y1, opacity }}
                className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full z-20"
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 md:gap-8 mb-4">
                        {/* ── Portrait Widget ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                            className="relative flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 group/portrait"
                        >
                            {/* Slowly-rotating dashed outer ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2.5 sm:-inset-3 pointer-events-none"
                                style={{
                                    border: `1.5px dashed ${isDark ? "#c2410c66" : "#2563eb44"}`,
                                    borderRadius: "4px",
                                }}
                            />
                            {/* Counter-rotating accent ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-1 pointer-events-none"
                                style={{
                                    border: `1px solid ${isDark ? "#c2410c22" : "#2563eb18"}`,
                                    borderRadius: "3px",
                                }}
                            />

                            {/* Main square image box */}
                            <div
                                className={`relative w-full h-full overflow-hidden shadow-2xl border-2 transition-all duration-700
                                    ${isDark
                                        ? "border-[#c2410c] shadow-[#c2410c]/20"
                                        : "border-[var(--accent)] shadow-[var(--accent)]/15"
                                    }`}
                                style={{ borderRadius: "2px" }}
                            >
                                <img
                                    src="https://res.cloudinary.com/djc2l2zjr/image/upload/v1771571110/1771570920892_2_l2drnn.jpg"
                                    alt="Divax Shah"
                                    className={`w-full h-full object-cover transition-all duration-700
                                        scale-105 group-hover/portrait:scale-100
                                        ${isDark
                                            ? "grayscale-[0.6] brightness-90 group-hover/portrait:grayscale-0 group-hover/portrait:brightness-100"
                                            : "group-hover/portrait:brightness-105"
                                        }`}
                                />
                                {/* Scanning line sweep */}
                                <motion.div
                                    className="absolute inset-x-0 h-[2px] pointer-events-none"
                                    style={{ background: isDark ? "rgba(194,65,12,0.6)" : "rgba(37,99,235,0.45)" }}
                                    initial={{ top: "100%" }}
                                    animate={{ top: ["-4%", "104%"] }}
                                    transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 2.5 }}
                                />
                                {/* Colour-grade overlay on hover */}
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover/portrait:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-color
                                        ${isDark ? "bg-[#c2410c]/30" : "bg-[var(--accent)]/20"}`}
                                />
                            </div>

                            {/* Corner bracket — top-left */}
                            <div className={`absolute -top-0.5 -left-0.5 w-4 h-4 border-t-2 border-l-2 transition-all duration-500
                                group-hover/portrait:-translate-x-1 group-hover/portrait:-translate-y-1
                                ${isDark ? "border-[#c2410c]" : "border-[var(--accent)]"}`} />
                            {/* Corner bracket — bottom-right */}
                            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 border-b-2 border-r-2 transition-all duration-500
                                group-hover/portrait:translate-x-1 group-hover/portrait:translate-y-1
                                ${isDark ? "border-[#c2410c]" : "border-[var(--accent)]"}`} />
                            {/* Corner bracket — top-right */}
                            <div className={`absolute -top-0.5 -right-0.5 w-4 h-4 border-t-2 border-r-2 transition-all duration-500
                                group-hover/portrait:translate-x-1 group-hover/portrait:-translate-y-1
                                ${isDark ? "border-[#c2410c]/50" : "border-[var(--accent)]/50"}`} />
                            {/* Corner bracket — bottom-left */}
                            <div className={`absolute -bottom-0.5 -left-0.5 w-4 h-4 border-b-2 border-l-2 transition-all duration-500
                                group-hover/portrait:-translate-x-1 group-hover/portrait:translate-y-1
                                ${isDark ? "border-[#c2410c]/50" : "border-[var(--accent)]/50"}`} />
                        </motion.div>
                        <h1 className={`-ml-[0.05em] text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tight leading-[0.85] uppercase font-[family-name:var(--font-syne)] ${isDark ? "brutalist-outline" : "text-[var(--foreground)]"}`}>
                            <span className="block overflow-hidden pb-4">
                                <motion.span
                                    className="block"
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                                >
                                    DIVAX SHAH
                                </motion.span>
                            </span>
                        </h1>
                    </div>
                    <h2 className={`text-[6vw] sm:text-[4vw] font-mono font-bold tracking-wider leading-[1] uppercase mb-6 sm:mb-12 ${isDark ? "text-[#c2410c]" : "text-[var(--accent)]"}`}>
                        <span className="block overflow-hidden pb-4">
                            <motion.span
                                className="block"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            >
                                Still learning. STILL BUILDING
                            </motion.span>
                        </span>
                    </h2>
                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="flex flex-col lg:flex-row justify-between items-stretch gap-8 lg:gap-12 mt-4 sm:mt-8"
                >
                    {/* Left: Bio & Buttons */}
                    <div className="flex-1 flex flex-col justify-between max-w-xl">
                        <p className={`text-lg sm:text-lg font-mono uppercase transition-colors duration-[800ms] mb-8 lg:mb-0 pr-0 md:pr-10 ${isDark ? "text-[#737373] font-bold tracking-wide" : "text-zinc-600 font-medium"}`}>
                            Building AI applications powered by fine-tuned LLMs, generative models, and NLP. Focused on making AI useful, reliable, and deployable.
                        </p>
                        <div className="flex gap-6 mt-6 lg:mt-auto">
                            <a
                                href="https://huggingface.co/datasets/diabolic6045/divax-portfolio/resolve/main/public/resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className={`group flex items-center gap-4 relative overflow-hidden font-mono text-sm tracking-[0.2em] font-bold uppercase pb-1 transition-colors duration-[800ms] ${isDark ? "text-[var(--foreground)]" : "text-black"}`}
                            >
                                <span className={`w-8 h-[2px] ${isDark ? "bg-[#c2410c]" : "bg-[var(--accent)]"} group-hover:scale-x-150 transform origin-left transition-transform duration-500`} />
                                <span className="relative z-10 group-hover:text-[var(--accent)] transition-colors duration-500">DOWNLOAD RESUME</span>
                            </a>
                        </div>
                    </div>

                    {/* Right: GitHub Contribution Graph */}
                    <div className="flex-1 max-w-[640px] flex items-center h-full">
                        <div className={`w-full p-5 border transition-colors duration-500 shadow-xl ${isDark ? "border-[#262626] bg-[#0a0a0a]" : "border-[var(--accent)]/20 bg-white"} relative group overflow-hidden`}>
                            {/* Accent highlight line on hover */}
                            <div className={`absolute top-0 left-0 w-full h-[2px] ${isDark ? "bg-[#c2410c]" : "bg-[var(--accent)]"} transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700`} />

                            <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? "bg-[#c2410c]/5" : "bg-[var(--accent)]/5"} rounded-full blur-3xl group-hover:bg-[var(--accent)]/10 transition-colors duration-700 pointer-events-none`} />

                            {/* Header row */}
                            <div className="flex justify-between items-center mb-4 relative z-10">
                                <div>
                                    <h3 className={`text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase ${isDark ? "text-[#c2410c]" : "text-[var(--accent)]"}`}>
                                        GITHUB ARTIFACTS
                                    </h3>
                                    {calendar && (
                                        <p className={`text-[10px] font-mono mt-0.5 ${isDark ? "text-[#525252]" : "text-[#aaa]"}`}>
                                            {calendar.totalContributions.toLocaleString()} contributions in the last year
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    {/* Color legend */}
                                    {mounted && (
                                        <div className="flex items-center gap-1">
                                            <span className={`text-[9px] font-mono ${isDark ? "text-[#525252]" : "text-[#bbb]"}`}>Less</span>
                                            {[isDark ? "#1a1a1a" : "#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map((c) => (
                                                <div key={c} style={{ width: 10, height: 10, backgroundColor: c, borderRadius: 2 }} />
                                            ))}
                                            <span className={`text-[9px] font-mono ${isDark ? "text-[#525252]" : "text-[#bbb]"}`}>More</span>
                                        </div>
                                    )}
                                    <div className="flex gap-1">
                                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#262626]" : "bg-gray-200"} group-hover:bg-[#c2410c] transition-colors duration-300 delay-100`} />
                                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#262626]" : "bg-gray-200"} group-hover:bg-[#c2410c] transition-colors duration-300 delay-200`} />
                                        <div className={`w-1.5 h-1.5 rounded-full ${isDark ? "bg-[#262626]" : "bg-gray-200"} group-hover:bg-[#c2410c] transition-colors duration-300 delay-300`} />
                                    </div>
                                </div>
                            </div>

                            {/* Graph area */}
                            <div className="relative z-10">
                                {!mounted || calendarLoading ? (
                                    <ContributionSkeleton isDark={isDark} />
                                ) : calendarError ? (
                                    <div className={`flex flex-col items-center justify-center h-[110px] gap-2 ${isDark ? "text-[#525252]" : "text-[#aaa]"}`}>
                                        <span className="text-xs font-mono">⚠ {calendarError}</span>
                                        <button
                                            onClick={fetchContributions}
                                            className={`text-[10px] font-mono uppercase tracking-widest border px-3 py-1 transition-colors duration-300
                                            ${isDark ? "border-[#262626] hover:border-[#c2410c] hover:text-[#c2410c]" : "border-[#eaeaea] hover:border-[var(--accent)] hover:text-[var(--accent)]"}`}
                                        >
                                            Retry
                                        </button>
                                    </div>
                                ) : calendar ? (
                                    <ContributionGrid calendar={calendar} isDark={isDark} />
                                ) : null}
                            </div>

                            {/* Footer link */}
                            <div className="mt-3 relative z-10 flex justify-end">
                                <a
                                    href="https://github.com/shahdivax"
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`text-[9px] font-mono tracking-[0.15em] uppercase transition-colors duration-300
                                    ${isDark ? "text-[#525252] hover:text-[#c2410c]" : "text-[#bbb] hover:text-[var(--accent)]"}`}
                                >
                                    @shahdivax ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Extreme Physical Graphics - No glow, pure matte industrial shapes */}
            {isDark && (
                <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] pointer-events-none opacity-20 -z-10">
                    <div className="absolute top-0 right-0 w-full h-full border-[8px] border-[#c2410c] transform rotate-12 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <div className="absolute bottom-[-10%] left-[-20%] w-[400px] h-[400px] bg-[#1a1a1a] transform -skew-x-12" />
                </div>
            )}

            {/* Clean Light Mode Graphics */}
            {!isDark && (
                <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-gradient-to-l from-blue-50 to-transparent pointer-events-none -z-10" />
            )}
        </section>
    );
}

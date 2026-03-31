"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";

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

function GridRenderer({
    calendar,
    isDark,
}: {
    calendar: ContributionCalendar;
    isDark: boolean;
}) {
    const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
    const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const CELL = 10;
    const GAP = 2;
    const COLS = calendar.weeks.length;
    const ROWS = 7;
    const W = COLS * (CELL + GAP) - GAP;
    const H = ROWS * (CELL + GAP) - GAP;

    const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

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

    const filteredMonths = monthLabels.filter((m, i) => {
        if (i === 0) return true;
        return m.x - monthLabels[i - 1].x > 3 * (CELL + GAP);
    });

    const emptyCellColor = isDark ? "#1a1a1a" : "#f4f4f5";

    function getTooltipText(day: ContributionDay) {
        const date = new Date(day.date);
        const formatted = date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
        return `${day.contributionCount} contribution${day.contributionCount !== 1 ? "s" : ""} on ${formatted}`;
    }

    return (
        <div className="relative w-full" ref={containerRef}>
            <div className="w-full pb-1 overflow-x-auto custom-scrollbar">
                <div className="min-w-[700px] relative">
                    {/* Tooltip */}
                    {hoveredDay && (
                        <div
                            className={`absolute z-50 pointer-events-none px-2 py-1 text-[10px] font-mono whitespace-nowrap border
                            ${isDark ? "bg-[#0a0a0a] text-[#f5f5f5] border-[#262626]" : "bg-white text-black border-gray-200"}`}
                            style={{
                                left: tooltip.x,
                                top: tooltip.y - 8,
                                transform: "translate(-50%, -100%)",
                            }}
                        >
                            {getTooltipText(hoveredDay)}
                        </div>
                    )}

                    <svg
                        width="100%"
                        viewBox={`0 0 ${W + 28} ${H + 22}`}
                        style={{ display: "block" }}
                    >
                        {/* Month labels */}
                        {filteredMonths.map((m) => (
                            <text
                                key={m.label + m.x}
                                x={m.x + 26}
                                y={9}
                                fontSize={9}
                                fill={isDark ? "#737373" : "#a1a1aa"}
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
                                fill={isDark ? "#525252" : "#a1a1aa"}
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
                                            rx={1}
                                            ry={1}
                                            fill={cellColor}
                                            style={{ cursor: "pointer", transition: "opacity 0.15s" }}
                                            onMouseEnter={(e) => {
                                                setHoveredDay(day);
                                                const rect = (e.currentTarget as SVGRectElement).getBoundingClientRect();
                                                const container = containerRef.current?.getBoundingClientRect();
                                                if (rect && container) {
                                                    setTooltip({
                                                        x: rect.left - container.left + rect.width / 2,
                                                        y: rect.top - container.top,
                                                    });
                                                }
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
        </div>
    );
}

export default function GithubGrid() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
    const [calendarError, setCalendarError] = useState<string | null>(null);
    const [calendarLoading, setCalendarLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const fetchContributions = useCallback(async () => {
        try {
            setCalendarLoading(true);
            setCalendarError(null);
            const res = await fetch("/api/github");
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            const data: ContributionCalendar = await res.json();
            setCalendar(data);
        } catch (e: any) {
            setCalendarError(e.message || "Failed to load");
        } finally {
            setCalendarLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContributions();
    }, [fetchContributions]);

    if (!mounted) return null;

    const isDark = theme === "dark";
    const accentText = isDark ? "text-[#ea580c]" : "text-[#2563eb]";

    return (
        <div className="w-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <div className="flex items-center gap-4">
                    <div className={`font-mono text-[10px] font-bold tracking-[0.2em] uppercase ${accentText}`}>
                        GITHUB
                    </div>
                </div>
                {calendar && (
                    <div className={`font-mono text-[9px] uppercase ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                        {calendar.totalContributions.toLocaleString()} IN LAST YEAR
                    </div>
                )}
            </div>

            <div className="flex-1 min-h-[120px] flex items-center">
                {calendarLoading ? (
                    <div className={`animate-pulse w-full h-[120px] ${isDark ? "bg-[#1a1a1a]" : "bg-gray-100"}`} style={{ borderRadius: 2 }} />
                ) : calendarError ? (
                    <div className="flex flex-col items-center justify-center w-full h-[120px] gap-2">
                        <span className={`text-[10px] font-mono ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>⚠ {calendarError}</span>
                        <button
                            onClick={fetchContributions}
                            className={`text-[10px] font-mono uppercase tracking-widest border px-3 py-1 transition-colors duration-300
                            ${isDark ? "border-[#262626] hover:border-[#ea580c] hover:text-[#ea580c]" : "border-gray-200 hover:border-[#2563eb] hover:text-[#2563eb]"}`}
                        >
                            RETRY
                        </button>
                    </div>
                ) : calendar ? (
                    <GridRenderer calendar={calendar} isDark={isDark} />
                ) : null}
            </div>
        </div>
    );
}
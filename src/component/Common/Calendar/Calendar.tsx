import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import type ICalendar from "./ICalendar";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const SCAN_INTERVAL_MS = 140;

type DateType = ICalendar["date"][number]["type"];

const TYPE_STYLES: Record<DateType, { label: string; cell: string; dot: string }> = {
    "long-weekend": {
        label: "Long weekend",
        cell: "bg-[#4f46e5] font-bold",
        dot: "bg-[#4f46e5]",
    },
    "long-birthday-weekend": {
        label: "Long birthday weekend",
        cell: "bg-[#c026d3] font-bold",
        dot: "bg-[#c026d3]",
    },
    "long-anniversary-weekend": {
        label: "Long anniversary weekend",
        cell: "bg-[#ea580c] font-bold",
        dot: "bg-[#ea580c]",
    },
    birthday: {
        label: "Birthday",
        cell: "bg-[#f59e0b]/20 font-bold text-[#fbbf24] ring-2 ring-[#f59e0b]",
        dot: "ring-2 ring-[#f59e0b]",
    },
    anniversary: {
        label: "Anniversary",
        cell: "bg-[#f43f5e]/20 font-bold text-[#fb7185] ring-2 ring-[#f43f5e]",
        dot: "ring-2 ring-[#f43f5e]",
    },
};

// Single-day events win over weekend ranges when they overlap
const TYPE_PRIORITY: DateType[] = [
    "birthday",
    "anniversary",
    "long-birthday-weekend",
    "long-anniversary-weekend",
    "long-weekend",
];

const formatShort = (t: number) => new Date(t).toLocaleDateString("default", { day: "numeric", month: "short" });

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

const Calendar: React.FC<ICalendar> = ({ date , rangeClickHandler }) => {
    const [viewDate, setViewDate] = useState(() => {
        const first = Array.isArray(date) && date[0]?.from ? new Date(date[0].from) : new Date();
        return new Date(first.getFullYear(), first.getMonth(), 1);
    });
    // Day currently being searched; daysInMonth + 1 means the search is finished
    const [scanDay, setScanDay] = useState(1);
    const [iconPos, setIconPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
    const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; from: number; to: number } | null>(null);
    const cellRefs = useRef<Record<number, HTMLSpanElement | null>>({});

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Monday-first offset
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;

    const cells = useMemo(() => {
        const list: (number | null)[] = Array(offset).fill(null);
        for (let d = 1; d <= daysInMonth; d++) list.push(d);
        return list;
    }, [offset, daysInMonth]);

    const ranges = useMemo(
        () =>
            (Array.isArray(date) ? date : []).map((r) => {
                // The API can return from/to swapped, so normalise the order
                const a = startOfDay(new Date(r.from));
                const b = startOfDay(new Date(r.to));
                return { from: Math.min(a, b), to: Math.max(a, b), type: r.type };
            }),
        [date]
    );

    const getRange = (day: number) => {
        const t = new Date(year, month, day).getTime();
        return ranges
            .filter((r) => t >= r.from && t <= r.to)
            .sort((x, y) => TYPE_PRIORITY.indexOf(x.type) - TYPE_PRIORITY.indexOf(y.type))[0];
    };

    const clickHandlerInRange = (range: {
        from: number;
        to: number;
        type: "long-weekend" | "long-birthday-weekend" | "long-anniversary-weekend" | "birthday" | "anniversary";
    }) => {
        console.log(range);
        // convert Time to date
        const fromDate = new Date(range.from);
        const toDate = new Date(range.to);
        console.log({ fromDate, toDate });
        rangeClickHandler(fromDate, toDate, range.type);
    }

    // Restart the search animation whenever month or data changes
    useEffect(() => {
        setScanDay(1);
        const timer = setInterval(() => {
            setScanDay((prev) => Math.min(prev + 1, daysInMonth + 1));
        }, SCAN_INTERVAL_MS);
        return () => clearInterval(timer);
    }, [year, month, daysInMonth, ranges]);

    const scanning = scanDay <= daysInMonth;

    // Types that actually appear in the visible month, for the legend
    const legendTypes = TYPE_PRIORITY.filter((t) =>
        cells.some((d) => d !== null && getRange(d)?.type === t)
    );

    // Move the magnifier over the cell currently being searched
    useLayoutEffect(() => {
        const cell = cellRefs.current[Math.min(scanDay, daysInMonth)];
        if (cell) setIconPos({ x: cell.offsetLeft, y: cell.offsetTop, w: cell.offsetWidth, h: cell.offsetHeight });
    }, [scanDay, daysInMonth, offset]);

    const changeMonth = (step: number) => setViewDate(new Date(year, month + step, 1));

    const monthName = viewDate.toLocaleString("default", { month: "long" });

    return (
        <div className="w-full max-w-[320px] select-none rounded-xl border border-[#2a2b2a] p-4">
            <div className="mb-3 flex items-center justify-between text-white">
                <button
                    type="button"
                    aria-label="Previous month"
                    className="px-2 text-lg hover:text-[#8b8c89]"
                    onClick={() => changeMonth(-1)}
                >
                    &lt;
                </button>
                <span className="text-sm font-semibold">
                    {monthName} {year}
                </span>
                <button
                    type="button"
                    aria-label="Next month"
                    className="px-2 text-lg hover:text-[#8b8c89]"
                    onClick={() => changeMonth(1)}
                >
                    &gt;
                </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center text-xs font-semibold text-[#8b8c89]">
                {WEEK_DAYS.map((d, i) => (
                    <span key={i} className="py-1">
                        {d}
                    </span>
                ))}
            </div>

            <div className="relative grid grid-cols-7 gap-y-1 text-center text-sm text-white">
                {iconPos.w > 0 && (
                    <FaSearch
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-0 top-0 z-10 h-3.5 w-3.5 text-white drop-shadow transition-[transform,opacity] duration-[160ms] ease-out ${scanning ? "opacity-100" : "opacity-0"
                            }`}
                        style={{
                            transform: `translate(${iconPos.x + iconPos.w - 14}px, ${iconPos.y + 1}px)`,
                        }}
                    />
                )}
                {cells.map((day, i) => {
                    if (day === null) return <span key={`e-${i}`} />;
                    const revealed = day < scanDay;
                    const range = revealed ? getRange(day) : undefined;
                    const isCurrent = scanning && day === scanDay;
                    // Join neighbouring days of the same range, rounding only the outer ends
                    const col = (offset + day - 1) % 7;
                    const joinsPrev = !!range && col > 0 && day > 1 && getRange(day - 1) === range;
                    const joinsNext = !!range && col < 6 && day < daysInMonth && getRange(day + 1) === range;
                    const rounding = range
                        ? `${joinsPrev ? "rounded-l-none cursor-pointer" : "rounded-l-full cursor-pointer"} ${joinsNext ? "rounded-r-none" : "rounded-r-full cursor-pointer"}`
                        : "rounded-full";
                    return (
                        <span
                            key={day}
                            ref={(el) => {
                                cellRefs.current[day] = el;
                            }}
                            onClick={() => { if (range) clickHandlerInRange(range) }}
                            onMouseEnter={(e) => {
                                if (!range) return;
                                const el = e.currentTarget;
                                setTooltip({
                                    x: el.offsetLeft + el.offsetWidth / 2,
                                    y: el.offsetTop,
                                    label: TYPE_STYLES[range.type].label,
                                    from: range.from,
                                    to: range.to,
                                });
                            }}
                            onMouseLeave={() => setTooltip(null)}
                            className={`flex h-9 items-center justify-center transition-colors duration-300 ${rounding} ${range
                                    ? TYPE_STYLES[range.type].cell
                                    : isCurrent
                                        ? "bg-[#2a2b2a]"
                                        : revealed
                                            ? "text-[#8b8c89]"
                                            : ""
                                }`}
                        >
                            {day}
                        </span>
                    );
                })}
                {tooltip && (
                    <div
                        role="tooltip"
                        className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-[#2a2b2a] bg-[#1c1d1c] px-3 py-1.5 text-xs text-white shadow-lg"
                        style={{ left: tooltip.x, top: tooltip.y - 6 }}
                    >
                        <p className="font-semibold">{tooltip.label}</p>
                        <p className="text-[#8b8c89]">
                            {formatShort(tooltip.from)}
                            {tooltip.from !== tooltip.to && ` – ${formatShort(tooltip.to)}`}
                        </p>
                    </div>
                )}
            </div>

            {!scanning && legendTypes.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#8b8c89]">
                    {legendTypes.map((t) => (
                        <span key={t} className="flex items-center gap-1.5">
                            <span className={`inline-block h-2.5 w-2.5 rounded-sm ${TYPE_STYLES[t].dot}`} />
                            {TYPE_STYLES[t].label}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Calendar;

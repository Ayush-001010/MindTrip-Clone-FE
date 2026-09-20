import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import type IHeader from "./IHeader";

const Header: React.FC<IHeader> = ({ analytics }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }

        const pieChart = new Chart(chartRef.current, {
            type: "pie",
            data: {
                labels: ["Activities", "Hotel", "Transport", "Food", "Dress"],
                datasets: [
                    {
                        data: [analytics.activities, analytics.hotel, analytics.transport, analytics.food, analytics.dress],
                        backgroundColor: ["#38bdf8", "#818cf8", "#34d399", "#f59e0b", "#f472b6"],
                        borderColor: "#111827",
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#e2e8f0",
                            boxWidth: 12,
                            padding: 14,
                        },
                    },
                },
            },
        });

        return () => {
            pieChart.destroy();
        };
    }, [analytics]);

    return (
        <header className="grid gap-4 rounded-2xl border border-[#334155] px-4 py-4 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-stretch">
            <section>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#93c5fd]">Expense Overview</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-[#334155] px-3 py-3">
                        <p className="text-[0.45rem] uppercase tracking-[0.14em] text-[#94a3b8]">Total Expenses</p>
                        <p className="mt-2 text-lg font-semibold leading-none text-[#f8fafc]">{analytics.totalExpenses}</p>
                    </div>
                    <div className="rounded-xl border border-[#334155] px-3 py-3">
                        <p className="text-[0.45rem] uppercase tracking-[0.14em] text-[#94a3b8]">Total Owned</p>
                        <p className="mt-2 text-lg font-semibold leading-none text-[#f8fafc]">{analytics.ownedExpenses}</p>
                    </div>
                    <div className="rounded-xl border border-[#334155] px-3 py-3">
                        <p className="text-[0.45rem] uppercase tracking-[0.14em] text-[#94a3b8]">Amount Received</p>
                        <p className="mt-2 text-lg font-semibold leading-none text-[#f8fafc]">{analytics.receivedExpenses}</p>
                    </div>
                </div>
            </section>
            <section className="h-64 w-full rounded-2xl border border-[#334155] px-3 py-4">
                <canvas ref={chartRef} />
            </section>
        </header>
    );
};

export default Header;
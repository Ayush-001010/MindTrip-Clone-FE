import React from "react";
import type IExpense from "./IExpense";

const Expense: React.FC<IExpense> = ({ expense }) => {
    return (
        <li key={expense.id} className="rounded-xl border border-transparent px-2 py-3 transition-colors duration-150 hover:border-[#243041]">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold tracking-tight text-[#f8fafc]">{expense.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#94a3b8]">
                        <span className="text-[#94a3b8]">Paid by {expense.paidByUserName}</span>
                        <span className="rounded-full border border-[#334155] px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.12em] text-[#7dd3fc]">
                            {expense.category}
                        </span>
                        <span className="rounded-full border border-[#334155] px-2 py-0.5 text-[0.68rem] uppercase tracking-[0.12em] text-[#c4b5fd]">
                            {expense.splitMethod}
                        </span>
                    </div>
                </div>
                <span className="shrink-0 rounded-full border border-[#334155] px-2.5 py-1 text-sm font-semibold text-[#e2e8f0]">
                    {expense.totalAmount}
                </span>
            </div>
            {expense.notes && (
                <p className="mt-2 pl-0.5 text-xs leading-5 text-[#94a3b8]">{expense.notes}</p>
            )}
        </li>
    );
};

export default Expense;
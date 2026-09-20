import React , {useEffect, useState} from "react";
import type IExpenses from "./IExpenses";
import type ITripExpense from "../../../../../../../../Interface/DataInterface/ITripExpense";
import useTripAction from "../../../../../../../../customHooks/useTripAction";
import type ITripSplitWiseAnalytics from "../../../../../../../../Interface/DataInterface/ITripSplitWiseAnalytics";
import Header from "./Header/Header";
import Expense from "./Expense/Expense";

const Expenses: React.FC<IExpenses> = () => {
    const {fetchTripAnalytics, fetchExpenses} = useTripAction();
    const [analytics, setAnalytics] = useState<ITripSplitWiseAnalytics | null>(null);
    const [expenses, setExpenses] = useState<ITripExpense[] | null>(null);

    useEffect(() => {
        fetchTripAnalytics().then((response:any) => {
            if(response.success) {
                setAnalytics(response.data as ITripSplitWiseAnalytics);
            }
        });
        fetchExpenses().then((response:any) => {
            if(response.success) {
                setExpenses(response.data as ITripExpense[]);
            }
        });
    }, []);

    if (!analytics) {
        return <section className="py-6 text-sm text-[#94a3b8]">Loading expense analytics...</section>;
    }

    return (
        <section className="space-y-4">
            <Header analytics={analytics}/>
            {expenses && expenses.length > 0 && (
                <section className="rounded-2xl border border-[#334155] px-4 py-4">
                    <div className="mb-4 flex items-end justify-between gap-3 border-b border-[#334155] pb-3">
                        <div>
                            <h2 className="text-base font-semibold tracking-tight text-[#f8fafc]">Expenses</h2>
                            <p className="mt-1 text-xs text-[#94a3b8]">Recent expense entries for this trip.</p>
                        </div>
                        <span className="rounded-full border border-[#334155] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#93c5fd]">
                            {expenses.length} items
                        </span>
                    </div>
                    <div className="max-h-72 overflow-y-auto pr-1">
                        <ul className="space-y-1">
                        {expenses.map((expense) => (
                            <Expense key={expense.id} expense={expense} />
                        ))}
                        </ul>
                    </div>
                </section>
            )}
        </section>
    );
};

export default Expenses;
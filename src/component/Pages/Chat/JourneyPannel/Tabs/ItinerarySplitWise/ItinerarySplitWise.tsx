import React, { useState } from "react";
import type IItinerarySplitWise from "./IItinerarySplitWise";
import AddBillIcon from "./AddBillIcon/AddBillIcon";
import AddExpence from "./AddExpence/AddExpence";
import Expenses from "./Expenses/Expenses";

const ItinerarySplitWise: React.FC<IItinerarySplitWise> = () => {
    const [openAddExpense, setOpenAddExpense] = useState(false);

    const handleAddExpenseClick = () => {
        setOpenAddExpense((prev) => !prev);
    };
    return (
        <section className="relative h-full w-full overflow-y-auto pb-4">
            {!openAddExpense && (
                <section className="mt-4 space-y-3">
                    <div className="flex justify-end">
                        <AddBillIcon clickHandler={handleAddExpenseClick} />
                    </div>
                    <Expenses />
                </section>
            )}
            {openAddExpense && <AddExpence clickHandler={handleAddExpenseClick} />}
        </section>
    );
};

export default ItinerarySplitWise;
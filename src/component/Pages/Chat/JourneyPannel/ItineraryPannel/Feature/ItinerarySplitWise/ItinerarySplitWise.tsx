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
        <section className="relative h-full w-full">
            {!openAddExpense && (
                <section className="mt-4">
                    <Expenses />
                    <AddBillIcon clickHandler={handleAddExpenseClick} />
                </section>
            )}
            {openAddExpense && <AddExpence />}
        </section>
    );
};

export default ItinerarySplitWise;
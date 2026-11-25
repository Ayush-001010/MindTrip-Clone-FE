import React, { useState } from "react";
import type IItinerarySplitWise from "./IItinerarySplitWise";
import AddBillIcon from "./AddBillIcon/AddBillIcon";
import AddExpence from "./AddExpence/AddExpence";
import Expenses from "./Expenses/Expenses";
import { useChatContext } from "../../../Chat";

const ItinerarySplitWise: React.FC<IItinerarySplitWise> = () => {
    const [openAddExpense, setOpenAddExpense] = useState(false);
    const {finalItinerary , setNotificationConfig} = useChatContext();

    const handleAddExpenseClick = () => {
        if(!finalItinerary){
            setNotificationConfig({
                message: "Please create an itinerary first.",
                type: "error",
                open: true,
                pos:"top-left"
            });
            return;
        }
        setOpenAddExpense((prev) => !prev);
    };
    return (
        <section className="relative h-full w-full overflow-y-auto pb-4">
            {!openAddExpense && (
                <section className="mt-4 space-y-3">
                    <div className="flex justify-end">
                        { ( finalItinerary && finalItinerary.budget) && <p>Per-person budget: ${finalItinerary.budget}</p> }
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
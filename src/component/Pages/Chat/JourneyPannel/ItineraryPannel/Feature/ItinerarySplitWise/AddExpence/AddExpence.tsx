import React, { useEffect, useState } from "react";
import { useChatContext } from "../../../../../Chat";
import type IAddExpence from "./IAddExpence";
import ExpenceDetailsForm from "./ExpenceDetailsForm/ExpenceDetailsForm";
import SplitExpenceUser from "./SplitExpenceUser/SplitExpenceUser";
import type ITripUserDetails from "../../../../../../../../Interface/DataInterface/ITripUserDetails";
import useTripAction from "../../../../../../../../customHooks/useTripAction";
import { useSelector } from "react-redux";
import type IUserInterface from "../../../../../../../../Interface/DataInterface/IUserDetails";

type SplitType = "equal" | "ratio" | "percentage" | "custom";

interface ISplitArr {
    id: number;
    name: string;
    shareValue: string;
    isActive: boolean;
}

const AddExpence: React.FC<IAddExpence> = () => {
    const { fetchTripMemberDetails } = useTripAction();
    const [tripMembers, setTripMembers] = useState<ITripUserDetails[]>([]);
    const [expenseTotalAmount, setExpenseTotalAmount] = useState<number>(0);
    const [expenseTitle, setExpenseTitle] = useState<string>("");
    const [expenseDescription, setExpenseDescription] = useState<string>("");
    const [expenseDate, setExpenseDate] = useState<string>("");
    const [expenseCategory, setExpenseCategory] = useState<string>("");
    const { addExpense } = useChatContext();
    const { userID , userName } = useSelector((state: any) => state.userDetails as IUserInterface);
    const [splitType, setSplitType] = useState<SplitType>("equal");
    const [splitArr, setSplitArr] = useState<ISplitArr[]>([]);

    const addExpenseHandler = () => {
        if(addExpense){
            addExpense(
                { userId: Number(userID) || 1, userName: userName || "" }, // Replace with actual userName if available
                expenseTotalAmount,
                expenseTitle,
                expenseCategory,
                new Date(expenseDate),
                splitType,
                splitArr.filter(item => item.isActive).map(item => ({ userId: item.id, userName: item.name, amount: Number(item.shareValue) })),
                expenseDescription
            );
        }
    }
    useEffect(() => {
        fetchTripMemberDetails().then((res: any) =>{
            if(res.success){
                setTripMembers(res.data as ITripUserDetails[]);
            }
        });
    }, []);
    return (
        <div className="mt-3 w-full rounded-xl border border-[#334155] px-3 py-3">
            <p className="text-sm font-semibold text-[#f8f9fa]">
                Add a new expense
            </p>
            <p className="mt-0.5 text-xs text-[#a5b4c8]">
                Fill the details and split the amount between trip members.
            </p>
            <ExpenceDetailsForm 
                expenseTotalAmount={expenseTotalAmount}
                setExpenseTotalAmount={setExpenseTotalAmount}
                expenseTitle={expenseTitle}
                setExpenseTitle={setExpenseTitle}
                expenseDescription={expenseDescription}
                setExpenseDescription={setExpenseDescription}
                expenseDate={expenseDate}
                setExpenseDate={setExpenseDate}
                setExpenseCategory={setExpenseCategory}
            />
            <SplitExpenceUser users={tripMembers} totalAmount={expenseTotalAmount} splitType={splitType} setSplitType={setSplitType} splitArr={splitArr} setSplitArr={setSplitArr} />
            <section className="mt-3 flex justify-end">
                <button onClick={addExpenseHandler} className="cursor-pointer rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">
                    Add Expense
                </button>
            </section>
        </div>
    );
};

export default AddExpence;
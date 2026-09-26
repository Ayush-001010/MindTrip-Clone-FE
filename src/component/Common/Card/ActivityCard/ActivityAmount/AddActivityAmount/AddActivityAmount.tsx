import React from "react";
import type IAddActivityAmount from "./IAddActivityAmount";
import { MdOutlineEdit } from "react-icons/md";
import { useGetBlogContext } from "../../../../../Pages/Blogs/Blog/Blog";
import { useGetActivityCardData } from "../../ActivityCard";


const AddActivityAmount: React.FC<IAddActivityAmount> = ({ setActivityAmount }) => {
    const [amount, setAmount] = React.useState<number | null>(null);
    const { saveChangeToBlog } = useGetBlogContext();
    const { indexNumber } = useGetActivityCardData();

    return (
        <section className="flex items-center gap-3">
            <input
                type="number"
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount ?? ""}
                placeholder="Enter activity amount"
                className="h-6 w-[150px] max-w-xl border-b border-[#ced4da]/70 pb-0 text-xs font-semibold tracking-tight text-[#dee2e6] placeholder:text-[#ced4da]/60 focus:outline-none"
            />
            <MdOutlineEdit className="shrink-0 cursor-pointer text-lg text-[#ced4da] transition-opacity hover:opacity-80" onClick={() => {
                setActivityAmount(amount ?? 0);
                saveChangeToBlog("activities", amount ?? 0, indexNumber, "amountSpent");
            }} />
        </section>
    );
};

export default AddActivityAmount;
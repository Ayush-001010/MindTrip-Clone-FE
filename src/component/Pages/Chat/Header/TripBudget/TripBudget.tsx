import React from "react";
import type ITripBudget from "./ITripBudget";
import { Modal } from "antd";
import CloseBox from "../TripUser/CloseBox/CloseBox";
import { useChatContext } from "../../Chat";

const TripBudget: React.FC<ITripBudget> = ({ open, closeHandler }) => {
    const {setTripBudget} = useChatContext();

    const handleSave = () => {
        const budgetInput = (document.getElementById("trip-budget-input") as HTMLInputElement)?.value;
        if (budgetInput && setTripBudget) {
            setTripBudget(Number(budgetInput));
        }
        closeHandler();
    };

    return (
        <Modal open={open} footer={null} closable={false} centered onCancel={closeHandler}>
            <section className="bg-[#161a1d] text-[#f8f9fa] shadow-xl">
                <div className="flex justify-end p-3 pb-0">
                    <CloseBox onClose={closeHandler} />
                </div>
                <div className="space-y-5 p-6 pt-3">
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-white">
                        What is the per-person trip budget? 
                        </p>
                        <p className="text-sm leading-6 text-slate-400">
                            Add an estimated amount so the itinerary can stay within budget.
                        </p>
                    </div>
                    <label className="block space-y-2">
                        <span className="text-sm font-medium text-slate-300 mb-2">Budget</span>
                        <div className="flex items-center rounded-xl border border-slate-700 bg-[#1e2226] px-4 py-3 transition-colors focus-within:border-sky-500">
                            <span className="mr-3 text-sm font-semibold text-slate-400">$</span>
                            <input
                                min="0"
                                type="number"
                                placeholder="Enter your budget"
                                id="trip-budget-input"
                                className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500"
                            />
                        </div>
                    </label>
                    <div className="flex justify-end">
                        <button
                            onClick={handleSave}
                            className="rounded-xl bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </section>
        </Modal>
    );
};

export default TripBudget;
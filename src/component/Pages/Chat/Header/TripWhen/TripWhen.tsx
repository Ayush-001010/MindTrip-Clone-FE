import React, { useState, useEffect } from "react";
import type ITripWhen from "./ITripWhen";
import { DatePicker, Modal } from "antd";
import type { Dayjs } from "dayjs";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useChatContext } from "../../Chat";
import CloseBox from "../TripUser/CloseBox/CloseBox";
import dayjs from "dayjs";

const TripWhen: React.FC<ITripWhen> = ({ open, closeHandler }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const { setTripDate , finalItinerary , tripSuggestionsDate} = useChatContext();

    const hasSuggestion = !!(tripSuggestionsDate?.startDate && tripSuggestionsDate?.endDate);
    const suggestionAlreadyApplied = hasSuggestion
        && finalItinerary?.startDate
        && finalItinerary?.endDate
        && dayjs(finalItinerary.startDate).isSame(tripSuggestionsDate?.startDate, "day")
        && dayjs(finalItinerary.endDate).isSame(tripSuggestionsDate?.endDate, "day");

    const onDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        if (dates) {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
            return;
        }

        setStartDate(null);
        setEndDate(null);
    };

    const submitHandler = () => {
        if (startDate && endDate && setTripDate) {
            setTripDate(startDate.toDate(), endDate.toDate());
        }
    }

    const useSuggestedDatesHandler = () => {
        if (tripSuggestionsDate?.startDate && tripSuggestionsDate?.endDate) {
            setStartDate(dayjs(tripSuggestionsDate.startDate));
            setEndDate(dayjs(tripSuggestionsDate.endDate));
        }
    }

    useEffect(() => {
        setIsOpen(open);
    }, [open]);
    return (
        <Modal open={isOpen} footer={null} closable={false} centered onCancel={closeHandler}>
            <section className="bg-[#161a1d] text-[#f8f9fa] rounded-lg shadow-sm [&_.ant-picker]:!w-full [&_.ant-picker]:!rounded-xl [&_.ant-picker]:!border-slate-200 [&_.ant-picker]:!px-4 [&_.ant-picker]:!py-2.5 [&_.ant-picker]:hover:!border-slate-300 [&_.ant-picker]:focus-within:!border-sky-500 [&_.ant-picker]:focus-within:!shadow-[0_0_0_3px_rgba(14,165,233,0.12)] [&_.ant-picker-input>input::placeholder]:!text-slate-400 [&_.ant-picker-range-separator]:!text-slate-400 [&_.ant-picker-suffix]:!text-slate-500">
                <div className="p-2">
                    <CloseBox onClose={closeHandler} />
                </div>
                <section className="p-6 pt-0">
                    <p className="text-lg font-semibold">
                        When are you planning your trip?
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#dee2e6]">
                        Select your start and end dates.
                    </p>

                    {hasSuggestion && !suggestionAlreadyApplied && (
                        <div className="mt-4 flex items-center gap-3 rounded-xl border border-sky-400/30 bg-sky-400/5 p-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-300">
                                <HiOutlineSparkles size={18} />
                            </span>
                            <div className="min-w-0 flex-1">
                                <span className="rounded-full bg-sky-400/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-sky-300 uppercase">
                                    Suggested dates
                                </span>
                                <p className="mt-1 text-sm font-medium text-white">
                                    {dayjs(tripSuggestionsDate!.startDate).format("DD MMM YYYY")} – {dayjs(tripSuggestionsDate!.endDate).format("DD MMM YYYY")}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={useSuggestedDatesHandler}
                                className="shrink-0 cursor-pointer rounded-full bg-sky-400/15 px-3 py-1.5 text-xs font-semibold text-sky-300 transition-colors duration-200 hover:bg-sky-400/25"
                            >
                                Use these
                            </button>
                        </div>
                    )}

                    <div className="mt-5">
                        <DatePicker.RangePicker
                            className="!w-full"
                            placeholder={["Start date", "End date"]}
                            value={[startDate ?? (finalItinerary?.startDate ? dayjs(finalItinerary.startDate) : null), endDate ?? (finalItinerary?.endDate ? dayjs(finalItinerary.endDate) : null)]}
                            onChange={onDateChange}
                        />
                    </div>
                    <div className="mt-5 flex justify-end">
                        <button
                            className="bg-[#0ea5e9] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#0284c7]"
                            onClick={() => {
                                submitHandler();
                                closeHandler();
                            }}
                        >
                            Done
                        </button>
                    </div>
                </section>
            </section>
        </Modal>
    );
};

export default TripWhen;
import React, { useState, useEffect } from "react";
import type ITripWhen from "./ITripWhen";
import { DatePicker, Modal } from "antd";
import type { Dayjs } from "dayjs";
import { useChatContext } from "../../Chat";
import CloseBox from "../TripUser/CloseBox/CloseBox";
import dayjs from "dayjs";

const TripWhen: React.FC<ITripWhen> = ({ open, closeHandler }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const { setTripDate , finalItinerary } = useChatContext();

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
            console.log("Start Date:", startDate?.toDate(), "End Date:", endDate?.toDate());
            setTripDate(startDate.toDate(), endDate.toDate());
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
                <section className="p-6">
                    <p className="text-lg font-semibold">
                        When are you planning your trip?
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#dee2e6]">
                        Select your start and end dates.
                    </p>
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
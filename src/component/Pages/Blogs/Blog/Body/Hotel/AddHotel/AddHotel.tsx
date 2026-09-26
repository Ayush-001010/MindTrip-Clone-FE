import React, { useState, useEffect } from "react";
import type IAddHotel from "./IAddHotel";
import type { IHotelDataInterface } from "../../../../../../../Interface/CommonInterface";
import { DatePicker, Select } from "antd";
import type { Dayjs } from "dayjs";
import useTripAction from "../../../../../../../CustomHooks/useTripAction";

const { RangePicker } = DatePicker;

const AddHotel: React.FC<IAddHotel> = ({ submitHotel }) => {
    const { fetchHotelDetails } = useTripAction();
    const [city, setCity] = useState("");
    const [hotelOptions, setHotelOptions] = useState<IHotelDataInterface[]>([]);
    const [duration, setDuration] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [amountSpent, setAmountSpent] = useState<number>(0);
    const [description, setDescription] = useState<string>("");

    const [selectedHotel, setSelectedHotel] = useState<string | undefined>(undefined);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedHotel || !duration?.[0] || !duration?.[1]) {
            return;
        }

        const hotelDetail = hotelOptions.find((hotel) => hotel.name === selectedHotel);

        submitHotel({
            name: selectedHotel,
            address: city,
            checkInDate: duration[0].format("YYYY-MM-DD"),
            checkOutDate: duration[1].format("YYYY-MM-DD"),
            amountSpent,
            description,
            images: hotelDetail?.image ?? "",
        });
    };

    const cityValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const cityValue = e.target.value;
        setCity(cityValue);
        setSelectedHotel(undefined);
    };

    const hotelChangeHandler = (value: string) => {
        setSelectedHotel(value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (city) {
                const response = await fetchHotelDetails(city);
                if (response.success && response.data) {
                    setHotelOptions(response.data);
                } else {
                    setHotelOptions([]);
                }
            } else {
                setHotelOptions([]);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [city]);

    return (
        <section className="w-full">
            <form className="flex flex-col gap-4 w-full" onSubmit={submitHandler}>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="city" className="text-xs font-medium text-gray-400">City</label>
                    <input
                        onChange={cityValueHandler}
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter city"
                        className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-sky-400"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="hotel" className="text-xs font-medium text-gray-400">Hotel</label>
                    <Select
                        id="hotel"
                        value={selectedHotel}
                        placeholder="Select hotel"
                        onChange={hotelChangeHandler}
                        disabled={!hotelOptions.length}
                        showSearch
                        optionFilterProp="label"
                        className="split-expense-select h-9 w-full"
                        popupClassName="[&_.ant-select-item]:!bg-[#1f2327] [&_.ant-select-item]:!px-3 [&_.ant-select-item]:!py-2 [&_.ant-select-item-option-active]:!bg-[#30363c] [&_.ant-select-item-option-selected]:!bg-[#30363c]"
                        options={hotelOptions.map((hotel) => ({
                            value: hotel.name,
                            label: hotel.name,
                            searchLabel: hotel.name,
                            hotel,
                        }))}
                        optionRender={(option) => {
                            const hotel = option.data.hotel as IHotelDataInterface;

                            return (
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-[#343a40]">
                                        {hotel.image ? (
                                            <img
                                                src={hotel.image}
                                                alt={hotel.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[10px] text-gray-400">
                                                N/A
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-medium text-gray-200">{hotel.name}</p>
                                        <p className="text-xs text-gray-400">Price: {hotel.price}</p>
                                    </div>
                                </div>
                            );
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="duration" className="text-xs font-medium text-gray-400">Duration of Stay</label>
                    <RangePicker
                        className="!h-9 !w-full !rounded-md !border !border-gray-700 !bg-transparent !px-3 !shadow-none hover:!border-gray-500 [&_.ant-picker-separator]:!text-gray-400 [&_.ant-picker-suffix]:!text-gray-400 [&_input]:!text-sm [&_input]:!font-medium [&_input]:!text-gray-200 [&_input]:placeholder:!text-gray-500"
                        format="DD/MM/YYYY"
                        onChange={(dates) => {
                            setDuration(dates);
                        }}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="amountSpent" className="text-xs font-medium text-gray-400">Amount Spent</label>
                    <input
                        type="number"
                        value={amountSpent}
                        onChange={(e) => setAmountSpent(Number(e.target.value))}
                        id="amountSpent"
                        name="amountSpent"
                        placeholder="Enter amount spent"
                        className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-sky-400"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label htmlFor="notes" className="text-xs font-medium text-gray-400">Notes</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="notes"
                        name="notes"
                        placeholder="Enter any notes"
                        rows={3}
                        className="w-full resize-none rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-sky-400"
                    />
                </div>
                <button
                    type="submit"
                    className="ml-auto rounded-md bg-white px-5 py-2 text-sm font-medium text-[#212529] transition hover:opacity-90"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default AddHotel;
import React, { useState } from "react";
import type IHotelPannel from "./IHotelPannel";
import Map from "../../../../Common/Map/Map";
import { useChatContext } from "../../Chat";
import { DatePicker } from "antd";

const HotelPannel: React.FC<IHotelPannel> = () => {
    const { showHotelDetails , bookHotelHandler } = useChatContext();
    if (!showHotelDetails) {
        return null;
    }
    const { name, gps_coordinates, rate_per_night , amenities } = showHotelDetails;
    const { longitude, latitude } = gps_coordinates;
    const [fromDate , setFromDate] = useState<Date | null>(null);
    const [toDate , setToDate] = useState<Date | null>(null);

    const submitHandler = () => {
        if (bookHotelHandler && fromDate && toDate) {
            bookHotelHandler({
                name : showHotelDetails.name,
                longitude : showHotelDetails.gps_coordinates.longitude,
                latitude : showHotelDetails.gps_coordinates.latitude,
                image : showHotelDetails.images.map(img => img.thumbnail).join(','),
                amenities : showHotelDetails.amenities?.join(','),
                price : Number(showHotelDetails.rate_per_night?.lowest || 0),
                rating: Number(showHotelDetails.ratings),
                reviews: showHotelDetails.reviews,
                toDate: toDate,
                fromDate: fromDate,
            });
        }
    };

    return (
        <main className="flex h-full min-h-0 w-full flex-col overflow-y-auto overscroll-contain scrollbar-thin pr-1">
            <h1 className="animate-fade-up mb-4 text-2xl font-bold text-white">{name}</h1>
            <section
                style={{ animationDelay: "80ms" }}
                className="animate-fade-up h-[40vh] min-h-[16rem] shrink-0 overflow-hidden rounded-[1.1rem] border border-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
            >
                <Map markerPoints={[{ longitude, latitude }]} longitude={longitude || 0} latitude={latitude || 0} />
            </section>
            <section className="mt-4">
                <h2 className="mb-2 mt-4 text-xl font-semibold text-white">Amenities</h2>
                <ul className="flex flex-wrap gap-2">
                    {(amenities || []).map((amenity, index) => (
                        <li
                            key={index}
                            style={{ animationDelay: `${index * 40}ms` }}
                            className="animate-fade-up rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70 transition-colors duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white"
                        >
                            {amenity}
                        </li>
                    ))}
                </ul>
            </section>
            <section className="animate-fade-up mt-4">
                <h2 className="mb-2 text-xl font-semibold text-white">Price</h2>
                <p className="mb-4 text-lg font-medium text-white">
                    {rate_per_night.lowest}
                    <span className="ml-1 text-sm font-normal text-white/50">/ night</span>
                </p>
            </section>
            <section className="animate-fade-up mb-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 pb-4 [&_.ant-picker]:!w-full [&_.ant-picker]:!border-white/10 [&_.ant-picker]:!bg-transparent [&_.ant-picker]:!px-3 [&_.ant-picker]:!py-2 [&_.ant-picker]:!shadow-none [&_.ant-picker]:hover:!border-white/30 [&_.ant-picker]:focus-within:!border-blue-400 [&_.ant-picker]:focus-within:!shadow-[0_0_0_3px_rgba(59,130,246,0.2)] [&_.ant-picker-input>input]:!text-white [&_.ant-picker-input>input::placeholder]:!text-white/40 [&_.ant-picker-separator]:!text-white/40 [&_.ant-picker-suffix]:!text-white/50">
                <h2 className="mb-1 text-lg font-semibold text-white">Book your stay</h2>
                <p className="mb-4 text-sm text-white/50">
                    Fill in your check-in and check-out dates below to book this hotel.
                </p>
                <p className="mb-1 text-sm text-white/60">From</p>
                <DatePicker className="w-full" placeholder="Select date" value={fromDate} onChange={(date) => setFromDate(date)} />
                <p className="mb-1 mt-3 text-sm text-white/60">To</p>
                <DatePicker className="w-full" placeholder="Select date" value={toDate} onChange={(date) => setToDate(date)} />
                <button
                    onClick={submitHandler}
                    type="button"
                    className="mt-4 block w-full cursor-pointer rounded-lg bg-blue-500 px-5 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-[0_8px_20px_rgba(59,130,246,0.4)] active:translate-y-0 active:scale-95"
                >
                    Book Now
                </button>
            </section>

        </main>
    );
};

export default HotelPannel;
import React from "react";
import type IShowHotel from "./IShowHotel";
import { IoLocationOutline } from "react-icons/io5";

const ShowHotel: React.FC<IShowHotel> = ({ hotelDetails, onAddNewHotel }) => {
    return (
        <section className="flex h-full min-h-[460px] flex-col">
            <div className="flex-1 overflow-y-auto pr-1">
                <div className="space-y-4">
                    {hotelDetails.length > 0 ? (
                        hotelDetails.map((hotel, index) => (
                            <article key={`${hotel.name}-${index}`} className="rounded-xl border border-[#495057] bg-[#111418] p-3 shadow-sm">
                                <div className="flex gap-3">
                                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#343a40]">
                                        {hotel.images ? (
                                            <img
                                                src={hotel.images}
                                                alt={hotel.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                No image
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 text-[#f8f9fa]">
                                                    <IoLocationOutline className="shrink-0 text-sm text-gray-400" />
                                                    <h3 className="truncate text-base font-semibold">{hotel.name}</h3>
                                                </div>
                                                <p className="mt-1 line-clamp-2 text-sm text-gray-400">
                                                    {hotel.description || hotel.address}
                                                </p>
                                            </div>
                                            <p className="shrink-0 text-sm font-semibold text-[#e9ecef]">
                                                Rs. {hotel.amountSpent}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-[#495057] bg-[#111418] px-4 text-center text-sm text-gray-400">
                            No hotels added yet.
                        </div>
                    )}
                </div>
            </div>
            <button
                type="button"
                onClick={onAddNewHotel}
                className="mt-4 w-full rounded-xl border border-[#495057] bg-transparent px-4 py-4 text-left text-sm font-medium text-[#dee2e6] transition-colors hover:bg-[#212529]"
            >
                Add New Hotel
            </button>
        </section>
    );
};

export default ShowHotel;
import React from "react";
import type IShowTravel from "./IShowTravel";
import { MdFlightTakeoff, MdOutlineEdit, MdDirectionsCar, MdOutlineDirectionsBoat } from "react-icons/md";
import { TbBus, TbTrain, TbClockHour4, TbCurrencyRupee } from "react-icons/tb";
import { LuBike } from "react-icons/lu";

const travelTypeMeta: Record<IShowTravel["travelData"]["travelType"], { label: string; icon: React.ReactNode }> = {
    flight: { label: "Flight", icon: <MdFlightTakeoff className="text-lg" /> },
    train: { label: "Train", icon: <TbTrain className="text-lg" /> },
    bus: { label: "Bus", icon: <TbBus className="text-lg" /> },
    car: { label: "Car", icon: <MdDirectionsCar className="text-lg" /> },
    boat: { label: "Boat", icon: <MdOutlineDirectionsBoat className="text-lg" /> },
    rapido: { label: "Rapido", icon: <LuBike className="text-lg" /> },
    bicycle: { label: "Bicycle", icon: <LuBike className="text-lg" /> },
    uber: { label: "Uber", icon: <MdDirectionsCar className="text-lg" /> },
    ola: { label: "Ola", icon: <MdDirectionsCar className="text-lg" /> },
};

const ShowTravel: React.FC<IShowTravel> = ({ travelData, onEdit }) => {
    const travelMeta = travelTypeMeta[travelData.travelType];

    return (
        <section className="my-1 flex w-full max-w-[268px] flex-col gap-2 rounded-xl border border-[#343a40] bg-[#151a1f] px-3 py-2.5 shadow-[0_10px_22px_rgba(0,0,0,0.16)]">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#212529] text-[#e9ecef]">
                        {travelMeta.icon}
                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-[#f8f9fa]">{travelMeta.label}</h3>
                        <p className="mt-0.5 text-[11px] text-gray-400">Day {travelData.day} transfer</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onEdit}
                    className="shrink-0 text-gray-400 transition hover:text-[#f8f9fa]"
                >
                    <MdOutlineEdit className="text-sm" />
                </button>
            </div>

            <div className="rounded-lg border border-[#2b3035] bg-[#0b0f13] px-2.5 py-1.5">
                <div className="flex items-center justify-between gap-2 text-xs text-[#dee2e6]">
                    <span className="flex items-center gap-1.5 text-gray-400">
                        <TbClockHour4 className="text-sm" />
                        Duration
                    </span>
                    <span className="font-medium text-[#f8f9fa]">{travelData.time}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2 text-xs text-[#dee2e6]">
                    <span className="flex items-center gap-1.5 text-gray-400">
                        <TbCurrencyRupee className="text-sm" />
                        Estimated Cost
                    </span>
                    <span className="font-medium text-[#f8f9fa]">{travelData.amountSpent}</span>
                </div>
            </div>

            <p className="text-[11px] leading-4 text-gray-400">{travelData.description}</p>
        </section>
    );
};

export default ShowTravel;

import React from "react";
import type ITripFlightData from "../../../../Interface/DataInterface/ITripFlightData";

interface Props {
    flight: ITripFlightData;
    onClose: () => void;
    onBook: (flight: ITripFlightData) => void;
}

const UnbookedFlightCard: React.FC<Props> = ({ flight, onBook }) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {flight.airlineLogo && (
                        <img
                            src={flight.airlineLogo}
                            alt={flight.airline}
                            className="h-10 w-10 rounded-full bg-white p-1 object-contain"
                        />
                    )}

                    <div>
                        <p className="font-semibold text-white">{flight.airline}</p>
                        <p className="text-xs text-white/50">{flight.flightNumber}</p>
                    </div>
                </div>

                <p className="font-bold text-white">{flight.formattedPrice}</p>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white/[0.04] p-3">
                <div>
                    <p className="text-xl font-semibold text-white">
                        {new Date(flight.departure).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
                    <p className="text-sm text-white/60">{flight.originCode}</p>
                </div>

                <div className="text-center">
                    <p className="text-xs text-white/50">
                        {Math.floor(flight.durationMinutes / 60)}h {flight.durationMinutes % 60}m
                    </p>
                    <div className="my-1 text-blue-400">✈ ─────</div>
                    <p className="text-xs text-white/50">
                        {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop(s)`}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xl font-semibold text-white">
                        {new Date(flight.arrival).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                        })}
                    </p>
                    <p className="text-sm text-white/60">{flight.destinationCode}</p>
                </div>
            </div>

            <button
                type="button"
                onClick={() => onBook(flight)}
                className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-400"
            >
                Book Flight
            </button>
        </div>
    );
};

export default UnbookedFlightCard;

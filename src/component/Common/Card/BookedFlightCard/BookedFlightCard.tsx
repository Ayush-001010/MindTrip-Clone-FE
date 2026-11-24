
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import type ITripFlightData from "../../../../Interface/DataInterface/ITripFlightData";

interface Props {
    flight: ITripFlightData;
    onClose: () => void;
}

const formatDateTime = (date?: Date | string | null) => {
    if (!date) return "N/A";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "N/A";

    return parsed.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const BookedFlightCard: React.FC<Props> = ({ flight }) => {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-3">

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

                <p className="font-bold text-emerald-300">
                    {flight.formattedPrice}
                </p>
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
                    <div className="my-1 text-emerald-400">✈ ─────</div>
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

            <div className="flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                <BsCheckCircleFill className="shrink-0 text-sm" />
                <span>
                    Demo booking confirmed for {formatDateTime(flight.departure)}
                </span>
            </div>

            <p className="text-xs text-white/40">
                Demo booking only. No actual flight ticket has been issued.
            </p>
        </div>
    );
};

export default BookedFlightCard;

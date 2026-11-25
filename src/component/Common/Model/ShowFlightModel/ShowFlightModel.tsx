
import React, { useState } from "react";
import type IShowFlightModel from "./IShowFlightModel";
import { Modal } from "antd";
import { FaPlane, FaExchangeAlt } from "react-icons/fa";

const ShowFlightModel: React.FC<IShowFlightModel> = ({
    open,
    onClose,
}) => {
    const [tripType, setTripType] = useState<"oneWay" | "roundTrip">("roundTrip");

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);

    const [error, setError] = useState("");

    const swapAirports = () => {
        setFrom(to);
        setTo(from);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!from.trim() || !to.trim()) {
            setError("Please enter both departure and destination airports.");
            return;
        }

        if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
            setError("Departure and destination cannot be the same.");
            return;
        }

        if (!departureDate) {
            setError("Please select a departure date.");
            return;
        }

        if (tripType === "roundTrip" && !returnDate) {
            setError("Please select a return date.");
            return;
        }

        if (tripType === "roundTrip" && returnDate < departureDate) {
            setError("Return date cannot be before departure date.");
            return;
        }

        setError("");

        // Flight API integration will be added in the next step.
        console.log({
            tripType,
            from,
            to,
            departureDate,
            returnDate: tripType === "roundTrip" ? returnDate : undefined,
            adults,
            children,
            infants,
        });
    };

    const inputClass =
        "w-full rounded-xl border border-white/10 bg-gray-800/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400";

    const labelClass = "mb-2 block text-sm font-medium text-white/70";

    const today = new Date().toLocaleDateString("en-CA");

    return (
        <Modal
            open={open}
            onCancel={onClose}
            centered
            width={760}
            footer={null}
            title={null}
            rootClassName="transparent-modal"
            styles={{
                mask: {
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(8px)",
                },
                container: {
                    background: "transparent",
                    padding: 0,
                    boxShadow: "none",
                },
                body: {
                    padding: 0,
                    background: "transparent",
                },
                header: {
                    display: "none",
                },
                footer: {
                    display: "none",
                },
            }}
            closeIcon={<span className="text-white text-lg">x</span>}
        >
            <main className="rounded-2xl bg-gradient-to-b from-gray-900/95 to-black/95 p-8 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">

                {/* Header */}
                <header className="border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                        <FaPlane className="text-2xl text-blue-400" />
                        <div>
                            <h2 className="text-xl font-semibold">
                                Search Flights
                            </h2>
                            <p className="mt-1 text-sm text-white/50">
                                Find the best flights for your journey
                            </p>
                        </div>
                    </div>
                </header>

                <form onSubmit={handleSearch} className="mt-6 space-y-6">

                    {/* Trip Type */}
                    <div className="flex w-fit rounded-xl bg-gray-800/70 p-1">
                        <button
                            type="button"
                            onClick={() => {
                                setTripType("oneWay");
                                setReturnDate("");
                            }}
                            className={`rounded-lg px-5 py-2 text-sm transition ${
                                tripType === "oneWay"
                                    ? "bg-blue-600 text-white"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            One Way
                        </button>

                        <button
                            type="button"
                            onClick={() => setTripType("roundTrip")}
                            className={`rounded-lg px-5 py-2 text-sm transition ${
                                tripType === "roundTrip"
                                    ? "bg-blue-600 text-white"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            Round Trip
                        </button>
                    </div>

                    {/* From and To */}
                    <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-[1fr_auto_1fr]">

                        <div>
                            <label className={labelClass}>From</label>
                            <input
                                type="text"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                placeholder="Enter departure airport"
                                className={inputClass}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={swapAirports}
                            title="Swap airports"
                            className="mb-1 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-gray-800 text-blue-400 transition hover:bg-gray-700"
                        >
                            <FaExchangeAlt />
                        </button>

                        <div>
                            <label className={labelClass}>To</label>
                            <input
                                type="text"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder="Enter destination airport"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    {/* Dates */}
                    <div className={`grid grid-cols-1 gap-4 ${tripType === "roundTrip" ? "md:grid-cols-2" : ""}`}>
                        <div>
                            <label className={labelClass}>Departure Date</label>
                            <input
                                type="date"
                                min={today}
                                value={departureDate}
                                onChange={(e) => {
                                    setDepartureDate(e.target.value);
                                    if (returnDate && e.target.value > returnDate) {
                                        setReturnDate("");
                                    }
                                }}
                                className={inputClass}
                            />
                        </div>

                        {tripType === "roundTrip" && (
                            <div>
                                <label className={labelClass}>Return Date</label>
                                <input
                                    type="date"
                                    min={departureDate || today}
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        )}
                    </div>

                    {/* Travellers */}
                    <div>
                        <label className={labelClass}>Travellers</label>

                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <span className="mb-2 block text-xs text-white/50">Adults</span>
                                <select
                                    value={adults}
                                    onChange={(e) => setAdults(Number(e.target.value))}
                                    className={inputClass}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <span className="mb-2 block text-xs text-white/50">Children</span>
                                <select
                                    value={children}
                                    onChange={(e) => setChildren(Number(e.target.value))}
                                    className={inputClass}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <span className="mb-2 block text-xs text-white/50">Infants</span>
                                <select
                                    value={infants}
                                    onChange={(e) => setInfants(Number(e.target.value))}
                                    className={inputClass}
                                >
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}

                    {/* Search Button */}
                    <div className="flex justify-end border-t border-white/10 pt-5">
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                        >
                            <FaPlane />
                            Search Flights
                        </button>
                    </div>
                </form>
            </main>
        </Modal>
    );
};

export default ShowFlightModel;

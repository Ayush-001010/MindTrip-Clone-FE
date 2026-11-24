
import React, { useState } from "react";
import type IFlightSearchResponse from "../../../../Interface/DataInterface/IFlightSearchResponse";
import type ITripFlightData from "../../../../Interface/DataInterface/ITripFlightData";
import { useChatContext } from "../../../Pages/Chat/Chat";

interface Flight {
  id: string;
  price: number;
  formattedPrice: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departure: string;
  arrival: string;
  durationMinutes: number;
  stops: number;
  segments: any[];
  isRefundable: boolean;
  emissionsKg: number;
}

interface Props {
  data: IFlightSearchResponse;
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes}m`;
};

const FlightSearchResponse: React.FC<Props> = ({ data }) => {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const { bookFlightHandler } = useChatContext();
  const flights = [...(data.flights || [])]
    .sort((a: Flight, b: Flight) => a.price - b.price)
    .slice(0, 20);

  return (
    <section className="mt-3 w-full space-y-4 text-white">
      <div className="rounded-xl border border-gray-700 bg-[#1e293b] p-4">
        <h3 className="text-lg font-semibold">
          ✈️ Flight Results
        </h3>

        <p className="mt-2 text-sm text-gray-300">
          {data.origin} → {data.destination}
        </p>

        <p className="mt-1 text-sm text-gray-400">
          Showing {flights.length} cheapest flights
        </p>
      </div>

      {flights.map((flight: Flight) => (
        <div
          key={flight.id}
          className={`rounded-xl border p-4 transition ${
            selectedFlight === flight.id
              ? "border-blue-400 bg-[#263750]"
              : "border-gray-700 bg-[#111827]"
          }`}
        >
          {/* Airline details */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {flight.airlineLogo && (
                <img
                  src={flight.airlineLogo}
                  alt={flight.airline}
                  className="h-9 w-9 rounded-full bg-white p-1 object-contain"
                />
              )}

              <div>
                <p className="font-semibold">{flight.airline}</p>
                <p className="text-xs text-gray-400">
                  {flight.flightNumber}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-green-400">
                {flight.formattedPrice}
              </p>
              <p className="text-xs text-gray-400">Total fare</p>
            </div>
          </div>

          {/* Journey details */}
          <div className="mt-5 flex items-center justify-between gap-2">
            <div>
              <p className="text-xl font-semibold">
                {formatTime(flight.departure)}
              </p>
              <p className="text-sm text-gray-400">
                {flight.originCode}
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center px-2">
              <p className="text-xs text-gray-400">
                {formatDuration(flight.durationMinutes)}
              </p>

              <div className="my-2 flex w-full items-center">
                <div className="h-px flex-1 bg-gray-500" />
                <span className="mx-2 text-blue-400">✈</span>
                <div className="h-px flex-1 bg-gray-500" />
              </div>

              <p className="text-xs text-gray-400">
                {flight.stops === 0
                  ? "Non-stop"
                  : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xl font-semibold">
                {formatTime(flight.arrival)}
              </p>
              <p className="text-sm text-gray-400">
                {flight.destinationCode}
              </p>
            </div>
          </div>

          {/* Additional details */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-700 pt-3 text-xs text-gray-400">
            <span>
              {new Date(flight.departure).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>

            <span>
              {flight.isRefundable ? "Refundable" : "Non-refundable"}
            </span>

            <span>
              {flight.emissionsKg
                ? `${Math.round(flight.emissionsKg)} kg CO₂`
                : ""}
            </span>
          </div>

          {/* Select flight */}
          <button
  onClick={() => {
    if (!bookFlightHandler) return;

    const flightData: ITripFlightData = {
        flightId: flight.id,
        airline: flight.airline,
        airlineLogo: flight.airlineLogo,
        flightNumber: flight.flightNumber,
        origin: flight.origin,
        originCode: flight.originCode,
        destination: flight.destination,
        destinationCode: flight.destinationCode,
        departure: flight.departure,
        arrival: flight.arrival,
        durationMinutes: flight.durationMinutes,
        stops: flight.stops,
        price: flight.price,
        formattedPrice: flight.formattedPrice,
        segments: flight.segments,
        isRefundable: flight.isRefundable,
        emissionsKg: flight.emissionsKg,
        isBooked: false,
        base62: "",
    };

    bookFlightHandler(flightData);
    setSelectedFlight(flight.id);
  }}
  className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold transition ${
    selectedFlight === flight.id
      ? "bg-green-600 text-white"
      : "bg-blue-600 text-white hover:bg-blue-700"
  }`}
>
  {selectedFlight === flight.id ? "✓ Flight Selected" : "Book Flight"}
</button>
           
        </div>
      ))}

      {flights.length === 0 && (
        <p className="rounded-xl border border-gray-700 bg-[#111827] p-4 text-center text-gray-400">
          No flights found for this search.
        </p>
      )}
    </section>
  );
};

export default FlightSearchResponse;

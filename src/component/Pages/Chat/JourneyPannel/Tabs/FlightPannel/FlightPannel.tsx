
import React, { useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import type IFlightPannel from "./IFlightPannel";

const FlightPannel: React.FC<IFlightPannel> = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState("economy");

  const handleSearchFlights = () => {
    console.log({
      origin,
      destination,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      cabinClass,
    });
  };

  return (
    <main className="flex h-full flex-col overflow-y-auto p-5 text-white">
      <h1 className="mb-2 text-2xl font-bold">Search Flights</h1>

      <p className="mb-6 text-sm text-gray-400">
        Find the best flights for your journey
      </p>

      {/* Origin and Destination */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-sm text-gray-300">From</label>
          <input
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Departure airport"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">To</label>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Arrival airport"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Departure
          </label>

          <DatePicker
            className="w-full"
            placeholder="Departure date"
            disabledDate={(current) =>
              current && current.isBefore(dayjs().startOf("day"))
            }
            onChange={(date) =>
              setDepartureDate(date ? date.format("YYYY-MM-DD") : null)
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Return
          </label>

          <DatePicker
            className="w-full"
            placeholder="Return date (optional)"
            disabledDate={(current) =>
              current &&
              (current.isBefore(dayjs().startOf("day")) ||
                (departureDate &&
                  current.isBefore(dayjs(departureDate), "day")))
            }
            onChange={(date) =>
              setReturnDate(date ? date.format("YYYY-MM-DD") : null)
            }
          />
        </div>
      </div>

      {/* Passengers */}
      <div className="mb-4">
        <label className="mb-2 block text-sm text-gray-300">
          Passengers
        </label>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="mb-1 block text-xs text-gray-400">Adults</label>
            <input
              type="number"
              min={1}
              max={9}
              value={adults}
              onChange={(e) =>
                setAdults(Math.max(1, Math.min(9, Number(e.target.value))))
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-400">Children</label>
            <input
              type="number"
              min={0}
              max={9}
              value={children}
              onChange={(e) =>
                setChildren(Math.max(0, Math.min(9, Number(e.target.value))))
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-400">Infants</label>
            <input
              type="number"
              min={0}
              max={9}
              value={infants}
              onChange={(e) =>
                setInfants(Math.max(0, Math.min(9, Number(e.target.value))))
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
            />
          </div>
        </div>
      </div>

      {/* Cabin Class */}
      <div className="mb-6">
        <label className="mb-2 block text-sm text-gray-300">
          Cabin Class
        </label>

        <select
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
        >
          <option value="economy">Economy</option>
          <option value="premium_economy">Premium Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
      </div>

      {/* Search */}
      <button
        onClick={handleSearchFlights}
        disabled={!origin || !destination || !departureDate}
        className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Search Flights
      </button>
    </main>
  );
};

export default FlightPannel;

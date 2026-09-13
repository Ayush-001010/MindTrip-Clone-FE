import React, { useState } from "react";
import * as maptilerClient from "@maptiler/client";

interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<Location>({
    name: "Pune",
    latitude: 18.5204,
    longitude: 73.8567,
  });

  const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  maptilerClient.config.apiKey = apiKey;

  const handleSearch = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setSearchValue(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await maptilerClient.geocoding.forward(value, {
        limit: 5,
      });

      setResults(response.features);
    } catch (error) {
      console.error("Location search failed:", error);
      setResults([]);
    }
  };

  const handleSelectLocation = (result: any) => {
    const [longitude, latitude] = result.center;

    const location: Location = {
      name: result.place_name,
      latitude,
      longitude,
    };

    setSelectedLocation(location);
    setSearchValue("");
    setResults([]);
    setIsOpen(false);

    onLocationSelect(location);
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await maptilerClient.geocoding.reverse([
            longitude,
            latitude,
          ]);

          const place = response.features[0];

          const location: Location = {
            name: place?.place_name || "Current location",
            latitude,
            longitude,
          };

          setSelectedLocation(location);
          setSearchValue("");
          setResults([]);
          setIsOpen(false);

          onLocationSelect(location);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);

          const location: Location = {
            name: "Current location",
            latitude,
            longitude,
          };

          setSelectedLocation(location);
          setSearchValue("");
          setResults([]);
          setIsOpen(false);

          onLocationSelect(location);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("Location permission was denied.");
            break;

          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;

          case error.TIMEOUT:
            console.error("Location request timed out.");
            break;

          default:
            console.error("Unable to determine current location.");
        }
      }
    );
  };

  return (
    <div className="relative">
      {/* LOCATION BUTTON */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 text-2xl font-semibold text-white"
      >
        {selectedLocation.name}
        <span className="text-sm">⌄</span>
      </button>

      {/* LOCATION DROPDOWN */}
      {isOpen && (
        <div className="absolute left-0 top-12 z-50 w-105 rounded-2xl border border-white/10 bg-[#272c31] p-4 shadow-2xl">

          {/* LOCATION SEARCH */}
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            placeholder="Search a location..."
            autoFocus
            className="w-full rounded-xl border border-white/10 bg-[#1f2327] px-4 py-3 text-white outline-none placeholder:text-white/40"
          />

          {/* CURRENT LOCATION */}
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="mt-2 w-full rounded-xl px-4 py-3 text-left hover:bg-white/10"
          >
            <div className="text-sm font-medium text-white">
              Use current location
            </div>

            <div className="mt-1 text-xs text-white/50">
              Find places near you
            </div>
          </button>

          {/* SEARCH RESULTS */}
          <div className="mt-3">
            {results.map((result) => (
              <button
                key={result.id}
                type="button"
                onClick={() => handleSelectLocation(result)}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-white/10"
              >
                <div className="text-sm font-medium text-white">
                  {result.text}
                </div>

                <div className="mt-1 text-xs text-white/50">
                  {result.place_name}
                </div>
              </button>
            ))}

            {searchValue && results.length === 0 && (
              <p className="px-4 py-3 text-sm text-white/50">
                No locations found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
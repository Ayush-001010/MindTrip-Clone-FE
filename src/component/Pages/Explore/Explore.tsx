import React, { useState } from "react";
import Map from "../../Common/Map/Map";
import LocationSelector from "./components/LocationSelector/LocationSelector";
import useExploreHotels from "../../../Services/Hotel/useExploreHotels";
import HotelCard from "./components/HotelCard/HotelCard";
import type IHotel from "../../../Interface/DataInterface/IHotel";
import HotelDetails from "./components/HotelDetails/HotelDetails";

const Explore: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    name: "Pune",
    latitude: 18.5204,
    longitude: 73.8567,
  });

  const [activeTab, setActiveTab] = useState("For you");
  const [selectedHotel, setSelectedHotel] = useState<IHotel | null>(null);
  const {
    data: hotels,
    loading,
    error,
  } = useExploreHotels(activeTab === "Stays" ? selectedLocation.name : "");

  const tabs = [
    "For you",
    "Things to do",
    "Restaurants",
    "Stays",
    "Locations",
    "Guides",
  ];

  return (
    <main className="h-screen w-full bg-[#1f2327] text-white">
      <div className="grid h-full grid-cols-2">
        {/* LEFT SIDE */}
        <section className="overflow-y-auto p-6">
          {/* LOCATION */}
          <LocationSelector
            onLocationSelect={(location) => {
              setSelectedLocation(location);
            }}
          />

          {/* SEARCH + FILTERS */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center rounded-full border border-white/10 bg-[#272c31] px-4 py-3">
              <span className="mr-3 text-lg text-white/50">⌕</span>

              <input
                type="text"
                placeholder="Search destinations, places or experiences"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
              />
            </div>

            <button
              type="button"
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-[#272c31] px-5 py-3 text-sm text-white transition hover:bg-[#30363c]"
            >
              <span>☷</span>
              Filters
            </button>
          </div>

          {/* CATEGORY TABS */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm transition ${
                  activeTab === tab
                    ? "bg-white font-medium text-black"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* CONTENT */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">
              {activeTab === "Stays" ? "Stays" : activeTab}
            </h2>

            <p className="mt-2 text-sm text-white/50">
              {activeTab === "Stays"
                ? `Hotels around ${selectedLocation.name}.`
                : `Explore ${activeTab.toLowerCase()} around ${
                    selectedLocation.name
                  }.`}
            </p>

            {/* HOTEL RESULTS */}
            {activeTab === "Stays" && (
              <div className="mt-6">
                {loading && (
                  <p className="text-sm text-white/50">Loading hotels...</p>
                )}

                {error && <p className="text-sm text-red-400">{error}</p>}

                {!loading && !error && hotels.length === 0 && (
                  <p className="text-sm text-white/50">No hotels found.</p>
                )}

                {!loading && !error && hotels.length > 0 && (
                  <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {hotels.map((hotel) => (
                      <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        selected={selectedHotel?.id === hotel.id}
                        onClick={() => setSelectedHotel(hotel)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="h-full overflow-hidden">
          <Map
            latitude={selectedLocation.latitude}
            longitude={selectedLocation.longitude}
            hotels={activeTab === "Stays" ? hotels : []}
            selectedHotel={selectedHotel}
            onHotelSelect={(hotel) => setSelectedHotel(hotel)}
          />
        </section>
      </div>
      {selectedHotel && (
        <HotelDetails
          hotel={selectedHotel}
          onClose={() => setSelectedHotel(null)}
        />
      )}
    </main>
  );
};

export default Explore;

import React from "react";
import type IHotelDetails from "./IHotelDetails";

const HotelDetails: React.FC<IHotelDetails> = ({
  hotel,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-[#272c31] text-white shadow-2xl">

        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl text-white hover:bg-black/80"
        >
          ×
        </button>

        {/* IMAGE */}
        {hotel.image ? (
          <img
            src={hotel.image}
            alt={hotel.name}
            className="h-72 w-full object-cover"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-[#343a40] text-white/40">
            No image available
          </div>
        )}

        {/* CONTENT */}
        <div className="p-6">

          <h2 className="text-2xl font-semibold">
            {hotel.name}
          </h2>

          {/* RATING */}
          {hotel.rating !== undefined && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-yellow-400">
                ★
              </span>

              <span>
                {hotel.rating}
              </span>

              {hotel.reviews !== undefined && (
                <span className="text-white/50">
                  ({hotel.reviews.toLocaleString()} reviews)
                </span>
              )}
            </div>
          )}

          {/* PRICE */}
          {hotel.price && (
            <p className="mt-4 text-xl font-semibold">
              {hotel.price}
              <span className="ml-2 text-sm font-normal text-white/50">
                / night
              </span>
            </p>
          )}

          {/* DESCRIPTION */}
          {hotel.description && (
            <div className="mt-5">
              <h3 className="text-lg font-medium">
                About this hotel
              </h3>

              <p className="mt-2 leading-6 text-white/60">
                {hotel.description}
              </p>
            </div>
          )}

          {/* AMENITIES */}
          {hotel.amenities &&
            hotel.amenities.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium">
                  Amenities
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/70"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}

          {/* VIEW HOTEL */}
          {hotel.link && (
            <a
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-white/90"
            >
              View Hotel
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
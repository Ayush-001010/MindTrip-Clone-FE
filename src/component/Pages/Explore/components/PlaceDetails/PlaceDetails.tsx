import React from "react";
import type IPlaceDetails from "./IPlaceDetails";

const PlaceDetails: React.FC<IPlaceDetails> = ({
  place,
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
        {place.image ? (
          <img
            src={place.image}
            alt={place.name}
            className="h-72 w-full object-cover"
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-[#343a40] text-white/40">
            No image available
          </div>
        )}

        {/* CONTENT */}
        <div className="p-6">

          {/* NAME */}
          <h2 className="text-2xl font-semibold">
            {place.name}
          </h2>

          {/* RATING */}
          {place.rating !== undefined && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-yellow-400">
                ★
              </span>

              <span>
                {place.rating}
              </span>

              {place.reviews !== undefined && (
                <span className="text-white/50">
                  ({place.reviews.toLocaleString()} reviews)
                </span>
              )}
            </div>
          )}

          {/* TYPE */}
          {place.type && (
            <p className="mt-3 text-sm text-[#3FB1CE]">
              {place.type}
            </p>
          )}

          {/* ADDRESS */}
          {place.address && (
            <div className="mt-5">
              <h3 className="text-lg font-medium">
                Address
              </h3>

              <p className="mt-2 leading-6 text-white/60">
                {place.address}
              </p>
            </div>
          )}

          {/* DESCRIPTION */}
          {place.description && (
            <div className="mt-5">
              <h3 className="text-lg font-medium">
                About
              </h3>

              <p className="mt-2 leading-6 text-white/60">
                {place.description}
              </p>
            </div>
          )}

          {/* PRICE */}
          {place.price && (
            <p className="mt-5 text-lg font-semibold">
              {place.price}
            </p>
          )}

          {/* VIEW PLACE */}
          {place.link && (
            <a
              href={place.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-white/90"
            >
              View Place
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaceDetails;
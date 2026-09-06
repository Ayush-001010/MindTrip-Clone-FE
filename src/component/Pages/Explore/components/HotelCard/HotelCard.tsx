import React, { useState } from "react";
import type IHotelCard from "./IHotelCard";

const HotelCard: React.FC<IHotelCard> = ({
  hotel,
  onClick,
  selected,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
    onClick={onClick}
    className={`cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
      selected
        ? "border-[#3FB1CE] bg-[#30363c] shadow-[0_0_0_3px_rgba(63,177,206,0.25)]"
        : "border-transparent bg-[#272c31] hover:border-white/20 hover:bg-[#30363c]"
    }`}
  >
   
      {/* IMAGE */}
      <div className="relative h-48 w-full bg-[#343a40]">
        {hotel.image && !imageError ? (
          <img
            src={hotel.image}
            alt={hotel.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            No image available
          </div>
        )}
      </div>

      {/* DETAILS */}
      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-white">
          {hotel.name}
        </h3>

        {hotel.rating !== undefined && (
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-yellow-400">
              ★
            </span>

            <span className="text-white">
              {hotel.rating}
            </span>

            {hotel.reviews !== undefined && (
              <span className="text-white/50">
                ({hotel.reviews.toLocaleString()})
              </span>
            )}
          </div>
        )}

        {hotel.price && (
          <p className="mt-3 text-base font-medium text-white">
            {hotel.price}
            <span className="ml-1 text-sm font-normal text-white/50">
              / night
            </span>
          </p>
        )}

        {hotel.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/50">
            {hotel.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default HotelCard;
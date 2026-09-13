import React, { useState } from "react";
import type IPlaceCard from "./IPlaceCard";

const PlaceCard: React.FC<IPlaceCard> = ({
  place,
  onClick,
  selected,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer overflow-hidden rounded-2xl border-2 transition-all duration-200 ${
        selected
          ? "border-[#22C55E] bg-[#30363c] shadow-[0_0_0_3px_rgba(34,197,94,0.2)]"
          : "border-transparent bg-[#272c31] hover:border-white/20 hover:bg-[#30363c]"
      }`}
    >
      <div className="relative h-48 w-full bg-[#343a40]">
        {place.image && !imageError ? (
          <img
            src={place.image}
            alt={place.name}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-white/40">
            No image available
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-white">
          {place.name}
        </h3>

        {place.rating !== undefined && (
          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-yellow-400">★</span>

            <span className="text-white">
              {place.rating}
            </span>

            {place.reviews !== undefined && (
              <span className="text-white/50">
                ({place.reviews.toLocaleString()})
              </span>
            )}
          </div>
        )}

        {place.type && (
          <p className="mt-2 text-sm text-[#3FB1CE]">
            {place.type}
          </p>
        )}

        {place.address && (
          <p className="mt-2 line-clamp-2 text-sm text-white/50">
            {place.address}
          </p>
        )}

        {place.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/50">
            {place.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
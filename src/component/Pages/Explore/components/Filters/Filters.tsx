import React from "react";
import type IFilters from "./IFilters";

const Filters: React.FC<IFilters> = ({
  minRating,
  onRatingChange,
}) => {
  const ratings = [4, 3, 2];

  return (
    <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-2xl border border-white/10 bg-[#272c31] p-4 shadow-xl">
      <h3 className="text-sm font-semibold text-white">
        Rating
      </h3>

      <div className="mt-3 space-y-2">
        <button
          type="button"
          onClick={() => onRatingChange(undefined)}
          className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition ${
            minRating === undefined
              ? "bg-white text-black"
              : "text-white/70 hover:bg-white/10"
          }`}
        >
          All ratings
        </button>

        {ratings.map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onRatingChange(rating)}
            className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition ${
              minRating === rating
                ? "bg-white text-black"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            {rating}+ ★
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filters;
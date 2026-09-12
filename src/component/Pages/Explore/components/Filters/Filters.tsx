import React from "react";
import type IFilters from "./IFilters";

const Filters: React.FC<IFilters> = ({
  minRating,
  onRatingChange,
  activityType,
  onActivityTypeChange,
  showActivityType,
}) => {
  const ratings = [4, 3, 2];

  const activityTypes = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Amusement Parks",
      value: "amusement",
    },
    {
      label: "Indoor Activities",
      value: "indoor",
    },
    {
      label: "Outdoor Activities",
      value: "outdoor",
    },
    {
      label: "Adventure",
      value: "adventure",
    },
    {
      label: "Tours & Experiences",
      value: "tours",
    },
  ];

  return (
    <div className="absolute right-0 top-full z-30 mt-2 w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/10 bg-[#272c31] p-4 shadow-xl">
      {/* RATING */}
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

      {/* ACTIVITY TYPE */}
      {showActivityType && (
        <div className="mt-5 border-t border-white/10 pt-4">
          <h3 className="text-sm font-semibold text-white">
            Activity Type
          </h3>

          <div className="mt-3 space-y-2">
            {activityTypes.map((activity) => (
              <button
                key={activity.value}
                type="button"
                onClick={() =>
                  onActivityTypeChange?.(activity.value)
                }
                className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition ${
                  activityType === activity.value
                    ? "bg-white text-black"
                    : "text-white/70 hover:bg-white/10"
                }`}
              >
                {activity.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
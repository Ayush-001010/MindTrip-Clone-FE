import React, { useState } from "react";
import type IHotelSummaryInfo from "./IHotelSummaryInfo";

const MAX_VISIBLE_AMENITIES = 3;

const HotelSummaryInfo: React.FC<IHotelSummaryInfo> = ({ hotel }) => {
    const [imageError, setImageError] = useState(false);
    const amenities = hotel.amenities ? hotel.amenities.split(",").map((amenity) => amenity.trim()).filter(Boolean) : [];
    const visibleAmenities = amenities.slice(0, MAX_VISIBLE_AMENITIES);
    const extraAmenitiesCount = amenities.length - visibleAmenities.length;

    return (
        <div className="flex gap-3">
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#343a40]">
                {hotel.image && !imageError ? (
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        onError={() => setImageError(true)}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-center text-[10px] text-white/40">
                        No image
                    </div>
                )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                <h3 className="line-clamp-1 text-sm font-semibold text-white">{hotel.name}</h3>

                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {!!hotel.rating && (
                        <>
                            <span className="text-yellow-400">★</span>
                            <span className="text-white">{hotel.rating}</span>
                        </>
                    )}
                    {hotel.reviews !== undefined && hotel.reviews !== null && (
                        <span className="text-white/50">({hotel.reviews.toLocaleString()} reviews)</span>
                    )}
                </div>

                <p className="text-sm font-medium text-white">
                    {hotel.price ? (
                        <>
                            {hotel.price}
                            <span className="ml-1 text-xs font-normal text-white/50">/ night</span>
                        </>
                    ) : (
                        <span className="text-xs font-normal text-white/40">Price not available</span>
                    )}
                </p>

                {visibleAmenities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {visibleAmenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-white/50"
                            >
                                {amenity}
                            </span>
                        ))}
                        {extraAmenitiesCount > 0 && (
                            <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] text-white/40">
                                +{extraAmenitiesCount} more
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HotelSummaryInfo;

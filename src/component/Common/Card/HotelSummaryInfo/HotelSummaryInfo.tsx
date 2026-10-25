import React, { useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import type IHotelSummaryInfo from "./IHotelSummaryInfo";
import { useChatContext } from "../../../Pages/Chat/Chat";

const MAX_VISIBLE_AMENITIES = 3;

const HotelSummaryInfo: React.FC<IHotelSummaryInfo> = ({ hotel, onClose, isNotBooked }) => {
    const [imageError, setImageError] = useState(false);
    const amenities = hotel.amenities ? hotel.amenities.split(",").map((amenity) => amenity.trim()).filter(Boolean) : [];
    const visibleAmenities = amenities.slice(0, MAX_VISIBLE_AMENITIES);
    const extraAmenitiesCount = amenities.length - visibleAmenities.length;
    const { createActionHandler, setShowHotelInLocationPannel, setShowHotelDetails } = useChatContext();

    const clickHandlerUsersOpinion = () => {
        createActionHandler("opinion", `What do you think about ${hotel.name}?`, undefined, undefined, undefined, undefined, hotel.image);
    };

    const clickHandlerBookHotel = () => {
        if (setShowHotelInLocationPannel && setShowHotelDetails && hotel) {
            setShowHotelInLocationPannel(true);
            setShowHotelDetails({
                id: hotel.id?.toString(),
                type: "hotel",
                name: hotel.name,
                gps_coordinates: {
                    latitude: hotel.latitude,
                    longitude: hotel.longitude,
                },
                rate_per_night: {
                    lowest: hotel.price.toString(),
                    extracted_lowest: hotel.price,
                },
                total_rate: {
                    lowest: hotel.price.toString(),
                    extracted_lowest: hotel.price,
                },
                hotel_class: "",
                extracted_hotel_class: 1,
                images: [{
                    thumbnail: hotel.image ? hotel.image : "",
                    original_image: hotel.image ? hotel.image : ""
                }],
                overall_rating: hotel.rating,
                reviews: hotel.reviews,
                ratings: [],
                location_rating: 0,
                reviews_breakdown: [],
                amenities: hotel.amenities.split(","),
                eco_certified: true,
            });
            onClose();
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="relative flex gap-3">
                <div className="group/tooltip absolute right-0 top-0 z-10">
                    <button
                        type="button"
                        aria-label="Want to take opinion from other ?"
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white/5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={clickHandlerUsersOpinion}
                    >
                        <HiOutlineUserGroup className="h-3.5 w-3.5" />
                    </button>
                </div>
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
                <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 pr-8">
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
            {isNotBooked && (
                <button
                    type="button"
                    onClick={clickHandlerBookHotel}
                    className="ml-auto cursor-pointer rounded-full bg-blue-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-[0_6px_16px_rgba(59,130,246,0.4)] active:translate-y-0 active:scale-95"
                >
                    Book
                </button>
            )}
        </div>
    );
};

export default HotelSummaryInfo;

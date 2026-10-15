import React, { useState } from "react";
import type IHotelCard from "./IHotelCard";
import { useChatContext } from "../../../Pages/Chat/Chat";

const MAX_VISIBLE_AMENITIES = 3;

const HotelCard: React.FC<IHotelCard> = ({ data: hotel }) => {
    const [imageError, setImageError] = useState(false);
    const image = hotel.images?.[0]?.thumbnail;
    const visibleAmenities = hotel.amenities?.slice(0, MAX_VISIBLE_AMENITIES) ?? [];
    const extraAmenitiesCount = (hotel.amenities?.length ?? 0) - visibleAmenities.length;
    const {setShowHotelInLocationPannel , setShowHotelDetails , addHotelToWishList} = useChatContext();

    const submitHandler = () => {
        if(setShowHotelInLocationPannel && setShowHotelDetails && hotel) {
            setShowHotelInLocationPannel(true);
            setShowHotelDetails(hotel);
        }
    }
    const addToWishListHandler = () => {
        if(addHotelToWishList && hotel) {
            addHotelToWishList({
                name : hotel.name,
                longitude : hotel.gps_coordinates.longitude,
                latitude : hotel.gps_coordinates.latitude,
                image : hotel.images.map(img => img.thumbnail).join(','),
                amenities : hotel.amenities?.join(','),
                price : Number(hotel.rate_per_night?.lowest || 0),
                rating: Number(hotel.ratings),
                reviews: hotel.reviews,
            });
        }
    }

    return (
        <div className="flex w-56 shrink-0 snap-start flex-col gap-2 overflow-hidden rounded-xl border border-white/10 bg-[#272c31] p-2.5 transition-colors hover:border-white/20 hover:bg-[#2e343a]">
            <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-lg bg-[#343a40]">
                {image && !imageError ? (
                    <img
                        src={image}
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
                    {hotel.overall_rating !== undefined && (
                        <>
                            <span className="text-yellow-400">★</span>
                            <span className="text-white">{hotel.overall_rating}</span>
                            {hotel.reviews !== undefined && (
                                <span className="text-white/50">({hotel.reviews.toLocaleString()})</span>
                            )}
                        </>
                    )}
                    {hotel.hotel_class && hotel.hotel_class !== "Not specified" && (
                        <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] text-white/60">
                            {hotel.hotel_class}
                        </span>
                    )}
                </div>

                {hotel.rate_per_night?.lowest && (
                    <p className="text-sm font-medium text-white">
                        {hotel.rate_per_night.lowest}
                        <span className="ml-1 text-xs font-normal text-white/50">/ night</span>
                    </p>
                )}

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
                <div className="mt-1 flex gap-2">
                    <button
                        onClick={submitHandler}
                        type="button"
                        className="flex-1 cursor-pointer rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-400 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                    >
                        Book
                    </button>
                    <button
                        onClick={addToWishListHandler}
                        type="button"
                        className="flex-1 cursor-pointer rounded-lg border border-white/20 bg-transparent px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                        Add to Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
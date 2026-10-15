import React, { useState } from "react";
import { useSelector } from "react-redux";
import type IUnbookedHotelCard from "./IUnbookedHotelCard";
import type IUserInterface from "../../../../Interface/DataInterface/IUserDetails";
import HotelSummaryInfo from "../HotelSummaryInfo/HotelSummaryInfo";
import LikeDislikeControls from "./LikeDislikeControls/LikeDislikeControls";
import HotelCommentSection from "./HotelCommentSection/HotelCommentSection";
import { parseHotelComments } from "../../../../Utils/hotelComment";
import useTripAction from "../../../../CustomHooks/useTripAction";

const UnbookedHotelCard: React.FC<IUnbookedHotelCard> = ({ hotel }) => {
    const [likeCount, setLikeCount] = useState(hotel.likeCount ?? 0);
    const [dislikeCount, setDislikeCount] = useState(hotel.dislikeCount ?? 0);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [comments, setComments] = useState(() => parseHotelComments(hotel.comment));

    const userDetails = useSelector((state: any) => state.userDetails as IUserInterface);
    const currentUserName = userDetails.userName || "You";
    const { addCommentOnTripHotel, likeOrDislikeTripHotel } = useTripAction();
    const hotelID = String(hotel.id ?? "");

    const handleLike = async () => {
        const wasLiked = liked;
        const wasDisliked = disliked;

        if (wasLiked) {
            setLiked(false);
            setLikeCount((count) => Math.max(0, count - 1));
        } else {
            if (wasDisliked) {
                setDisliked(false);
                setDislikeCount((count) => Math.max(0, count - 1));
            }
            setLiked(true);
            setLikeCount((count) => count + 1);
        }

        const response = await likeOrDislikeTripHotel(hotelID, true);
        if (!response?.success) {
            // Revert the optimistic update if the request failed.
            setLiked(wasLiked);
            setDisliked(wasDisliked);
            setLikeCount(hotel.likeCount ?? 0);
            setDislikeCount(hotel.dislikeCount ?? 0);
        }
    };

    const handleDislike = async () => {
        const wasLiked = liked;
        const wasDisliked = disliked;

        if (wasDisliked) {
            setDisliked(false);
            setDislikeCount((count) => Math.max(0, count - 1));
        } else {
            if (wasLiked) {
                setLiked(false);
                setLikeCount((count) => Math.max(0, count - 1));
            }
            setDisliked(true);
            setDislikeCount((count) => count + 1);
        }

        const response = await likeOrDislikeTripHotel(hotelID, false);
        if (!response?.success) {
            // Revert the optimistic update if the request failed.
            setLiked(wasLiked);
            setDisliked(wasDisliked);
            setLikeCount(hotel.likeCount ?? 0);
            setDislikeCount(hotel.dislikeCount ?? 0);
        }
    };

    const handleAddComment = async (comment: string) => {
        setComments((prev) => [...prev, { name: currentUserName, comment }]);

        const response = await addCommentOnTripHotel(hotelID, comment);
        if (!response?.success) {
            // Revert the optimistic comment if the request failed.
            setComments((prev) => prev.slice(0, -1));
        }
    };

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <HotelSummaryInfo hotel={hotel} />
            <LikeDislikeControls
                likeCount={likeCount}
                dislikeCount={dislikeCount}
                liked={liked}
                disliked={disliked}
                onLike={handleLike}
                onDislike={handleDislike}
            />
            <HotelCommentSection comments={comments} onAddComment={handleAddComment} />
        </div>
    );
};

export default UnbookedHotelCard;

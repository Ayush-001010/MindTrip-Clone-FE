import React from "react";
import type IHeader from "./IHeader";
import { CiLocationOn } from "react-icons/ci";
import { useChatContext } from "../../../Chat";

const Header: React.FC<IHeader> = ({ destinationName , longitude , latitude }) => {
    const {setIsSelectedLocation , setLocationLongitude , setLocationLatitude} = useChatContext();

    const locationClickHandler = () => {
        console.log("Location icon clicked. Longitude:", longitude, "Latitude:", latitude);
        if (setIsSelectedLocation && setLocationLongitude && setLocationLatitude) {
            setLocationLongitude(longitude);
            setLocationLatitude(latitude);
            setIsSelectedLocation(true);
        } else {
            console.warn("Chat context setters are not available.");
        }
    }
    return (
        <div className="flex gap-4 justify-between items-center mt-4 border-b border-[#343a40] pb-2">
            <p className="text-2xl font-semibold text-[#f8f9fa] flex items-center gap-2">
                <span>
                    {destinationName.toUpperCase()}
                </span>
                <span className="text-[#f8f9fa] text-lg hover:text-[#adb5bd] transition-colors cursor-pointer" onClick={locationClickHandler}>
                    <CiLocationOn />
                </span>
            </p>
            <button className="bg-[#f8f9fa] rounded-full p-1 text-xs text-[#001219] font-semibold hover:bg-[#e0e0e0] transition cursor-pointer">
                Add To Itinerary
            </button>
        </div>
    )
};

export default Header;
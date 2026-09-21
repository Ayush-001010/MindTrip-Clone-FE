import React from "react";
import type IItineraryPhotos from "./IItineraryPhotos";
import { TbPhotoSquareRounded } from "react-icons/tb";

const ItineraryPhotos: React.FC<IItineraryPhotos> = () => {
    return (
        <section className="border-r-1 border-[#adb5bd] cursor-pointer flex items-center">
            <TbPhotoSquareRounded className="text-[#f8f9fa] mx-2" />
        </section>
    );
};

export default ItineraryPhotos;
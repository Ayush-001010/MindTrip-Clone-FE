import React, { useMemo } from "react";
import type IShowImages from "./IShowImages";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ShowImages: React.FC<IShowImages> = ({ imagesURL, imageFiles }) => {
    // object URLs must stay stable across renders, otherwise images flicker/reload
    const fileURLs = useMemo(() => imageFiles.map((file) => URL.createObjectURL(file)), [imageFiles]);
    const allImages = [...imagesURL, ...fileURLs];

    if (allImages.length === 0) {
        return null;
    }

    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={allImages.length > 1}
            className="h-full w-full"
        >
            {allImages.map((src, index) => (
                <SwiperSlide key={`image-${index}`}>
                    <img src={src} alt={`activity-image-${index}`} className="h-full w-full object-cover rounded-xl shadow-lg shadow-slate-400/40" />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ShowImages;
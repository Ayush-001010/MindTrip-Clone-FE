import React, { useEffect, useState } from "react";
import type IBlogCard from "./IBlogCard";
import useCommonAction from "../../../../customHooks/useCommonAction";
import ShowImages from "../ActivityCard/ActivityImage/ShowImages/ShowImages";
import { IoIosImages } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineAccessTime, MdOutlineTravelExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiMountainsDuotone } from "react-icons/pi";
import { TbBeach, TbCarSuvFilled } from "react-icons/tb";
import { RiEBike2Fill } from "react-icons/ri";
import { FaSnowflake } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useGetAppContext } from "../../../../App";
import type { IFavouritesBlog } from "../../../../Interface/DataInterface/IFavouritesBlog";

const profileIconMap: Record<string, React.ReactNode> = {
    travel: <MdOutlineTravelExplore />,
    mountain: <PiMountainsDuotone />,
    beach: <TbBeach />,
    ebike: <RiEBike2Fill />,
    car: <TbCarSuvFilled />,
    snowflake: <FaSnowflake />,
};

const BlogCard: React.FC<IBlogCard> = ({ blogData }) => {
    const { getImages } = useCommonAction();
    const [imageURLs, setImageURLs] = useState<string[]>([]);
    const profileImages = blogData?.profileImages;
    const { changeFavoritesConfig } = useGetAppContext();

    useEffect(() => {
        let cancelled = false;

        const loadImages = async () => {
            const responses = await Promise.all((profileImages ?? []).map((imageKey) => getImages(imageKey)));
            if (cancelled) return;
            setImageURLs(responses.flatMap((response) => (typeof response?.data === "string" ? [response.data] : [])));
        };

        loadImages();
        return () => {
            cancelled = true;
        };
    }, [profileImages]);

    if (!blogData) {
        return null;
    }

    const { tripTitle, tripOverview, tripDuration, totalSpent, numberOfLikes, profileTitle, profileIcon } = blogData;

    return (
        <section className="group relative flex h-[420px] w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-gray-700 bg-[#111418] transition-all duration-300 hover:-translate-y-1 hover:border-gray-500 hover:shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
            <p className="absolute left-3 top-3 z-10 max-w-[240px] truncate rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                {tripTitle || "Untitled trip"}
            </p>
            <Link to={`/inspiration/blog/${blogData?.id}`}> 
            <p className="absolute cursor-pointer right-3 top-3 z-10 max-w-[240px] text-md truncate rounded-full border border-white/20 bg-black/40 px-3 py-1.5  font-semibold text-white backdrop-blur-md">
                <FaShareFromSquare />
            </p>
            </Link>

            {imageURLs.length > 0 ? (
                <ShowImages imagesURL={imageURLs} imageFiles={[]} />
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
                    <IoIosImages size={36} className="text-gray-600" />
                    <p className="text-sm text-gray-500">No images available</p>
                </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <div className="absolute inset-x-2 bottom-2 z-10 flex flex-col gap-2.5 rounded-xl border border-white/10 bg-black/45 p-3 backdrop-blur-md">
                <p className="line-clamp-2 text-xs leading-5 text-gray-200">{tripOverview}</p>

                <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white ring-2 ring-black/30">
                        {profileIconMap[profileIcon] ?? <CgProfile />}
                    </span>
                    <p className="truncate text-sm font-semibold text-white">{profileTitle || "Untitled profile"}</p>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-200">
                    <span onClick={()=>{
                        changeFavoritesConfig({
                            openFavorites: true,
                            uiType: "show-collection-for-add-purpose",
                            data: {
                                blogID: Number(blogData.id) || 0,
                                blogTitle: blogData?.tripTitle || "",
                                blogImage: imageURLs[0] || "",
                                blogDescription: blogData?.tripOverview || "",
                                rating: 0,
                                reviews: 0,
                            } as IFavouritesBlog,
                            mode: "blog"
                        });
                    }} className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                        <AiOutlineHeart size={14} />
                        {numberOfLikes ?? 0}
                    </span>
                    <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1">
                        <MdOutlineAccessTime size={14} />
                        {tripDuration} {tripDuration === 1 ? "day" : "days"}
                    </span>
                    <span className="ml-auto rounded-full bg-white/10 px-2 py-1 font-medium">
                        ₹{totalSpent.toLocaleString("en-IN")}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default BlogCard;

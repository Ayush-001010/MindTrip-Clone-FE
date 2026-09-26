import React from "react";
import type IProfileSection from "./IProfileSection";
import { IoIosImages } from "react-icons/io";
import ShowImages from "../../../../../../../Common/Card/ActivityCard/ActivityImage/ShowImages/ShowImages";

const ProfileSection: React.FC<IProfileSection> = ({ images, profileName, profileIcon }) => {
    const hasImages = images.length > 0;
    const hasDetails = Boolean(profileName || profileIcon);

    return (
        <section className="relative flex h-full w-[300px]! shrink-0 flex-col overflow-hidden rounded-xl border border-dashed border-gray-700 bg-[#111418]">
            <p className="absolute top-4 left-3 z-10 w-[100px] rounded-md bg-[#d3d3d3] p-2 text-center text-xs font-semibold text-[#000]">
                Preview
            </p>

            {hasImages ? (
                <ShowImages imagesURL={[]} imageFiles={images} />
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center">
                    <IoIosImages size={36} className="text-gray-600" />
                    <p className="text-sm text-gray-500">No images uploaded</p>
                </div>
            )}

            {hasDetails && (
                <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 py-3">
                    <p className="line-clamp-2 text-xs leading-5 text-gray-200">
                        {/* TODO: replace with real profile description */}
                        A short description of this profile goes here for now.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-600 bg-[#111418]/80 text-base text-gray-200">
                            {profileIcon}
                        </span>
                        <p className="truncate text-sm font-medium text-white">
                            {profileName || "Untitled profile"}
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ProfileSection;
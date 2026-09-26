import React from "react";
import type IAddPlaceName from "./IAddPlaceName";
import type { IPlaceOption } from "../ActivityPlaceName";
import { MdOutlineEdit } from "react-icons/md";
import { useGetBlogContext } from "../../../../../Pages/Blogs/Blog/Blog";
import { useGetActivityCardData } from "../../ActivityCard";

const AddPlaceName: React.FC<IAddPlaceName> = ({ setPlaceName , placeName, placeOptions , setLongitude, setLatitude }) => {
    const {saveChangeToBlog} = useGetBlogContext();
    const { indexNumber } = useGetActivityCardData();

    const handleOptionClick = (option: IPlaceOption) => {
        console.log(option);
        saveChangeToBlog("activities", option.place_name , indexNumber , "placeName");
        saveChangeToBlog("activities", option.longitude , indexNumber , "longitude");
        saveChangeToBlog("activities", option.latitude , indexNumber , "latitude");
        setPlaceName(option.place_name);
        setLongitude(option.longitude);
        setLatitude(option.latitude);
    };
    return (
        <section className="relative flex w-full flex-col gap-1">
            <div className="flex items-center gap-2 border-b border-gray-300 pb-0.5">
                <input type="text" placeholder="Enter place name" className="h-8 w-full text-lg font-semibold text-[#e9ecef] outline-none placeholder:text-gray-400" value={placeName} onChange={(e) => setPlaceName(e.target.value)} />
                <MdOutlineEdit className="shrink-0 text-[#f8f9fa]" />
            </div>
            {placeOptions.length > 0 && (
                <ul className="absolute left-0 right-0 top-full z-10 mt-1 max-h-48 overflow-auto rounded-md bg-[#212529] py-1 text-sm text-gray-600 shadow-lg">
                    {placeOptions.map((option, index) => (
                        <li className="cursor-pointer border-b-1 px-3 py-1 hover:bg-gray-50 hover:text-gray-900" key={index} onClick={() => handleOptionClick(option)}>{option.place_name}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default AddPlaceName;
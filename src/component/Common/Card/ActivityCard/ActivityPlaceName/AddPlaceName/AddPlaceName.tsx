import React from "react";
import type IAddPlaceName from "./IAddPlaceName";
import type { IPlaceOption } from "../ActivityPlaceName";
import { MdOutlineEdit } from "react-icons/md";

const AddPlaceName: React.FC<IAddPlaceName> = ({ setPlaceName , placeName, placeOptions , setLongitude, setLatitude }) => {
    const handleOptionClick = (option: IPlaceOption) => {
        setPlaceName(option.place_name);
        setLongitude(option.longitude);
        setLatitude(option.latitude);
    };
    return (
        <section className="flex w-full flex-col gap-1">
            <div className="flex items-center gap-2 border-b border-gray-300 pb-1">
                <input type="text" placeholder="Enter place name" className="w-full text-sm text-gray-800 outline-none placeholder:text-gray-400" value={placeName} onChange={(e) => setPlaceName(e.target.value)} />
                <MdOutlineEdit className="shrink-0 text-gray-400" />
            </div>
            {placeOptions.length > 0 && (
                <ul className="flex flex-col gap-1 text-sm text-gray-600">
                    {placeOptions.map((option, index) => (
                        <li className="cursor-pointer hover:text-gray-900" key={index} onClick={() => handleOptionClick(option)}>{option.place_name}</li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default AddPlaceName;
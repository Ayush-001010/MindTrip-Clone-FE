import React from "react";
import type IHeader from "./IHeader";
import { FaLocationDot } from "react-icons/fa6";

const Header: React.FC<IHeader> = ({title , setLongitude, setLatitude, coordinates }) => {
    return (
        <section className="mb-4 flex items-center underline">
            <p className="text-2xl text-[#dee2e6] m-0">
                {title}
            </p>
            <p onClick={()=>{
                setLatitude(coordinates.latitude);
                setLongitude(coordinates.longitude);
            }} className="m-0 ml-2 text-sm p-2 rounded-full text-[#212529] bg-[#dee2e6] cursor-pointer hover:bg-[#212529] hover:text-[#f8f9fa] transition duration-300">
                <FaLocationDot />
            </p>
        </section>
    );
};

export default Header;
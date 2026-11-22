import React, { useEffect, useState } from "react";
import useBlogGlobeFeed from "../../../CustomHooks/useBlogGlobeFeed";
import type IGlobleFeed from './IGlobleFeed';
import type IBlogUniquePlace from "../../../Interface/DataInterface/IBlogUniquePlace";
import Globe from "../../Common/Globe/Globe";
import { BsBackpack2 } from "react-icons/bs";
import ShowGlobePlaceInDetails from "../../Common/Card/ShowGlobePlace/ShowGlobePlaceInDetails";
import { BiSolidTv } from "react-icons/bi";
import { Tooltip } from "antd";
import ReelDisplayBox from "../../Common/ReelDisplayBox/ReelDisplayBox";

const GlobleFeed: React.FC<IGlobleFeed> = () => {
    const { getUniquePlaces } = useBlogGlobeFeed();
    const [places, setPlaces] = useState<IBlogUniquePlace[]>([]);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [selectedPlace, setSelectedPlace] = useState<IBlogUniquePlace | null>(null);
    const [isPhoneBoxOpen, setIsPhoneBoxOpen] = useState<boolean>(false);

    const handleSelectPlace = (place: IBlogUniquePlace) => {
        setSelectedPlace(place);
    };
    useEffect(() => {
        const fetchUniquePlaces = async () => {
            const data: any = await getUniquePlaces();
            if (data) setPlaces(data);
        };
        fetchUniquePlaces();
    }, []);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (selectedPlace) {
                setIsPhoneBoxOpen(true);
            }
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [selectedPlace])

    return (
        <section className="h-[calc(100vh-56px)] min-h-[500px] bg-zinc-950">
            <Globe places={places} type="place" onSelectPlace={handleSelectPlace} />
            {!showDetails && (
                <section onClick={() => setShowDetails(true)} className="absolute bottom-4 bg-[#e0aaff] text-[#3c096c] cursor-pointer transition-colors hover:bg-[#9d4edd] hover:text-[#fff]  rounded-full p-2 shadow-lg shadow-black/30 right-4 z-10">
                    <BsBackpack2 className="text-2xl" />
                </section>
            )}
            {showDetails && (
                <ShowGlobePlaceInDetails places={places} onClose={() => setShowDetails(false)} />
            )}
            {!isPhoneBoxOpen && (
                <Tooltip title="Select Place to watch reel">
                    <section className={"absolute cursor-pointer top-1/2 " + (selectedPlace ? "right-4 -translate-y-1/2" : "-right-10 -translate-y-1/2") + " p-2 w-20 h-20 flex items-center justify-center rounded-full border border-[#fff] shadow-lg shadow-purple-900/30 opacity-80 transition-all duration-800 hover:opacity-100 hover:scale-110"}>
                        <BiSolidTv className="text-3xl text-[#fff]" />
                    </section>
                </Tooltip>
            )}
            {isPhoneBoxOpen && (
                <section className="absolute top-1/2 right-4 -translate-y-1/2">
                    <ReelDisplayBox selectedPlace={selectedPlace!} />
                </section>
            )}
        </section>
    );
};

export default GlobleFeed;

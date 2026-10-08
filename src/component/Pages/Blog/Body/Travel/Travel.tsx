import React, { useEffect, useState } from "react";
import type ITravel from "./ITravel";
import AddTravel from "./AddTravel/AddTravel";
import ShowTravel from "./ShowTravel/ShowTravel";
import type { IBlogTravel } from "../../../../../Interface/DataInterface/IBlogData";
import { useGetBlogContext } from "../../Blog";

const Travel: React.FC<ITravel> = ({activityIndexNumber}) => {
    const [travelData, setTravelData] = useState<IBlogTravel | null>(null);
    const {addTravel , blogValue , selectedDay , mode} = useGetBlogContext();

    const handleSaveTravel = (data: IBlogTravel) => {
        setTravelData(data);
        addTravel(data);
    };

    useEffect(() => {
        if (mode === "preview") {
            // travel numbers repeat on every day, so the day must match too
            setTravelData(blogValue?.travel?.find(item => item.activityNumber === activityIndexNumber && item.day === selectedDay) ?? null);
            return;
        }
        if (blogValue?.travel && blogValue.travel.filter(item => item.activityNumber === activityIndexNumber).length > 0) {
            setTravelData(blogValue.travel.filter(item => item.activityNumber === activityIndexNumber)[0]);
        }
    }, [blogValue , selectedDay , activityIndexNumber , mode]); 

    if (mode === "preview" && !travelData) return null;


    return (
        <section className="min-w-0 flex-1">
            {!travelData && <AddTravel setTravelData={handleSaveTravel} />}
            {travelData && <section className="flex h-full items-center">
                 <ShowTravel travelData={travelData} onEdit={mode === "create" ? () => setTravelData(null) : undefined} />
            </section>
            }
        </section>
    );
};

export default Travel;
import React, { useEffect, useState } from "react";
import type ITravel from "./ITravel";
import AddTravel from "./AddTravel/AddTravel";
import ShowTravel from "./ShowTravel/ShowTravel";
import type { IBlogTravel } from "../../../../../Interface/DataInterface/IBlogData";
import { useGetBlogContext } from "../../Blog";

const Travel: React.FC<ITravel> = ({activityIndexNumber}) => {
    const [travelData, setTravelData] = useState<IBlogTravel | null>(null);
    const {addTravel , blogValue , selectedDay} = useGetBlogContext();
    console.log("Activity Index Number:", activityIndexNumber ," ", selectedDay);

    const handleSaveTravel = (data: IBlogTravel) => {
        setTravelData(data);
        addTravel(data);
    };

    useEffect(() => {
        if (blogValue?.travel && blogValue.travel.filter(item => item.activityNumber === activityIndexNumber).length > 0) {
            setTravelData(blogValue.travel.filter(item => item.activityNumber === activityIndexNumber)[0]);
            console.log("Travel data set from blogValue:", blogValue.travel.filter(item => item.activityNumber === activityIndexNumber)[0]);
        }
    }, [blogValue , selectedDay , activityIndexNumber]); 


    return (
        <section className="min-w-0 flex-1">
            {!travelData && <AddTravel setTravelData={handleSaveTravel} />}
            {travelData && <section className="flex h-full items-center">
                 <ShowTravel travelData={travelData} onEdit={() => setTravelData(null)} />
            </section>
            }
        </section>
    );
};

export default Travel;
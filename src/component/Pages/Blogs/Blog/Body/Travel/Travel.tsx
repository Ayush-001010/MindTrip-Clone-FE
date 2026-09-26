import React, { useState } from "react";
import type ITravel from "./ITravel";
import AddTravel from "./AddTravel/AddTravel";
import ShowTravel from "./ShowTravel/ShowTravel";
import type { IBlogTravel } from "../../../../../../Interface/DataInterface/IBlogData";

const Travel: React.FC<ITravel> = () => {
    const [travelData, setTravelData] = useState<IBlogTravel | null>(null);


    return (
        <section className="min-w-0 flex-1">
            {!travelData && <AddTravel setTravelData={setTravelData} />}
            {travelData && <section className="flex h-full items-center">
                 <ShowTravel travelData={travelData} onEdit={() => setTravelData(null)} />
            </section>
            }
        </section>
    );
};

export default Travel;
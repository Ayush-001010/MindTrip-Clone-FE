import React, { useEffect } from "react";
import type IItineraryTravel from "./IItineraryTravel";
import useCommonAction from "../../../../../CustomHooks/useCommonAction";

const ItineraryTravel: React.FC<IItineraryTravel> = () => {
    const {getImages} = useCommonAction();
    const [image, setImage] = React.useState<string | null>(null);

    useEffect(() => {
        getImages("Common/travel.png").then((res) => {
            setImage(res?.data || "");
        })
    }, []);
    return (
        <section>

        </section>
    )
};

export default ItineraryTravel;
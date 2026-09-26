import type { IBlogTravel } from "../../../../../../../Interface/DataInterface/IBlogData";
import React from "react";

export default interface IAddTravel {
    setTravelData: React.Dispatch<React.SetStateAction<IBlogTravel | null>>;
}
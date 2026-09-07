import React from "react";
import type IBestTimeToVisit from "./IBestTimeToVisit";

const BestTimeToVisit: React.FC<IBestTimeToVisit> = ({ bestTimeToVisit }) => {
    return (
        <>
            <p className="flex items-start gap-2 flex-col m-0">
                <span className="font-semibold text-[#e9ecef] underline text-md">
                    Best Time To Visit:
                </span>
                <span className="font-medium text-[#ced4da] text-sm">
                    {bestTimeToVisit || "N/A"}
                </span>
            </p>
        </>
    )
};

export default BestTimeToVisit;
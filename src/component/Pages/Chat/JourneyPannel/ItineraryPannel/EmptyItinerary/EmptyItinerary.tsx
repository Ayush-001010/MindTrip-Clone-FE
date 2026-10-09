import React, { useState , useEffect } from "react";
import type IEmptyItinerary from "./IEmptyItinerary";
import TripNotCreated from "./TripNotCreated/TripNotCreated";
import TripIsCreated from "./TripIsCreated/TripIsCreated";
import { useLocation } from "react-router-dom";


const EmptyItinerary: React.FC<IEmptyItinerary> = () => {
    const [mode , setMode] = useState<"trip-not-created" | "trip-is-created">("trip-not-created");
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        if (path === "/chat") {
            setMode("trip-not-created");
        } else {
            setMode("trip-is-created");
        }
    }, []);
    return (
        <>
            {mode === "trip-not-created" && (
                <TripNotCreated />
            )}
            {mode === "trip-is-created" && (
                <TripIsCreated />
            )}
        </>
    );
};

export default EmptyItinerary;

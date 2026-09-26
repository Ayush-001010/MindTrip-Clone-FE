import React, { useState, useEffect, createContext, useContext } from "react";
import CommonConfig from "../../../../config/CommonConfig";
import Body from "./Body/Body";
import type IBlog from "./IBlog";
import type IBlogData from "../../../../Interface/DataInterface/IBlogData";
import Header from "./Header/Header";
import PageWheel from "./PageWheel/PageWheel";
import SpeedDial from "./SpeedDial/SpeedDial";
import type { IBlogActivite } from "../../../../Interface/DataInterface/IBlogData";
import type { IMapMarkerPoint } from "../../../Common/Map/IMap";

export interface IBlogContext {
    mode: "create" | "preview";
    blogValue: IBlogData;
    itemAddToActivity: (activity: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes") => void;
    itemToAdd: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null;
    saveChangeToBlog: (fieldName: string, value: any, indexNumber?: number , subFieldName?: string) => void;
    selectedDay: number;
    mapMarkerPoints: IMapMarkerPoint[];
    selectedLongitude: number;
    selectedLatitude: number;
}

const blogContext = createContext<IBlogContext | null>(null);

export const useGetBlogContext = () => {
    const context = useContext(blogContext);
    if (!context) {
        throw new Error("useGetBlogContext must be used within a BlogContextProvider");
    }
    return context;
};

const Blog: React.FC<IBlog> = () => {
    const [mode, setMode] = useState<"create" | "preview">("preview");
    const [blogValue, setBlogValue] = useState<IBlogData | null>(null);
    const [itemToAdd, setItemToAdd] = useState<"Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [mapMarkerPoints , setMapMarkerPoints] = useState<IMapMarkerPoint[]>([]);
    const [selectedLongitude, setSelectedLongitude] = useState<number>(0);
    const [selectedLatitude, setSelectedLatitude] = useState<number>(0);

    const itemAddToActivity = (activity: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes") => {
        if (activity === "Activity") {
            addBlogActivityItem();
        } else {
            setItemToAdd(activity);
        }
    }

    const addBlogActivityItem = () => {
        setBlogValue((prev: IBlogData | null) => {
            if (!prev) return prev;
            return {
                ...prev,
                activities: [...prev.activities, CommonConfig.initialActivityValue]
            } as IBlogData;
        });
    }

    const addMapMarkerPoint = (longitude: number, latitude: number) => {
        if(longitude === 0 || latitude === 0) return;
        console.log("Adding map marker point:", { longitude, latitude });
        setMapMarkerPoints((prev: IMapMarkerPoint[]) => [
            ...prev,
            { longitude, latitude }
        ]);
        setSelectedLongitude(longitude);
        setSelectedLatitude(latitude);
    }

    const saveChangeToBlog = (fieldName: string, value: any, indexNumber?: number, subFieldName?: string) => {
        if (fieldName === "activities") {
            if (typeof indexNumber === "number" && subFieldName) {
                setBlogValue((prev: IBlogData | null) => {
                    if (!prev) return prev;
                    const updatedActivities = [...prev.activities] as IBlogActivite[];
                    if(subFieldName === "longitude" || subFieldName === "latitude" ) {
                        value = parseFloat(value);
                        updatedActivities[indexNumber] = {
                            ...updatedActivities[indexNumber],
                            "coordinates":{
                                ...updatedActivities[indexNumber].coordinates,
                                [subFieldName]: value
                            }
                        };
                        if(subFieldName === "longitude") {
                            addMapMarkerPoint(value, updatedActivities[indexNumber].coordinates.latitude);
                        } else {
                            addMapMarkerPoint(updatedActivities[indexNumber].coordinates.longitude, value);
                        }
                    } else {
                    updatedActivities[indexNumber] = {
                        ...updatedActivities[indexNumber],
                        [subFieldName]: value
                    };
                    }
                    return {
                        ...prev,
                        activities: updatedActivities
                    } as IBlogData;
                });
                return;
            }
        } else {
            console.log(fieldName, value);
            setBlogValue((prev: IBlogData | null) => {
                if (!prev) return prev;
                return {
                    ...prev,
                    [fieldName]: value
                } as IBlogData;
            });
        }
    }

    const changeSelectedDay = (newDay: number) => {
        setSelectedDay(newDay);
    }

    useEffect(() => {
        const url = location.href;
        if (url.includes("/#/blog/create")) {
            setMode("create");
            setBlogValue(CommonConfig.initialBlogValue);
        }
    }, []);

    return (
        <blogContext.Provider value={{ mode, blogValue: blogValue!, itemAddToActivity, itemToAdd, saveChangeToBlog, selectedDay , mapMarkerPoints , selectedLongitude, selectedLatitude }}>
            <Header selectedDay={selectedDay} />
            <Body />
            <section className="static">
                <PageWheel changeSelectedDay={changeSelectedDay} />
            </section>
            <SpeedDial />
        </blogContext.Provider>
    );
};

export default Blog;
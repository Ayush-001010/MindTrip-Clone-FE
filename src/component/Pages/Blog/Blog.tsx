import React, { useState, useEffect, createContext, useContext } from "react";
import { useParams } from "react-router-dom";
import useBlogAction from "../../../customHooks/useBlogAction";
import useCommonAction from "../../../customHooks/useCommonAction";
import CommonConfig from "../../../config/CommonConfig";
import Body from "./Body/Body";
import type IBlog from "./IBlog";
import type IBlogData from "../../../Interface/DataInterface/IBlogData";
import Header from "./Header/Header";
import PageWheel from "./PageWheel/PageWheel";
import SpeedDial from "./SpeedDial/SpeedDial";
import type { IBlogActivite, IBlogHotel, IBlogTravel } from "../../../Interface/DataInterface/IBlogData";
import type { IMapMarkerPoint } from "../../Common/Map/IMap";

export interface IBlogContext {
    mode: "create" | "preview";
    blogValue: IBlogData;
    itemAddToActivity: (activity: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null) => void;
    itemToAdd: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null;
    saveChangeToBlog: (fieldName: string, value: any, indexNumber?: number, subFieldName?: string) => void;
    selectedDay: number;
    mapMarkerPoints: IMapMarkerPoint[];
    selectedLongitude: number;
    selectedLatitude: number;
    addingHotel: (hotelData: IBlogHotel) => void;
    addTravel: (travelData: IBlogTravel) => void;
    currentEditActivityIndex: number | null;
    setCurrentEditActivityIndex: (index: number | null) => void;
    setMode: (mode: "create" | "preview") => void;
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
    const { blogId } = useParams();
    const { fetchBlogById } = useBlogAction();
    const { getImages } = useCommonAction();
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [mode, setMode] = useState<"create" | "preview">("preview");
    const [blogValue, setBlogValue] = useState<IBlogData | null>(null);
    const [itemToAdd, setItemToAdd] = useState<"Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(1);
    const [mapMarkerPoints, setMapMarkerPoints] = useState<IMapMarkerPoint[]>([]);
    const [selectedLongitude, setSelectedLongitude] = useState<number>(0);
    const [selectedLatitude, setSelectedLatitude] = useState<number>(0);
    const [currentEditActivityIndex, setCurrentEditActivityIndex] = useState<number | null>(0);

    const calculateTotalSpent = (
        activities: IBlogActivite[],
        hotels: IBlogHotel[],
        travel: IBlogTravel[]
    ) => {
        const activityTotal = activities.reduce((sum, activity) => sum + (activity.amountSpent ?? 0), 0);
        const hotelTotal = hotels.reduce((sum, hotel) => sum + (hotel.amountSpent ?? 0), 0);
        const travelTotal = travel.reduce((sum, travelItem) => sum + (travelItem.amountSpent ?? 0), 0);

        return activityTotal + hotelTotal + travelTotal;
    };

    const itemAddToActivity = (activity: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null) => {
        if (activity === "Activity") {
            changeBlogActivityItem();
        } else {
            setItemToAdd(activity);
        }
    }

    const addingHotel = (hotelData: IBlogHotel) => {
        setBlogValue((prev: IBlogData | null) => {
            if (!prev) return prev;
            const updatedHotel = [...(prev.hotel ?? []), hotelData];
            const totalSpent = calculateTotalSpent(prev.activities, updatedHotel, prev.travel ?? []);

            return {
                ...prev,
                hotel: updatedHotel,
                totalSpent,
            } as IBlogData;
        });
    }

    const addTravel = (travelData: IBlogTravel) => {
        setBlogValue((prev: IBlogData | null) => {
            if (!prev) return prev;
            const updatedTravel = [...(prev.travel ?? []), travelData];
            const totalSpent = calculateTotalSpent(prev.activities, prev.hotel ?? [], updatedTravel);

            return {
                ...prev,
                travel: updatedTravel,
                totalSpent,
            } as IBlogData;
        });
    }

    const changeBlogActivityItem = () => {
        setBlogValue((prev: IBlogData | null) => {
            if (!prev) return prev;
            const newActivity = CommonConfig.initialActivityValue;
            newActivity.day = selectedDay;
            newActivity.index = prev.activities.length+1;
            return {
                ...prev,
                activities: [...prev.activities, newActivity]
            } as IBlogData;
        });
    }

    const addMapMarkerPoint = (longitude: number, latitude: number) => {
        if (longitude === 0 || latitude === 0) return;
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
                    if (subFieldName === "longitude" || subFieldName === "latitude") {
                        value = parseFloat(value);
                        updatedActivities[indexNumber] = {
                            ...updatedActivities[indexNumber],
                            "coordinates": {
                                ...updatedActivities[indexNumber].coordinates,
                                [subFieldName]: value
                            }
                        };
                        if (subFieldName === "longitude") {
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
                    const totalSpent = calculateTotalSpent(updatedActivities, prev.hotel ?? [], prev.travel ?? []);

                    return {
                        ...prev,
                        activities: updatedActivities,
                        totalSpent,
                    } as IBlogData;
                });
                return;
            }
        } else if(fieldName === "itemOrder"){
            setBlogValue((prev: IBlogData | null) => {
                if (!prev) return prev;
                if(indexNumber === undefined || indexNumber === null) return prev;
                return {
                    ...prev,
                    activities: prev.activities.map((activity, index) =>
                        index === indexNumber ? { ...activity, itemOrder: value } : activity
                    )
                } as IBlogData;
            });
        } else {
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

    // saved blogs store S3 keys for images, so they must be resolved to viewable URLs first
    const resolveImageURLs = async (imageKeys: string[]) => {
        const responses = await Promise.all((imageKeys ?? []).map((key) =>
            /^https?:\/\//.test(key) ? Promise.resolve({ data: key }) : getImages(key)
        ));
        return responses.flatMap((response) => (typeof response?.data === "string" ? [response.data] : []));
    };

    // converts the saved blog into the shape the create-mode components already understand
    const prepareBlogForPreview = async (blog: IBlogData): Promise<IBlogData> => {
        const activitiesPerDay: Record<number, number> = {};
        const indexedActivities = (blog.activities ?? []).map((activity) => {
            activitiesPerDay[activity.day] = (activitiesPerDay[activity.day] ?? 0) + 1;
            return { ...activity, index: activitiesPerDay[activity.day] };
        });

        const activities = await Promise.all(indexedActivities.map(async (activity) => {
            const itemOrder: string[] = [];
            if (activity.description) itemOrder.push("Notes");
            if (activity.tips && activity.tips.length > 0) itemOrder.push("Tips");
            return {
                ...activity,
                tips: activity.tips ?? [],
                sideActivities: activity.sideActivities ?? [],
                images: await resolveImageURLs(activity.images),
                itemOrder,
            } as IBlogActivite;
        }));

        return {
            ...blog,
            activities,
            hotel: blog.hotel ?? [],
            travel: blog.travel ?? [],
        };
    };

    useEffect(() => {
        if (!blogId) return;
        let cancelled = false;

        const loadBlog = async () => {
            setMode("preview");
            setFetchError(null);
            const response = await fetchBlogById(blogId);
            if (cancelled) return;
            if (!response.success || !response.data) {
                setFetchError("Unable to load this blog.");
                return;
            }
            const blog = await prepareBlogForPreview(response.data);
            if (cancelled) return;
            setMapMarkerPoints(
                blog.activities
                    .filter((activity) => activity.coordinates?.longitude && activity.coordinates?.latitude)
                    .map((activity) => ({
                        longitude: activity.coordinates.longitude,
                        latitude: activity.coordinates.latitude,
                    }))
            );
            setBlogValue(blog);
        };

        loadBlog();
        return () => {
            cancelled = true;
        };
    }, [blogId]);

    useEffect(() => {
        if (!blogId || !blogValue) return;
        const activityOfDay = blogValue.activities.find((activity) =>
            activity.day === selectedDay && activity.coordinates?.longitude && activity.coordinates?.latitude
        );
        if (activityOfDay) {
            setSelectedLongitude(activityOfDay.coordinates.longitude);
            setSelectedLatitude(activityOfDay.coordinates.latitude);
        }
    }, [blogId, blogValue, selectedDay]);

    useEffect(() => {
        const url = location.href;
        if (url.includes("/#/blog/create")) {
            setMode("create");
            setBlogValue(CommonConfig.initialBlogValue);
        }
    }, []);

    const addOrRemovingActivityItem = () => {
        setBlogValue((prev: IBlogData | null) => {
            if(!blogValue?.tripDuration) return prev;
            const isMoreThanCurrentDurationActivityPresent = prev ? prev.activities.some(activity => activity.day > blogValue?.tripDuration) : false;

            if (!prev) return prev;
            if (isMoreThanCurrentDurationActivityPresent) {
                // more those activities exist that are beyond the current selected day
                return {
                    ...prev,
                    activities: prev.activities.filter(activity => activity.day <= blogValue?.tripDuration)
                } as IBlogData;
            } 
            else {
                // no activities exist beyond the current selected day, so we can add a new activity for the selected day
                const isCurrentDurationActivityPresent = prev.activities.some(activity => activity.day === blogValue?.tripDuration);
                if (!isCurrentDurationActivityPresent) {
                    let lastDay = -1;
                    blogValue?.activities.forEach(activity => {
                        if (activity.day > lastDay) {
                            lastDay = activity.day;
                        }
                    });
                    while (lastDay < blogValue?.tripDuration) {
                        lastDay++;
                        const newActivity: IBlogActivite = {
                            ...CommonConfig.initialActivityValue,
                            day: lastDay,
                            index : prev.activities.length+1,
                        };
                        prev.activities.push(newActivity);
                    }
                }
            }
            return prev;
        })
    }

    useEffect(() => {
        // a saved blog is read-only, its activities must never be padded or trimmed
        if (blogId) return;
        const timeOutObj = setTimeout(() => {
            addOrRemovingActivityItem();
        }, 500);
        return () => clearTimeout(timeOutObj);
    }, [blogValue?.tripDuration]);

    console.log("Blog value:", blogValue);

    if (fetchError) {
        return <p className="p-8 text-center text-[#ced4da]">{fetchError}</p>;
    }

    return (
        <blogContext.Provider value={{ mode, blogValue: blogValue!, itemAddToActivity, itemToAdd, saveChangeToBlog, selectedDay, mapMarkerPoints, selectedLongitude, selectedLatitude, addingHotel, addTravel , currentEditActivityIndex, setCurrentEditActivityIndex , setMode }}>
            <Header selectedDay={selectedDay} />
            <Body />
            <section className="static">
                <PageWheel changeSelectedDay={changeSelectedDay} />
            </section>
            {mode === "create" && <SpeedDial />}
        </blogContext.Provider>
    );
};

export default Blog;
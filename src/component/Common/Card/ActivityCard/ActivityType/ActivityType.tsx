import React, { useState, useEffect } from "react";
import type IActivityType from "./IActivityType";
import { useGetActivityCardData } from "../ActivityCard";
import { useGetBlogContext } from "../../../../Pages/Blog/Blog";
import AddActivityType from "./AddActivityType/AddActivityType";
import ShowActivityType from "./ShowActivityType/ShowActivityType";

const ActivityType: React.FC<IActivityType> = ({ }) => {
    const { mode } = useGetBlogContext();
    const [activityType, setActivityType] = useState<string | null>(null);
    const { blogActivity } = useGetActivityCardData();

    useEffect(() => {
        if (blogActivity && blogActivity.activityType !== "") {
            setActivityType(blogActivity.activityType);
        }
    }, [blogActivity]);

    return (
        <section className="flex w-full flex-col">
            {mode === "create" && (
                <>
                    {!activityType && <AddActivityType setActivityType={setActivityType} />}
                    {activityType && <ShowActivityType activityType={activityType} />}
                </>
            )}
            {mode === "preview" && (
                <ShowActivityType activityType={activityType} />
            )}
        </section>
    );
};

export default ActivityType;
import React from "react";
import type IActivityType from "./IActivityType";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddActivityType from "./AddActivityType/AddActivityType";
import ShowActivityType from "./ShowActivityType/ShowActivityType";

const ActivityType: React.FC<IActivityType> = ({}) => {
    const {mode} = useGetBlogContext();

    return (
        <section className="flex w-full flex-col">
            {mode === "create" && (
                <AddActivityType />
            )}
            {mode === "preview" && (
                <ShowActivityType />
            )}
        </section>
    );
};

export default ActivityType;
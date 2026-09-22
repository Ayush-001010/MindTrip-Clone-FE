import React from "react";
import type IActivityDuration from "./IActivityDuration";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddActivityDuration from "./AddActivityDuration/AddActivityDuration";
import ShowActivityDuration from "./ShowActivityDuration/ShowActivityDuration";

const ActivityDuration: React.FC<IActivityDuration> = ({}) => {
    const {mode} = useGetBlogContext();

    return (
        <section className="flex w-full flex-col">
            {mode === "create" && (
                <>
                    <AddActivityDuration/>
                </>
            )}
            {mode === "preview" && (
                <>
                    <ShowActivityDuration/>
                </>
            )}
        </section>
    );
};

export default ActivityDuration;
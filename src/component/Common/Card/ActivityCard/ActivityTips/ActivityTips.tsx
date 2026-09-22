import React from "react";
import type IActivityTips from "./IActivityTips";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddTips from "./AddTips/AddTips";

const ActivityTips:React.FC<IActivityTips> = () => {
    const {mode} = useGetBlogContext();

    return (
        <section>
            {mode === "create" && (
                <AddTips />
            )}
        </section>
    );
};

export default ActivityTips;
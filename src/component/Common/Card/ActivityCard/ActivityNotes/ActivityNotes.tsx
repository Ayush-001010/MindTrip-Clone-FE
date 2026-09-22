import React from "react";
import type IActivityNotes from "./IActivityNotes";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddActivityNotes from "./AddActivityNotes/AddActivityNotes";

const ActivityNotes: React.FC<IActivityNotes> = () => {
    const {mode} = useGetBlogContext();

    console.log("mode:", mode);
    return (
        <div>
            {mode === "create" && (
                <AddActivityNotes  />
            )}
        </div>
    );
};

export default ActivityNotes;
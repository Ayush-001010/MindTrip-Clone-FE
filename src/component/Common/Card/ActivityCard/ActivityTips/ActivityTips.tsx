import React, { useState } from "react";
import type IActivityTips from "./IActivityTips";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddTips from "./AddTips/AddTips";
import ShowTips from "./ShowTips/ShowTips";

const ActivityTips:React.FC<IActivityTips> = () => {
    const {mode} = useGetBlogContext();
    const [tips, setTips] = useState<string[]>([]);
    const [isStopEditing, setIsStopEditing] = useState(false);

    return (
        <section>
            {mode === "create" && (
                <>
                {!isStopEditing && (
                    <AddTips setTips={setTips} setIsStopEditing={setIsStopEditing} />
                )}
                {isStopEditing && (
                    <ShowTips tips={tips} />
                )}
                </>
            )}
        </section>
    );
};

export default ActivityTips;
import React, { useState, useEffect } from "react";
import type IActivityTips from "./IActivityTips";
import { useGetBlogContext } from "../../../../Pages/Blog/Blog";
import AddTips from "./AddTips/AddTips";
import ShowTips from "./ShowTips/ShowTips";
import { useGetActivityCardData } from "../ActivityCard";

const ActivityTips: React.FC<IActivityTips> = () => {
    const { mode } = useGetBlogContext();
    const [tips, setTips] = useState<string[]>([]);
    const [isStopEditing, setIsStopEditing] = useState(false);
    const { blogActivity , indexNumber } = useGetActivityCardData();
    const { saveChangeToBlog   } = useGetBlogContext();

    useEffect(() => {
        if (blogActivity && blogActivity.tips.length > 0) {
            setTips(blogActivity.tips);
            setIsStopEditing(true);
        }
    }, [blogActivity]);

    

    useEffect(() => {
        if(isStopEditing && tips.length > 0) {
            saveChangeToBlog("activities", tips, indexNumber, "tips");
        }
    }, [isStopEditing]);


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
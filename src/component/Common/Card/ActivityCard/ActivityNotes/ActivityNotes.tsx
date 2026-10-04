import React, { useEffect, useState } from "react";
import type IActivityNotes from "./IActivityNotes";
import { useGetBlogContext } from "../../../../Pages/Blog/Blog";
import { useGetActivityCardData } from "../ActivityCard";
import AddActivityNotes from "./AddActivityNotes/AddActivityNotes";
import ShowActivityNotes from "./ShowActivityNotes/ShowActivityNotes";

const ActivityNotes: React.FC<IActivityNotes> = () => {
    const { mode } = useGetBlogContext();
    const [notes, setNotes] = useState<string>("");
    const [isStopEditing, setIsStopEditing] = useState<boolean>(false);
    const { blogActivity } = useGetActivityCardData();
    const { saveChangeToBlog } = useGetBlogContext();
    const { indexNumber } = useGetActivityCardData();

    useEffect(() => {
        console.log("blogActivity:", blogActivity);
        if (blogActivity && blogActivity.description.length > 0) {
            setNotes(blogActivity.description);
            setIsStopEditing(true);
        }
    }, [blogActivity]);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            if (isStopEditing) {
                saveChangeToBlog("activities", notes, indexNumber, "description");
            }
        }, 400);
        return () => clearTimeout(timeoutID);
    }, [isStopEditing]);

    console.log("mode:", mode);
    return (
        <div>
            {mode === "create" && (
                <>
                    {!isStopEditing && <AddActivityNotes setNotes={setNotes} setIsStopEditing={setIsStopEditing} />}
                    {isStopEditing && notes !== "" && <ShowActivityNotes notes={notes} />}
                </>
            )}
        </div>
    );
};

export default ActivityNotes;
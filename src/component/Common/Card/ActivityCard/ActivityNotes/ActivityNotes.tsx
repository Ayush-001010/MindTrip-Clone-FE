import React, { useState } from "react";
import type IActivityNotes from "./IActivityNotes";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddActivityNotes from "./AddActivityNotes/AddActivityNotes";
import ShowActivityNotes from "./ShowActivityNotes/ShowActivityNotes";

const ActivityNotes: React.FC<IActivityNotes> = () => {
    const { mode } = useGetBlogContext();
    const [notes, setNotes] = useState<string>("");
    const [isStopEditing, setIsStopEditing] = useState<boolean>(false);

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
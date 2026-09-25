import React, { useState } from "react";
import type IActivityDuration from "./IActivityDuration";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddActivityDuration from "./AddActivityDuration/AddActivityDuration";
import type moment from "moment";
import ShowActivityDuration from "./ShowActivityDuration/ShowActivityDuration";

const ActivityDuration: React.FC<IActivityDuration> = ({}) => {
    const {mode} = useGetBlogContext();
    const [value, setValue] = useState<[moment.Moment, moment.Moment] | null>(null);

    return (
        <section className="flex w-full flex-col">
            {mode === "create" && (
                <>
                    {(!value || value.length !== 2 || !value[0] || !value[1]) && <AddActivityDuration setValue={setValue}/>}
                    {(value && value.length === 2 && value[0] && value[1]) && <ShowActivityDuration value={value}/>}
                </>
            )}
            {mode === "preview" && (
                <>
                    <ShowActivityDuration value={value}/>
                </>
            )}
        </section>
    );
};

export default ActivityDuration;
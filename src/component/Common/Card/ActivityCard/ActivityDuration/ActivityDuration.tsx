import React, { useEffect, useState } from "react";
import type IActivityDuration from "./IActivityDuration";
import { useGetBlogContext } from "../../../../Pages/Blog/Blog";
import AddActivityDuration from "./AddActivityDuration/AddActivityDuration";
import moment from "moment";
import ShowActivityDuration from "./ShowActivityDuration/ShowActivityDuration";
import { useGetActivityCardData } from "../ActivityCard";

const ActivityDuration: React.FC<IActivityDuration> = ({}) => {
    const {mode} = useGetBlogContext();
    const [value, setValue] = useState<[moment.Moment, moment.Moment] | null>(null);
    const { blogActivity } = useGetActivityCardData();

    useEffect(() => {
        if (blogActivity && blogActivity.time) {
            const [start, end] = blogActivity.time.split(" - ");
            setValue([moment(start, "HH:mm"), moment(end, "HH:mm")]);
        } else {
            setValue(null);
        }
    }, [blogActivity]);

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
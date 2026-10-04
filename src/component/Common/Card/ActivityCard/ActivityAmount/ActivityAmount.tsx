import React, { useState, useEffect } from "react";
import { useGetActivityCardData } from "../ActivityCard";
import type IActivityAmount from "./IActivityAmount";
import { useGetBlogContext } from "../../../../Pages/Blog/Blog";
import AddActivityAmount from "./AddActivityAmount/AddActivityAmount";
import ShowActivityAmount from "./ShowActivityAmount/ShowActivityAmount";

const ActivityAmount: React.FC<IActivityAmount> = () => {
    const {mode} = useGetBlogContext();
    const [activityAmount, setActivityAmount] = useState<number | null>(null);
    const { blogActivity } = useGetActivityCardData();

    useEffect(() => {
        if (blogActivity && blogActivity.amountSpent !== 0) {
            setActivityAmount(blogActivity.amountSpent);
        }
    }, [blogActivity]);

    return (
        <div>
            { (mode === "create" && activityAmount === null) && (
                <AddActivityAmount setActivityAmount={setActivityAmount} />
            )}
            { ( mode === "preview" || activityAmount !== null) && (
                <ShowActivityAmount amount={activityAmount ?? 0} />
            )}
        </div>
    );
};

export default ActivityAmount;
import React, { useState } from "react";
import type IActivityAmount from "./IActivityAmount";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import AddActivityAmount from "./AddActivityAmount/AddActivityAmount";
import ShowActivityAmount from "./ShowActivityAmount/ShowActivityAmount";

const ActivityAmount: React.FC<IActivityAmount> = () => {
    const {mode} = useGetBlogContext();
    const [activityAmount, setActivityAmount] = useState<number | null>(null);

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
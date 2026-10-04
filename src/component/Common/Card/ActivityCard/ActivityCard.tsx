import type React from "react";
import { createContext, useContext } from "react";
import type IActivityCard from "./IActivityCard";
import type { ReactNode } from "react";
import ActivityImage from "./ActivityImage/ActivityImage";
import ActivityPlaceName from "./ActivityPlaceName/ActivityPlaceName";
import ActivityDuration from "./ActivityDuration/ActivityDuration";
import ActivityType from "./ActivityType/ActivityType";
import ActivityNotes from "./ActivityNotes/ActivityNotes";
import ActivityTips from "./ActivityTips/ActivityTips";
import ActivityRectangleImage from "./ActivityRectangleImage/ActivityRectangleImage";
import ActivityAmount from "./ActivityAmount/ActivityAmount";
import type { IBlogActivite } from "../../../../Interface/DataInterface/IBlogData";
import { useGetBlogContext } from "../../../Pages/Blog/Blog";

interface ActivityCardProps extends React.FC<IActivityCard & { children: ReactNode }> {
    ActivityImage: typeof ActivityImage;
    ActivityRectangleImage: typeof ActivityRectangleImage;
    ActivityPlaceName: typeof ActivityPlaceName;
    ActivityDuration: typeof ActivityDuration;
    ActivityType: typeof ActivityType;
    ActivityNotes: typeof ActivityNotes;
    ActivityTips: typeof ActivityTips;
    ActivityAmount: typeof ActivityAmount;
}

export interface IActivityCardData {
    indexNumber: number;
    blogActivity:IBlogActivite;
}

const ActivityCardDataContext = createContext<IActivityCardData | null>(null);

export const useGetActivityCardData = () => {
    const context = useContext(ActivityCardDataContext);
    if (!context) {
        throw new Error("useActivityCardData must be used within an ActivityCard");
    }
    return context;
};

const ActivityCard: ActivityCardProps = ({ children, indexNumber , itSubActivity , blogActivity }) => {
    const { mode  , currentEditActivityIndex , setCurrentEditActivityIndex } = useGetBlogContext();
    return (
        <ActivityCardDataContext.Provider value={{ indexNumber , blogActivity }}>
            <section>
                { (mode === "create" && !itSubActivity) && (
                    <button className={"bg-[#333533] my-2 p-2 rounded-xl text-xs font-semibold cursor-pointer " + (currentEditActivityIndex === indexNumber ? "text-[#a1c181]" : "text-[#bf0603]")}
                        onClick={() => setCurrentEditActivityIndex(indexNumber)}>
                        {currentEditActivityIndex === indexNumber ? "Active" : "In-Active"}
                    </button>
                )
                }
                {children}
            </section>
        </ActivityCardDataContext.Provider>
    );
};

ActivityCard.ActivityImage = ActivityImage;
ActivityCard.ActivityRectangleImage = ActivityRectangleImage;
ActivityCard.ActivityPlaceName = ActivityPlaceName;
ActivityCard.ActivityDuration = ActivityDuration;
ActivityCard.ActivityType = ActivityType;
ActivityCard.ActivityNotes = ActivityNotes;
ActivityCard.ActivityTips = ActivityTips;
ActivityCard.ActivityAmount = ActivityAmount;

export default ActivityCard;
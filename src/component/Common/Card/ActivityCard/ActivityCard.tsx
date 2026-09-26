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

interface ActivityCardProps extends React.FC<IActivityCard & {children: ReactNode}> {
    ActivityImage: typeof ActivityImage;
    ActivityRectangleImage: typeof ActivityRectangleImage;
    ActivityPlaceName : typeof ActivityPlaceName;
    ActivityDuration: typeof ActivityDuration;
    ActivityType : typeof ActivityType;
    ActivityNotes: typeof ActivityNotes;
    ActivityTips: typeof ActivityTips;
    ActivityAmount : typeof ActivityAmount;
}

export interface IActivityCardData {
    indexNumber: number;
}

const ActivityCardDataContext = createContext<IActivityCardData | null>(null);

export const useGetActivityCardData = () => {
    const context = useContext(ActivityCardDataContext);
    if (!context) {
        throw new Error("useActivityCardData must be used within an ActivityCard");
    }
    return context;
};

const ActivityCard: ActivityCardProps = ({ children , indexNumber }) => {
    return (
        <ActivityCardDataContext.Provider value={{ indexNumber }}>
            <div>
                {children}
            </div>
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
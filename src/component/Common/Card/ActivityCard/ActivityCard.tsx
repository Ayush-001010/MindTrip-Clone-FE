import type React from "react";
import type IActivityCard from "./IActivityCard";
import type { ReactNode } from "react";
import ActivityImage from "./ActivityImage/ActivityImage";
import ActivityPlaceName from "./ActivityPlaceName/ActivityPlaceName";
import ActivityDuration from "./ActivityDuration/ActivityDuration";
import ActivityType from "./ActivityType/ActivityType";
import ActivityNotes from "./ActivityNotes/ActivityNotes";
import ActivityTips from "./ActivityTips/ActivityTips";

interface ActivityCardProps extends React.FC<IActivityCard & {children: ReactNode}> {
    ActivityImage: typeof ActivityImage;
    ActivityPlaceName : typeof ActivityPlaceName;
    ActivityDuration: typeof ActivityDuration;
    ActivityType : typeof ActivityType;
    ActivityNotes: typeof ActivityNotes;
    ActivityTips: typeof ActivityTips;
}

const ActivityCard: ActivityCardProps = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

ActivityCard.ActivityImage = ActivityImage;
ActivityCard.ActivityPlaceName = ActivityPlaceName;
ActivityCard.ActivityDuration = ActivityDuration;
ActivityCard.ActivityType = ActivityType;
ActivityCard.ActivityNotes = ActivityNotes;
ActivityCard.ActivityTips = ActivityTips;

export default ActivityCard;
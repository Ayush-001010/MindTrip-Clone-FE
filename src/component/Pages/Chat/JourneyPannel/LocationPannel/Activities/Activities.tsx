import React, { useEffect, useState } from "react";
import type IActivities from "./IActivities";
import useCommonActivities from "../../../../../../customHooks/useCommonActivities";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegLightbulb } from "react-icons/fa";
import { Tooltip } from "antd";
import ShowInfoModel from "../../../../../Common/Model/ShowInfoModel/ShowInfoModel";
import type { IActivity } from "../../../../../../Interface/DataInterface/ITripAPIResponse";
import { useChatContext } from "../../../Chat";

const Activities: React.FC<IActivities> = ({ activities }) => {
    const { setIsSelectedLocation , setLocationLatitude , setLocationLongitude } = useChatContext();
    const { getActivitiesImage } = useCommonActivities();
    const [activity, setActivity] = useState<Array<IActivity>>([]);
    const [openShowInfoModel, setOpenShowInfoModel] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [selectActivityDetails, setSelectActivityDetails] = useState<string | null>(null);

    const fetchActivityImages = async () => {
        if (!activities || activities.length === 0) {
            setActivity([]);
            return;
        }

        try {
            const results = await Promise.all(
                activities.map(async (act) => {
                    const imageUrl = await getActivitiesImage(act.activityName);
                    return { activityName: act.activityName, imageUrl , description : act.description , placeName : act.placeName , latitude : act.latitude , longitude : act.longitude};
                })
            );
            setActivity(results);
        } catch (err) {
            console.error("Failed to fetch activity images", err);
            setActivity([]);
        }
    };
    const handleActivityClick = (activityItem: IActivity) => {
        if (activityItem.latitude && activityItem.longitude && setIsSelectedLocation && setLocationLatitude && setLocationLongitude) {
            setLocationLatitude(activityItem.latitude);
            setLocationLongitude(activityItem.longitude);
            setIsSelectedLocation(true);
        } else {
            console.warn("Activity does not have valid latitude and longitude:", activityItem);
        }
    }

    useEffect(() => {
        fetchActivityImages();
    }, [activities]);

    console.log("Activities state:", activity);
    return (
        <section>
            {activities.length > 0 && (
                <section>
                    <p className="font-semibold text-[#e9ecef] underline text-md">Activities</p>
                </section>
            )}
            <section className="flex flex-nowrap gap-4 mt-2 overflow-x-auto overflow-y-hidden pb-2">
                {activity.map((activityItem, index) => (
                    <div key={index}>
                        <div
                            key={`${activityItem.activityName}-${index}`}
                            className="relative h-40 w-60 flex-shrink-0 rounded-lg shadow-md overflow-hidden bg-gray-200"
                            aria-label={activityItem.activityName}
                            style={activityItem.imageUrl ? { backgroundImage: `url(${activityItem.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                        >
                            <div className="absolute top-0 left-0 right-0 p-2 bg-black/40 text-white text-sm">
                                <p className="flex items-center justify-between">
                                    <span>{activityItem.activityName}</span>
                                    <span className="text-black text-lg hover:text-gray-700 transition-colors cursor-pointer">
                                        <IoLocationOutline onClick={() => handleActivityClick(activityItem)} />
                                    </span>
                                </p>
                            </div>
                            <div>
                                <Tooltip title="Want to know more about this activity?">
                                    <p className="text-lg text-black absolute bottom-2 right-2 text-white hover:text-[#ffd60a] cursor-pointer transition-colors">
                                        <FaRegLightbulb onClick={() => { setOpenShowInfoModel(true); setSelectedActivity(activityItem.activityName); setSelectActivityDetails(activityItem.description); }} />
                                    </p>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            <ShowInfoModel open={openShowInfoModel} closeHandler={() => setOpenShowInfoModel(false)} title={selectedActivity ? selectedActivity : "Activity Information"} content={selectActivityDetails ? selectActivityDetails : "Detailed information about the selected activity will be displayed here."} />
        </section>
    )
}

export default Activities;
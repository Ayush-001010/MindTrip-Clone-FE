import React, { useEffect, useState } from "react";
import type IActivity from "./IActivity";
import ActivityCard from "../../../../Common/Card/ActivityCard/ActivityCard";
import { useGetBlogContext } from "../../Blog";

const Activity: React.FC<IActivity> = ({ indexNumber , blogActivity }) => {
    const { itemToAdd , currentEditActivityIndex , selectedDay ,itemAddToActivity , saveChangeToBlog } = useGetBlogContext();
    const [addItems, setAddItems] = useState<Array<"Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes">>([]);

    useEffect(() => {
        // console.log("itemToAdd changed:", itemToAdd);
        if (itemToAdd && indexNumber === currentEditActivityIndex && selectedDay === blogActivity.day){
            setAddItems((prev) => [...prev, itemToAdd as ("Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes")]);
            itemAddToActivity(null);
            saveChangeToBlog("itemOrder" , [...addItems, itemToAdd as ("Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes")] , indexNumber);
        }
    }, [itemToAdd]);

    useEffect(() => {
        let notMatch = false;
        blogActivity.itemOrder.forEach((item) => {
            let flag = false;
            addItems.forEach((addItem) => {
                if (addItem === item) {
                    flag = true;
                }
            });
            if (!flag) {
                notMatch = true;
            }
        });
        if (notMatch) {
            setAddItems(blogActivity.itemOrder as Array<"Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes">);
        }
    }, [blogActivity]);

    return (
        <section className="w-full">
            <ActivityCard indexNumber={indexNumber} blogActivity={blogActivity} itSubActivity={false}>
                <section className="flex w-full items-start gap-4">
                    <ActivityCard.ActivityImage />
                    <section className="flex min-w-0 flex-1 flex-col gap-2 p-2">
                        <ActivityCard.ActivityPlaceName />
                        <ActivityCard.ActivityDuration />
                        <ActivityCard.ActivityType />
                        <ActivityCard.ActivityAmount />
                    </section>
                </section>
                {addItems.map((type, index) => {
                    switch (type) {
                        case "Notes":
                            return <ActivityCard.ActivityNotes key={index} />;
                        case "Tips":
                            return <ActivityCard.ActivityTips key={index} />;
                        case "Images":
                            return <ActivityCard.ActivityRectangleImage key={index} />;
                        case "Side-Activity":
                            return (
                                <section className="p-8">
                                    <ActivityCard key={index} indexNumber={indexNumber} blogActivity={blogActivity} itSubActivity={true}>
                                        <section className="flex w-full items-start gap-4">
                                            <ActivityCard.ActivityImage />
                                            <section className="flex min-w-0 flex-1 flex-col gap-2">
                                                <ActivityCard.ActivityPlaceName />
                                                <ActivityCard.ActivityDuration />
                                                <ActivityCard.ActivityType />
                                            </section>
                                        </section>
                                    </ActivityCard>
                                </section>
                            )
                        default: return null;
                    }
                })}
            </ActivityCard>
        </section>
    );
};

export default Activity;
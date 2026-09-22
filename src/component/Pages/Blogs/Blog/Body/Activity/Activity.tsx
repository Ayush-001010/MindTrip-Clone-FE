import React, { useEffect, useState } from "react";
import type IActivity from "./IActivity";
import ActivityCard from "../../../../../Common/Card/ActivityCard/ActivityCard";
import { useGetBlogContext } from "../../Blog";

const Activity: React.FC<IActivity> = () => {
    const { itemToAdd } = useGetBlogContext();
    const [addItems, setAddItems] = useState<Array<"Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes">>([]);

    useEffect(() => {
        console.log("itemToAdd changed:", itemToAdd);
        if (itemToAdd)
            setAddItems((prev) => [...prev, itemToAdd as ("Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes")]);
    }, [itemToAdd]);

    return (
        <section className="w-full">
            <ActivityCard>
                <section className="flex w-full items-start gap-4">
                    <ActivityCard.ActivityImage />
                    <section className="flex min-w-0 flex-1 flex-col gap-2">
                        <ActivityCard.ActivityPlaceName />
                        <ActivityCard.ActivityDuration />
                        <ActivityCard.ActivityType />
                    </section>
                </section>
                {addItems.map((type, index) => {
                    switch (type) {
                        case "Notes":
                            return <ActivityCard.ActivityNotes key={index} />;
                        case "Tips":
                            return <ActivityCard.ActivityTips key={index} />;
                        case "Images":
                            return <ActivityCard.ActivityImage key={index} />;
                        case "Side-Activity":
                            return (
                                <ActivityCard key={index}>
                                    <section className="flex w-full items-start gap-4">
                                        <ActivityCard.ActivityImage />
                                        <section className="flex min-w-0 flex-1 flex-col gap-2">
                                            <ActivityCard.ActivityPlaceName />
                                            <ActivityCard.ActivityDuration />
                                            <ActivityCard.ActivityType />
                                        </section>
                                    </section>
                                </ActivityCard>
                            )
                        default: return null;
                    }
                })}
            </ActivityCard>
        </section>
    );
};

export default Activity;
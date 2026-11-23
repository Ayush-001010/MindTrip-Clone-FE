import React, { useEffect, useState } from 'react';
import type IGroupHub from './IGroupHub';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useChatContext } from '../../../Chat';
import Post from './Post/Post';

const GroupHub: React.FC<IGroupHub> = () => {
    const [activeTab, setActiveTab] = useState<"Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance">("Announcement");
    const { groupHubPosts , createAction , finalItinerary , setNotificationConfig } = useChatContext();

    const clickActiveTabHandler = (tab: "Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance") => {
        if(tab === "Check ins" && (!finalItinerary || !finalItinerary.startDate || !finalItinerary.endDate || new Date() < new Date(finalItinerary.startDate)) ){
            setNotificationConfig({
                type: "error",
                message: "Trip not started yet.",
                open: true,
                duration: 3000,
                pos:"top-left"
            });
            return;
        }
        setActiveTab(tab);
    }

    useEffect(() => {
        if (createAction?.type === "poll") {
            setActiveTab("Poll");
        } else if(createAction?.type === "opinion") {
            setActiveTab("Opinion");
        }
    }, [createAction]);
    
    return (
        <section className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-[#6c757d]">
            <Header activeTab={activeTab} setActiveTab={clickActiveTabHandler} />
            {groupHubPosts.length === 0 && (
                <section className="flex flex-1 items-center justify-center overflow-y-auto px-4 pt-14 pb-2 text-center text-sm text-[#adb5bd]">
                    <p>No message yet.</p>
                </section>
            )}
            {groupHubPosts.length > 0 && (
                <Post posts={groupHubPosts} />
            )}
            <Footer setActiveTab={setActiveTab} activeTab={activeTab} />
        </section>
    );
}

export default GroupHub;
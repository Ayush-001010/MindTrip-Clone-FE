import React, { useState } from 'react';
import type IGroupHub from './IGroupHub';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { useChatContext } from '../../../Chat';
import Post from './Post/Post';

const GroupHub: React.FC<IGroupHub> = () => {
    const [activeTab, setActiveTab] = useState<"Poll" | "Announcement" | "Opinion" | "Check ins" | "Medical Assistance">("Announcement");
    const { groupHubPosts } = useChatContext();

    console.log(groupHubPosts);
    return (
        <section className="relative flex h-full w-full flex-col overflow-hidden rounded-lg border border-[#6c757d]">
            <Header activeTab={activeTab} setActiveTab={setActiveTab} />
            {groupHubPosts.length === 0 && (
                <section className="flex flex-1 items-center justify-center overflow-y-auto px-4 pt-14 pb-2 text-center text-sm text-[#adb5bd]">
                    <p>No message yet.</p>
                </section>
            )}
            {groupHubPosts.length > 0 && (
                <Post posts={groupHubPosts} />
            )}
            <Footer activeTab={activeTab} />
        </section>
    );
}

export default GroupHub;
import React, { useState } from 'react';
import type IAnnouncement from './IAnnouncement';
import SentBox from '../SentBox/SentBox';
import { useChatContext } from '../../../../../Chat';

const Announcement: React.FC<IAnnouncement> = () => {
    const [announcement, setAnnouncement] = useState("");
    const { sendNewMessage } = useChatContext();

    const submitHandler = () => {
        // Handle the announcement submission logic here
        console.log(announcement);
        if(sendNewMessage) {
            sendNewMessage("announcement",{
                content: announcement
            });
        }
        setAnnouncement("");
    };

    return (
        <section className="flex w-full items-center gap-3 p-2">
            <input
                type="text"
                placeholder="Type your announcement..."
                className="h-12 w-full rounded-[1.45rem] border border-slate-200/90 px-4 text-[0.98rem] text-[#fff] outline-none transition-all duration-200 placeholder:text-[#e9ecef]"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
            />
            <SentBox submitHandler={submitHandler}/>
        </section>
    );
};

export default Announcement;
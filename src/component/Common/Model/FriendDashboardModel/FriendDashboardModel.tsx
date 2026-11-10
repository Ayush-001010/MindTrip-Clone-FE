import React, { useState, useEffect } from "react";
import useCommonAction from "../../../../CustomHooks/useCommonAction";
import type IFriendDashboardModel from "./IFriendDashboardModel";
import { Modal } from "antd";
import SwitchContentBar from "./SwitchContentBar/SwitchContentBar";
import type IUserFriend from "../../../../Interface/DataInterface/IUserFriend";
import FriendsList from "../../List/FriendsList/FriendsList";
import type { IFriendDetails } from "../../../../Interface/DataInterface/IUserFriend";

const FriendDashboardModel: React.FC<IFriendDashboardModel> = ({ openModal, closeFunc }) => {
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<"Friends" | "Requests">("Friends");
    const [searchStr , setSearchStr] = useState<string>("");
    const [friendsData , setFriendsData] = useState<IUserFriend | null>(null);
    const { fetchFreindsDetails , searchUserProfile } = useCommonAction();
    const [isLoading , setIsLoading] = useState<boolean>(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchStr(e.target.value);
        setIsSearching(e.target.value.length > 0);
    };


    const handleTabChange = (tab: "Friends" | "Requests") => {
        setActiveTab(tab);
    };

    useEffect(() => {
        if(!isSearching || !friendsData) return;
        const timeObj = setTimeout(() => {
            if(!searchStr || searchStr.length === 0) return;
            setIsLoading(true);
            searchUserProfile(searchStr).then((result) => {
                setIsLoading(false);
                if(!result.success) return;
                setFriendsData({
                    ...friendsData,
                    searchData: result.data as IFriendDetails[]
                });
            });
        }, 300);
        return () => clearTimeout(timeObj);
    }, [searchStr]);

    useEffect(() => {
        if(!openModal) return;
        fetchFreindsDetails().then((result) => {
            console.log("Fetching friends details... ", result)
            if(!result.success) return;
            setFriendsData(result.data as IUserFriend);
        });
    }, [searchStr, activeTab , openModal]);


    return (
        <Modal open={openModal}
            onCancel={closeFunc}
            centered
            width={640}
            footer={null}
            title={null}
            rootClassName="transparent-modal"
            styles={{
                mask: {
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(8px)",
                },
                container: {
                    background: "transparent",
                    padding: 0,
                    boxShadow: "none",
                },
                body: {
                    padding: 0,
                    background: "transparent",
                },
                header: {
                    display: "none",
                },
                footer: {
                    display: "none",
                },
            }}>
            <main className="flex max-h-[80vh] flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl shadow-violet-950/30 ring-1 ring-white/5 sm:p-6">
                <header className="flex items-baseline justify-between pr-8">
                    <h2 className="text-lg font-semibold tracking-tight">Friends</h2>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Connect with travelers</p>
                </header>
                <section>
                    <input
                        type="text"
                        placeholder="Search friends..."
                        value={searchStr}
                        onChange={handleSearchChange}
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400/50"
                    />
                </section>
                {isSearching ? <section className="flex flex-col gap-2">
                    {isLoading ? <p className="py-6 text-center text-sm text-zinc-400">loading...</p> : <FriendsList type="search" friendsData={friendsData?.searchData || null} />}
                </section> : (
                    <section className="flex min-h-0 flex-1 flex-col gap-3">
                        <SwitchContentBar active={activeTab} changeHandler={handleTabChange} />
                        {activeTab === "Friends" ? <FriendsList friendsData={friendsData?.friendDetails || null} /> : <FriendsList friendsData={friendsData?.pendingFriendRequests || null} />}
                    </section>
                )}
            </main>
        </Modal>
    )
};

export default FriendDashboardModel;
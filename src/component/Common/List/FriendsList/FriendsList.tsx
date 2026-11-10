import React from "react";
import type IFriendsList from "./IFriendsList";
import FriendCard from "../../Card/FriendCard/FriendCard";

const FriendsList: React.FC<IFriendsList> = ({ friendsData , type }) => {
    return (
        <section className="flex min-h-0 flex-col gap-2 overflow-y-auto pr-1">
            {friendsData?.length ? friendsData.map((friend) => (
                <FriendCard isSearch={type === "search"} data={friend} key={friend.id.toString() + "-friend"} />
            )) : <p className="py-6 text-center text-sm text-zinc-500">Nothing here yet.</p>}
        </section>
    );
};

export default FriendsList;
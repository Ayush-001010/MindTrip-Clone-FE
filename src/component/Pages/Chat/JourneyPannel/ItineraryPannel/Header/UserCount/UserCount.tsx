import React from "react";
import type IUserCount from "./IUserCount";

const UserCount: React.FC<IUserCount> = ({ countUserOnTrip }) => {
    console.log(countUserOnTrip);
    return (
        <div>
            Users on Trip: {countUserOnTrip?.toString()}
        </div>
    );
};

export default UserCount;
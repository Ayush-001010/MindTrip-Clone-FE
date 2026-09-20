import React from "react";
import type IHeader from "./IHeader";
import Budget from "./Budget/Budget";
import When from "./When/When";
import UserCount from "./UserCount/UserCount";

const Header: React.FC<IHeader> = ({ title, startDate, endDate, countUserOnTrip, budget }) => {
    return (
        <header>
            <section>
                <h1 className="text-[#fff] font-semibold text-xl">{title}</h1>
            </section>
            <section className="flex mt-2">
                <When startDate={startDate} endDate={endDate} />
                <Budget budget={budget}/>
                <UserCount countUserOnTrip={countUserOnTrip}/>
            </section>
        </header>
    );
};

export default Header;
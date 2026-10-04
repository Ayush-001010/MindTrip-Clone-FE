import React from "react";
import type IDashboard from "./IDashboard";
import NewsHeadline from "../../../Common/Card/NewsHeadline/NewsHeadline";
import Header from "./Header/Header";

const Dashboard: React.FC<IDashboard> = () => {
    return (
        <section className="p-4">
            <NewsHeadline />
            <Header />
        </section>
    );
};

export default Dashboard;
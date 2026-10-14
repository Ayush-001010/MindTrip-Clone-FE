import React from "react";
import type IDashboard from "./IDashboard";
import LeftSection from "./LeftSection/LeftSection";
import RightSection from "./RightSection/RightSection";

const Dashboard: React.FC<IDashboard> = () => {
    return (
        <main className="flex min-h-screen w-full flex-col gap-10 p-6 md:p-12 lg:flex-row lg:items-start">
            <div className="lg:w-1/2">
                <LeftSection />
            </div>
            <div className="lg:w-1/2">
                <RightSection />
            </div>
        </main>
    );
};

export default Dashboard;
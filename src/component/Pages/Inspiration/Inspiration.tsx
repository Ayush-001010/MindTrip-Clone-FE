import React from "react";
import type IInspiration from "./IInspiration";
import Dashboard from "./Dashboard/Dashboard";

const Inspiration: React.FC<IInspiration> = () => {

    return (
        <div className="static">
            <Dashboard />
        </div>
    );
};

export default Inspiration;
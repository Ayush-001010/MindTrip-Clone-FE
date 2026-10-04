import React, { useState } from "react";
import type IInspiration from "./IInspiration";
import Dashboard from "./Dashboard/Dashboard";
import ContentToggle from "./ContentToggle/ContentToggle";
import Blogs from "./Blogs/Blogs";

const Inspiration: React.FC<IInspiration> = () => {
    const [contentType , setContentType] = useState<"home" | "blog" | "agent">("blog");

    return (
        <div className="static">
            {contentType === "home" && <Dashboard />}
            {contentType === "blog" && <Blogs />}
            <ContentToggle  setContentType={setContentType} />
        </div>
    );
};

export default Inspiration;
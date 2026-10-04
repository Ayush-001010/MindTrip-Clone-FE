import React from "react";
import type ILoader from "./ILoader";

const Loader: React.FC<ILoader> = ({ }) => {
    return (
        <div className="flex w-full h-full flex-col items-center justify-center gap-4 py-10">
            <span className="animate-pulse text-sm font-medium text-gray-300">
                Generating Blog for that day...
            </span>
        </div>
    );
};

export default Loader;
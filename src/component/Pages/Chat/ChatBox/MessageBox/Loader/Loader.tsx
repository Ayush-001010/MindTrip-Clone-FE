import React from "react";

const Loader: React.FC = () => {
    return (
        <div className="mt-4 flex w-full justify-end px-3">
            <div className="flex max-w-[88%] items-center gap-3 my-3">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-[#dee2e6] animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#dee2e6] animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-3 w-3 rounded-full bg-[#dee2e6] animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Loader;
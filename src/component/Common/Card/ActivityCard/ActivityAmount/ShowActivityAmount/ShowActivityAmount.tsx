import React from "react";
import type IShowActivityAmount from "./IShowActivityAmount";

const ShowActivityAmount: React.FC<IShowActivityAmount> = ({ amount }) => {

    return (
        <div>
            {/* Display activity amount here */}
            <p className="text-[#adb5bd] text-sm">
                Amount Spent: 
                <span className="font-semibold ml-1">{amount}</span>
            </p>
        </div>
    );
};

export default ShowActivityAmount;
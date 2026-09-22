import React, { useState } from "react";
import type IAddTips from "./IAddTips";

const AddTips: React.FC<IAddTips> = () => {
    const [noOfTips, setNoOfTips] = useState(1);

    return (
        <section>
            {Array.from({ length: noOfTips }).map((_, index) => (
                <input key={index} />
            ))}
            <p onClick={() => setNoOfTips(noOfTips + 1)}>Pluse</p>
        </section>
    );
};

export default AddTips;
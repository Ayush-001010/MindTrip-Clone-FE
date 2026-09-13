import React from "react";
import type ILabelUI from "./ILabelUI";

const LabelUI: React.FunctionComponent<ILabelUI> = ({
    children
}) => {
    return (
        <label className="text-base font-light">
            {children}
        </label>
    );
};

export default LabelUI;
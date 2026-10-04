import React from "react";
import type INewsHeadline from "./INewsHeadline";
import NotStartYet from "./NotStartYet/NotStartYet";

const NewsHeadline: React.FC<INewsHeadline> = () => {
    return (
        <section>
            <NotStartYet />
        </section>
    );
};

export default NewsHeadline;
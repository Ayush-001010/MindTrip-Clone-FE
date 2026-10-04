import React from "react";
import type IHeader from "./IHeader";
import TextBanner from "./TextBanner/TextBanner";

const Header: React.FC<IHeader> = () => {
    return(
        <section className="flex mt-4 ml-2">
            <TextBanner />
        </section>
    )
};

export default Header;
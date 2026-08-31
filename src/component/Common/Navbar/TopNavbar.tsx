import React from "react";
import type ITopNavBar from "./ITopNavBar";
import { WiStars } from "react-icons/wi";
import CommonConfig from "../../../config/CommonConfig";
import { Button } from "antd";

const TopNavbar: React.FC<ITopNavBar> = () => {

    return (
        <header className="flex flex-wrap py-2 px-2 items-center justify-between  bg-transparent">
            <div>
                <p className="m-0 flex items-center gap-2.5 text-lg font-semibold text-[#6E4E3A] sm:text-xl">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#F7E6D5] to-[#FAF2E9] text-[1.5rem] text-[#9B6B43]">
                        <WiStars />
                    </span>
                    {CommonConfig.companyName}
                </p>
            </div>
            <div>
                <Button type="text" className="font-medium! text-[#7B8F87]! hover:bg-gradient-to-br! hover:from-[#E7F1EC]! hover:to-[#F5F8F2]! hover:text-[#476A5B]! rounded-lg! ">
                    Sign Up/Sign In
                </Button>
            </div>
        </header>
    );
};

export default TopNavbar;
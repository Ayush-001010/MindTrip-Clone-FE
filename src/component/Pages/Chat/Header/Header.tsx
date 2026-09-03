import React from "react";
import type IHeader from "./IHeader";
import { Button } from "antd";

const Header: React.FC<IHeader> = () => {
    return (
        <header className="flex justify-between w-full p-2">
            <section className="w-1/2 flex justify-end">
                <div className="flex p-1 w-fit border rounded-xl border-[#6c757d]">
                    <p className="text-[#adb5bd] border-r border-[#6c757d] pl-1 pr-2 cursor-pointer hover:font-medium hover:text-[#ffffff] rounded-l-xl">Where</p>
                    <p className="text-[#adb5bd] border-r border-[#6c757d] pl-1 pr-2 cursor-pointer hover:font-medium hover:text-[#ffffff]">When</p>
                    <p className="text-[#adb5bd] border-r border-[#6c757d] pl-1 pr-2 cursor-pointer hover:font-medium hover:text-[#ffffff]">Who</p>
                    <p className="text-[#adb5bd] pl-1 pr-2 cursor-pointer hover:font-medium hover:text-[#ffffff] rounded-r-xl">Budget</p>
                </div>
            </section>

            <section>
                <Button className="bg-[#6c757d]! shadow-lg text-[#ffffff]! border-none! hover:bg-[#495057]">Create Trip</Button>
            </section>
        </header>
    )
};

export default Header;
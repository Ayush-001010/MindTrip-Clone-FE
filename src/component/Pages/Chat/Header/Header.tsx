import React from "react";
import type IHeader from "./IHeader";
import { Button } from "antd";

const Header: React.FC<IHeader> = () => {
    return (
        <header className="flex w-full items-center justify-between px-3 py-3">
            <section className="flex w-1/2 justify-end">
                <div className="flex w-fit rounded-xl p-2 border border-[#fff]">
                    <p className="cursor-pointer pr-2 border-r border-[#fff]">Where</p>
                    <p className="cursor-pointer pr-2 pl-2 border-r border-[#fff]">When</p>
                    <p className="cursor-pointer pr-2 pl-2 border-r border-[#fff]">Who</p>
                    <p className="cursor-pointer pl-2">Budget</p>
                </div>
            </section>

            <section>
                <Button className="border-none! shadow-lg! text-[#000]! font-semibold! hover:text-[#000]!">
                    Create Trip
                </Button>
            </section>
        </header>
    )
};

export default Header;
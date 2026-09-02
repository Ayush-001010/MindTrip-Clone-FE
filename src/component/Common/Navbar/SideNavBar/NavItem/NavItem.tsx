import React from "react";
import type INavItem from "./INavItem";
import { Link } from "react-router-dom";
import { IoSearch} from "react-icons/io5";
import { FaPlusSquare } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";

const NavItem: React.FC<INavItem> = ({ title, icon, link }) => {
    const fetchIcon = (icon: string) => {
        switch(icon) {
            case "create":
                return <FaPlusSquare />
            case "explore":
                return <IoSearch />
            case "chat":
                return <BsChat />;
            case "trip":
                return <MdOutlineTravelExplore />
            case "camera":
                return <IoCameraOutline />;
            default:
                return null;
        }
    }
    return (
        <div className="flex flex-col gap-2 my-4 hover:bg-[#495057] hover:rounded-xl p-2">
            <Link to={link}>
                <p className="flex gap-2 justify-start items-center text-[#f8f9fa]">
                    <span className="text-md font-thin">{fetchIcon(icon)}</span>
                    <span className="text-lg font-medium">{title}</span>
                </p>
            </Link>
        </div>
    );
};

export default NavItem;
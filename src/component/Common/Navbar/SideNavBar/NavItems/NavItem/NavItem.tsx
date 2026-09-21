import React from "react";
import type INavItem from "./INavItem";
import { BsChatFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiWorld } from "react-icons/bi";
import { FaPlusSquare } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { useSideNavBarContext } from "../../SideNavBar";
import { FaSearch } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";

const NavItem: React.FC<INavItem> = ({ title, icon, link }) => {
    const { isCollapsed } = useSideNavBarContext();
    const fetchIcon = (icon: string) => {
        switch(icon) {
            case "create":
                return <FaPlusSquare />
            case "explore":
                return <FaSearch />
            case "chat":
                return <BsChatFill />;
            case "trip":
                return <BiWorld />
            case "camera":
                return <IoCameraOutline />;
            case "blog":
                return <FaShareAlt />;
            default:
                return null;
        }
    }
    return (
        <div className="my-3 flex flex-col items-start gap-2 rounded-2xl p-2 transition w-full">
            <Link to={link} className="w-full">
                <p className={`w-full transition cursor-pointer  hover:bg-[#212529] text-[#fff] ${isCollapsed ? "p-3 flex justify-center items-center shadow-lg rounded-full font-bold " : "flex items-center justify-start gap-3  rounded-4xl p-3"}`}>
                    <span className="text-lg font-thin">{fetchIcon(icon)}</span>
                    { !isCollapsed && <span className="text-lg font-medium">{title}</span> }
                </p>
            </Link>
        </div>
    );
};

export default NavItem;
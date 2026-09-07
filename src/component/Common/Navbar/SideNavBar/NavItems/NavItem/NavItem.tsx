import React from "react";
import type INavItem from "./INavItem";
import { Link } from "react-router-dom";
import { IoSearch} from "react-icons/io5";
import { FaPlusSquare } from "react-icons/fa";
import { BsChat } from "react-icons/bs";
import { MdOutlineTravelExplore } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { useSideNavBarContext } from "../../SideNavBar";

const NavItem: React.FC<INavItem> = ({ title, icon, link }) => {
    const { isCollapsed } = useSideNavBarContext();
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
        <div className="my-3 flex flex-col items-start gap-2 rounded-2xl p-2 transition ">
            <Link to={link}>
                <p className={` transition cursor-pointer ${isCollapsed ? "bg-white p-2 text-[#000] shadow-lg rounded-full font-bold " : "flex items-center justify-start gap-3 text-white hover:bg-white hover:text-black rounded-2xl p-2"}`}>
                    <span className="text-md font-thin">{fetchIcon(icon)}</span>
                    { !isCollapsed && <span className="text-lg font-medium">{title}</span> }
                </p>
            </Link>
        </div>
    );
};

export default NavItem;
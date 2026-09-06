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
        <div className="my-3 flex flex-col gap-2 rounded-2xl p-2 transition hover:bg-sky-100/80 hover:shadow-[inset_0_0_0_1px_rgba(125,211,252,0.55)]">
            <Link to={link}>
                <p className="flex items-center justify-start gap-3 text-slate-800">
                    <span className="text-md font-thin text-white">{fetchIcon(icon)}</span>
                    <span className="text-lg font-medium text-white">{title}</span>
                </p>
            </Link>
        </div>
    );
};

export default NavItem;
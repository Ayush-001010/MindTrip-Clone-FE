import React, { useCallback, useState } from "react";
import Favorites from "./Favorites/Favorites";
import type INavItem from "./INavItem";
import { BsChatFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { useSideNavBarContext } from "../../SideNavBar";
import { FaSearch } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";

const NavItem: React.FC<INavItem> = ({ title, icon, link }) => {
    const { isCollapsed } = useSideNavBarContext();
    const [favoritesDrawerOpen, setFavoritesDrawerOpen] = useState(false);
    const location = useLocation();
    const path = useCallback(()=> location.pathname, [location.pathname]);

    const openFavoritesDrawer = () => {
        setFavoritesDrawerOpen(true);
    };

    const closeFavoritesDrawer = () => {
        setFavoritesDrawerOpen(false);
    };


    const fetchIcon = (icon: string) => {
        switch (icon) {
            case "create":
                return <FaPlusSquare />
            case "explore":
                return <FaSearch />
            case "chat":
                return <BsChatFill />;
            case "inspiration":
                return <LuInstagram />;
            case "favorites":
                return <MdFavoriteBorder />;
            default:
                return null;
        }
    }

    return (
        <div className="my-3 flex flex-col items-start gap-2 rounded-2xl p-2 transition w-full">
            {link && <Link to={link} className="w-full">
                <p className={`${path() === link ? "bg-[#212529]" : ""} w-full transition cursor-pointer  hover:bg-[#212529] text-[#fff] ${isCollapsed ? "p-3 flex justify-center items-center shadow-lg rounded-full font-bold " : "flex items-center justify-start gap-3  rounded-4xl p-3"}`}>
                    <span className="text-lg font-thin">{fetchIcon(icon)}</span>
                    {!isCollapsed && <span className="text-lg font-medium">{title}</span>}
                </p>
            </Link>}
            {(!link && title === "Favorites") && (
                <section className="w-full">
                    <p onClick={openFavoritesDrawer} className={`w-full transition cursor-pointer  hover:bg-[#212529] text-[#fff] ${isCollapsed ? "p-3 flex justify-center items-center shadow-lg rounded-full font-bold " : "flex items-center justify-start gap-3  rounded-4xl p-3"}`}>
                        <span className="text-lg font-thin">{fetchIcon(icon)}</span>
                        {!isCollapsed && <span className="text-lg font-medium">{title}</span>}
                    </p>

                    {favoritesDrawerOpen && <Favorites openDrawer={favoritesDrawerOpen} closeDrawer={closeFavoritesDrawer} />}
                </section>
            )}
        </div>
    );
};

export default NavItem;
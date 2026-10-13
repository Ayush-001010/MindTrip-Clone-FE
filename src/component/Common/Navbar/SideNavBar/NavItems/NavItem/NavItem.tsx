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

    const isActive = link ? path() === link : favoritesDrawerOpen;
    const itemClass = `group flex w-full cursor-pointer items-center rounded-xl py-3 text-[#C9BFB5] transition-colors duration-200 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-white/40 ${isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-4"} ${isActive ? "bg-white/10 font-semibold text-white ring-1 ring-inset ring-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.55),0_2px_4px_rgba(0,0,0,0.4)]" : ""}`;
    const content = (
        <>
            <span className="shrink-0 text-xl">{fetchIcon(icon)}</span>
            {!isCollapsed && <span className="truncate text-base font-medium">{title}</span>}
        </>
    );

    return (
        <div className="w-full">
            {link && (
                <Link to={link} className={itemClass} title={title} aria-label={title} aria-current={isActive ? "page" : undefined}>
                    {content}
                </Link>
            )}
            {(!link && title === "Favorites") && (
                <section className="w-full">
                    <button type="button" onClick={openFavoritesDrawer} className={itemClass} title={title} aria-label={title}>
                        {content}
                    </button>

                    {favoritesDrawerOpen && <Favorites openDrawer={favoritesDrawerOpen} closeDrawer={closeFavoritesDrawer} />}
                </section>
            )}
        </div>
    );
};

export default NavItem;
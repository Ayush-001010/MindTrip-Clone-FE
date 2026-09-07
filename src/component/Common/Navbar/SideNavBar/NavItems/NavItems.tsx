import React from "react";
import type INavItems from "./INavItems";
import NavItem from "./NavItem/NavItem";
import SideNavBarConfig from "../../../../../config/component/SideNavBarConfig";
import type SideNavItemInterface from "../../../../../Interface/ConfigInterface/SideNavBarInterface";

const NavItems: React.FC<INavItems> = () => {
    return <section className="mt-6 flex flex-col gap-2 p-2">
        {SideNavBarConfig.sideNavItems.map((item: SideNavItemInterface) => (
            <NavItem key={item.link || item.title} isCollapsed={false} title={item.title} icon={item.icon} link={item.link} />
        ))}
    </section>
};

export default NavItems;
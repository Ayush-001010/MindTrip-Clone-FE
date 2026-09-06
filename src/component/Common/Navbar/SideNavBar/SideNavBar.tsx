import React from "react";
import type ISideNavBar from "./ISideNavBar";
import type SideNavItemInterface from "../../../../Interface/ConfigInterface/SideNavBarInterface";
import SideNavBarConfig from "../../../../config/component/SideNavBarConfig";
import NavItem from "./NavItem/NavItem";
import Header from "./Header/Header";
import UserPannel from "./UserPannel/UserPannel";
import Footer from "./Footer/Footer";

const SideNavBar: React.FC<ISideNavBar> = () => {
    return (
        <div className="flex h-full flex-col justify-between border-r border-slate-200/70 bg-[#121113] p-4 shadow-[0_18px_40px_rgba(148,163,184,0.18)]">
            <div>
                {/* Title */}
                <Header />
                {/* Nav Items */}
                <div className="mt-6 flex flex-col gap-2 p-2">
                    {SideNavBarConfig.sideNavItems.map((item: SideNavItemInterface) => (
                        <NavItem key={item.link || item.title} isCollapsed={false} title={item.title} icon={item.icon} link={item.link} />
                    ))}
                </div>
            </div>
            <div>
                {/* User Pannel */}
                <UserPannel />
                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default SideNavBar;
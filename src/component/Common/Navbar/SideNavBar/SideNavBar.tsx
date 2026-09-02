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
        <div className="border-r border-[#6c757d] shadow-lg p-3 flex flex-col justify-between">
            <div>
                {/* Title */}
                <Header />
                {/* Nav Items */}
                <div className="flex flex-col gap-2 justify-between p-2">
                    {SideNavBarConfig.sideNavItems.map((item: SideNavItemInterface) => (
                        <NavItem isCollapsed={false} title={item.title} icon={item.icon} link={item.link} />
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
import React, { createContext, useContext, useState } from "react";
import type ISideNavBar from "./ISideNavBar";
import Header from "./Header/Header";
import UserPannel from "./UserPannel/UserPannel";
import Footer from "./Footer/Footer";
import NavItems from "./NavItems/NavItems";

export interface ISideNavBarContext {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

const SideNavBarContext = createContext<ISideNavBarContext | undefined>(undefined);

export const useSideNavBarContext = () => {
    const context = useContext(SideNavBarContext);
    if (!context) {
        throw new Error("useSideNavBarContext must be used within a SideNavBarProvider");
    }
    return context;
}

const SideNavBar: React.FC<ISideNavBar> = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    return (
        <SideNavBarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <div className={`flex h-screen shrink-0 flex-col justify-between overflow-hidden border-r border-white/10 bg-[#121113] p-3 transition-[width] duration-300 ease-out ${isCollapsed ? "w-[88px]" : "w-[240px]"}`}>
                <div className="w-full">
                    <Header />
                    <NavItems />
                </div>
                <div>
                    <UserPannel />
                    {!isCollapsed && <Footer />}
                </div>
            </div>
        </SideNavBarContext.Provider>
    );
};

export default SideNavBar;
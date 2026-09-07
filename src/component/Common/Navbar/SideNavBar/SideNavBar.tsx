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
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <SideNavBarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <div className={`transition-all transition-ease duration-300 h-screen ${isCollapsed ? "w-[100px]" : " w-[220px]"} flex h-full flex-col justify-between border-r border-slate-200/70 bg-[#121113] p-3 shadow-[0_18px_40px_rgba(148,163,184,0.18)]`}>
                <div>
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
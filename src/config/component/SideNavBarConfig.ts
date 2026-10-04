import type SideNavItemInterface from "../../Interface/ConfigInterface/SideNavBarInterface";

export default class SideNavBarConfig {
    public static readonly sideNavItems : SideNavItemInterface[] = [
        {
            title: "Chat",
            icon: "chat",
            link: "/chat"
        },
        {
            title: "Inspiration",
            icon: "inspiration",
            link: "/inspiration"
        },
        {
            title: "Explore",
            icon: "explore",
            link: "/explore"
        }
    ]
}
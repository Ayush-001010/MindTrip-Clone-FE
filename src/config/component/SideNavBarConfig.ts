import type SideNavItemInterface from "../../Interface/ConfigInterface/SideNavBarInterface";

export default class SideNavBarConfig {
    public static readonly sideNavItems : SideNavItemInterface[] = [
        {
            title: "Inspiration",
            icon: "inspiration",
            link: "/inspiration"
        },
        {
            title: "Chat",
            icon: "chat",
            link: "/chat"
        },
        {
            title: "Explore",
            icon: "explore",
            link: "/explore"
        },
        {
            title:"Favorites",
            icon: "favorites"
        }
    ]
}
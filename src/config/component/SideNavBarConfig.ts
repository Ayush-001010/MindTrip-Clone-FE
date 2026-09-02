import type SideNavItemInterface from "../../Interface/ConfigInterface/SideNavBarInterface";

export default class SideNavBarConfig {
    public static readonly sideNavItems : SideNavItemInterface[] = [
        {
            title: "Chat",
            icon: "chat",
            link: "/chat"
        },{
            title: "Trips",
            icon: "trip",
            link: "/trips"
        },
        {
            title: "Explore",
            icon: "explore",
            link: "/explore"
        },
        {
            title: "Share Trip",
            icon: "create",
            link: "/post-iti"
        }
    ]
}
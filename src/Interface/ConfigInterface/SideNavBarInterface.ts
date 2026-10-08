export default interface SideNavItemInterface {
    title : string;
    icon : "chat" | "explore" | "inspiration" | "favorites";
    link? : string;
}
export default interface SideNavItemInterface {
    title : string;
    icon : "chat" | "explore" | "inspiration" | "favorites" | "blog" | "profile";
    link? : string;
}
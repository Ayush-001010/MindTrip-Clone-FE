export default interface SideNavItemInterface {
    title : string;
    icon : "chat" | "explore" | "inspiration" | "favorites" | "blog" | "profile" | "custom-video-editor-icon";
    link? : string;
}
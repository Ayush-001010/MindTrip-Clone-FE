import type React from "react";

export default interface IProfileTitle {
    profileName: string;
    setProfileName: (name: string) => void;
    profileIcon: React.ReactNode;
    setProfileIcon: (icon: React.ReactNode) => void;
}
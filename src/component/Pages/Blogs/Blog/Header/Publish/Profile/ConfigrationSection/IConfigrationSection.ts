import type React from "react";

export default interface IConfigrationSection {
    profileName: string;
    setProfileName: (name: string) => void;
    profileIcon: React.ReactNode;
    setProfileIcon: (icon: React.ReactNode) => void;
    setImages: (files: File[]) => void;
}
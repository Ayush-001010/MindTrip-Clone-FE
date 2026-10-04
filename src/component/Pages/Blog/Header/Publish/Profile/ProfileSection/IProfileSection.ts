import type React from "react";

export default interface IProfileSection {
    images: File[];
    profileName: string;
    profileIcon: React.ReactNode;
}
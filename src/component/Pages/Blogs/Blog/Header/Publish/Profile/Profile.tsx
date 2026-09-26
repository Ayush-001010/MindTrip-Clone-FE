import React, { useState } from "react";
import type IProfile from "./IProfile";
import ProfileSection from "./ProfileSection/ProfileSection";
import ConfigrationSection from "./ConfigrationSection/ConfigrationSection";

const Profile: React.FC<IProfile> = ({}) => {
    const [images, setImages] = useState<File[]>([]);
    const [profileName, setProfileName] = useState("");
    const [profileIcon, setProfileIcon] = useState<React.ReactNode>(null);

    return (
        <section className="flex w-[600px] flex-col gap-4 rounded-xl border border-gray-800 bg-[#0b0d10] p-4">
            <div className="flex h-[350px] gap-4">
                <ProfileSection images={images} profileName={profileName} profileIcon={profileIcon} />
                <ConfigrationSection
                    profileName={profileName}
                    setProfileName={setProfileName}
                    profileIcon={profileIcon}
                    setProfileIcon={setProfileIcon}
                    setImages={setImages}
                />
            </div>
            <div className="flex justify-end border-t border-gray-800 pt-4">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                    Save
                </button>
            </div>
        </section>
    );
};

export default Profile;
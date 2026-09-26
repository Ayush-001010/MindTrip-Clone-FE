import React, { useState } from "react";
import type IProfileTitle from "./IProfileTitle";
import { CgProfile } from "react-icons/cg";
import { MdOutlineTravelExplore } from "react-icons/md";
import { PiMountainsDuotone } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import { RiEBike2Fill } from "react-icons/ri";
import { TbCarSuvFilled } from "react-icons/tb";
import { FaSnowflake } from "react-icons/fa";
import { Popover } from "antd";


const profileIconOptions = [
    <MdOutlineTravelExplore />,
    <PiMountainsDuotone />,
    <TbBeach />,
    <RiEBike2Fill />,
    <TbCarSuvFilled />,
    <FaSnowflake />,
];

const ProfilePopoverContent: React.FC<{ clickHandler: (icon: React.ReactNode) => void }> = ({ clickHandler }) => {
    return (
        <div className="grid grid-cols-3 gap-2 p-1">
            {profileIconOptions.map((icon, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => clickHandler(icon)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700 text-lg text-gray-300 transition hover:border-gray-500 hover:bg-[#212529] hover:text-white"
                >
                    {icon}
                </button>
            ))}
        </div>
    )
};

const ProfileTitle: React.FC<IProfileTitle> = ({ profileName, setProfileName, profileIcon, setProfileIcon }) => {
    const [openPopover, setOpenPopover] = useState(false);

    const clickIcon = (icon: React.ReactNode) => {
        setProfileIcon(icon);
        setOpenPopover(false);
    };
    return (
        <section className="flex w-full items-center gap-3">
            <Popover
                trigger="click"
                open={openPopover}
                onOpenChange={setOpenPopover}
                content={<ProfilePopoverContent clickHandler={clickIcon} />}
                classNames={{ root: "profile-icon-popover" }}
            >
                <button
                    type="button"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-700 bg-[#111418] text-xl text-gray-300 transition hover:border-gray-500 hover:text-white"
                >
                    {profileIcon || <CgProfile />}
                </button>
            </Popover>
            <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter profile title"
                className="w-full rounded-md border border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/60"
            />
        </section>
    );
};

export default ProfileTitle;
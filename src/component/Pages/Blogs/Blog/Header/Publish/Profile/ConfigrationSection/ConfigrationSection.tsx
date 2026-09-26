import React from "react";
import type IConfigrationSection from "./IConfigrationSection";
import { Collapse, type CollapseProps } from "antd";
import ProfileTitle from "./ProfileTitle/ProfileTitle";
import ProfileImages from "./ProfileImages/ProfileImages";

const ConfigrationSection: React.FC<IConfigrationSection> = ({ profileName, setProfileName, profileIcon, setProfileIcon, setImages }) => {

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-sm font-medium text-gray-200">Profile Title</p>,
            children: (
                <ProfileTitle
                    profileName={profileName}
                    setProfileName={setProfileName}
                    profileIcon={profileIcon}
                    setProfileIcon={setProfileIcon}
                />
            )
        },
        {
            key: '2',
            label: <p className="text-sm font-medium text-gray-200">Profile Images</p>,
            children: <ProfileImages setImages={setImages} />
        }
    ]
    return (
        <section className="h-full min-w-0 flex-1 overflow-y-auto pl-4">
            <Collapse
                items={items}
                bordered={false}
                className="!bg-transparent [&_.ant-collapse-item]:!mb-3 [&_.ant-collapse-item]:!overflow-hidden [&_.ant-collapse-item]:!rounded-lg [&_.ant-collapse-item]:!border [&_.ant-collapse-item]:!border-gray-700 [&_.ant-collapse-header]:!bg-[#111418] [&_.ant-collapse-header]:hover:!bg-[#151a1f] [&_.ant-collapse-content]:!border-gray-700 [&_.ant-collapse-content]:!bg-[#0d1013] [&_.ant-collapse-content-box]:!text-gray-300"
            />
        </section>
    );
};

export default ConfigrationSection;
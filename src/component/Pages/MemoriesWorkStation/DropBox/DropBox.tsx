import React, { useEffect, useState } from "react";
import type IDropBox from "./IDropBox";
import { ConfigProvider, Drawer, theme } from "antd";
import { useGetMemoriesWorkStationContext } from "../MemoriesWorkStation";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import DropInputBox from "./DropInputBox/DropInputBox";
import AudioBox from "./AudioBox/AudioBox";
import VisualBox from "./VisualBox/VisualBox";

const drawerTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: "#8b5cf6",
        colorBgContainer: "#09090b",
        colorBgElevated: "#09090b",
        colorBorder: "#27272a",
        colorText: "#f4f4f5",
        colorTextSecondary: "#a1a1aa",
    },
};

const DropBox: React.FC<IDropBox> = () => {
    const { openDropBox, dropBoxHandler } = useGetMemoriesWorkStationContext();
    const [uiType, setUiType] = useState<"music" | "photos">("music");
    const [visualFiles, setVisualFiles] = useState<File[]>([]);
    const [audioFiles, setAudioFiles] = useState<File[]>([]);
    const [taggedFiles, setTaggedFiles] = useState<{file : File[] , tag : string}[]>([]);

    useEffect(() => {
        setTaggedFiles((prev) => {
            const newTaggedFiles = visualFiles.map((file) => ({ file: [file], tag: "" }));
            return [...prev, ...newTaggedFiles];
        });
    },[visualFiles]);


    return (
        <ConfigProvider theme={drawerTheme}>
            <Drawer
                open={openDropBox}
                onClose={() => dropBoxHandler("close")}
                width="min(100vw, 440px)"
                classNames={{
                    header: "border-zinc-800",
                    body: "p-6",
                }}
            >
                <div className="space-y-6">
                    <div>
                        <p className="mb-1 text-sm font-medium text-zinc-100">Choose what to add</p>
                        <p className="text-xs text-zinc-400">Select a type, then choose a file from your device.</p>
                    </div>
                    <ToggleSwitch type={uiType} changeHandler={setUiType} />
                    <DropInputBox
                        key={uiType}
                        type={uiType}
                        files={uiType === "music" ? audioFiles : visualFiles}
                        setFile={uiType === "music" ? setAudioFiles : setVisualFiles}
                    />
                    {uiType === "music" && <AudioBox files={audioFiles} open={openDropBox} />}
                    {uiType === "photos" && <VisualBox files={taggedFiles} setFiles={setTaggedFiles} />}
                </div>
            </Drawer>
        </ConfigProvider>
    );
};

export default DropBox;
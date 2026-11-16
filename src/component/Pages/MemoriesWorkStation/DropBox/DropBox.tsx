import React, { useState } from "react";
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
    const { openDropBox, dropBoxHandler, addMedia , setNotifyConfig } = useGetMemoriesWorkStationContext();
    const [uiType, setUiType] = useState<"music" | "photos">("music");
    const [audioFiles, setAudioFiles] = useState<File[]>([]);
    const [taggedFiles, setTaggedFiles] = useState<{file : File[] , tag : string}[]>([]);
    const visualFiles = taggedFiles.flatMap(({ file }) => file);

    const addVisualFiles = (files: File[]) => {
        setTaggedFiles((prev) => [...prev, ...files.map((file) => ({ file: [file], tag: "" }))]);
    };
    const addMediaHandler = async () => {
        if(taggedFiles.length === 0 && audioFiles.length === 0) {
            setNotifyConfig({
                type: "error",
                message: "Please add at least one visual or audio file",
                open: true,
                pos: "top-left",
                duration: 2000
            });
            return;
        }
        if(taggedFiles.some(({ tag }) =>  tag.length === 0)) {
            setNotifyConfig({
                type: "error",
                message: "Please add a tag for all visual files",
                open: true,
                pos: "top-left",
                duration: 2000
            });
            return;
        }
        await addMedia(taggedFiles, audioFiles);
    };


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
                        setFile={uiType === "music" ? setAudioFiles : addVisualFiles}
                    />
                    {uiType === "music" && <AudioBox files={audioFiles} open={openDropBox} />}
                    {uiType === "photos" && <VisualBox files={taggedFiles} setFiles={setTaggedFiles} />}

                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-zinc-600 text-white rounded cursor-pointer" onClick={addMediaHandler}>
                            Add Media
                        </button>
                    </div>
                </div>
            </Drawer>
        </ConfigProvider>
    );
};

export default DropBox;
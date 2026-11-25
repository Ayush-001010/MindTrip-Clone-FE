import React, { useEffect } from "react";
import type IBlogAnimation from "./IBlogAnimation";
import { Audio } from "@remotion/media";
import "./BlogAnimation.css";
import { Sequence, AbsoluteFill } from "remotion";
import ChubbyWelcome from "./ChubbyWelcome/ChubbyWelcome";
import useCommonAction from "../../../../../CustomHooks/useCommonAction";
import CaseFile from "./CaseFile/CaseFile";
import DayScene from "./DayScene/DayScene";


const BlogAnimation: React.FC<IBlogAnimation> = ({ sence,isPlaying  }) => {
    const {getImages} = useCommonAction();
    const [audio, setAudio] = React.useState<string | null>(null);
    const [audioError, setAudioError] = React.useState(false);

    useEffect(() => {
        let cancelled = false;
        getImages("Common/geoffharvey-fat-cat-374614.mp3").then((res) => {
            if (cancelled) return;
            if (!res.success || !res.data) {
                console.error("Unable to load the blog animation soundtrack.");
                setAudioError(true);
                return;
            }
            setAudio(res.data);
        });
        return () => { cancelled = true; };
    },[getImages]);

    return (
        <AbsoluteFill className="flex items-center justify-center bg-black">
            {audio && <Audio src={audio} />}
            { sence.map((sceneItem) => (
                <Sequence from={sceneItem.from} durationInFrames={sceneItem.durationInFrames} key={sceneItem.from+"-Animation"}>
                   {sceneItem.type === "start" && <ChubbyWelcome isPlaying={isPlaying} />}
                   {sceneItem.type === "caseFile" && <CaseFile />}
                   {sceneItem.type === "day" && <DayScene content={sceneItem.content} durationInFrames={sceneItem.durationInFrames} />}
                </Sequence>
            ))}
            {audioError && <p role="alert" className="absolute right-[30px] bottom-[90px] z-50 bg-[#1b2032] px-[24px] py-[12px] font-mono text-[26px] text-[#fff3da]">Soundtrack unavailable. Please reload to retry.</p>}
        </AbsoluteFill>
    );
};

export default BlogAnimation;
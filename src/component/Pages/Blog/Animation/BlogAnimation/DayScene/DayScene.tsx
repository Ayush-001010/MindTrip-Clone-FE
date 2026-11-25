import React, { useEffect, useState } from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import Cat from "../../../../../Common/Cat/Cat";
import useCommonAction from "../../../../../../CustomHooks/useCommonAction";
import type { BlogDay, BlogDaySlide } from "../../blogTimeline";

const money = (amount: number) => `Rs. ${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const DayPhoto: React.FC<{ photo: BlogDaySlide["photo"] }> = ({ photo }) => {
    const { getImages } = useCommonAction();
    const [resolvedSource, setResolvedSource] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const source = typeof photo === "string" && /^(https?:|blob:|data:)/.test(photo)
        ? photo
        : resolvedSource;

    useEffect(() => {
        let cancelled = false;
        let reader: FileReader | undefined;
        if (photo instanceof File) {
            reader = new FileReader();
            reader.onload = () => {
                if (!cancelled && typeof reader?.result === "string") setResolvedSource(reader.result);
            };
            reader.onerror = () => {
                if (cancelled) return;
                console.error("Unable to read an uploaded blog animation photo.");
                setError(true);
            };
            reader.readAsDataURL(photo);
        } else if (photo && !/^(https?:|blob:|data:)/.test(photo)) {
            getImages(photo).then((response) => {
                if (cancelled) return;
                if (!response.success || !response.data) {
                    console.error("Unable to load a blog animation photo.");
                    setError(true);
                    return;
                }
                setResolvedSource(response.data);
            });
        }
        return () => {
            cancelled = true;
            if (reader?.readyState === FileReader.LOADING) reader.abort();
        };
    }, [photo, getImages]);

    if (error || !source) {
        return (
            <div className="flex h-full flex-col items-center justify-center gap-[28px] bg-[#ded3b6] px-[50px] text-center font-mono text-[34px] text-[#1b2032]/65" role={error ? "alert" : undefined}>
                <span aria-hidden="true" className="text-[110px] leading-none">[ + ]</span>
                <p>{error ? "Photo unavailable" : photo ? "Loading photo..." : "No photos added for this entry"}</p>
            </div>
        );
    }
    return (
        <Img
            src={source}
            alt="Travel photo from this day"
            className="h-full w-full object-contain"
            onError={() => {
                console.error("Unable to display a blog animation photo.");
                setError(true);
            }}
        />
    );
};

const DayScene: React.FC<{ content: BlogDay; durationInFrames: number }> = ({ content, durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const slides = content.slides;
    const slideCount = Math.max(1, slides.length);
    const slideIndex = Math.min(slideCount - 1, Math.floor(frame * slideCount / durationInFrames));
    const slide = slides[slideIndex];
    const slideStart = Math.ceil(slideIndex * durationInFrames / slideCount);
    const slideEnd = Math.ceil((slideIndex + 1) * durationInFrames / slideCount);
    const slideProgress = interpolate(frame, [slideStart, Math.max(slideStart + 1, slideEnd - 1)], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
    });
    const entrance = spring({ frame, fps, config: { damping: 18, stiffness: 120 } });
    const description = slide?.description ?? "No entries added for this day yet.";
    const paragraphs = description.match(/[\s\S]{1,220}(?:\s|$)|[\s\S]{1,220}/g) ?? [description];
    const paragraph = paragraphs[Math.min(paragraphs.length - 1, Math.floor(slideProgress * paragraphs.length))];

    return (
        <AbsoluteFill className="overflow-hidden bg-[#f0e7ce] p-[85px] text-[#1b2032]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(#9b85532b_1.5px,transparent_1.5px)] bg-size-[12px_12px]" />
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-[3px] bg-[#8b795b]/10 shadow-[8px_0_30px_#8b795b20]" />
            <header className="relative flex items-center justify-between border-b-[4px] border-[#1b2032] pb-[25px] font-mono text-[28px] font-bold tracking-[0.12em]">
                <span>CHUBBY'S FIELD NOTES</span>
                <span className="flex items-center gap-[16px]"><span className="h-[18px] w-[18px] rounded-full bg-[#ec6160]" /> DAILY EVIDENCE</span>
            </header>

            <div className="relative mt-[45px] grid min-h-0 flex-1 grid-cols-[1.5fr_1fr] grid-rows-[minmax(0,1fr)_auto] gap-x-[75px] gap-y-[45px]">
                <figure
                    className="relative min-h-0 -rotate-2 border-[5px] border-[#1b2032] bg-[#fff9e9] p-[22px] pb-[75px] shadow-[16px_18px_0_#1b2032]"
                    style={{ opacity: Math.min(1, entrance), transform: `translateY(${(1 - entrance) * 100}px) rotate(-2deg)` }}
                >
                    <div className="h-full overflow-hidden bg-[#ded3b6]">
                        <div className="h-full w-full" style={{ transform: `scale(${1 + slideProgress * 0.045})` }}>
                            <DayPhoto key={`${content.day}-${slideIndex}`} photo={slide?.photo} />
                        </div>
                    </div>
                    <figcaption className="absolute inset-x-[25px] bottom-[15px] flex justify-between font-mono text-[27px] font-bold uppercase">
                        <span>Day {String(content.day).padStart(2, "0")} / {slide?.photo ? "Photo diary" : "Field notes"}</span>
                        <span>{slides.length ? `${slideIndex + 1} / ${slides.length}` : "No entries"}</span>
                    </figcaption>
                    <span aria-hidden="true" className="absolute top-[-23px] left-[35%] h-[45px] w-[220px] rotate-3 border border-[#bca370]/30 bg-[#d5bc83]/60" />
                </figure>

                <aside className="relative row-span-2 min-w-0">
                    <p className="text-center font-mono text-[42px] font-bold tracking-[0.2em]">DAY</p>
                    <p
                        className="relative bg-[#ecb526] bg-[radial-gradient(#de8a3280_4px,transparent_4px)] bg-size-[20px_20px] bg-clip-text text-center font-luckiest-guy text-[470px] leading-none tracking-[-0.06em] text-transparent"
                        style={{ transform: `scale(${0.85 + entrance * 0.15})` }}
                    >
                        {String(content.day).padStart(2, "0")}
                    </p>
                    <div className="absolute inset-x-0 bottom-[310px] h-[120px]">
                        <Cat progress={entrance} />
                        <div className="relative z-10 h-[42px] border-[5px] border-[#1b2032] bg-[#3265cf] bg-[radial-gradient(#1b2032_3px,transparent_3px)] bg-size-[12px_12px] shadow-[0_12px_0_#1b203220]" />
                        <p className="relative z-30 mt-[25px] text-center font-luckiest-guy text-[38px] tracking-wide">Chubby was here!</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-[20px] -rotate-3 border-[5px] border-[#1b2032] bg-[#1b2032] px-[28px] py-[25px] text-[#fff3da] shadow-[10px_10px_0_#ec6160]">
                        <p className="font-mono text-[25px] tracking-[0.12em]">TOTAL SPENT TODAY</p>
                        <p className="mt-[10px] break-words font-luckiest-guy text-[62px] leading-tight text-[#f5c637]">{money(content.amountSpent)}</p>
                    </div>
                </aside>

                <section className="min-w-0 border-l-[12px] border-[#ec6160] pl-[28px]">
                    {(slide?.placeName || slide?.time) && (
                        <div className="mb-[22px] flex mt-10 items-start justify-between gap-[24px]">
                            {slide.placeName && (
                                <h2 className="min-w-0 flex-1 font-fraunces text-[44px] leading-tight font-bold wrap-anywhere">
                                    {slide.placeName}
                                </h2>
                            )}
                            {slide.time && (
                                <p className="ml-auto shrink-0 border-[2px] border-[#1b2032]/40 px-[14px] py-[8px] font-mono text-[28px] font-bold">
                                    {slide.time}
                                </p>
                            )}
                        </div>
                    )}
                    <div className="mb-[18px] flex items-center justify-between gap-[20px] font-mono text-[26px] font-bold uppercase">
                        <span className="bg-[#1b2032] px-[15px] py-[6px] text-[#fff3da]">The daily report</span>
                        <span>{money(slide?.amountSpent ?? 0)}</span>
                    </div>
                    <p className="min-h-[240px] whitespace-pre-wrap font-fraunces text-[42px] leading-[1.35] wrap-anywhere">{paragraph}</p>
                    {paragraphs.length > 1 && <p className="mt-[10px] font-mono text-[22px]">Notes {Math.min(paragraphs.length, Math.floor(slideProgress * paragraphs.length) + 1)} / {paragraphs.length}</p>}
                </section>
            </div>

            <footer className="relative mt-[40px] flex items-center gap-[25px] font-mono text-[24px] font-bold tracking-[0.1em]">
                <span>FILE / DAY {String(content.day).padStart(2, "0")}</span>
                <div className="h-[8px] flex-1 overflow-hidden bg-[#1b2032]/15">
                    <div className="h-full origin-left bg-[#1b2032]" style={{ transform: `scaleX(${Math.min(1, (frame + 1) / durationInFrames)})` }} />
                </div>
                <span>PHOTOS · NOTES · SPENDING</span>
            </footer>
        </AbsoluteFill>
    );
};

export default DayScene;

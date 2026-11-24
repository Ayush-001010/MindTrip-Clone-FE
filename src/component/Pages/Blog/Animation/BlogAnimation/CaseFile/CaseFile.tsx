import React from "react";
import type ICaseFile from "./ICaseFile";
import { useParams } from "react-router-dom";
import { useGetBlogContext } from "../../../Blog";

const CaseFile: React.FC<ICaseFile> = () => {
    const { blogId } = useParams();
    const {blogValue} = useGetBlogContext();
    const caseNumber = blogId?.padStart(2, "0");

    return (
        <section className="flex h-full w-full items-center justify-center overflow-hidden bg-[#b08968] p-[4%] text-[#29271f]">
            <article className="relative flex h-full w-[78%] max-w-[1250px] -rotate-1 flex-col border border-[#625438]/40 bg-[#e1d3a9] p-[3%] shadow-[18px_24px_0_#302b2340,0_35px_80px_#302b2350]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(#53452c55_1.5px,transparent_1.5px)] bg-size-[13px_13px]" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-[14px] border-[7px] border-dotted border-[#514831]/60" />

                <header className="relative border-b-[6px] border-[#29271f] pb-[18px]">
                    <div className="flex items-center justify-between font-mono text-[22px] font-bold tracking-[0.12em]">
                        <span>FILE {caseNumber} / ARCHIVE</span>
                        <span className="flex items-center gap-[12px]">
                            REC <span className="h-[15px] w-[15px] rounded-full bg-[#b43c28]" />
                        </span>
                    </div>
                    <div className="mt-[12px] flex items-end gap-[22px]">
                        <h1 className="flex-1 whitespace-nowrap font-fraunces text-[116px] leading-none font-black tracking-[-0.06em] text-shadow-[3px_4px_0_#6d8b72]">
                            CASE FILE
                        </h1>
                        <span className="pb-[12px] font-mono text-[25px] font-bold">No.</span>
                        <span className="max-w-[35%] truncate font-mono text-[155px] leading-[0.85] font-black tracking-[-0.09em] text-[#b43c28]">
                            {caseNumber}
                        </span>
                    </div>
                </header>

                <div className="relative mt-[25px] min-h-0 flex-1 overflow-hidden border-[5px] border-[#29271f] bg-[#c4c09c]/50">
                    <div aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0px,transparent_88px,#554c3b66_89px,#554c3b66_91px)]" />
                    <div aria-hidden="true" className="absolute inset-y-[30px] left-[20px] flex flex-col justify-between bg-[#d7cba7] px-[8px] font-mono text-[20px]">
                        {[180, 170, 160, 150, 140].map((height) => <span key={height}>{height}</span>)}
                    </div>

                    <svg aria-hidden="true" viewBox="0 0 600 560" className="absolute bottom-0 left-1/2 h-[95%] w-[85%] -translate-x-1/2 text-[#25251d]" fill="currentColor">
                        <path d="M92 560C94 451 152 406 225 389L225 354C173 329 149 288 153 232L150 83L247 153C278 144 322 144 353 153L450 83L447 232C451 288 427 329 375 354L375 389C448 406 506 451 508 560Z" />
                    </svg>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ded2ae_2px,transparent_2.8px)] bg-size-[10px_10px]" />
                    <span className="absolute right-[35px] bottom-[110px] -rotate-12 rounded-[12px] border-[9px] border-double border-[#af3929]/80 px-[22px] py-[5px] font-mono text-[56px] leading-none font-black tracking-[0.06em] text-[#af3929]/80">
                        CLASSIFIED
                    </span>
                    <div className="absolute inset-x-0 bottom-0 bg-[#29271f] py-[10px] text-center font-mono text-[26px] font-bold tracking-[0.2em] text-[#e1d3a9]">
                        CASE · {caseNumber} · {blogValue.tripTitle}
                    </div>
                    <div aria-hidden="true" className="absolute top-[24px] left-[-13px] h-[150px] w-[40px] rounded-full border-[6px] border-[#736d56] shadow-[3px_2px_0_#29271f40]">
                        <div className="absolute inset-x-[5px] top-[12px] bottom-[10px] rounded-full border-[3px] border-[#736d56]" />
                    </div>
                </div>

                <footer className="relative mt-[25px]">
                    <div className="flex items-center gap-[36px]">
                        <svg aria-hidden="true" viewBox="0 0 160 185" className="h-[185px] w-[160px] shrink-0 text-[#514b37]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                            {[0, 1, 2, 3, 4, 5].map((ring) => (
                                <path key={ring} d={`M${20 + ring * 9} ${145 - ring * 7} C${-15 + ring * 14} ${20 + ring * 6}, ${155 - ring * 14} ${-20 + ring * 16}, ${143 - ring * 9} ${100 - ring * 3} C${133 - ring * 9} ${210 - ring * 16}, ${35 + ring * 7} ${185 - ring * 12}, ${43 + ring * 7} ${85 + ring * 2}`} />
                            ))}
                        </svg>
                        <dl className="min-w-0 flex-1 space-y-[15px] font-mono text-[30px] font-bold uppercase">
                            <div className="flex gap-[20px]"><dt>Subject ...</dt><dd>Chubby</dd></div>
                            <div className="flex gap-[20px]"><dt>Evidence ..</dt><dd>On file</dd></div>
                            <div className="flex flex-wrap gap-x-[20px]"><dt>Status ....</dt><dd className="text-[#a33323]">Under investigation</dd></div>
                        </dl>
                    </div>
                    <div className="mt-[18px] flex justify-between border-t-[2px] border-[#514b37]/50 pt-[12px] font-mono text-[18px] font-bold tracking-[0.12em]">
                        <span>PRINT · R1 / CONFIDENTIAL</span>
                        <span>ARCHIVE COPY</span>
                    </div>
                </footer>
            </article>
        </section>
    )
};

export default CaseFile;
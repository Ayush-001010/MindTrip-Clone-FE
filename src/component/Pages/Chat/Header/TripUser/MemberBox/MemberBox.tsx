import React from "react";
import type IMemberBox from "./IMemberBox";

const MemberBox : React.FC<IMemberBox> = ({ members }) => {
    return (
        <section className="mt-4">
            <p className="text-sm font-semibold text-white mb-2">Members</p>
            <ul className="space-y-2">
                {members?.map(member => {
                    const name = member?.userName || "Unknown";
                    const initials = name
                        ? `${name[0].toUpperCase()}${name.length > 1 ? name[name.length - 1].toUpperCase() : ""}`
                        : "?";
                    return (
                        <li className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5" key={member.userId}>
                            <div className="flex-none w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                <span className="text-sm leading-none">{initials}</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm text-white truncate">{name}</p>
                                <p className="text-xs text-gray-400 truncate">{member?.userEmail}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default MemberBox;
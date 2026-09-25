import React from "react";
import type IShowActivityNotes from "./IShowActivityNotes";

const ShowActivityNotes: React.FC<IShowActivityNotes> = ({ notes }) => {
    console.log("notes:", notes);
    return (
        <section className="mt-4 flex flex-col gap-1 text-lg font-medium leading-relaxed text-[#dee2e6]">
            {notes.split("\n").map((line, index) => (
                <p key={index}>{line === "" ? "\u00A0" : line}</p>
            ))}
        </section>
    );
};

export default ShowActivityNotes;
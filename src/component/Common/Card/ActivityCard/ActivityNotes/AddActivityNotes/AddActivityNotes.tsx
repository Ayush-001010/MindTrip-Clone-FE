import React from "react";
import { MdOutlineEdit } from "react-icons/md";

import type IAddActivityNotes from "./IAddActivityNotes";

const AddActivityNotes: React.FC<IAddActivityNotes> = ({ setNotes , setIsStopEditing }) => {
    return (
        <section className="mt-4 flex items-start gap-2">
            <textarea
                rows={10}
                placeholder="Add notes..."
                className="w-full resize-none border-b border-gray-300 bg-transparent text-lg text-[#f8f9fa] outline-none placeholder:text-gray-400 focus:border-gray-100"
                onChange={(e) => setNotes(e.target.value)}
            />
            <MdOutlineEdit onClick={() => setIsStopEditing(true)} className="mt-1 shrink-0 text-2xl text-gray-400" />
        </section>
    );
};

export default AddActivityNotes;
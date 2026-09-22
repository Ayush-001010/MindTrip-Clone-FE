import React from "react";
import { MdOutlineEdit } from "react-icons/md";

const AddActivityNotes: React.FC = () => {
    return (
        <section>
            <textarea  className="border-b-1">
            </textarea>
            <MdOutlineEdit className="shrink-0 text-gray-400" />
        </section>
    );
};

export default AddActivityNotes;
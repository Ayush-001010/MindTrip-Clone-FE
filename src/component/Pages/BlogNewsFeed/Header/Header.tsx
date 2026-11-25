import React, { useState } from "react";
import type IHeader from "./IHeader";
import BlogWorkCard from "../../../Common/Card/BlogWorkCard/BlogWorkCard";

const Header: React.FC<IHeader> = () => {
    const [openWorkBlog, setOpenWorkBlog] = useState(false);

    const onCloseHandler = () => setOpenWorkBlog(false);

    return (
        <header className="flex justify-end mr-2">
            <button onClick={() => setOpenWorkBlog(true)} type="button" className="p-2 text-sm cursor-pointer hover:bg-[#1e2225] transition-all duration-200  bg-[#161a1d] shadow-xs rounded-lg shadow-[#333533] text-[#bcb8b1]">
                Build Your Travel Blog
            </button>
            <BlogWorkCard open={openWorkBlog} onClose={onCloseHandler} />
        </header>
    );
};

export default Header;
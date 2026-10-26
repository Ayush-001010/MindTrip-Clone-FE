import React from "react";
import type IHeader from "./IHeader";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header: React.FC<IHeader> = () => {
    return (
        <header className="flex justify-end mr-2">
            <button type="button" className="p-2 w-10 h-10 flex items-center justify-center text-lg mx-2 cursor-pointer hover:bg-[#1e2225] transition-all duration-200  bg-[#161a1d] shadow-xs rounded-full shadow-[#333533] text-[#bcb8b1]">
                <AiOutlineShoppingCart />
            </button>
            <Link to="/blog/create">
                <button type="button" className="p-2 text-sm cursor-pointer hover:bg-[#1e2225] transition-all duration-200  bg-[#161a1d] shadow-xs rounded-lg shadow-[#333533] text-[#bcb8b1]">
                    Build Your Personal Blog
                </button>
            </Link>
        </header>
    );
};

export default Header;
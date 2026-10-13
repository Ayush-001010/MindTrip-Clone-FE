import React from "react";
import type IFooter from "./IFooter";
import CommonConfig from "../../../../../config/CommonConfig";
import { Link } from "react-router-dom";
import { FaLinkedinIn } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { FaGithub } from "react-icons/fa6";


const Footer: React.FC<IFooter> = () => {
    const genrateIcon = (icon: string) => {
        switch (icon) {
            case "linkedin":
                return <FaLinkedinIn />
            case "github":
                return <FaGithub />
            case "leetcode":
                return <SiLeetcode />
            default: return null;
        }
    };

    return (
        <div className="mt-4 flex items-center justify-center gap-3 border-t border-white/10 px-2 pt-4">
            {CommonConfig.footerTextArr.map(({ icon, label, link }) => (
                <div key={label}>
                    <Link
                        to={link}
                        aria-label={label}
                        title={label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#1b1a1d] text-lg text-[#C9BFB5] transition-colors duration-200 hover:bg-white/10 hover:text-white"
                    >
                        <p className="m-0 flex items-center justify-center">
                            <span>{genrateIcon(icon)}</span>
                        </p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Footer;
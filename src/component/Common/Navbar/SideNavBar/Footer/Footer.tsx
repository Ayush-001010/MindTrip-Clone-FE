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
        <div className="mx-3 mt-4 flex items-center justify-center gap-3 border-t border-white/10 px-2 pt-4">
            {CommonConfig.footerTextArr.map(({ icon, label, link }) => (
                <div key={label}>
                    <Link
                        to={link}
                        aria-label={label}
                        className="group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg text-slate-300 shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-200/20 hover:bg-white/10 hover:text-white hover:shadow-[0_12px_26px_rgba(56,189,248,0.14)]"
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
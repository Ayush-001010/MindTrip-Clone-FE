import React from "react";
import type ITopNavBar from "./ITopNavBar";
import { WiStars } from "react-icons/wi";
import CommonConfig from "../../../../config/CommonConfig";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

const TopNavbar: React.FC<ITopNavBar> = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(
    () => !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/", { replace: true });
  };

  return (
    <header className="flex flex-wrap items-center justify-between bg-transparent px-3 py-2 sm:px-4">
      {/* LOGO */}
      <div>
        <Link to="/">
          <p className="m-0 flex cursor-pointer items-center gap-2.5 text-lg font-semibold text-[#6E4E3A] sm:text-xl">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#F7E6D5] to-[#FAF2E9] text-[1.5rem] text-[#9B6B43]">
              <WiStars />
            </span>

            {CommonConfig.companyName}
          </p>
        </Link>
      </div>

      {/* RIGHT ACTIONS */}
      <div>
        {isLoggedIn ? (
          <Button
            type="text"
            onClick={handleLogout}
            className="rounded-full! px-4! font-medium! text-[#6F7F79]! hover:bg-[#E7F1EC]! hover:text-[#335C4D]!"
          >
            Logout
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/auth/signup">
              <Button
                type="text"
                className="rounded-full! px-4! font-medium! text-[#6F7F79]! hover:bg-[#E7F1EC]! hover:text-[#335C4D]!"
              >
                Create Account
              </Button>
            </Link>

            <Link to="/auth/signin">
              <Button
                type="text"
                className="rounded-full! bg-[#335C4D]! px-5! font-medium! text-white! shadow-[0_8px_20px_rgba(79,129,117,0.16)] hover:bg-[#294C40]!"
              >
                I have an account
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNavbar;
import React from "react";
import type IHeader from "./IHeader";
import CommonConfig from "../../../../../config/CommonConfig";
import { WiStars } from "react-icons/wi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSideNavBarContext } from "../SideNavBar";
import { SlLogout } from "react-icons/sl";

const Header: React.FC<IHeader> = () => {
  const titleWords = CommonConfig.companyName.split(" ");
  const { isCollapsed, setIsCollapsed } = useSideNavBarContext();

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`my-2 flex gap-3 px-2 ${isCollapsed ? "flex-col items-center" : "items-center justify-between"
        }`}
    >
      <Link to="/" className="block w-fit min-w-0 shrink-0">
        {!isCollapsed && (
          <motion.p
            className="flex cursor-pointer items-center gap-2.5 text-left text-xl font-semibold tracking-[0.02em] text-[#F4E8DC]"
            initial="hidden"
            animate="visible"
          >
            {/* LOGO */}
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F7E6D5] to-[#FAF2E9] text-[1.6rem] text-[#9B6B43] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              <WiStars />
            </span>

            {/* BRAND NAME */}
            <span className="inline-flex ml-2 overflow-hidden">
              {titleWords.map((word, wordIndex) => {
                const priorCharacters =
                  titleWords
                    .slice(0, wordIndex)
                    .reduce(
                      (count, currentWord) => count + currentWord.length,
                      0
                    ) + wordIndex;

                return (
                  <span
                    key={`${word}-${wordIndex}`}
                    className="inline-block whitespace-nowrap"
                  >
                    {Array.from(word).map((character, characterIndex) => (
                      <motion.span
                        key={`${character}-${wordIndex}-${characterIndex}`}
                        className="inline-block"
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 14,
                            filter: "blur(6px)",
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                              duration: 0.42,
                              delay:
                                0.12 +
                                (priorCharacters + characterIndex) * 0.045,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                      >
                        {character}
                      </motion.span>
                    ))}

                    {wordIndex < titleWords.length - 1 && (
                      <span className="inline-block">&nbsp;</span>
                    )}
                  </span>
                );
              })}
            </span>
          </motion.p>
        )}
      </Link>

      <motion.button
        layout
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={isCollapsed ? "bg-[#212529] flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-lg text-[#F4E8DC] transition-colors duration-200 hover:bg-[#212529] hover:text-[#fff]" : "flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl text-lg text-[#F4E8DC] transition-colors duration-200 hover:bg-[#212529] hover:text-[#9B6B43]"}
      >
        <SlLogout />
      </motion.button>
    </motion.div>
  );
};

export default Header;
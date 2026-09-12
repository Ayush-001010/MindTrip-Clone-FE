import React from "react";
import type IHome from "./IHome";
import HomeConfig from "../../../config/component/HomeConfig";
import ImageAnimation from "../../Common/ImageAnimation/ImageAnimation";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import HorizontalCardList from "../../Common/HorizontalCardList/HorizontalCardList";
import AuthRequiredModal from "../../Common/Auth/AuthRequiredModal/AuthRequiredModal";

const Home: React.FC<IHome> = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  return (
    <main className="pt-7 px-4">
      <section className="flex items-center">
        <div className="pr-10">
          <motion.h1
            className="mb-4 mt-[18px] text-[clamp(2.5rem,12vw,3.4rem)] font-bold leading-[0.96] tracking-[-0.06em] text-[#2F3E46] lg:text-[clamp(3rem,4vw,4.8rem)] "
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.35, delay: 0.3 }}
          >
            {HomeConfig.Title}
          </motion.h1>
          <motion.p
            className="m-0 max-w-[34rem] text-[1.05rem] leading-[1.8] text-[#6F7F79]"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.35, delay: 0.8 }}
          >
            {HomeConfig.subLine}
          </motion.p>
          <motion.div
            className="mt-7 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.35, delay: 1.3 }}
          >
            <button
              type="button"
              onClick={() => setShowAuthModal(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#E7F1EC] to-[#DDEAE2] px-6 py-3.5 text-[#335C4D] shadow-[0_16px_30px_rgba(135,160,149,0.24)] transition duration-200 hover:-translate-y-0.5"
            >
              Create my trip
              <FiArrowRight />
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.45, delay: 1.9 }}
        >
          <ImageAnimation />
        </motion.div>
      </section>
      <section>
        <motion.p
          className="mb-5 mt-12 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.04em] text-[#2F3E46]"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.35, delay: 2.45 }}
        >
          {HomeConfig.exploreTripTitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.45, delay: 2.95 }}
        >
          <HorizontalCardList
            endPoint={HomeConfig.exploreTripEndPoint}
            type="explore-trip"
          />
        </motion.div>
      </section>
      {showAuthModal && (
    <AuthRequiredModal
        onClose={() => setShowAuthModal(false)}
    />
)}
    </main>
  );
};

export default Home;

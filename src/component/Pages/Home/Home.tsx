import React from "react";
import useTripAction from "../../../customHooks/useTripAction";
import type IHome from "./IHome";
import HomeConfig from "../../../config/component/HomeConfig";
import ImageAnimation from "../../Common/ImageAnimation/ImageAnimation";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import HorizontalCardList from "../../Common/HorizontalCardList/HorizontalCardList";
import AuthRequiredModal from "../../Common/Auth/AuthRequiredModal/AuthRequiredModal";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import CommonConfig from "../../../config/CommonConfig";
import TripPlannerCTA from "./components/TripPlannerCTA/TripPlannerCTA";
import { useNavigate } from "react-router-dom";
const Home: React.FC<IHome> = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const navigate = useNavigate();
  const handleCreateTrip = () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      navigate("/chat");
      return;
    }
  
    setShowAuthModal(true);
  };
  return (

    <main className="min-h-screen bg-[#f7fbfa] text-[#2f3e46]">
      {/* ================= HERO ================= */}
      <section className="px-4 pt-7 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 lg:pr-6">
            <motion.h1
              className="mb-4 mt-[18px] text-[clamp(2.5rem,12vw,3.4rem)] font-bold leading-[0.96] tracking-[-0.06em] text-[#2F3E46] lg:text-[clamp(3rem,4vw,4.8rem)]"
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
                onClick={handleCreateTrip}
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gradient-to-br from-[#E7F1EC] to-[#DDEAE2] px-6 py-3.5 text-[#335C4D] shadow-[0_16px_30px_rgba(135,160,149,0.24)] transition duration-200 hover:-translate-y-0.5"
              >
                Create my trip
                <FiArrowRight />
              </button>
            </motion.div>
          </div>

          {/* HERO IMAGE */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.45, delay: 1.9 }}
          >
            <ImageAnimation />
          </motion.div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= EXPLORE TRIPS ================= */}
      <section className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-5 text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight tracking-[-0.04em] text-[#2F3E46]">
            {HomeConfig.exploreTripTitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1 }}
        >
          <HorizontalCardList
            endPoint={HomeConfig.exploreTripEndPoint}
            type="explore-trip"
          />
        </motion.div>
      </section>
      <TripPlannerCTA onCreateTrip={handleCreateTrip} />
      {/* ================= FOOTER ================= */}
      <footer className="border-t border-[#dfeae5] bg-[#f7fbfa] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold tracking-[-0.03em] text-[#335C4D]">
              {CommonConfig.companyName}
            </p>

            <p className="mt-1 text-sm text-[#6F7F79]">
              Plan less. Travel better.
            </p>
          </div>

          <p className="text-sm text-[#8A9993]">
            © {new Date().getFullYear()} {CommonConfig.companyName}. All rights
            reserved.
          </p>
        </div>
      </footer>

      {/* ================= AUTH MODAL ================= */}
      {showAuthModal && (
        <AuthRequiredModal onClose={() => setShowAuthModal(false)} />
      )}
    </main>
  );
};

export default Home;
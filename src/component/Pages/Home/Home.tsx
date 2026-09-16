import React from "react";

import type IHome from "./IHome";
import HomeConfig from "../../../config/component/HomeConfig";

import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import HorizontalCardList from "../../Common/HorizontalCardList/HorizontalCardList";
import AuthRequiredModal from "../../Common/Auth/AuthRequiredModal/AuthRequiredModal";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import CommonConfig from "../../../config/CommonConfig";
import TripPlannerCTA from "./components/TripPlannerCTA/TripPlannerCTA";
import { useNavigate } from "react-router-dom";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import HomeStoryCarousel from "./components/HomeStoryCarousel/HomeStoryCarousel";
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
  const generateIcon = (icon: string) => {
    switch (icon) {
      case "linkedin":
        return <FaLinkedinIn />;
      case "github":
        return <FaGithub />;
      case "leetcode":
        return <SiLeetcode />;
      default:
        return null;
    }
  };
  return (
    <main className="min-h-screen bg-[#f7fbfa] text-[#2f3e46]">
  
    
<section className="px-4 pb-8 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-14">
  <div className="mx-auto flex max-w-[1500px] flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-14 xl:gap-20">
    
    {/* LEFT CONTENT */}
    <div className="w-full lg:w-[46%] lg:pr-2 xl:w-[44%]">
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.2 }}
      >
        {/* EYEBROW */}
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#6E9F9F] sm:text-sm">
          Travel, your way
        </p>

        {/* HEADING */}
        <h1
          className="max-w-2xl text-[clamp(3.1rem,5vw,5.2rem)] font-bold leading-[0.94] tracking-[-0.065em] text-[#2F3E46]"
        >
          {HomeConfig.Title}
        </h1>
      </motion.div>

      {/* DESCRIPTION */}
      <motion.p
        className="mt-7 max-w-[36rem] text-[1.05rem] leading-[1.75] text-[#6F7F79] sm:text-[1.1rem]"
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.55 }}
      >
        {HomeConfig.subLine}
      </motion.p>

      {/* CTA */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.85 }}
      >
        <button
          type="button"
          onClick={handleCreateTrip}
          className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#335C4D] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,129,117,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#294C40]"
        >
          Create my trip
          <FiArrowRight />
        </button>
      </motion.div>
    </div>

    {/* HERO CAROUSEL */}
    <motion.div
      className="w-full lg:w-[54%] xl:w-[56%]"
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.25, delay: 0.7 }}
    >
      <HomeStoryCarousel />
    </motion.div>
  </div>
</section>
      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ================= EXPLORE TRIPS ================= */}
      {/* <section className="px-4 pb-8 pt-16 sm:px-6 lg:px-8">
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
      </section> */}
      <TripPlannerCTA onCreateTrip={handleCreateTrip} />
      {/* ================= FOOTER ================= */}
     {/* ================= FOOTER ================= */}
<footer className="border-t border-[#dfeae5] bg-[#f7fbfa] px-4 py-10 sm:px-6 lg:px-8">
  <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
    
    {/* LEFT */}
    <div>
      <p className="text-xl font-semibold tracking-[-0.03em] text-[#335C4D]">
        {CommonConfig.companyName}
      </p>

      <p className="mt-1 text-sm text-[#6F7F79]">
        Plan less. Travel better.
      </p>

      {/* SOCIAL LINKS */}
      <div className="mt-5 flex items-center gap-3">
        {CommonConfig.footerTextArr.map(({ icon, label, link }) => (
          <a
            key={label}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef2f3] text-lg text-[#335C4D] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#e3ebe8]"
          >
            {generateIcon(icon)}
          </a>
        ))}
      </div>
    </div>

    {/* COPYRIGHT */}
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

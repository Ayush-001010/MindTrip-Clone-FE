import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import scene1 from "../../../../../assets/home-carousel/Scene1.png";
import scene2 from "../../../../../assets/home-carousel/Scene2.png";
import scene3 from "../../../../../assets/home-carousel/Scene3.png";
import scene4 from "../../../../../assets/home-carousel/Scene4.png";
const slides = [
  {
    image: scene1,
    title: "Dream it",
    description: "Start with an idea, a destination, or just a mood.",
  },
  {
    image: scene2,
    title: "Tell MindTrip",
    description: "Share what kind of trip you have in mind.",
  },
  {
    image: scene3,
    title: "Build the plan",
    description: "MindTrip turns your ideas into a trip worth taking.",
  },
  {
    image: scene4,
    title: "Go",
    description: "Pack your bags and turn the plan into a memory.",
  },
];

const HomeStoryCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveIndex(
      (current) => (current - 1 + slides.length) % slides.length
    );
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* IMAGE */}
      <div className="relative aspect-[1.5] overflow-hidden rounded-[32px] border border-[#dcebe5] bg-white shadow-[0_24px_60px_rgba(79,129,117,0.12)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeSlide.image}
            src={activeSlide.image}
            alt={activeSlide.title}
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </AnimatePresence>

        {/* OVERLAY */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent px-6 pb-6 pt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                {String(activeIndex + 1).padStart(2, "0")} / 04
              </p>

              <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-white">
                {activeSlide.title}
              </h3>

              <p className="mt-1 max-w-md text-sm leading-6 text-white/85">
                {activeSlide.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ARROWS */}
        <div className="absolute right-5 top-5 flex gap-2">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-[#335C4D] backdrop-blur transition hover:bg-white"
          >
            <FiChevronLeft />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/80 text-[#335C4D] backdrop-blur transition hover:bg-white"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {/* DOTS */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to ${slide.title}`}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 bg-[#335C4D]"
                : "w-2 bg-[#b9cec6]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeStoryCarousel;
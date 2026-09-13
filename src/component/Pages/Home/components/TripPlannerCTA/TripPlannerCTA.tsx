import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiMessageCircle,
  FiStar,
  FiUsers,
  FiMap,
  FiCompass,
} from "react-icons/fi";

interface TripPlannerCTAProps {
  onCreateTrip: () => void;
}

const TripPlannerCTA: React.FC<TripPlannerCTAProps> = ({
  onCreateTrip,
}) => {
  return (
    <section className="relative overflow-hidden px-2 py-20 text-[#2f3e46] sm:px-4 lg:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] border border-[#dcebe5] bg-[#eef7f3] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
        {/* BACKGROUND DECORATION */}
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#dceee7]/70 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#e8ded2]/50 blur-3xl" />

        {/* DECORATIVE DOTS */}
        <div className="pointer-events-none absolute right-[12%] top-[18%] grid grid-cols-4 gap-2 opacity-40">
          {Array.from({ length: 12 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-[#78a59a]"
            />
          ))}
        </div>

        <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6e9f9f]">
              Ready when you are
            </p>

            <h2 className="mt-5 max-w-3xl text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[0.96] tracking-[-0.055em]">
              You bring the idea.
              <br />
              <span className="text-[#4f8175]">
                MindTrip brings the plan.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#6f7f79] sm:text-xl">
              From a half-formed idea to a trip you're actually excited about.
              Tell us what you're imagining and let MindTrip figure out the
              rest.
            </p>

            {/* FLOW */}
            <div className="mt-9 flex flex-wrap items-center gap-2 text-sm font-medium text-[#4f8175]">
              <span className="rounded-full bg-white/80 px-4 py-2">
                Think it
              </span>

              <span className="text-[#97b8af]">→</span>

              <span className="rounded-full bg-white/80 px-4 py-2">
                Tell us
              </span>

              <span className="text-[#97b8af]">→</span>

              <span className="rounded-full bg-white/80 px-4 py-2">
                Plan it
              </span>

              <span className="text-[#97b8af]">→</span>

              <span className="rounded-full bg-white/80 px-4 py-2">
                Go
              </span>
            </div>

            <button
              type="button"
              onClick={onCreateTrip}
              className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#335c4d] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(79,129,117,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#294c40]"
            >
              Start planning
              <FiArrowRight />
            </button>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            className="relative min-h-[430px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            {/* CURVED JOURNEY LINE */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 500 430"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M40 90 C140 15, 280 35, 350 120 C410 190, 410 265, 325 315 C255 355, 160 365, 95 330"
                stroke="#9fc7bc"
                strokeWidth="2"
                strokeDasharray="7 9"
                strokeLinecap="round"
              />
            </svg>

            {/* IDEA CARD */}
            <motion.div
              className="absolute left-0 top-8 w-[215px] rounded-[24px] border border-white/80 bg-white/90 p-4 shadow-[0_20px_40px_rgba(82,111,103,0.12)] backdrop-blur-sm"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5f1ec] text-[#4f8175]">
                  <FiCompass />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-[#8aa098]">
                    Your idea
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#335c4d]">
                    A slow Goa getaway
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#f1f7f4] px-3 py-1 text-xs text-[#668178]">
                  4 days
                </span>
                <span className="rounded-full bg-[#f1f7f4] px-3 py-1 text-xs text-[#668178]">
                  Food
                </span>
                <span className="rounded-full bg-[#f1f7f4] px-3 py-1 text-xs text-[#668178]">
                  Beaches
                </span>
              </div>
            </motion.div>

            {/* CHAT CARD */}
            <motion.div
              className="absolute right-0 top-0 w-[200px] rounded-[24px] border border-[#dcebe5] bg-[#ffffff] p-4 shadow-[0_20px_40px_rgba(82,111,103,0.1)]"
              animate={{ y: [0, 7, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="flex items-center gap-2 text-[#4f8175]">
                <FiMessageCircle />
                <span className="text-xs font-semibold uppercase tracking-[0.12em]">
                  Chat
                </span>
              </div>

              <p className="mt-3 text-sm font-medium leading-5 text-[#335c4d]">
                What kind of trip are you in the mood for?
              </p>

              <div className="mt-3 rounded-2xl bg-[#eef7f3] px-3 py-2 text-xs text-[#688079]">
                Relaxed, scenic, great food.
              </div>
            </motion.div>

            {/* PLAN CARD */}
            <motion.div
              className="absolute bottom-6 left-[12%] w-[245px] rounded-[26px] border border-[#dcebe5] bg-[#20332f] p-5 text-white shadow-[0_24px_50px_rgba(40,65,60,0.2)]"
              initial={{ scale: 0.96 }}
              animate={{ scale: [0.96, 1, 0.96] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/40">
                    Your trip
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    Goa · 4 days
                  </p>
                </div>

                <FiMap className="text-xl text-[#9ed4d4]" />
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                  <span className="text-xs text-white/60">
                    Places
                  </span>
                  <span className="text-xs font-medium">
                    12
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                  <span className="text-xs text-white/60">
                    Budget
                  </span>
                  <span className="text-xs font-medium">
                    ₹18,000
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
                  <span className="text-xs text-white/60">
                    Travellers
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium">
                    <FiUsers />
                    2
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RECOMMENDATION CARD */}
            <motion.div
              className="absolute bottom-0 right-0 w-[190px] rounded-[22px] border border-white/70 bg-white/90 p-4 shadow-[0_20px_40px_rgba(82,111,103,0.1)] backdrop-blur-sm"
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <div className="flex items-center gap-2">
                <FiStar className="text-[#d1a94b]" />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8aa098]">
                  Picked for you
                </span>
              </div>

              <p className="mt-3 text-sm font-semibold text-[#335c4d]">
                Sunset cruise
              </p>

              <p className="mt-1 text-xs leading-5 text-[#7b8c85]">
                Perfect for a slow evening by the water.
              </p>
            </motion.div>

            {/* TRAVEL DOT */}
            <motion.div
              className="absolute left-[48%] top-[47%] flex h-4 w-4 items-center justify-center rounded-full bg-[#78bdbd] shadow-[0_0_0_6px_rgba(120,189,189,0.12)]"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TripPlannerCTA;
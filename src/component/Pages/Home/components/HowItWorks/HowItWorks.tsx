import React from "react";
import { motion } from "framer-motion";
import { FiMessageCircle, FiSearch, FiStar, FiUsers, FiPieChart } from "react-icons/fi";

const steps = [
  {
    number: "01",
    icon: <FiMessageCircle />,
    title: "Chat with MindTrip",
    headline: "Stop planning. Start talking.",
    description:
      "Tell us the vibe, and we'll turn your random travel thoughts into the beginning of something unforgettable.",
    tag: "AI TRIP PLANNING",
    visual: (
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#182126] p-5 shadow-2xl">
        <div className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#78bdbd] text-white">
            <FiMessageCircle />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">MindTrip AI</p>
            <p className="text-xs text-white/40">Ready to plan your escape</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="ml-auto w-[78%] rounded-2xl rounded-br-md bg-[#78bdbd] px-4 py-3 text-sm text-white">
            I want a relaxing 4-day trip with good food and beautiful views.
          </div>

          <div className="w-[82%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm leading-6 text-white/80">
            Perfect. I already have a few places in mind. Let's build a trip
            around your vibe, budget and travel style.
          </div>

          <div className="flex gap-2">
            <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-white/60">
              Relaxing
            </span>
            <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-white/60">
              Food
            </span>
            <span className="rounded-full bg-white/5 px-3 py-2 text-xs text-white/60">
              Scenic
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    icon: <FiSearch />,
    title: "Explore the world",
    headline: "Your next favourite place is probably hiding around the corner.",
    description:
      "Jump from hidden gems to iconic stays, incredible food, and things worth getting out of bed for.",
    tag: "DISCOVER",
    visual: (
      <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-[#182126] p-4 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Explore Pune</p>
          <span className="rounded-full bg-[#78bdbd]/15 px-3 py-1 text-xs text-[#9ed4d4]">
            24 places
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ["Hidden Cafés", "18 places"],
            ["Things to do", "32 places"],
            ["Top Stays", "14 hotels"],
            ["Weekend Picks", "21 ideas"],
          ].map(([name, count]) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <div className="mb-8 h-20 rounded-xl bg-gradient-to-br from-[#36545a] to-[#20282d]" />
              <p className="text-sm font-medium text-white">{name}</p>
              <p className="mt-1 text-xs text-white/40">{count}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "03",
    icon: <FiStar />,
    title: "Get recommendations",
    headline: "Not more options. Better options.",
    description:
      "Skip the endless scrolling. Get recommendations that actually match your mood, budget, and way of travelling.",
    tag: "PERSONALIZED",
    visual: (
      <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-[#182126] p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Picked for you
            </p>
            <p className="mt-1 text-xs text-white/40">
              Based on your trip preferences
            </p>
          </div>

          <FiStar className="text-xl text-[#9ed4d4]" />
        </div>

        <div className="space-y-3">
          {[
            ["Lush Green Resort", "4.8", "Perfect for a slow weekend"],
            ["Riverside Café", "4.7", "Great food + sunset views"],
            ["Hidden Valley Trail", "4.9", "Best early morning escape"],
          ].map(([name, rating, reason]) => (
            <div
              key={name}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">{name}</p>
                <span className="flex items-center gap-1 text-xs text-[#9ed4d4]">
                  <FiStar />
                  {rating}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/40">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: "04",
    icon: <FiUsers />,
    title: "Share with your crew",
    headline: "Great trips get better when your favourite people are in them.",
    description:
      "Share the plan, toss around ideas, and turn 'we should go sometime' into an actual trip.",
    tag: "TRAVEL TOGETHER",
    visual: (
      <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-[#182126] p-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-sm font-semibold text-white">
              Goa Weekend
            </p>
            <p className="mt-1 text-xs text-white/40">
              Shared with your crew
            </p>
          </div>

          <div className="flex -space-x-2">
            {["S", "A", "R", "P"].map((letter) => (
              <div
                key={letter}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#182126] bg-[#78bdbd] text-xs font-semibold text-white"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl bg-white/[0.04] p-4">
            <p className="text-xs text-white/40">Trip idea</p>
            <p className="mt-1 text-sm text-white">
              Sunset cruise + beach dinner
            </p>
          </div>

          <div className="rounded-2xl bg-[#78bdbd]/10 p-4">
            <p className="text-xs text-[#9ed4d4]">3 people liked this</p>
            <p className="mt-1 text-sm text-white">
              Everyone's ready. Let's book it.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    icon: <FiPieChart />,
    title: "Split the expenses",
    headline: "Because friendship shouldn't end with “who owes whom ₹437?”",
    description:
      "Keep group expenses simple, transparent, and drama-free.",
  
    visual: (
      <div className="mx-auto w-full max-w-md rounded-[28px] border border-white/10 bg-[#182126] p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Trip Expenses
            </p>
            <p className="mt-1 text-xs text-white/40">
              Everyone knows where the money went
            </p>
          </div>

          <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/50">
            COMING SOON
          </span>
        </div>

        <div className="space-y-3">
          {[
            ["Hotel", "₹8,400"],
            ["Dinner", "₹2,180"],
            ["Cab", "₹960"],
          ].map(([label, amount]) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
            >
              <span className="text-sm text-white/70">{label}</span>
              <span className="text-sm font-medium text-white">
                {amount}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl bg-[#78bdbd]/10 p-4">

          <p className="mt-1 text-sm text-white">
            Split bills. Settle up. Stay friends.
          </p>
        </div>
      </div>
    ),
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="mt-24 overflow-hidden px-2 py-20 text-[#2f3e46] sm:px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#6e9f9f]">
            How it works
          </p>

          <h2 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.05em]">
            From “Where should we go?”
            <br />
            to “When are we leaving?”
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#6f7f79] sm:text-lg">
            One conversation. Endless possibilities. A trip that actually
            feels like yours.
          </p>
        </motion.div>

        {/* STEPS */}
        <div className="mt-24 space-y-24 lg:space-y-32">
          {steps.map((step, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={step.number}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${
                  isReversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
              >
                {/* TEXT */}
                <div>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold tracking-[-0.06em] text-[#d2e4df] sm:text-6xl">
                      {step.number}
                    </span>

                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e0efeb] text-lg text-[#4f8175]">
                      {step.icon}
                    </span>
                  </div>

                  <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-[#6e9f9f]">
                    {step.tag}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-xl font-semibold leading-tight text-[#335c4d] sm:text-2xl">
                    {step.headline}
                  </p>

                  <p className="mt-5 max-w-xl text-base leading-7 text-[#6f7f79] sm:text-lg">
                    {step.description}
                  </p>
                </div>

                {/* VISUAL */}
                <div className="flex min-w-0 justify-center">
                  {step.visual}
                </div>
              </motion.div>
            );
          })}
        </div>

        
    
      </div>
    </section>
  );
};

export default HowItWorks;
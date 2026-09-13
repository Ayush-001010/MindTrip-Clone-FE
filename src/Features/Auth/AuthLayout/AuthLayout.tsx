import React, { type PropsWithChildren } from "react";

const AuthLayout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#f7fbfa] px-4 py-4">
    <div className="flex h-full max-h-[calc(100vh-2rem)] w-full max-w-6xl overflow-hidden rounded-[32px] ...">
        {/* ================= LEFT SECTION ================= */}
        <div className="relative hidden overflow-hidden bg-[#dfeee8] p-14 text-[#335c4d] md:flex md:w-1/2">
          {/* Soft background decoration */}
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#c6dfd6]" />

          <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#b7d5ca]" />

          <div className="pointer-events-none absolute right-16 top-16 h-32 w-32 rounded-full bg-[#eef6f2]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col">
            <div className="mb-10 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F7E6D5] to-[#FAF2E9] text-2xl text-[#9B6B43] shadow-sm">
                ✦
              </span>

              <span className="text-xl font-semibold tracking-[-0.02em] text-[#335c4d]">
                MindTrip
              </span>
            </div>

            <h1 className="max-w-md text-5xl font-bold leading-[1.05] tracking-[-0.045em] text-[#2f3e46]">
              Plan your next
              <br />
              journey with
              <br />
              <span className="text-[#4f8175]">MindTrip.</span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-[#6f7f79]">
              Discover new places, organize your travel plans, and create
              memorable experiences — all in one place.
            </p>

            {/* Features */}
            <div className="mt-12 space-y-5">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-semibold text-[#4f8175] shadow-sm">
                  ✓
                </div>

                <span className="text-base font-medium text-[#4a625a]">
                  Explore amazing destinations
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-semibold text-[#4f8175] shadow-sm">
                  ✓
                </div>

                <span className="text-base font-medium text-[#4a625a]">
                  Organize your travel plans
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-semibold text-[#4f8175] shadow-sm">
                  ✓
                </div>

                <span className="text-base font-medium text-[#4a625a]">
                  Keep your journeys in one place
                </span>
              </div>
            </div>
          </div>

          {/* Decorative dots */}
          <div className="absolute bottom-16 left-16 grid grid-cols-4 gap-2 opacity-50">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-[#78a99a]"
              />
            ))}
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="flex w-full items-center justify-center bg-[#fffefd] px-8 py-12 md:w-1/2 md:px-12 lg:px-16">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
import React, { type PropsWithChildren } from "react";

const AuthLayout: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#eefafa] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl min-h-[700px] flex overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* ================= LEFT SECTION ================= */}
        <div className="relative hidden md:flex md:w-1/2 overflow-hidden bg-[#78bdbd] p-14 text-white">
          {/* Main Content */}
          <div className="relative z-10 flex flex-col">
            <h1 className="max-w-md text-5xl font-bold leading-[1.2] tracking-tight">
              Plan your next
              <br />
              journey with
              <br />
              MindTrip.
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-7 text-white/90">
              Discover new places, organize your travel plans, and create
              memorable experiences — all in one place.
            </p>

            {/* Features */}
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>

                <span className="text-base font-medium">
                  Explore amazing destinations
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>

                <span className="text-base font-medium">
                  Organize your travel plans
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  ✓
                </div>

                <span className="text-base font-medium">
                  Keep your journeys in one place
                </span>
              </div>
            </div>
          </div>

          {/* ================= DECORATIONS ================= */}

          {/* Bottom-left circle */}
          <div className="absolute -bottom-12 left-12 h-28 w-28 rounded-full bg-white/30" />

          {/* Small dots */}
          <div className="absolute bottom-20 left-16 grid grid-cols-4 gap-3">
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-white/80"
              />
            ))}
          </div>

          {/* Bottom-right large circle */}
          <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#5ca3a3]" />
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center px-12 py-12">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

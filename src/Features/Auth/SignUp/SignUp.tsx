import React from "react";
import Form from "../../../Components/UI/Forms/Form";
import type ISignUp from "./ISignUp";
import signUpFields from "./SignUpFields";
import { Link } from "react-router-dom";

const SignUp: React.FunctionComponent<ISignUp> = () => {
  const submitHandler = async (values: Record<string, any>) => {
    try {
      console.log("Sign Up Values:", values);

      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registration successful:", data);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-[#eefafa] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-2">
          {/* LEFT PANEL */}
          <div className="relative overflow-hidden bg-[#79bdbd] px-10 py-12 md:px-14">
            {/* Decorative circles */}
            <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#559b9c]" />

            <div className="absolute bottom-28 left-12 h-28 w-28 rounded-full bg-[#b9dddd]" />

            {/* Small decorative dots */}
            <div className="absolute bottom-28 left-16 grid grid-cols-4 gap-3">
              {Array.from({ length: 16 }).map((_, index) => (
                <span
                  key={index}
                  className="h-1.5 w-1.5 rounded-full bg-white/80"
                />
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="max-w-md text-4xl font-semibold leading-tight text-white md:text-5xl">
                Plan your next
                <br />
                journey with
                <br />
                MindTrip.
              </h2>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/90">
                Discover new places, organize your travel plans, and create
                memorable experiences — all in one place.
              </p>

              <div className="mt-12 space-y-4 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    ✓
                  </span>
                  <span>Explore amazing destinations</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    ✓
                  </span>
                  <span>Organize your travel plans</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                    ✓
                  </span>
                  <span>Keep your journeys in one place</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex flex-col justify-center px-8 py-12 md:px-16 lg:px-20">
            <div className="w-full max-w-xl">
              {/* Main heading */}
              <h1 className="text-center text-4xl font-bold text-slate-900">
                Create Account
              </h1>

              {/* Google button */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="mt-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <span className="mr-3 font-semibold">G</span>
                Sign up with Google
              </button>

              {/* OR divider */}
              <div className="my-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-sm text-slate-400">OR</span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Existing reusable Form */}
              <Form
                fieldsDetails={signUpFields}
                submitHandler={submitHandler}
                buttonText="Create Account"
              />

              {/* Login */}
              <div className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/auth/signin"
                  className="font-medium text-[#3f9ca3] hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

import React from "react";
import Form from "../../../Components/UI/Forms/Form";
import type ISignUp from "./ISignUp";
import signUpFields from "./SignUpFields";
import { Link, useNavigate } from "react-router-dom";

const SignUp: React.FunctionComponent<ISignUp> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");

  const submitHandler = async (values: Record<string, any>) => {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrorMessage(
            "This email is already registered. Please sign in instead."
          );
        } else {
          setErrorMessage(
            data.message || "Unable to create your account. Please try again."
          );
        }

        return;
      }

      console.log("Registration successful:", data);

      if (!data.token) {
        setErrorMessage(
          "Account created, but authentication token was not received."
        );
        return;
      }

      localStorage.setItem("token", data.token);

      console.log("Token stored successfully");

      navigate("/chat", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);

      setErrorMessage(
        "Something went wrong while creating your account. Please try again."
      );
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen bg-[#f7fbfa] px-4 py-8">
      <div className="mx-auto flex min-h-[700px] w-full max-w-6xl overflow-hidden rounded-[32px] border border-[#dcebe5] bg-white shadow-[0_30px_80px_rgba(79,129,117,0.12)]">
        <div className="relative hidden overflow-hidden bg-[#dfeee8] px-10 py-12 md:flex md:w-1/2 md:px-14">
          <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-[#b7d5ca]" />

          <div className="pointer-events-none absolute bottom-28 left-12 h-28 w-28 rounded-full bg-[#c6dfd6]" />

          <div className="absolute bottom-28 left-16 grid grid-cols-4 gap-2 opacity-50">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                className="h-1.5 w-1.5 rounded-full bg-[#78a99a]"
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="mb-10 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F7E6D5] to-[#FAF2E9] text-2xl text-[#9B6B43] shadow-sm">
                ✦
              </span>

              <span className="text-xl font-semibold tracking-[-0.02em] text-[#335c4d]">
                MindTrip
              </span>
            </div>

            <h2 className="max-w-md text-5xl font-bold leading-[1.05] tracking-[-0.045em] text-[#2f3e46]">
              Your next
              <br />
              adventure starts
              <br />
              <span className="text-[#4f8175]">here.</span>
            </h2>

            <p className="mt-8 max-w-md text-lg leading-8 text-[#6f7f79]">
              Discover new places, organize your travel plans, and turn travel
              ideas into experiences worth remembering.
            </p>

            <div className="mt-12 space-y-5 text-[#4a625a]">
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-semibold text-[#4f8175] shadow-sm">
                  ✓
                </span>
                <span>Explore amazing destinations</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-semibold text-[#4f8175] shadow-sm">
                  ✓
                </span>
                <span>Build trips around your vibe</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-semibold text-[#4f8175] shadow-sm">
                  ✓
                </span>
                <span>Bring your favourite people along</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center bg-[#fffefd] px-8 py-12 md:w-1/2 md:px-12 lg:px-16">
          <div className="w-full max-w-md">
            <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#6e9f9f]">
              Start your journey
            </p>

            <h1 className="text-center text-4xl font-bold tracking-[-0.04em] text-[#2f3e46]">
              Create your account
            </h1>

            <p className="mt-3 text-center text-sm leading-6 text-[#6f7f79]">
              One account. A whole world to explore.
            </p>

            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="mt-7 flex w-full items-center justify-center rounded-xl border border-[#dcebe5] bg-white px-4 py-3.5 text-sm font-medium text-[#4a625a] shadow-sm transition hover:border-[#bfd9d0] hover:bg-[#f7fbfa]"
            >
              <span className="mr-3 font-semibold text-[#335c4d]">G</span>
              Sign up with Google
            </button>

            <div className="my-9 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#dcebe5]" />

              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#9aaaa3]">
                or
              </span>

              <div className="h-px flex-1 bg-[#dcebe5]" />
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600"
              >
                {errorMessage}
              </div>
            )}

            <Form
              fieldsDetails={signUpFields}
              submitHandler={submitHandler}
              buttonText="Create Account"
            />

            <p className="mt-7 text-center text-sm text-[#6f7f79]">
              Already have an account?{" "}
              <Link
                to="/auth/signin"
                className="font-semibold text-[#4f8175] hover:text-[#335c4d] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
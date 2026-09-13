import React from "react";
import { useNavigate } from "react-router-dom";

interface IAuthRequiredModal {
  onClose: () => void;
}

const AuthRequiredModal: React.FC<IAuthRequiredModal> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();
    navigate("/auth/signin");
  };

  const handleSignUp = () => {
    onClose();
    navigate("/auth/signup");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f1ea] text-lg text-[#5f6f68] transition hover:bg-[#ece5da]"
          aria-label="Close"
        >
          ×
        </button>

        {/* ICON */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7efe5] text-xl text-[#a5794b]">
          ✦
        </div>

        {/* CONTENT */}
        <h2 className="mt-5 text-2xl font-semibold text-[#2d3b42]">
          Start your MindTrip journey
        </h2>

        <p className="mt-3 leading-6 text-[#6f7e78]">
          Please sign in or sign up to continue
          creating your trip.
        </p>

        {/* ACTIONS */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSignIn}
            className="flex-1 rounded-full border border-[#d8e5df] px-6 py-3 font-medium text-[#345c52] transition hover:bg-[#f4f8f6]"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={handleSignUp}
            className="flex-1 rounded-full bg-[#dfeee8] px-6 py-3 font-medium text-[#345c52] transition hover:bg-[#d3e7df]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredModal;
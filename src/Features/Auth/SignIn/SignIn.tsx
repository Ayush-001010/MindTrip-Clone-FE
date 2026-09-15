import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../AuthLayout/AuthLayout";
import Form from "../../../Components/UI/Forms/Form";
import type ISignIn from "./ISignIn";
import signInFields from "./signInFields";

const SignIn: React.FunctionComponent<ISignIn> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = React.useState("");

  const submitHandler = async (values: Record<string, any>) => {
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message || "Unable to sign in. Please try again."
        );
        return;
      }

      if (!data.token) {
        setErrorMessage("Sign in failed. Authentication token not received.");
        return;
      }

      localStorage.setItem("token", data.token);

      console.log("Token stored successfully");

      navigate("/chat", { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      setErrorMessage(
        "Something went wrong while signing you in. Please try again."
      );
    }
  };

  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.16em] text-[#6e9f9f]">
          Welcome back
        </p>

        <h1 className="text-center text-4xl font-bold tracking-[-0.04em] text-[#2f3e46]">
          Sign in to MindTrip
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-[#6f7f79]">
          Your next adventure is waiting.
        </p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="mt-7 flex w-full items-center justify-center rounded-xl border border-[#dcebe5] bg-white px-4 py-3.5 text-sm font-medium text-[#4a625a] shadow-sm transition hover:border-[#bfd9d0] hover:bg-[#f7fbfa]"
        >
          <span className="mr-3 font-semibold text-[#335c4d]">G</span>
          Sign in with Google
        </button>

        <div className="my-9 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#dcebe5]" />

          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#9aaaa3]">
            or
          </span>

          <div className="h-px flex-1 bg-[#dcebe5]" />
        </div>

        <h2 className="mb-5 text-2xl font-bold tracking-[-0.03em] text-[#2f3e46]">
          Sign in with email
        </h2>

        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600"
          >
            {errorMessage}
          </div>
        )}

        <Form
          fieldsDetails={signInFields}
          submitHandler={submitHandler}
          buttonText="Sign In"
        />

        <p className="mt-7 text-center text-sm text-[#6f7f79]">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-semibold text-[#4f8175] hover:text-[#335c4d] hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
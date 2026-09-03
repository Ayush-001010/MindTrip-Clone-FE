import React from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../AuthLayout/AuthLayout";
import Form from "../../../Components/UI/Forms/Form";

import type ISignIn from "./ISignIn";
import signInFields from "./signInFields";

const SignIn: React.FunctionComponent<ISignIn> = () => {
  const submitHandler = async (values: Record<string, any>) => {
    try {
      console.log("Sign In Values:", values);

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
        throw new Error(data.message || "Login failed");
      }

      console.log("Login successful:", data);

      localStorage.setItem("token", data.token);

      console.log("Token stored successfully");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <h1 className="text-center text-4xl font-bold text-slate-900">
          Sign In
        </h1>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="mt-6 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <span className="mr-3 font-semibold">G</span>
          Sign in with Google
        </button>

        <div className="my-10 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />

          <span className="text-sm text-gray-400">OR</span>

          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <h2 className="mb-6 text-2xl font-bold text-slate-900">Sign In</h2>

        <Form
          fieldsDetails={signInFields}
          submitHandler={submitHandler}
          buttonText="Sign In"
        />

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-[#4d9fa3] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;

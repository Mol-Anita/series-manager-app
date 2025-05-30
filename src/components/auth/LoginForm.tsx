"use client";

import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/services/authService";
import { AuthFormData } from "@/types/AuthFormTypes";
import { useAuth } from "@/contexts/AuthContext";
import TwoFactorVerification from "./TwoFactorVerification";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
  const router = useRouter();
  const { updateAuthState } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [tempToken, setTempToken] = useState("");

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const loginData = {
        Email: data.Email,
        Password: data.Password
      };
      const result = await loginUser(loginData);
      
      if (result.RequiresTwoFactor) {
        setTempToken(result.Token);
        setShow2FA(true);
        return;
      }

      if (!result.Token) {
        setError("Login failed: No token received");
        return;
      }

      updateAuthState(true, result.User.Username);
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "An unexpected error occurred during login"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handle2FASuccess = () => {
    updateAuthState(true, "");
    router.push("/");
  };

  const handle2FAError = (error: string) => {
    setError(error);
    setShow2FA(false);
  };

  if (show2FA) {
    return (
      <div className="flex flex-col p-14 bg-stone-900 rounded-2xl w-3xl h-fit">
        <TwoFactorVerification
          tempToken={tempToken}
          onVerificationSuccess={handle2FASuccess}
          onVerificationError={handle2FAError}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-14 bg-stone-900 rounded-2xl w-3xl h-fit">
      <h1 className="font-bold text-3xl">Login</h1>
      <div className="py-5">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="email"
            label="Email"
            id="email"
            placeholder="Enter your email"
            inputProps={register("Email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            errors={errors}
          />
          <InputField
            type="password"
            label="Password"
            id="password"
            placeholder="Enter password"
            inputProps={register("Password", { required: "Password is required" })}
            errors={errors}
          />
          <div className="flex justify-center">
            <SubmitButton isSubmitting={isSubmitting} text="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

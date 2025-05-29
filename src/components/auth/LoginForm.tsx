"use client";

import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../lib/services/authService"; // Adjust path
import { AuthFormData } from "@/types/AuthFormTypes";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      const result = await loginUser(data);
      localStorage.setItem("token", result.token);
      router.push("/my-series");
    } catch (err) {
      setError(
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Login failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            type="text"
            label="Username"
            id="username"
            placeholder="Enter username"
            inputProps={register("Username", { required: "Username is required" })}
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

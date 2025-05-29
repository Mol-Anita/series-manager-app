"use client";

import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "../../lib/services/authService"; // Adjust path
import { AuthFormData } from "@/types/AuthFormTypes";


const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: AuthFormData) => {
    setIsSubmitting(true);
    setError("");
    try {
      await registerUser(data);
      router.push("/login");
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        setError((err as { message: string }).message);
      } else {
        setError("Registration failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-14 bg-stone-900 rounded-2xl w-3xl h-fit">
      <h1 className="font-bold text-3xl">Register</h1>
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
            placeholder="Choose username"
            inputProps={register("Username", { required: "Username is required" })}
            errors={errors}
          />
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
            placeholder="Choose password"
            inputProps={register("Password", { required: "Password is required" })}
            errors={errors}
          />
          <div className="flex justify-center">
            <SubmitButton isSubmitting={isSubmitting} text="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

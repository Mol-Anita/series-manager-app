"use client";

import React from "react";

type SubmitButtonProps = {
  isSubmitting: boolean;
  text: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting, text }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 ease-in-out
        ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;

"use client";

import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="w-full flex items-center justify-center border border-gray-300 rounded-md bg-white hover:bg-gray-50 py-2 px-4 shadow-sm transition-colors"
    >
      <svg
        className="h-5 w-5 mr-3"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4285F4"
          d="M533.5 278.4c0-17.4-1.5-34-4.4-50.2H272v95h146.9c-6.4 34.4-25.8 63.4-54.9 82.8v68.6h88.9c52-47.8 80.6-118.2 80.6-196.2z"
        />
        <path
          fill="#34A853"
          d="M272 544.3c73.7 0 135.5-24.5 180.6-66.7l-88.9-68.6c-24.7 16.6-56.2 26.4-91.7 26.4-70.5 0-130.2-47.6-151.6-111.5H29.1v69.9C74.7 482 166.3 544.3 272 544.3z"
        />
        <path
          fill="#FBBC05"
          d="M120.4 323.9c-10.4-31-10.4-64.8 0-95.8V158.2H29.1c-38.6 77.1-38.6 169.5 0 246.6l91.3-69.9z"
        />
        <path
          fill="#EA4335"
          d="M272 107.7c39.9-.6 78.2 14.1 107.6 41.2l80.4-80.4C407.5 24.4 343.9-1.2 272 0 166.3 0 74.7 62.3 29.1 158.2l91.3 69.9C141.8 155.3 201.5 107.7 272 107.7z"
        />
      </svg>
      <span className="text-sm font-medium text-gray-800">
        Se connecter avec Google
      </span>
    </button>
  );
}

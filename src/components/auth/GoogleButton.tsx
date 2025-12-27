"use client";

import Image from "next/image";

export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 py-2.5 border rounded-md bg-white hover:bg-gray-50 transition"
    >
      <Image src="/google.svg" alt="Google" width={20} height={20} />
      <span className="text-sm font-medium text-gray-700">
        Continue with Google
      </span>
    </button>
  );
}

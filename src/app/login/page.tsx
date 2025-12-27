"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import GoogleButton from "@/components/auth/GoogleButton";

export default function LoginPage() {
  const router = useRouter();
  const { login, loading, error, isAuthenticated } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form);
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen pt-28 px-4 flex items-center justify-center bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      {/* Card */}
      <div
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-8 sm:px-8
  shadow-[0_25px_80px_-20px_rgba(196,122,44,0.55)]"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">
            Continue your spiritual journey
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C47A2C] text-white py-2.5 rounded-lg font-medium hover:bg-[#b56f26] transition disabled:opacity-70"
          >
            {loading ? "Logging in…" : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <GoogleButton />

          <p
            className="text-sm text-center text-[#C47A2C] cursor-pointer mt-4 hover:underline"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </p>
        </form>
      </div>
    </div>
  );
}

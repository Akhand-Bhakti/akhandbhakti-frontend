"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import GoogleButton from "@/components/auth/GoogleButton";

export default function RegisterPage() {
  const router = useRouter();
  const { register, actionLoading, error, isAuthenticated, authLoading } =
    useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
  };

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/");
    }
  }, [authLoading, isAuthenticated, router]);

  return (
    <div className="min-h-screen px-4 flex items-center justify-center bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      {/* Card */}
      <div
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-8 sm:px-8
        shadow-[0_20px_60px_-15px_rgba(196,122,44,0.45)]"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Your Account
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Begin your journey with Akhand Bhakti
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* Password hint */}
          <p className="text-xs text-gray-500 -mt-2">
            Password should be at least 8 characters
          </p>

          <button
            type="submit"
            disabled={actionLoading}
            className="w-full bg-[#C47A2C] text-white py-2.5 rounded-lg font-medium
              hover:bg-[#b56f26] transition disabled:opacity-70"
          >
            {actionLoading ? "Creating account…" : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <GoogleButton />
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-[#C47A2C] cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

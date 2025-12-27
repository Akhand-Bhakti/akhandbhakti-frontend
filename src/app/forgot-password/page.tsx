"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { data } = await api.post("/auth/password/forgot", { email });
      setMessage(data.message || "Reset link sent to your email");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 flex items-center justify-center bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      {/* Card */}
      <div
        className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-8 sm:px-8
        shadow-[0_20px_60px_-15px_rgba(196,122,44,0.45)]"
      >
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Enter your registered email. We’ll send you a reset link.
          </p>
        </div>

        {/* Success */}
        {message && (
          <p className="text-sm text-green-600 mb-4 text-center">{message}</p>
        )}

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C47A2C] text-white py-2.5 rounded-lg font-medium
              hover:bg-[#b56f26] transition disabled:opacity-70"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
}

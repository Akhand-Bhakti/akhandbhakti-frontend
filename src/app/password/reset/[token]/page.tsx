"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/auth/reset/${token}`, {
        password,
        confirmPassword,
      });

      setSuccess("Password updated successfully. Redirecting to login…");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Reset link is invalid or expired"
      );
    } finally {
      setLoading(false);
    }
  };

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
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Choose a new password to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        {/* Success */}
        {success && (
          <p className="text-sm text-green-600 mb-4 text-center">{success}</p>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Hint */}
          <p className="text-xs text-gray-500 -mt-2">
            Password should be at least 8 characters
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C47A2C] text-white py-2.5 rounded-lg font-medium
              hover:bg-[#b56f26] transition disabled:opacity-70"
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

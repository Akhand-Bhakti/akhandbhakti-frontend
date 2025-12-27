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
    <div className="max-w-md mx-auto mt-24 px-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Forgot Password
      </h1>

      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your registered email. We’ll send you a reset link.
      </p>

      {message && (
        <p className="text-green-600 text-sm mb-4 text-center">{message}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="email"
          placeholder="Email address"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </div>
  );
}

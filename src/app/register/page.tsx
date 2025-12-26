"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading, error, isAuthenticated } = useAuthStore();

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
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="max-w-md mx-auto mt-24 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Create Account
      </h1>

      {error && (
        <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border px-3 py-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-sm text-center mt-6">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => router.push("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}

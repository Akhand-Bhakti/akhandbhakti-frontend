"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RequireAuth from "@/components/auth/RequireAuth";
import { useAuthStore } from "@/store/authStore";

export default function ChangePasswordPage() {
  return (
    <RequireAuth>
      <ChangePasswordContent />
    </RequireAuth>
  );
}

function ChangePasswordContent() {
  const router = useRouter();
  const { changePassword, actionLoading, error } = useAuthStore();
  const [localError, setLocalError] = useState("");
  const { user } = useAuthStore();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (form.newPassword !== form.confirmPassword) {
      setLocalError("New password and confirm password do not match");
      return;
    }

    const success = await changePassword(form);

    if (success) {
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 flex items-center justify-center bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-8 sm:px-8 shadow-[0_20px_60px_-15px_rgba(196,122,44,0.45)]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Change Password
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Update your account security
          </p>
        </div>
        {localError && (
          <p className="text-sm text-red-500 mb-4 text-center">{localError}</p>
        )}
        {error && (
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={user?.email || ""}
            readOnly
            className="hidden"
          />
          <input
            type="password"
            placeholder="Current password"
            autoComplete="current-password"
            className="w-full rounded-lg border px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.oldPassword}
            onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="New password"
            autoComplete="new-password"
            className="w-full rounded-lg border px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            autoComplete="new-password"
            className="w-full rounded-lg border px-4 py-2.5 text-sm
              focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            required
          />

          <button
            type="submit"
            disabled={actionLoading}
            className="w-full bg-[#C47A2C] text-white py-2.5 rounded-lg font-medium
              hover:bg-[#b56f26] transition disabled:opacity-70"
          >
            {actionLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

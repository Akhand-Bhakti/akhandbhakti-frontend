"use client";

import RequireAuth from "@/components/auth/RequireAuth";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  return (
    <RequireAuth>
      <ProfileContent />
    </RequireAuth>
  );
}

function ProfileContent() {
  const router = useRouter();
  const { user, logout, updateProfile, actionLoading } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(() => user?.name ?? "");

  if (!user) return null;

  return (
    <div className="min-h-screen pt-8 px-4 bg-linear-to-b from-[#f8efe4] via-[#fdf6ee] to-white">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_60px_-15px_rgba(196,122,44,0.45)]">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#C47A2C]/20 flex items-center justify-center text-3xl font-semibold text-[#C47A2C]">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h1>

              {user.email && (
                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
              )}

              {user.phone && (
                <p className="text-sm text-gray-600 mt-1">{user.phone}</p>
              )}

              <p className="text-xs mt-2 inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                {user.role === "admin" ? "Admin" : "User"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setEditing(true)}
            className="w-full py-3 rounded-xl bg-white border hover:bg-gray-50 transition"
          >
            Edit Profile
          </button>

          <button
            className="w-full py-3 rounded-xl bg-white border hover:bg-gray-50 transition"
            onClick={() => router.push("/change-password")}
          >
            Change Password
          </button>

          <button
            onClick={logout}
            className="sm:col-span-2 w-full py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            Logout
          </button>
        </div>
        {editing && (
          <div className="mt-6 bg-white/80 rounded-xl p-5">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await updateProfile({ name });
                setEditing(false);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border px-4 py-2.5
          focus:outline-none focus:ring-2 focus:ring-[#C47A2C]/40"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 bg-[#C47A2C] text-white py-2.5 rounded-lg"
                >
                  {actionLoading ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setName(user.name);
                    setEditing(false);
                  }}
                  className="flex-1 border py-2.5 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

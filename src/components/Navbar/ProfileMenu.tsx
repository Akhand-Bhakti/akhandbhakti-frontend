"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProfileMenuProps {
  open: boolean;
}

export default function ProfileMenu({ open }: ProfileMenuProps) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  if (!open) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50">
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => router.push("/profile")}
      >
        Profile
      </button>

      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => router.push("/orders")}
      >
        Orders
      </button>

      <button
        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

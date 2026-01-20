"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef } from "react";

interface ProfileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileMenu({ open, onClose }: ProfileMenuProps) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/");
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-3 w-48 bg-white text-black rounded-xl shadow-lg overflow-hidden z-50"
    >
      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          router.push("/profile");
          onClose();
        }}
      >
        Profile
      </button>

      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          router.push("/orders");
          onClose();
        }}
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

"use client";
import Link from "next/link";

export default function ProfileMenu({ open }: any) {
  if (!open) return null;

  return (
    <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-xl w-40 z-50">
      <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
        My Account
      </Link>
      <Link href="/orders" className="block px-4 py-2 hover:bg-gray-100">
        My Orders
      </Link>
      <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
        Logout
      </button>
    </div>
  );
}

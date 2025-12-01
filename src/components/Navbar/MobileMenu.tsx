"use client";
import Link from "next/link";
import { X } from "lucide-react";

export default function MobileMenu({ open, setOpen }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100">
      <div className="w-72 h-full bg-white p-6 shadow-xl animate-slideIn">
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-semibold">Menu</h1>
          <X className="cursor-pointer" onClick={() => setOpen(false)} />
        </div>

        <div className="flex flex-col gap-4 text-gray-700">
          <Link href="/products">Products</Link>
          <Link href="/category/rudraksha">Rudraksha</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </div>
  );
}

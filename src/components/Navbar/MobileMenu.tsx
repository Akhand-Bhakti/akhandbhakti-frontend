"use client";

import Link from "next/link";
import { X } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      {/* Menu Panel */}
      <div
        className="w-72 h-full bg-white p-6 shadow-xl animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h1 className="text-lg font-semibold">Menu</h1>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-4 text-gray-700">
          <Link href="/" onClick={onClose}>
            Home
          </Link>
          <Link href="/products" onClick={onClose}>
            Products
          </Link>
          <Link href="/category/rudraksha" onClick={onClose}>
            Rudraksha
          </Link>
          <Link href="/gallery" onClick={onClose}>
            Gallery
          </Link>
          <Link href="/about" onClick={onClose}>
            About
          </Link>
          <Link href="/contact" onClick={onClose}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

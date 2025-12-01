"use client";
import { Search } from "lucide-react";

export default function SearchModal({ open, setOpen }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-lg flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-full px-6 py-4 flex items-center">
        <Search className="text-gray-500" />
        <input
          type="text"
          autoFocus
          placeholder="Search sacred items..."
          className="flex-1 ml-4 outline-none bg-transparent"
        />
        <button onClick={() => setOpen(false)} className="text-xl px-2">
          ✕
        </button>
      </div>
    </div>
  );
}

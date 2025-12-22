"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchModal({ open, setOpen }: any) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/products?keyword=${encodeURIComponent(search.trim())}`);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="fixed inset-0 z-200 bg-black/60 backdrop-blur-lg flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-full px-6 py-4 flex items-center"
      >
        <Search className="text-gray-500" />
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search sacred items..."
          className="flex-1 ml-4 outline-none bg-transparent"
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xl px-2"
        >
          ✕
        </button>
      </form>
    </div>
  );
}

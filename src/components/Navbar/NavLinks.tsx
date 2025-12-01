"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useRef } from "react";

export default function NavLinks() {
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const active = (path: string) =>
    pathname === path
      ? "text-white font-bold"
      : "text-white/90 hover:text-white font-semibold";

  // Close dropdown on Escape (optional, small enhancement)
  if (typeof window !== "undefined") {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setDropdown(false);
    });
  }

  return (
    <div className="flex items-center gap-8 text-base font-semibold">
      <Link href="/products" className={active("/products")}>
        Products
      </Link>

      {/* Dropdown */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
        ref={triggerRef}
      >
        <div
          className="flex items-center gap-1 text-white/90 hover:text-white font-semibold select-none"
          role="button"
          aria-haspopup="true"
          aria-expanded={dropdown}
          tabIndex={0}
          onFocus={() => setDropdown(true)}
          onBlur={(e) => {
            // keep open if focus moved inside the dropdown
            const next = (e.relatedTarget as HTMLElement) || null;
            if (!next || !triggerRef.current?.contains(next))
              setDropdown(false);
          }}
        >
          Categories <ChevronDown size={18} />
        </div>

        {dropdown && (
          <div
            className="absolute top-full left-0 mt-0 bg-white text-black p-4 rounded-xl shadow-xl w-48 z-50
                       transform transition-all duration-150 ease-out opacity-100 translate-y-1"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            // Keep focusable for keyboard users
            tabIndex={-1}
          >
            <Link
              href="/category/rudraksha"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Rudraksha
            </Link>
            <Link
              href="/category/bracelet"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Bracelet
            </Link>
            <Link
              href="/category/yantra"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Yantra
            </Link>
            <Link
              href="/category/gemstone"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Gemstone
            </Link>
            <Link
              href="/category/other"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Other Items
            </Link>
          </div>
        )}
      </div>

      <Link href="/gallery" className={active("/gallery")}>
        Gallery
      </Link>
      <Link href="/about" className={active("/about")}>
        About
      </Link>
      <Link href="/contact" className={active("/contact")}>
        Contact
      </Link>
    </div>
  );
}

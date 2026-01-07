"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface NavLinksProps {
  isScrolled: boolean;
}

export default function NavLinks({ isScrolled }: NavLinksProps) {
  const pathname = usePathname();
  const [dropdown, setDropdown] = useState(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  // ACTIVE LINK STYLE
  const active = (path: string) =>
    pathname === path
      ? `${isScrolled ? "text-black" : "text-white"} font-bold`
      : `${
          isScrolled
            ? "text-white/80 hover:text-white"
            : "text-white/90 hover:text-white"
        } font-semibold`;

  // Escape closes dropdown
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdown(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      className={`flex items-center gap-8 text-base font-semibold transition-colors duration-300`}
    >
      {/* Products */}
      <Link href="/products" className={active("/products")}>
        Products
      </Link>

      {/* Categories Dropdown */}
      <div
        className="relative cursor-pointer"
        onMouseEnter={() => setDropdown(true)}
        onMouseLeave={() => setDropdown(false)}
        ref={triggerRef}
      >
        <div
          className={`
            flex items-center gap-1 select-none font-semibold
            ${
              isScrolled
                ? "text-white/80 hover:text-white"
                : "text-white/90 hover:text-white"
            }
          `}
          role="button"
          aria-haspopup="true"
          aria-expanded={dropdown}
          tabIndex={0}
          onFocus={() => setDropdown(true)}
          onBlur={(e) => {
            const next = (e.relatedTarget as HTMLElement) || null;
            if (!next || !triggerRef.current?.contains(next))
              setDropdown(false);
          }}
        >
          Categories <ChevronDown size={18} />
        </div>

        {/* Dropdown menu */}
        {dropdown && (
          <div
            className="absolute top-full left-0 mt-0 bg-white text-black p-4 rounded-xl shadow-xl w-48 z-50
                       transform transition-all duration-150 ease-out opacity-100 translate-y-1"
            tabIndex={-1}
          >
            <Link
              href="/products?category=rudraksha%20malas"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Rudraksha Malas
            </Link>
            <Link
              href="/products?category=wearables"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Wearables
            </Link>
            <Link
              href="/products?category=rudraksha%20beads"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Rudraksha Beads
            </Link>
            <Link
              href="/products?category=puja%20essentials"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Puja Essentials
            </Link>
            {/* <Link
              href="/products?category=bracelet"
              className="block py-2 font-semibold hover:text-orange-600"
            >
              Other Items
            </Link> */}
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

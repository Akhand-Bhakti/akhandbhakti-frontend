"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50 transition-all duration-300 
          ${
            isScrolled
              ? "bg-[#9b4b33]/90 backdrop-blur-md shadow-md"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Akhand Bhakti Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <h1 className="text-white font-semibold text-lg tracking-wide">
              अखंड BHAKTI
            </h1>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 text-white">
            <Search
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setSearchOpen(true)}
            />

            <div className="relative cursor-pointer">
              <ShoppingBag className="hover:scale-110 transition" />
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs px-1.5 rounded-full">
                0
              </span>
            </div>

            <div className="relative">
              <User
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => setProfileOpen(!profileOpen)}
              />
              <ProfileMenu open={profileOpen} />
            </div>

            {/* Mobile Button */}
            <Menu
              className="cursor-pointer md:hidden"
              onClick={() => setMobileOpen(true)}
            />
          </div>
        </div>
      </nav>

      {/* Modals */}
      <SearchModal open={searchOpen} setOpen={setSearchOpen} />
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
    </>
  );
}

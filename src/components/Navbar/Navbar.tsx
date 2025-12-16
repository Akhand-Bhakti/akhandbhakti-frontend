"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";
import ProfileMenu from "./ProfileMenu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // TEMP auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleUserClick = () => {
    if (!isAuthenticated) {
      router.push("/register");
    } else {
      setProfileOpen(!profileOpen);
    }
  };

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
      `}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Akhand Bhakti Logo"
              width={88}
              height={58}
              // className="rounded-full"
            />
            <h1
              className={`font-semibold text-lg tracking-wide ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              अखंड BHAKTI
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex">
            <NavLinks isScrolled={isScrolled} /> {/* pass state here */}
          </div>

          {/* Right Icons */}
          <div
            className={`flex items-center gap-6 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            <Search
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setSearchOpen(true)}
            />

            <div className="relative cursor-pointer">
              <ShoppingBag className="hover:scale-110 transition" />
              <span
                className={`absolute -top-2 -right-2 text-xs px-1.5 rounded-full ${
                  isScrolled ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                0
              </span>
            </div>

            <div className="relative">
              <User
                className="cursor-pointer hover:scale-110 transition"
                onClick={handleUserClick}
              />
              {isAuthenticated && <ProfileMenu open={profileOpen} />}
            </div>

            <Menu
              className="cursor-pointer md:hidden"
              onClick={() => setMobileOpen(true)}
            />
          </div>
        </div>
      </nav>

      <SearchModal open={searchOpen} setOpen={setSearchOpen} />
      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
    </>
  );
}

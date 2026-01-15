"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";
import ProfileMenu from "./ProfileMenu";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

function AuthDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 mt-3 w-40 bg-white text-black rounded-xl shadow-lg overflow-hidden">
      <Link
        href="/login"
        className="block px-4 py-2 hover:bg-gray-100"
        onClick={onClose}
      >
        Login
      </Link>
      <Link
        href="/register"
        className="block px-4 py-2 hover:bg-gray-100"
        onClick={onClose}
      >
        Register
      </Link>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { isAuthenticated, logout } = useAuthStore();
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setProfileOpen((prev) => !prev);
      setAuthMenuOpen(false);
    } else {
      setAuthMenuOpen((prev) => !prev);
      setProfileOpen(false);
    }
  };

  const navbarBg = isHome
    ? isScrolled
      ? "bg-[#C47A2C] shadow-md"
      : "bg-transparent"
    : "bg-[#C47A2C] shadow-md";

  const textColor = isHome && !isScrolled ? "text-white" : "text-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Akhand Bhakti Logo"
              width={88}
              height={58}
            />
            <h1 className={`font-semibold text-lg tracking-wide ${textColor}`}>
              अखंड BHAKTI
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex">
            <NavLinks isScrolled={!isHome || isScrolled} />
          </div>

          {/* Right Icons */}
          <div className={`flex items-center gap-6 ${textColor}`}>
            <Search
              className="cursor-pointer hover:scale-110 transition"
              onClick={() => setSearchOpen(true)}
            />

            <Link href="/cart" className="relative cursor-pointer">
              <ShoppingBag className="hover:scale-110 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs px-1.5 rounded-full bg-white text-black">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <User
                className="cursor-pointer hover:scale-110 transition"
                onClick={handleUserClick}
              />

              {/* Logged-in user menu */}
              {isAuthenticated && profileOpen && (
                <ProfileMenu open={profileOpen} />
              )}

              {/* Guest user menu */}
              {!isAuthenticated && authMenuOpen && (
                <AuthDropdown onClose={() => setAuthMenuOpen(false)} />
              )}
            </div>

            <Menu
              className="cursor-pointer lg:hidden"
              onClick={() => setMobileOpen(true)}
            />
          </div>
        </div>
      </nav>

      <SearchModal open={searchOpen} setOpen={setSearchOpen} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Search, ShoppingBag, User, Menu } from "lucide-react";
// import NavLinks from "./NavLinks";
// import MobileMenu from "./MobileMenu";
// import SearchModal from "./SearchModal";
// import ProfileMenu from "./ProfileMenu";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//   const router = useRouter();

//   const [isScrolled, setIsScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   // TEMP auth state
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleUserClick = () => {
//     if (!isAuthenticated) {
//       router.push("/register");
//     } else {
//       setProfileOpen(!profileOpen);
//     }
//   };

//   return (
//     <>
//       <nav
//         className={`
//         fixed top-0 left-0 w-full z-50 transition-all duration-300
//         ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
//       `}
//       >
//         <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
//           {/* Logo */}
//           <Link href="/" className="flex items-center gap-3">
//             <Image
//               src="/logo.png"
//               alt="Akhand Bhakti Logo"
//               width={88}
//               height={58}
//               // className="rounded-full"
//             />
//             <h1
//               className={`font-semibold text-lg tracking-wide ${
//                 isScrolled ? "text-black" : "text-white"
//               }`}
//             >
//               अखंड BHAKTI
//             </h1>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex">
//             <NavLinks isScrolled={isScrolled} /> {/* pass state here */}
//           </div>

//           {/* Right Icons */}
//           <div
//             className={`flex items-center gap-6 ${
//               isScrolled ? "text-black" : "text-white"
//             }`}
//           >
//             <Search
//               className="cursor-pointer hover:scale-110 transition"
//               onClick={() => setSearchOpen(true)}
//             />

//             <div className="relative cursor-pointer">
//               <ShoppingBag className="hover:scale-110 transition" />
//               <span
//                 className={`absolute -top-2 -right-2 text-xs px-1.5 rounded-full ${
//                   isScrolled ? "bg-black text-white" : "bg-white text-black"
//                 }`}
//               >
//                 0
//               </span>
//             </div>

//             <div className="relative">
//               <User
//                 className="cursor-pointer hover:scale-110 transition"
//                 onClick={handleUserClick}
//               />
//               {isAuthenticated && <ProfileMenu open={profileOpen} />}
//             </div>

//             <Menu
//               className="cursor-pointer md:hidden"
//               onClick={() => setMobileOpen(true)}
//             />
//           </div>
//         </div>
//       </nav>

//       <SearchModal open={searchOpen} setOpen={setSearchOpen} />
//       <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
//     </>
//   );
// }

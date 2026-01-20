"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import SearchModal from "./SearchModal";
import ProfileMenu from "./ProfileMenu";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";

function AuthDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-xl shadow-lg overflow-hidden">
      <Link
        href="/login"
        className="block px-4 py-2 text-sm hover:bg-gray-100"
        onClick={onClose}
      >
        Login
      </Link>
      <Link
        href="/register"
        className="block px-4 py-2 text-sm hover:bg-gray-100"
        onClick={onClose}
      >
        Register
      </Link>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const { isAuthenticated, authLoading } = useAuthStore();
  const cartCount = useCartStore((s) => s.getTotalItems());

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const handleUserClick = () => {
    if (isAuthenticated) {
      setProfileOpen((p) => !p);
      setAuthMenuOpen(false);
    } else {
      setAuthMenuOpen((p) => !p);
      setProfileOpen(false);
    }
  };

  const navbarBg = isHome
    ? isScrolled
      ? "bg-[#C47A2C] shadow-md"
      : "bg-transparent"
    : "bg-[#C47A2C] shadow-md";

  return (
    <>
      {authLoading ? null : (
        <nav
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
        >
          <div
            className="
              mx-auto w-full
              max-w-6xl 2xl:max-w-[1400px]
              h-16 sm:h-18 lg:h-20
              px-4 sm:px-6 lg:px-8
              flex items-center justify-between
            "
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/logo.png"
                alt="Akhand Bhakti Logo"
                width={120}
                height={78}
                className="h-auto w-auto max-w-[120px]"
              />
              <h1 className="font-semibold tracking-wide text-white text-xs sm:text-base lg:text-lg leading-tight">
                <span className="block sm:inline">अखंड</span>
                <span className="block sm:inline sm:ml-1">BHAKTI</span>
              </h1>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex">
              <NavLinks isScrolled={!isHome || isScrolled} />
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 text-white">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 sm:p-2 hover:scale-110 transition"
              >
                <Search size={24} />
              </button>

              <Link href="/cart" className="relative p-1.5 sm:p-2">
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-[10px] sm:text-xs px-1.5 rounded-full bg-white text-black">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative">
                <button
                  onClick={handleUserClick}
                  className="p-1.5 sm:p-2 hover:scale-110 transition"
                >
                  <User size={24} />
                </button>

                {isAuthenticated && profileOpen && (
                  <ProfileMenu open={profileOpen} />
                )}

                {!isAuthenticated && authMenuOpen && (
                  <AuthDropdown onClose={() => setAuthMenuOpen(false)} />
                )}
              </div>

              {/* Mobile Menu */}
              <button
                className="xl:hidden p-1.5 sm:p-2"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      )}

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

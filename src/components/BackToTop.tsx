"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-24 right-6 z-50
        bg-white text-black
        p-3 rounded-full shadow-lg
        transition-all duration-300
        hover:scale-110
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      aria-label="Scroll to top"
    >
      <ArrowUp size={22} />
    </button>
  );
}

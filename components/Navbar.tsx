"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo_lper.png"
            alt="LPER"
            width={60}
            height={60}
            className="sm:w-[55px] sm:h-[55px]"
          />
          <Image
            src="/logo-koperasi.png"
            alt="Koperasi"
            width={60}
            height={60}
            className="sm:w-[55px] sm:h-[55px]"
          />
        </div>
      </div>
    </nav>
  );
}

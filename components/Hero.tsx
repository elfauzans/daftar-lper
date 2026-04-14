"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const images = ["/hero.png", "/hero2.png", "/hero3.png"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f8fafc] px-4 sm:px-6 pt-28">
      {/* ORNAMEN */}
      <div className="absolute inset-0 flex justify-center items-center opacity-[0.08] pointer-events-none">
        <Image
          src="/leaf.png"
          alt="Ornamen daun koperasi"
          width={900}
          height={900}
        />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 md:gap-10 items-start relative z-10 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left mt-6 md:mt-16"
        >
          {/* LABEL */}
          <p className="text-sm sm:text-base font-medium text-gray-500 mb-2 tracking-wide">
            Koperasi LPER Indonesia
          </p>

          {/* HEADLINE */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.2] text-[#1e3a72] mb-3">
            Bergabung & Tumbuh <br />
            Bersama Peternak Indonesia
          </h1>

          {/* SUB HEADLINE (HIGHLIGHT) */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#16a34a] mb-4">
            Daftar Anggota Koperasi LPER Indonesia
          </h2>

          <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-lg leading-relaxed">
            Koperasi Produsen Usaha LPER adalah koperasi yang berfokus pada
            sektor peternakan ayam layer dan broiler, dengan sistem usaha
            terpadu dari hulu hingga hilir. Kegiatan kami mencakup pembibitan,
            penyediaan sarana produksi ternak (sapronak), hingga proses
            budidaya. Melalui pengelolaan yang terstruktur dan berorientasi pada
            pemberdayaan, kami berkomitmen mewujudkan kebangkitan peternak
            rakyat serta meningkatkan kemandirian dan kesejahteraan anggota.
          </p>

          <a
            href="#daftar"
            className="inline-block bg-[#1e3a72] text-white px-6 py-3 rounded-xl hover:bg-[#16305f] transition shadow-md font-medium"
          >
            Daftar Anggota Sekarang →
          </a>
        </motion.div>

        {/* ================= IMAGE ================= */}
        <div className="flex justify-center md:justify-end mt-6 md:mt-0">
          <div className="relative w-full max-w-[90%] sm:max-w-[420px] md:max-w-[550px] lg:max-w-[600px] h-[320px] sm:h-[420px] md:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full h-full"
              >
                <Image
                  src={images[index]}
                  alt="Kegiatan Koperasi LPER Indonesia"
                  fill
                  className="object-contain md:object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* DOT */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === index ? "bg-[#1e3a72] scale-110" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

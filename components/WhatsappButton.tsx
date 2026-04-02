"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* 🔥 TEXT BUBBLE */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.6,
          delay: 1,
        }}
        className="hidden md:block bg-white text-gray-700 px-4 py-2 rounded-full shadow-md text-sm"
      >
        Butuh bantuan?
      </motion.div>

      {/* 🔥 WRAPPER BUTTON */}
      <motion.a
        href="https://wa.me/6287797894548"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative"
      >
        {/* 🔥 PULSE HALUS */}
        <motion.span
          className="absolute inset-0 rounded-full bg-green-400"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 1.5,
          }}
        />

        {/* 🔥 BUTTON UTAMA */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        >
          <FaWhatsapp className="text-2xl" />
        </motion.div>
      </motion.a>
    </div>
  );
}

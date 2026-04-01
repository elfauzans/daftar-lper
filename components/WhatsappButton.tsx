"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappButton() {
  return (
    <motion.a
      href="https://wa.me/6287797894548"
      target="_blank"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-green-400"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      <motion.div
        whileHover={{ scale: 1.1, y: 0 }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-green-500 text-white p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] flex items-center justify-center"
      >
        <FaWhatsapp className="text-xl md:text-2xl" />
      </motion.div>
    </motion.a>
  );
}

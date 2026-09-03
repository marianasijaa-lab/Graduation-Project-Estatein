import React from "react";
import { motion } from "framer-motion";

export const StarCluster: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center text-placeholder gap-1.5 mb-2.5 ${className}`} aria-hidden="true">
      {/* النجمة الكبيرة الأولى */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0 }}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </motion.svg>
      {/* النجمة المتوسطة الثانية */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3.5 h-3.5 opacity-70"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        whileInView={{ opacity: 0.7, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </motion.svg>
      {/* النجمة الصغيرة الثالثة */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-2.5 h-2.5 opacity-40"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        whileInView={{ opacity: 0.4, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
      </motion.svg>
    </div>
  );
};
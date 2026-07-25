"use client";

import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  title: string;
}

export default function SectionWrapper({ children, id, title }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className="py-20 px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center text-white mb-12">
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  );
}
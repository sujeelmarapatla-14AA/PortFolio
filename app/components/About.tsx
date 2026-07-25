"use client";

import Image from "next/image";
import { about, name } from "@/data/content";
import SectionWrapper from "./SectionWrapper";
import TextType from "@/components/ui/TextType";
import { motion } from "framer-motion";

export default function About() {
  return (
    <SectionWrapper id="about" title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Giant Orange Condensed Display Name Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-left"
        >
          <h2 className="font-condensed text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black text-[#ff3b11] leading-[0.85] tracking-tight uppercase select-none">
            {name.toUpperCase()}
          </h2>
        </motion.div>

        {/* Content Split: Left Dark Card + Right Lanyard Student ID Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Dark Studio Card with Larger TextType Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-[#111111] text-white rounded-[28px] p-8 md:p-12 shadow-2xl flex flex-col justify-between border border-white/10"
          >
            <div>
              <h3 className="font-condensed text-3xl md:text-5xl tracking-wide uppercase text-white font-bold mb-6 leading-tight">
                CREATIVE CODE & VISUAL DESIGN
              </h3>

              <div className="min-h-[220px] flex items-start">
                <TextType
                  text={about}
                  typingSpeed={35}
                  deletingSpeed={18}
                  pauseDuration={3000}
                  loop={true}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-[#ff3b11] font-bold text-2xl md:text-3xl"
                  startOnVisible={true}
                  className="text-gray-100 text-lg md:text-xl lg:text-2xl leading-relaxed font-sans font-medium"
                />
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-gray-400 font-semibold uppercase tracking-wider">
              <span>MLR Institute of Technology</span>
              <span>•</span>
              <span>B.Tech CSE (AI & ML)</span>
            </div>
          </motion.div>

          {/* Right Lanyard Student ID Card (Only inside About section) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-[#f4f4f4] rounded-[28px] border border-gray-300/80 p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg min-h-[420px]"
          >
            {/* Hanging Lanyard Strap Design */}
            <div className="flex flex-col items-center mb-3">
              {/* Lanyard Fabric Strap */}
              <div className="w-16 h-10 border-x-4 border-[#ff3b11] bg-gradient-to-b from-[#ff3b11]/80 to-[#d9300c] shadow-md rounded-b-md" />
              {/* Metallic Clip Ring */}
              <div className="w-8 h-3.5 bg-gradient-to-r from-gray-400 via-white to-gray-400 border border-gray-500 rounded-sm shadow-md -mt-1 z-10" />
            </div>

            {/* Student ID Card Container */}
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 border-2 border-gray-200/90 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500 cursor-target">
              {/* Top Card Header: MLRIT Logo & Specialization Badge */}
              <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-gray-200">
                <Image
                  src="/mlrit-logo.png"
                  alt="MLR Institute of Technology Logo"
                  width={140}
                  height={40}
                  priority
                  className="h-8 md:h-9 w-auto object-contain"
                />
                <span className="bg-[#7c3aed] text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-extrabold uppercase tracking-wider shadow-sm">
                  CSE AI/ML
                </span>
              </div>

              {/* Student Photo */}
              <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-md mb-4 bg-gray-100">
                <Image
                  src="/sujeel-photo.jpg"
                  alt={name}
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Student Credentials & Details */}
              <div className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <h4 className="font-sans text-xl font-extrabold text-black">
                    {name}
                  </h4>
                  <span className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    2025 - 2029
                  </span>
                </div>
                <p className="text-xs font-bold text-[#ff3b11] tracking-wide uppercase">
                  B.Tech CSE (AI & Machine Learning)
                </p>
                <p className="text-[11px] font-medium text-gray-500">
                  MLR Institute of Technology, Hyderabad
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
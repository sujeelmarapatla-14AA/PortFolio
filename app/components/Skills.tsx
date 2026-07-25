"use client";

import { skillCategories } from "@/data/content";
import SectionWrapper from "./SectionWrapper";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function Skills() {
  return (
    <SectionWrapper id="skills" title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Left Stylized Devanagari Header */}
        <div className="mb-10 text-left">
          <h2 className="font-devanagari text-5xl md:text-6xl text-[#ff3b11] tracking-wide font-normal">
            skills & expertise
          </h2>
          <p className="text-xs md:text-sm text-gray-600 font-medium mt-2 max-w-xl">
            A comprehensive overview of technical languages, database architectures, artificial intelligence specializations, and developer tools.
          </p>
        </div>

        {/* 4 Studio Skill Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {skillCategories.map((cat, catIdx) => {
            const isDarkCard = catIdx % 2 === 0;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                className={`group cursor-target relative flex flex-col justify-between p-8 md:p-10 rounded-[28px] shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isDarkCard
                    ? "bg-[#111111] text-white border border-white/10"
                    : "bg-white text-black border border-gray-300/80 shadow-md"
                }`}
              >
                {/* Card Header: Category & Subtitle */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span
                      className={`text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider ${cat.badgeColor}`}
                    >
                      {cat.category}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono ${
                        isDarkCard ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      0{catIdx + 1}
                    </span>
                  </div>

                  <h3
                    className={`font-condensed text-2xl md:text-3xl font-extrabold uppercase mb-2 ${
                      isDarkCard ? "text-white" : "text-black"
                    }`}
                  >
                    {cat.category}
                  </h3>
                  <p
                    className={`text-xs font-medium mb-6 ${
                      isDarkCard ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {cat.subtitle}
                  </p>

                  {/* Skill Items List with Detailed Descriptions */}
                  <div className="space-y-4 border-t pt-6 border-current/10">
                    {cat.items.map((item) => (
                      <div key={item.name} className="flex items-start gap-3">
                        <CheckCircleIcon
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            isDarkCard ? "text-[#ff3b11]" : "text-[#7c3aed]"
                          }`}
                        />
                        <div>
                          <h4
                            className={`text-sm md:text-base font-extrabold tracking-wide ${
                              isDarkCard ? "text-white" : "text-black"
                            }`}
                          >
                            {item.name}
                          </h4>
                          <p
                            className={`text-xs md:text-sm mt-1 leading-relaxed font-normal ${
                              isDarkCard ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
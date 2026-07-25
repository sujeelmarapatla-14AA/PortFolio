"use client";

import { projects } from "@/data/content";
import SectionWrapper from "./SectionWrapper";
import { CodeBracketIcon, ArrowTopRightOnSquareIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import ElectricBorder from "@/components/ui/ElectricBorder";

export default function Projects() {
  const cardGradients = [
    "from-[#ff5e3a] via-[#e11d48] to-[#1e1b4b]", // Card 1 Coral/Orange to Violet
    "from-[#06b6d4] via-[#2563eb] to-[#0f172a]", // Card 2 Cyan to Deep Blue
    "from-[#ec4899] via-[#8b5cf6] to-[#1e1035]", // Card 3 Magenta to Dark Purple
  ];

  const electricColors = ["#ff5e3a", "#7df9ff", "#ec4899"];

  return (
    <SectionWrapper id="projects" title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Left Stylized Devanagari Header */}
        <div className="mb-10 text-left">
          <h2 className="font-devanagari text-5xl md:text-6xl text-[#ff3b11] tracking-wide font-normal">
            projects
          </h2>
        </div>

        {/* 3 Uniform Electric Border Gradient Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {projects.map((project, index) => {
            const gradientClass = cardGradients[index % cardGradients.length];
            const electricColor = electricColors[index % electricColors.length];

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="h-full flex"
              >
                <ElectricBorder
                  color={electricColor}
                  speed={1.2}
                  chaos={0.15}
                  borderRadius={32}
                  className="w-full h-full"
                >
                  <div className={`group relative flex flex-col justify-between p-8 text-white bg-gradient-to-br ${gradientClass} min-h-[440px] h-full shadow-2xl transition-all duration-500 hover:-translate-y-1 rounded-[32px] border border-white/20`}>
                    {/* Background Watermark Number / Icon */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                    >
                      <span className="font-serif text-8xl md:text-9xl font-extrabold text-white/10 italic">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Top Section: Action Button or Number */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-extrabold tracking-widest uppercase bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                        Project 0{index + 1}
                      </span>

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors border border-white/30 backdrop-blur-md shadow-md"
                        >
                          <ArrowRightIcon className="w-5 h-5" />
                        </a>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 border border-white/15">
                          <ArrowRightIcon className="w-5 h-5 opacity-40" />
                        </div>
                      )}
                    </div>

                    {/* Middle Content */}
                    <div className="relative z-10 my-auto py-6">
                      <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-white mb-3 group-hover:translate-x-1 transition-transform">
                        {project.title}
                      </h3>
                      <p className="text-white/90 text-sm md:text-base leading-relaxed font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Section: Stack Badges & Links */}
                    <div className="relative z-10 pt-4 border-t border-white/20">
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.stack.map((tag) => (
                          <span
                            key={tag}
                            className="px-3.5 py-1 text-xs font-semibold text-white bg-black/30 rounded-full border border-white/20 backdrop-blur-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-white hover:text-white/80 transition-colors"
                        >
                          <CodeBracketIcon className="w-4 h-4" />
                          <span>Code Repository</span>
                        </a>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-white hover:text-white/80 transition-colors"
                          >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ElectricBorder>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
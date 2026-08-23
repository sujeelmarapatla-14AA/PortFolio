"use client";

import Image from "next/image";
import { name } from "@/data/content";
import { motion } from "framer-motion";
import Waves from "@/components/ui/Waves";
import LiquidGlassButton from "@/components/ui/LiquidGlassButton";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 px-6 md:px-12 flex flex-col justify-between overflow-hidden bg-[#e5e5e7] dark:bg-[#09080d] transition-colors duration-400"
    >
      {/* Background Interactive Waves Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Waves
          lineColor="#ff7c27"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={140}
          xGap={12}
          yGap={36}
        />
      </div>

      {/* Top Right Header Block: Signature, Tagline, GET IN TOUCH Button */}
      <div className="w-full max-w-7xl mx-auto flex justify-end mb-8 z-20">
        <div className="flex flex-col items-end text-right max-w-md space-y-3">
          {/* Cursive Signature */}
          <span className="font-signature text-4xl md:text-5xl text-black dark:text-white leading-none font-bold tracking-wide transition-colors">
            {name}
          </span>
          {/* Tagline */}
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed transition-colors">
            Hi, I&apos;m {name}. I bridge the gap between engineering and art to design immersive, high-performance web experiences.
          </p>
          {/* GET IN TOUCH Liquid Glass Button */}
          <LiquidGlassButton
            as="a"
            href="#contact"
            variant="light"
            className="px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-black dark:text-white border border-black/20 dark:border-white/30"
          >
            <span>GET IN TOUCH</span>
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </LiquidGlassButton>
        </div>
      </div>

      {/* Main Hero Grid Layout */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative z-20 my-auto">
        {/* Left Column: Vertical Stats Stack */}
        <div className="lg:col-span-3 flex flex-col gap-6 md:gap-8 justify-center z-20">
          <div className="border-t border-gray-300/80 dark:border-white/10 pt-4">
            <span className="text-3xl md:text-4xl font-extrabold text-[#ff3b11] font-sans">
              3+
            </span>
            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Years Experience
            </p>
          </div>

          <div className="border-t border-gray-300/80 dark:border-white/10 pt-4">
            <span className="text-3xl md:text-4xl font-extrabold text-[#ff3b11] font-sans">
              30+
            </span>
            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Projects Done
            </p>
          </div>

          <div className="border-t border-gray-300/80 dark:border-white/10 pt-4">
            <span className="text-3xl md:text-4xl font-extrabold text-[#ff3b11] font-sans">
              100%
            </span>
            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1">
              Creative Drive
            </p>
          </div>
        </div>

        {/* Center & Right Visual: Text in Center/Left + Corner Positioned Circular Avatar */}
        <div className="lg:col-span-9 relative flex items-center justify-end min-h-[420px] md:min-h-[480px]">
          {/* "I'M BORN TO CREATE |" Text positioned on the left/center */}
          <div
            aria-hidden="true"
            className="absolute inset-0 flex flex-col justify-center items-start pl-2 md:pl-4 select-none pointer-events-none z-0 opacity-70"
          >
            <span className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-black tracking-tight text-outline-gray leading-none">
              I&apos;M BORN TO
            </span>
            <span className="font-condensed text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-black tracking-tight text-[#ff3b11] leading-none">
              CREATE |
            </span>
          </div>

          {/* Perfect Circular Avatar Container with Hover Thought Cloud Bubble */}
          <div className="relative group ml-auto z-10 cursor-target">
            {/* Thought Cloud Speech Bubble (Appears only on Avatar Hover) */}
            <div className="absolute -top-16 -left-10 md:-top-20 md:-left-16 z-30 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out pointer-events-none select-none">
              <div className="relative bg-white dark:bg-[#181622] text-black dark:text-white border-2 border-black/90 dark:border-white/20 px-5 py-3 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.25)] flex items-center gap-2.5 whitespace-nowrap">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3b11] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff3b11]"></span>
                </span>
                <span className="text-xs md:text-sm font-extrabold uppercase tracking-wider text-black dark:text-white font-sans">
                  I&apos;m open to work — DM or Call Me! ✦
                </span>

                {/* Thought Cloud Tail Circles */}
                <div className="absolute -bottom-2.5 right-10 w-4 h-4 bg-white dark:bg-[#181622] border-r-2 border-b-2 border-black/90 dark:border-white/20 rounded-full" />
                <div className="absolute -bottom-5 right-7 w-2.5 h-2.5 bg-white dark:bg-[#181622] border-r-2 border-b-2 border-black/90 dark:border-white/20 rounded-full" />
              </div>
            </div>

            {/* Perfect Circle Avatar Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-[0_25px_60px_rgba(0,0,0,0.3)] ring-4 ring-[#ff3b11]/40 bg-gradient-to-b from-[#182333] via-[#0f1724] to-[#0a0f18]"
            >
              <Image
                src="/hero-avatar.png"
                alt={`${name} 3D Character Avatar`}
                fill
                priority
                className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700 rounded-full"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Tilted Electric Orange Marquee Ticker Banner */}
      <div className="w-full relative z-30 mt-12 mb-[-1rem]">
        <div className="w-[106%] -ml-[3%] transform -rotate-1 bg-[#ff3b11] text-white py-3.5 border-y border-[#d9300c] shadow-lg overflow-hidden select-none">
          <div className="animate-marquee flex items-center whitespace-nowrap gap-8 text-base md:text-lg font-condensed tracking-wider uppercase font-bold">
            <span>FULLSTACK DEVELOPER</span>
            <span className="text-white/80">✦</span>
            <span>WEB DESIGNER</span>
            <span className="text-white/80">✦</span>
            <span>CREATIVE CODE</span>
            <span className="text-white/80">✦</span>
            <span>INNOVATION</span>
            <span className="text-white/80">✦</span>
            <span>AI & MACHINE LEARNING</span>
            <span className="text-white/80">✦</span>
            <span>FULLSTACK DEVELOPER</span>
            <span className="text-white/80">✦</span>
            <span>WEB DESIGNER</span>
            <span className="text-white/80">✦</span>
            <span>CREATIVE CODE</span>
            <span className="text-white/80">✦</span>
            <span>INNOVATION</span>
            <span className="text-white/80">✦</span>
            <span>AI & MACHINE LEARNING</span>
            <span className="text-white/80">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
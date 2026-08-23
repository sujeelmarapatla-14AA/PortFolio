"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Shuffle from "@/components/ui/Shuffle";
import Waves from "@/components/ui/Waves";
import { useWavyTransition } from "@/components/ui/WavyPageTransition";
import LiquidGlassButton from "@/components/ui/LiquidGlassButton";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface IntroPageProps {
  onEnter: () => void;
}

export default function IntroPage({ onEnter }: IntroPageProps) {
  const [exiting, setExiting] = useState(false);
  const { triggerTransition } = useWavyTransition();

  const handleProceed = (e?: React.MouseEvent) => {
    if (exiting) return;
    setExiting(true);
    triggerTransition("hero", e);
    setTimeout(() => {
      onEnter();
    }, 600);
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9990] w-screen h-screen min-h-screen bg-[#e5e5e7] dark:bg-[#09080d] text-black dark:text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden select-none transition-colors duration-400"
        >
          {/* Background Interactive Waves Canvas */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <Waves
              lineColor="#ff3b11"
              backgroundColor="transparent"
              waveSpeedX={0.02}
              waveSpeedY={0.01}
              waveAmpX={50}
              waveAmpY={25}
              friction={0.9}
              tension={0.01}
              maxCursorMove={150}
              xGap={12}
              yGap={36}
            />
          </div>

          {/* Top Bar: Brand Star, Theme Toggle & Skip Intro Liquid Glass Button */}
          <header className="w-full max-w-7xl mx-auto flex items-center justify-between relative z-20">
            <div className="flex items-center gap-2">
              <span className="text-[#ff3b11] text-3xl font-bold">✦</span>
              <span className="font-condensed text-2xl font-black text-[#ff3b11] tracking-wider uppercase">
                PORTFOLIO INTRO
              </span>
            </div>

            {/* Top Right Controls: Theme Toggle & Skip Intro Button */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              <LiquidGlassButton
                onClick={(e: React.MouseEvent) => handleProceed(e)}
                variant="light"
                className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-white"
                aria-label="Skip portfolio intro"
              >
                <span>Skip intro ↗</span>
              </LiquidGlassButton>
            </div>
          </header>

          {/* Center Quote Display: “DREAM , DESIGN , DEVELOP” */}
          <main className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto relative z-20 text-center px-4">
            {/* Decorative Subtitle Tagline */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xs md:text-sm font-extrabold uppercase tracking-[0.3em] text-[#ff3b11] mb-6 font-sans"
            >
              SUJEEL MARAPATLA • CREATIVE PORTFOLIO
            </motion.span>

            {/* Exact Quote Shuffle Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full flex justify-center py-4"
            >
              <Shuffle
                text="“DREAM , DESIGN , DEVELOP”"
                tag="h1"
                shuffleDirection="right"
                duration={0.45}
                shuffleTimes={4}
                stagger={0.03}
                colorFrom="#ff3b11"
                colorTo="#111111"
                triggerOnHover={true}
                className="font-condensed text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-black leading-none uppercase"
              />
            </motion.div>
          </main>

          {/* Bottom Bar: Enter Portfolio Liquid Glass Button */}
          <footer className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative z-20 pb-4">
            <LiquidGlassButton
              onClick={(e: React.MouseEvent) => handleProceed(e)}
              variant="orange"
              className="px-8 md:px-10 py-3.5 md:py-4 text-xs md:text-sm font-extrabold uppercase tracking-widest text-white shadow-2xl"
              aria-label="Enter Portfolio"
            >
              <span>ENTER PORTFOLIO</span>
              <span className="group-hover:translate-x-1.5 transition-transform text-lg leading-none">
                →
              </span>
            </LiquidGlassButton>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

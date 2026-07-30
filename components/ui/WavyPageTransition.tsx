"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WavyTransitionContextType {
  triggerTransition: (targetSectionId: string, event?: React.MouseEvent) => void;
  isAnimating: boolean;
}

const WavyTransitionContext = createContext<WavyTransitionContextType>({
  triggerTransition: () => {},
  isAnimating: false,
});

export const useWavyTransition = () => useContext(WavyTransitionContext);
export const useBubbleTransition = useWavyTransition; // Alias for backward compatibility

export function WavyPageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 500, y: 500 });

  const triggerTransition = useCallback((targetSectionId: string, event?: React.MouseEvent) => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
      return;
    }

    if (isAnimating) return;

    // Calculate click coordinates in 1000x1000 SVG ViewBox coordinates
    if (event && typeof window !== "undefined") {
      const xPct = (event.clientX / window.innerWidth) * 1000;
      const yPct = (event.clientY / window.innerHeight) * 1000;
      setOrigin({ x: xPct, y: yPct });
    } else {
      setOrigin({ x: 500, y: 500 });
    }

    setIsAnimating(true);

    // Phase 2: Instant scroll when screen is fully covered by concentric orange circles
    setTimeout(() => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }, 550);

    // Phase 3: Complete transition after rings expand out
    setTimeout(() => {
      setIsAnimating(false);
    }, 1150);
  }, [isAnimating]);

  return (
    <WavyTransitionContext.Provider value={{ triggerTransition, isAnimating }}>
      {children}

      {/* Concentric Circle Ripple Iris Page Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, times: [0, 0.45, 0.75, 0.9, 1] }}
            className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-transparent"
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <defs>
                {/* 3D Soft Drop Shadow Filters for Concentric Rings */}
                <filter id="ring-glow-1" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="16" floodColor="#ff3b11" floodOpacity="0.6" />
                </filter>
                <filter id="ring-glow-2" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#ff7c27" floodOpacity="0.7" />
                </filter>

                {/* Pure Orange Shades Radial Gradients */}
                <radialGradient id="orange-disk-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ff7c27" />
                  <stop offset="60%" stopColor="#ff5e3a" />
                  <stop offset="100%" stopColor="#ff3b11" />
                </radialGradient>

                <linearGradient id="ring-grad-light" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffe0b2" />
                  <stop offset="100%" stopColor="#ffb74d" />
                </linearGradient>

                <linearGradient id="ring-grad-vibrant" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffa033" />
                  <stop offset="100%" stopColor="#ff5722" />
                </linearGradient>

                {/* Mask for Center Reveal on Exit */}
                <mask id="iris-reveal-mask">
                  <rect x="0" y="0" width="1000" height="1000" fill="white" />
                  <motion.circle
                    cx={origin.x}
                    cy={origin.y}
                    initial={{ r: 0 }}
                    animate={{ r: [0, 0, 0, 1600] }}
                    transition={{
                      duration: 1.15,
                      times: [0, 0.48, 0.55, 1],
                      ease: [0.65, 0, 0.35, 1],
                    }}
                    fill="black"
                  />
                </mask>
              </defs>

              {/* Main Concentric Expansion Disk with Center Reveal Mask */}
              <g mask="url(#iris-reveal-mask)">
                {/* Background Orange Solid Disk */}
                <motion.circle
                  cx={origin.x}
                  cy={origin.y}
                  initial={{ r: 0 }}
                  animate={{ r: [0, 1550, 1550, 1550] }}
                  transition={{
                    duration: 1.15,
                    times: [0, 0.5, 0.9, 1],
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  fill="url(#orange-disk-grad)"
                />

                {/* Concentric Ring 1: Inner Light Apricot Arc */}
                <motion.circle
                  cx={origin.x}
                  cy={origin.y}
                  initial={{ r: 0, rotate: 0 }}
                  animate={{ r: [0, 1200, 1400, 1600], rotate: [0, 90, 180, 270] }}
                  transition={{
                    duration: 1.15,
                    times: [0, 0.48, 0.8, 1],
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  fill="none"
                  stroke="url(#ring-grad-light)"
                  strokeWidth="32"
                  strokeDasharray="450 180"
                  opacity={0.85}
                  filter="url(#ring-glow-2)"
                />

                {/* Concentric Ring 2: Middle Warm Tangerine Arc */}
                <motion.circle
                  cx={origin.x}
                  cy={origin.y}
                  initial={{ r: 0, rotate: 45 }}
                  animate={{ r: [0, 900, 1250, 1550], rotate: [45, -45, -135, -225] }}
                  transition={{
                    duration: 1.15,
                    delay: 0.03,
                    times: [0, 0.46, 0.82, 1],
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  fill="none"
                  stroke="#ffcc80"
                  strokeWidth="24"
                  strokeDasharray="600 220"
                  opacity={0.9}
                />

                {/* Concentric Ring 3: Wide Citrus Accent Arc */}
                <motion.circle
                  cx={origin.x}
                  cy={origin.y}
                  initial={{ r: 0, rotate: 120 }}
                  animate={{ r: [0, 700, 1100, 1500], rotate: [120, 240, 360, 480] }}
                  transition={{
                    duration: 1.15,
                    delay: 0.05,
                    times: [0, 0.45, 0.85, 1],
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  fill="none"
                  stroke="url(#ring-grad-vibrant)"
                  strokeWidth="48"
                  strokeDasharray="350 120"
                  opacity={0.75}
                  filter="url(#ring-glow-1)"
                />

                {/* Concentric Ring 4: Outer Deep Flame Ring */}
                <motion.circle
                  cx={origin.x}
                  cy={origin.y}
                  initial={{ r: 0 }}
                  animate={{ r: [0, 450, 950, 1450] }}
                  transition={{
                    duration: 1.15,
                    delay: 0.07,
                    times: [0, 0.44, 0.88, 1],
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  fill="none"
                  stroke="#ffe0b2"
                  strokeWidth="16"
                  strokeDasharray="250 90"
                  opacity={0.8}
                />
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </WavyTransitionContext.Provider>
  );
}

export const BlackBubbleTransitionProvider = WavyPageTransitionProvider;
export default WavyPageTransitionProvider;

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

// SVG Path definitions for 3D Abstract Wavy Ribbon morphing (viewBox: 0 0 1000 1000)
const hiddenBottom = "M 0 1000 C 300 1000, 700 1000, 1000 1000 L 1000 1000 L 0 1000 Z";
const fullCover = "M 0 -100 L 1000 -100 L 1000 1000 L 0 1000 Z";
const hiddenTop = "M 0 -100 L 1000 -100 L 1000 -100 C 700 -100, 300 -100, 0 -100 Z";

// Ribbon 1 (Soft Golden-Orange 3D Wave Layer)
const ribbon1Rising = "M 0 380 C 280 120, 680 620, 1000 280 L 1000 1000 L 0 1000 Z";
const ribbon1Exiting = "M 0 -100 L 1000 -100 L 1000 380 C 680 120, 280 580, 0 200 Z";

// Ribbon 2 (Warm Tangerine Orange 3D Wave Layer)
const ribbon2Rising = "M 0 470 C 220 680, 580 180, 1000 420 L 1000 1000 L 0 1000 Z";
const ribbon2Exiting = "M 0 -100 L 1000 -100 L 1000 470 C 580 180, 220 680, 0 300 Z";

// Ribbon 3 (Vibrant Citrus Orange 3D Wave Layer)
const ribbon3Rising = "M 0 560 C 380 260, 720 720, 1000 500 L 1000 1000 L 0 1000 Z";
const ribbon3Exiting = "M 0 -100 L 1000 -100 L 1000 560 C 720 260, 380 680, 0 400 Z";

// Ribbon 4 (Foreground Signature Electric Orange 3D Wave Layer)
const ribbon4Rising = "M 0 650 C 250 420, 750 680, 1000 580 L 1000 1000 L 0 1000 Z";
const ribbon4Exiting = "M 0 -100 L 1000 -100 L 1000 650 C 750 350, 250 620, 0 500 Z";

export function WavyPageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerTransition = useCallback((targetSectionId: string) => {
    // Check prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
      return;
    }

    if (isAnimating) return;
    setIsAnimating(true);

    // Phase 2: Instant scroll when screen is fully covered by liquid orange 3D waves
    setTimeout(() => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }, 550);

    // Phase 3: Complete transition after waves exit
    setTimeout(() => {
      setIsAnimating(false);
    }, 1180);
  }, [isAnimating]);

  return (
    <WavyTransitionContext.Provider value={{ triggerTransition, isAnimating }}>
      {children}

      {/* 3D Abstract Orange Wavy Page Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <div className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-transparent">
            <svg
              className="w-full h-full block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <defs>
                {/* 3D Depth Shadows for Layered Orange Ribbons */}
                <filter id="orange-depth-shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="-10" stdDeviation="16" floodColor="#e65100" floodOpacity="0.45" />
                </filter>
                <filter id="orange-depth-shadow-strong" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="-12" stdDeviation="20" floodColor="#ff3b11" floodOpacity="0.6" />
                </filter>

                {/* Pure Orange Shades Gradients */}
                {/* 1. Golden Sunset Orange */}
                <linearGradient id="pure-orange-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffc107" />
                  <stop offset="50%" stopColor="#ff9800" />
                  <stop offset="100%" stopColor="#f57c00" />
                </linearGradient>

                {/* 2. Warm Tangerine Orange */}
                <linearGradient id="pure-orange-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffa033" />
                  <stop offset="50%" stopColor="#ff7043" />
                  <stop offset="100%" stopColor="#e65100" />
                </linearGradient>

                {/* 3. Vibrant Citrus Flame Orange */}
                <linearGradient id="pure-orange-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff7c27" />
                  <stop offset="50%" stopColor="#ff5722" />
                  <stop offset="100%" stopColor="#d84315" />
                </linearGradient>

                {/* 4. Signature Electric Red-Orange */}
                <linearGradient id="pure-orange-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5e3a" />
                  <stop offset="50%" stopColor="#ff3b11" />
                  <stop offset="100%" stopColor="#bf360c" />
                </linearGradient>
              </defs>

              {/* 3D Ribbon Layer 1 (Golden Sunset Orange) */}
              <motion.path
                fill="url(#pure-orange-grad-1)"
                opacity={0.8}
                filter="url(#orange-depth-shadow-soft)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, ribbon1Rising, fullCover, fullCover, ribbon1Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.18,
                  times: [0, 0.32, 0.46, 0.56, 0.82, 1],
                  ease: [0.76, 0, 0.24, 1],
                }}
              />

              {/* 3D Ribbon Layer 2 (Warm Tangerine Orange) */}
              <motion.path
                fill="url(#pure-orange-grad-2)"
                opacity={0.9}
                filter="url(#orange-depth-shadow-soft)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, ribbon2Rising, fullCover, fullCover, ribbon2Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.18,
                  delay: 0.04,
                  times: [0, 0.34, 0.48, 0.58, 0.84, 1],
                  ease: [0.76, 0, 0.24, 1],
                }}
              />

              {/* 3D Ribbon Layer 3 (Vibrant Citrus Flame Orange) */}
              <motion.path
                fill="url(#pure-orange-grad-3)"
                opacity={0.96}
                filter="url(#orange-depth-shadow-strong)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, ribbon3Rising, fullCover, fullCover, ribbon3Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.18,
                  delay: 0.07,
                  times: [0, 0.36, 0.5, 0.6, 0.86, 1],
                  ease: [0.76, 0, 0.24, 1],
                }}
              />

              {/* 3D Ribbon Layer 4 (Foreground Signature Electric Orange) */}
              <motion.path
                fill="url(#pure-orange-grad-4)"
                opacity={1}
                filter="url(#orange-depth-shadow-strong)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, ribbon4Rising, fullCover, fullCover, ribbon4Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.18,
                  delay: 0.1,
                  times: [0, 0.38, 0.52, 0.62, 0.88, 1],
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            </svg>
          </div>
        )}
      </AnimatePresence>
    </WavyTransitionContext.Provider>
  );
}

export const BlackBubbleTransitionProvider = WavyPageTransitionProvider;
export default WavyPageTransitionProvider;

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

// ---------------------------------------------------------------------------
// Consistent SVG Path Structure:
// "M 0 topY L 1000 topY L 1000 bottomY C c1x c1y, c2x c2y, 0 bottomY Z"
// Having identical command types across all keyframes ensures 100% smooth,
// glitch-free SVG morphing during both entry and exit.
// ---------------------------------------------------------------------------

// Shared States
const hiddenBottom = "M 0 1100 L 1000 1100 L 1000 1100 C 666 1100, 333 1100, 0 1100 Z";
const fullCover    = "M 0 -100 L 1000 -100 L 1000 1100 C 666 1100, 333 1100, 0 1100 Z";
const hiddenTop    = "M 0 -100 L 1000 -100 L 1000 -100 C 666 -100, 333 -100, 0 -100 Z";

// Ribbon 1 (Golden Sunset Orange Layer)
const ribbon1Rising  = "M 0 1100 L 1000 1100 L 1000 400 C 700 150, 300 650, 0 300 Z";
const ribbon1Exiting = "M 0 -100 L 1000 -100 L 1000 350 C 700 100, 300 550, 0 250 Z";

// Ribbon 2 (Warm Tangerine Orange Layer)
const ribbon2Rising  = "M 0 1100 L 1000 1100 L 1000 480 C 600 200, 250 720, 0 380 Z";
const ribbon2Exiting = "M 0 -100 L 1000 -100 L 1000 450 C 600 180, 250 680, 0 320 Z";

// Ribbon 3 (Vibrant Citrus Orange Layer)
const ribbon3Rising  = "M 0 1100 L 1000 1100 L 1000 550 C 750 280, 350 750, 0 450 Z";
const ribbon3Exiting = "M 0 -100 L 1000 -100 L 1000 520 C 750 240, 350 720, 0 400 Z";

// Ribbon 4 (Foreground Signature Electric Orange Layer)
const ribbon4Rising  = "M 0 1100 L 1000 1100 L 1000 620 C 700 380, 200 650, 0 520 Z";
const ribbon4Exiting = "M 0 -100 L 1000 -100 L 1000 600 C 700 320, 200 600, 0 480 Z";

export function WavyPageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerTransition = useCallback((targetSectionId: string) => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
      return;
    }

    if (isAnimating) return;
    setIsAnimating(true);

    // Instant scroll when screen is 100% covered by waves
    setTimeout(() => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }, 550);

    // Complete transition and cleanup
    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
  }, [isAnimating]);

  return (
    <WavyTransitionContext.Provider value={{ triggerTransition, isAnimating }}>
      {children}

      {/* 3D Abstract Orange Wavy Page Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, times: [0, 0.5, 0.8, 0.92, 1], ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-transparent"
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Soft 3D Depth Shadows for Layered Orange Ribbons */}
                <filter id="orange-depth-shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="-8" stdDeviation="12" floodColor="#e65100" floodOpacity="0.4" />
                </filter>
                <filter id="orange-depth-shadow-strong" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="-10" stdDeviation="16" floodColor="#ff3b11" floodOpacity="0.5" />
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
                  d: [hiddenBottom, ribbon1Rising, fullCover, ribbon1Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.2,
                  times: [0, 0.32, 0.5, 0.82, 1],
                  ease: [0.65, 0, 0.35, 1],
                }}
              />

              {/* 3D Ribbon Layer 2 (Warm Tangerine Orange) */}
              <motion.path
                fill="url(#pure-orange-grad-2)"
                opacity={0.9}
                filter="url(#orange-depth-shadow-soft)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, ribbon2Rising, fullCover, ribbon2Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.03,
                  times: [0, 0.34, 0.52, 0.84, 1],
                  ease: [0.65, 0, 0.35, 1],
                }}
              />

              {/* 3D Ribbon Layer 3 (Vibrant Citrus Flame Orange) */}
              <motion.path
                fill="url(#pure-orange-grad-3)"
                opacity={0.96}
                filter="url(#orange-depth-shadow-strong)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, ribbon3Rising, fullCover, ribbon3Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.06,
                  times: [0, 0.36, 0.54, 0.86, 1],
                  ease: [0.65, 0, 0.35, 1],
                }}
              />

              {/* 3D Ribbon Layer 4 (Foreground Signature Electric Orange) */}
              <motion.path
                fill="url(#pure-orange-grad-4)"
                opacity={1}
                filter="url(#orange-depth-shadow-strong)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, ribbon4Rising, fullCover, ribbon4Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.2,
                  delay: 0.09,
                  times: [0, 0.38, 0.56, 0.88, 1],
                  ease: [0.65, 0, 0.35, 1],
                }}
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </WavyTransitionContext.Provider>
  );
}

export const BlackBubbleTransitionProvider = WavyPageTransitionProvider;
export default WavyPageTransitionProvider;

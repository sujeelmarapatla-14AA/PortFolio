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

// SVG Path definitions for smooth liquid wave morphing (viewBox: 0 0 1000 1000)
// Hidden at bottom
const hiddenBottom = "M 0 1000 C 300 1000, 700 1000, 1000 1000 L 1000 1000 L 0 1000 Z";

// Wave Layer 1 (Back wave - Flame Orange / Coral)
const wave1Rising = "M 0 450 C 250 200, 600 700, 1000 350 L 1000 1000 L 0 1000 Z";
const wave1Full = "M 0 -100 C 300 -100, 700 -100, 1000 -100 L 1000 1000 L 0 1000 Z";
const wave1Exiting = "M 0 -100 L 1000 -100 L 1000 400 C 700 150, 300 650, 0 250 Z";
const hiddenTop = "M 0 -100 L 1000 -100 L 1000 -100 C 700 -100, 300 -100, 0 -100 Z";

// Wave Layer 2 (Middle wave - Bright Electric Orange)
const wave2Rising = "M 0 520 C 350 750, 650 220, 1000 480 L 1000 1000 L 0 1000 Z";
const wave2Full = "M 0 -100 C 300 -100, 700 -100, 1000 -100 L 1000 1000 L 0 1000 Z";
const wave2Exiting = "M 0 -100 L 1000 -100 L 1000 480 C 650 200, 350 720, 0 380 Z";

// Wave Layer 3 (Foreground wave - Signature Electric Red-Orange #ff3b11)
const wave3Rising = "M 0 600 C 200 380, 750 620, 1000 500 L 1000 1000 L 0 1000 Z";
const wave3Full = "M 0 -100 C 300 -100, 700 -100, 1000 -100 L 1000 1000 L 0 1000 Z";
const wave3Exiting = "M 0 -100 L 1000 -100 L 1000 550 C 750 250, 250 550, 0 450 Z";

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

    // Phase 2: Instant scroll when screen is fully covered by liquid waves
    setTimeout(() => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }, 550);

    // Phase 3: Complete transition after waves retract
    setTimeout(() => {
      setIsAnimating(false);
    }, 1150);
  }, [isAnimating]);

  return (
    <WavyTransitionContext.Provider value={{ triggerTransition, isAnimating }}>
      {children}

      {/* Layered Orange Fluid Wave Page Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <div className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-transparent">
            <svg
              className="w-full h-full block"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Glow Filter for Leading Wave Crest Edge */}
                <filter id="wave-crest-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="-8" stdDeviation="12" floodColor="#ff3b11" floodOpacity="0.75" />
                </filter>
                <filter id="wave-crest-glow-bright" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="-6" stdDeviation="10" floodColor="#ff7c27" floodOpacity="0.8" />
                </filter>
                <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff7c27" />
                  <stop offset="100%" stopColor="#d9300c" />
                </linearGradient>
                <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff5e3a" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
                <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3b11" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
              </defs>

              {/* Wave Layer 1 (Background Flame Wave) */}
              <motion.path
                fill="url(#wave-grad-1)"
                opacity={0.7}
                filter="url(#wave-crest-glow-bright)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, wave1Rising, wave1Full, wave1Full, wave1Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.15,
                  times: [0, 0.32, 0.46, 0.56, 0.82, 1],
                  ease: [0.76, 0, 0.24, 1],
                }}
              />

              {/* Wave Layer 2 (Middle Coral Wave - Offset Timing) */}
              <motion.path
                fill="url(#wave-grad-2)"
                opacity={0.88}
                filter="url(#wave-crest-glow-bright)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, wave2Rising, wave2Full, wave2Full, wave2Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.05,
                  times: [0, 0.34, 0.48, 0.58, 0.84, 1],
                  ease: [0.76, 0, 0.24, 1],
                }}
              />

              {/* Wave Layer 3 (Foreground Main Signature Electric Orange Wave) */}
              <motion.path
                fill="url(#wave-grad-3)"
                opacity={1}
                filter="url(#wave-crest-glow)"
                initial={{ d: hiddenBottom }}
                animate={{
                  d: [hiddenBottom, wave3Rising, wave3Full, wave3Full, wave3Exiting, hiddenTop],
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.09,
                  times: [0, 0.36, 0.5, 0.6, 0.86, 1],
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

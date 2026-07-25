"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BubbleTransitionContextType {
  triggerTransition: (targetSectionId: string) => void;
  isAnimating: boolean;
}

const BubbleTransitionContext = createContext<BubbleTransitionContextType>({
  triggerTransition: () => {},
  isAnimating: false,
});

export const useBubbleTransition = () => useContext(BubbleTransitionContext);

// SVG Path definitions for individual bubble column cap morphing
const initialColPath = "M 0 0 L 100 0 L 100 0 Q 50 0 0 0 Z";
const enterColPath = "M 0 0 L 100 0 L 100 85 Q 50 115 0 85 Z";
const fullColPath = "M 0 0 L 100 0 L 100 100 Q 50 100 0 100 Z";
const exitColPath = "M 0 0 L 100 0 L 100 0 Q 50 35 0 0 Z";

const NUM_COLUMNS = 5;

export function BlackBubbleTransitionProvider({ children }: { children: React.ReactNode }) {
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

    // Phase 2: Instant scroll while screen is fully covered by sequential columns
    setTimeout(() => {
      const el = document.getElementById(targetSectionId);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
      }
    }, 600);

    // Phase 3: Complete transition after all columns retract
    setTimeout(() => {
      setIsAnimating(false);
    }, 1300);
  }, [isAnimating]);

  return (
    <BubbleTransitionContext.Provider value={{ triggerTransition, isAnimating }}>
      {children}

      {/* Sequential 5-Column Black Bubble Waterfall Curtain Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <div className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden grid grid-cols-5 bg-transparent">
            {Array.from({ length: NUM_COLUMNS }).map((_, i) => (
              <div key={i} className="relative w-full h-full border-r border-[#ff3b11]/30 last:border-r-0">
                <svg
                  className="w-full h-full block"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Electric Orange Wave Line Drop Shadow */}
                    <filter id={`orange-glow-${i}`} x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#ff3b11" floodOpacity="0.9" />
                    </filter>
                  </defs>

                  <motion.path
                    fill="#0a0a12"
                    stroke="#ff3b11"
                    strokeWidth="2.5"
                    filter={`url(#orange-glow-${i})`}
                    initial={{ d: initialColPath }}
                    animate={{
                      d: [
                        initialColPath,
                        enterColPath,
                        fullColPath,
                        fullColPath,
                        exitColPath,
                        initialColPath,
                      ],
                    }}
                    transition={{
                      duration: 1.15,
                      times: [0, 0.35, 0.48, 0.58, 0.85, 1],
                      delay: i * 0.07, // Staggered sequential waterfall drop & retract
                      ease: [0.76, 0, 0.24, 1],
                    }}
                  />
                </svg>
              </div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </BubbleTransitionContext.Provider>
  );
}

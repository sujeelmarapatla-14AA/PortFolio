"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { gsap } from "gsap";
import "./Shuffle.css";

export interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: "left" | "right" | "up" | "down";
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: keyof JSX.IntrinsicElements;
  textAlign?: React.CSSProperties["textAlign"];
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: "evenodd" | "random";
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

const DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

const Shuffle: React.FC<ShuffleProps> = ({
  text = "",
  className = "",
  style = {},
  duration = 0.5,
  ease = "power3.out",
  tag: Tag = "h1",
  textAlign = "center",
  onShuffleComplete,
  shuffleTimes = 6,
  stagger = 0.04,
  scrambleCharset = DEFAULT_CHARSET,
  colorFrom,
  colorTo,
  triggerOnHover = true,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [displayedChars, setDisplayedChars] = useState<string[]>(() => text.split(""));
  const [isHoverable, setIsHoverable] = useState(false);

  const targetChars = useMemo(() => text.split(""), [text]);

  const runShuffleAnimation = useCallback(() => {
    if (!targetChars.length) return;

    const charElements = containerRef.current?.querySelectorAll(".shuffle-char");
    if (!charElements || charElements.length === 0) return;

    const timeline = gsap.timeline({
      onComplete: () => {
        setDisplayedChars(targetChars);
        setIsHoverable(true);
        if (onShuffleComplete) onShuffleComplete();
      },
    });

    targetChars.forEach((targetChar, index) => {
      const el = charElements[index];
      if (!el || targetChar === " " || targetChar === "“" || targetChar === "”" || targetChar === ",") {
        return;
      }

      const randomScrambles = Array.from({ length: shuffleTimes }, () =>
        scrambleCharset.charAt(Math.floor(Math.random() * scrambleCharset.length))
      );
      randomScrambles.push(targetChar);

      let count = 0;
      const interval = duration / (shuffleTimes + 1);

      timeline.to(
        el,
        {
          duration: duration,
          ease: ease,
          color: colorTo || undefined,
          onUpdate: () => {
            if (count < randomScrambles.length) {
              const currentGlow = randomScrambles[count];
              el.textContent = currentGlow;
              count++;
            }
          },
        },
        index * stagger
      );

      if (colorFrom) {
        gsap.set(el, { color: colorFrom });
      }
    });
  }, [targetChars, duration, ease, shuffleTimes, stagger, scrambleCharset, colorFrom, colorTo, onShuffleComplete]);

  useEffect(() => {
    setDisplayedChars(targetChars);
    const timer = setTimeout(() => {
      runShuffleAnimation();
    }, 150);
    return () => clearTimeout(timer);
  }, [targetChars, runShuffleAnimation]);

  const handleMouseEnter = () => {
    if (triggerOnHover && isHoverable) {
      runShuffleAnimation();
    }
  };

  return React.createElement(
    Tag,
    {
      ref: containerRef,
      className: `shuffle-parent ${className}`,
      style: { textAlign, ...style },
      onMouseEnter: handleMouseEnter,
    },
    displayedChars.map((char, i) => (
      <span key={i} className="shuffle-char" style={{ color: colorFrom || "inherit" }}>
        {char}
      </span>
    ))
  );
};

export default Shuffle;

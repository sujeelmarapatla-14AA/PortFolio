"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LiquidGlassButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "orange" | "dark";
  onClick?: (e: React.MouseEvent) => void;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  [key: string]: any;
}

export function LiquidGlassSVGFilter() {
  return (
    <svg className="hidden pointer-events-none fixed w-0 h-0" aria-hidden="true">
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.01"
          numOctaves="1"
          seed="5"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="120"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

export default function LiquidGlassButton({
  children,
  className = "",
  variant = "light",
  onClick,
  as: Component = "button",
  href,
  target,
  rel,
  type = "button",
  ...props
}: LiquidGlassButtonProps) {
  const tintClass =
    variant === "orange"
      ? "liquidGlass-tint-orange"
      : variant === "dark"
      ? "bg-black/80 text-white"
      : "liquidGlass-tint";

  return React.createElement(
    Component,
    {
      onClick,
      href,
      target,
      rel,
      type: Component === "button" ? type : undefined,
      className: cn(
        "liquidGlass-wrapper cursor-target group rounded-full border border-white/60 transition-all duration-400 hover:scale-105 active:scale-95 select-none focus-ring shadow-lg",
        className
      ),
      ...props,
    },
    <div className="liquidGlass-effect" />,
    <div className={tintClass} />,
    <div className="liquidGlass-shine" />,
    <div className="liquidGlass-content relative z-10 w-full h-full flex items-center justify-center gap-2">
      {children}
    </div>
  );
}

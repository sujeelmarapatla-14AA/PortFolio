"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import TargetCursor from "@/components/ui/TargetCursor";
import Waves from "@/components/ui/Waves";
import IntroPage from "@/components/ui/IntroPage";
import { LiquidGlassSVGFilter } from "@/components/ui/LiquidGlassButton";
import { BlackBubbleTransitionProvider } from "@/components/ui/BlackBubbleTransition";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <BlackBubbleTransitionProvider>
      {/* Global macOS Liquid Glass SVG Displacement Filter */}
      <LiquidGlassSVGFilter />

      {/* Background Interactive Waves Animation */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Waves
          lineColor="#ff7c27"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.2}
        cursorColor="#111111"
        cursorColorOnTarget="#ff3b11"
        targetSelector=".cursor-target, a, button"
      />

      {/* Full-Screen Portfolio Intro Overlay */}
      {showIntro && <IntroPage onEnter={() => setShowIntro(false)} />}

      {/* Existing Landing Page Content */}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </BlackBubbleTransitionProvider>
  );
}
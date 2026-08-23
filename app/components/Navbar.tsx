"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { footer } from "@/data/content";
import { useWavyTransition } from "@/components/ui/WavyPageTransition";
import GlassSurface from "@/components/ui/GlassSurface";
import {
  HomeIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const { triggerTransition } = useWavyTransition();

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "certifications", "education", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "home":
        return <HomeIcon className="w-4 h-4" />;
      case "about":
        return <UserIcon className="w-4 h-4" />;
      case "skills":
        return <WrenchScrewdriverIcon className="w-4 h-4" />;
      case "projects":
        return <BriefcaseIcon className="w-4 h-4" />;
      case "certifications":
        return <AcademicCapIcon className="w-4 h-4" />;
      case "contact":
        return <EnvelopeIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const navItems = [
    { label: "Home", href: "#hero", id: "hero" },
    ...footer.nav.map((item) => ({
      label: item.label,
      href: item.href,
      id: item.href.replace("#", ""),
    })),
  ];

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    triggerTransition(sectionId, e);
  };

  return (
    <>
      {/* Top Left Text Logo (Positioned at top of page only) */}
      <div className="absolute top-6 left-5 md:left-10 z-40 flex items-center gap-2 pointer-events-auto">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="flex flex-col items-start group focus-ring rounded-lg cursor-target select-none"
        >
          <div className="flex items-center gap-2">
            <span className="text-[#ff3b11] text-3xl md:text-4xl font-bold transition-transform group-hover:rotate-45 duration-300">
              ✦
            </span>
            <span className="font-condensed text-4xl md:text-5xl font-black text-[#ff3b11] tracking-wider uppercase leading-none">
              PORTFOLIO
            </span>
          </div>
          <span className="text-[10px] md:text-[11px] font-sans font-extrabold tracking-widest text-[#ff3b11] uppercase pl-7 leading-tight mt-0.5">
            EMPOWER YOUR ACADEMIC JOURNEY
          </span>
        </a>
      </div>

      {/* Floating Center Capsule Navbar with Apple GlassSurface Effect */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <GlassSurface
          borderRadius={9999}
          backgroundOpacity={0.2}
          blur={16}
          brightness={55}
          width="auto"
          height="auto"
          className="shadow-[0_16px_48px_rgba(0,0,0,0.15)] border border-white/80 p-1"
        >
          <nav
            className="flex items-center gap-1"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={cn(
                    "cursor-target flex items-center gap-2 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 select-none",
                    isActive
                      ? "bg-[#ff3b11] text-white shadow-md shadow-[#ff3b11]/30"
                      : "text-gray-800 hover:text-black hover:bg-white/60"
                  )}
                >
                  {getIcon(item.label)}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </GlassSurface>
      </header>
    </>
  );
}
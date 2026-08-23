"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { certifications, Certification } from "@/data/content";
import SectionWrapper from "./SectionWrapper";
import BorderGlow from "@/components/ui/BorderGlow";
import {
  MagnifyingGlassPlusIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const handleClose = useCallback(() => {
    setSelectedCert(null);
  }, []);

  // Keyboard accessibility: close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert, handleClose]);

  return (
    <SectionWrapper id="certifications" title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header with Subtitle */}
        <div className="mb-10 text-left">
          <h2 className="font-devanagari text-5xl md:text-6xl text-[#ff3b11] tracking-wide font-normal">
            certifications
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mt-2 max-w-xl transition-colors">
            Courses & credentials I've completed
          </p>
        </div>

        {/* Responsive Grid Layout: 1 col on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full flex flex-col"
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#120F17"
                borderRadius={28}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={["#c084fc", "#f472b6", "#38bdf8"]}
                className="w-full h-full flex flex-col transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="group relative flex flex-col justify-between h-full p-5 cursor-target text-white">
                  {/* Upper Image Thumbnail Container with fixed 4:3 Aspect Ratio */}
                  <div
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 border border-white/15 cursor-pointer group/img"
                    onClick={() => setSelectedCert(cert)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View full certificate for ${cert.title}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedCert(cert);
                      }
                    }}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    {/* Hover Overlay with Lightbox Icon */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-white/90 text-black px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                        <MagnifyingGlassPlusIcon className="w-4 h-4 text-[#ff3b11]" />
                        <span>View Full Image</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Section */}
                  <div className="flex flex-col flex-1 pt-5 pb-1 justify-between">
                    <div>
                      {/* Header line: Issuer & Date */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff3b11] bg-[#ff3b11]/15 px-3 py-1 rounded-full border border-[#ff3b11]/30">
                          <AcademicCapIcon className="w-3.5 h-3.5" />
                          {cert.issuer}
                        </span>
                        {cert.date && (
                          <span className="text-[11px] font-mono font-medium text-gray-400">
                            {cert.date}
                          </span>
                        )}
                      </div>

                      {/* Certificate Title */}
                      <h3 className="font-sans text-lg md:text-xl font-extrabold text-white mt-2 leading-snug group-hover:text-[#ff3b11] transition-colors">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Actions / Buttons Footer */}
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className="cursor-target text-xs font-bold text-gray-300 hover:text-[#ff3b11] flex items-center gap-1.5 transition-colors focus-ring rounded-lg px-2 py-1"
                      >
                        <MagnifyingGlassPlusIcon className="w-4 h-4 text-[#ff3b11]" />
                        <span>View Certificate</span>
                      </button>

                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors focus-ring rounded-lg px-2 py-1"
                          aria-label={`Verify credential for ${cert.title}`}
                        >
                          <span>Verify</span>
                          <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accessibility-compliant Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#120F17] text-white rounded-[28px] border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-ring cursor-target"
                aria-label="Close certificate modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              {/* Modal Content Header */}
              <div className="pr-12 mb-4">
                <span className="inline-block text-xs font-extrabold tracking-wider uppercase text-[#ff3b11] mb-1">
                  {selectedCert.issuer} {selectedCert.date ? `• ${selectedCert.date}` : ""}
                </span>
                <h3 id="modal-title" className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedCert.title}
                </h3>
              </div>

              {/* Certificate Image in Modal */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[400px] w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs text-gray-400">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono text-[10px]">Esc</kbd> or click outside to close
                </span>

                {selectedCert.credentialUrl && (
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ff3b11] hover:bg-[#ff3b11]/90 text-white text-xs font-extrabold tracking-wider uppercase shadow-lg transition-colors cursor-target"
                  >
                    <span>Verify Credential</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}

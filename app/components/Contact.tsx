"use client";

import { useState } from "react";
import { contact, name } from "@/data/content";
import SectionWrapper from "./SectionWrapper";
import { AtSymbolIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e: React.FormEvent) => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      e.preventDefault();
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <SectionWrapper id="contact" title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Top Left Header */}
        <div className="mb-6 text-left">
          <h2 className="font-devanagari text-5xl md:text-6xl text-[#ff3b11] tracking-wide font-normal">
            contact
          </h2>
        </div>

        {/* Giant Running Outline Typography Marquee Background */}
        <div aria-hidden="true" className="w-full overflow-hidden select-none py-4 border-y border-gray-300/80 mb-12">
          <div className="animate-marquee flex items-center whitespace-nowrap gap-12 font-serif text-6xl md:text-8xl lg:text-9xl font-black text-outline-gray tracking-tighter uppercase opacity-70">
            <span>CONTACT</span>
            <span className="text-[#ff3b11]">✦</span>
            <span>CONTACT</span>
            <span className="text-[#ff3b11]">✦</span>
            <span>CONTACT</span>
            <span className="text-[#ff3b11]">✦</span>
            <span>CONTACT</span>
            <span className="text-[#ff3b11]">✦</span>
            <span>CONTACT</span>
            <span className="text-[#ff3b11]">✦</span>
          </div>
        </div>

        {/* Studio Email Form Container */}
        <div className="max-w-2xl mx-auto mb-16">
          <form
            action={`mailto:${contact.email}`}
            method="get"
            encType="text/plain"
            onSubmit={handleSubmit}
            className="bg-white rounded-[28px] p-8 md:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.08)] border border-gray-200/80 space-y-6"
          >
            <div className="text-center space-y-2 mb-6">
              <h3 className="font-condensed text-3xl font-extrabold text-black uppercase tracking-wide">
                LET&apos;S WORK TOGETHER
              </h3>
              <p className="text-gray-600 text-sm font-medium">
                Send a direct email to <span className="font-bold text-[#ff3b11]">{contact.email}</span> or connect via social links below.
              </p>
            </div>

            <div className="relative">
              <AtSymbolIcon className="w-5 h-5 text-[#ff3b11] absolute top-1/2 left-5 -translate-y-1/2 z-10" />
              <input
                type="email"
                name="to"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your-email@example.com"
                required
                className={`w-full bg-[#f8f8f8] border ${
                  error ? "border-red-500" : "border-gray-300 focus:border-[#ff3b11]"
                } rounded-full py-4 pl-14 pr-6 text-black placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-[#ff3b11]/30 transition-all shadow-inner`}
              />
            </div>
            {error && <p className="text-red-500 text-xs font-semibold pl-4">Please enter a valid email address.</p>}

            <button
              type="submit"
              className="cursor-target w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-extrabold text-sm uppercase tracking-wider text-white bg-[#ff3b11] hover:bg-[#e0310c] shadow-lg shadow-[#ff3b11]/25 transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              <span>SEND EMAIL</span>
            </button>
          </form>
        </div>

        {/* 3 Column Subtitle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-gray-300/80 text-xs md:text-sm font-extrabold tracking-wider uppercase text-gray-700 leading-relaxed text-center md:text-left">
          <div>
            I&apos;M HERE TO HELP YOU TURN YOUR BRIEF INTO SOMETHING BRILLIANT.
          </div>
          <div className="md:text-center">
            JUST DROP ME A LINE OR CONNECT ON SOCIAL MEDIA.
          </div>
          <div className="md:text-right">
            © {currentYear} {name.toUpperCase()}. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* Interactive Sticker Pill Buttons for ALL Social Links (GitHub, LinkedIn, Instagram, Email) */}
        <div className="pt-12 pb-8 flex flex-wrap items-center justify-center gap-5 relative">
          {/* Circular Drag Me Badge */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 12 }}
            className="w-24 h-24 rounded-full bg-white border border-gray-300 shadow-xl flex items-center justify-center p-2 text-center text-[10px] font-extrabold uppercase tracking-widest text-black cursor-grab active:cursor-grabbing select-none"
          >
            <span>DRAG ME ✦</span>
          </motion.div>

          {/* GITHUB Sticker Pill */}
          <motion.a
            whileHover={{ scale: 1.05, rotate: 3 }}
            href={contact.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target bg-[#fafafa] hover:bg-[#ff3b11] hover:text-white text-black border border-gray-400/80 rounded-full px-7 py-3.5 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2 transition-colors duration-300"
          >
            <span>GITHUB ↗</span>
          </motion.a>

          {/* LINKEDIN Sticker Pill */}
          <motion.a
            whileHover={{ scale: 1.05, rotate: -3 }}
            href={contact.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target bg-[#fafafa] hover:bg-[#0077b5] hover:text-white text-black border border-gray-400/80 rounded-full px-7 py-3.5 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2 transition-colors duration-300"
          >
            <span>LINKEDIN ↗</span>
          </motion.a>

          {/* INSTAGRAM Sticker Pill */}
          <motion.a
            whileHover={{ scale: 1.05, rotate: 2 }}
            href={contact.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-target bg-[#fafafa] hover:bg-[#e1306c] hover:text-white text-black border border-gray-400/80 rounded-full px-7 py-3.5 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2 transition-colors duration-300"
          >
            <span>INSTAGRAM ↗</span>
          </motion.a>

          {/* EMAIL ME Sticker Pill */}
          <motion.a
            whileHover={{ scale: 1.05, rotate: -2 }}
            href={`mailto:${contact.email}`}
            className="cursor-target bg-[#fafafa] hover:bg-[#7c3aed] hover:text-white text-black border border-gray-400/80 rounded-full px-7 py-3.5 font-extrabold text-xs tracking-wider uppercase shadow-md flex items-center gap-2 transition-colors duration-300"
          >
            <span>EMAIL ME ↗</span>
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}
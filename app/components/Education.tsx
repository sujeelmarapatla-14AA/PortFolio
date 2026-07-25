import { education } from "@/data/content";
import SectionWrapper from "./SectionWrapper";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

export default function Education() {
  return (
    <SectionWrapper id="education" title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Left Header */}
        <div className="mb-10 text-left">
          <h2 className="font-devanagari text-5xl md:text-6xl text-[#ff3b11] tracking-wide font-normal">
            education
          </h2>
        </div>

        {/* Studio Redesigned Education Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-[28px] border border-gray-300/80 p-8 md:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-8 group hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-6 text-left w-full md:w-auto">
            {/* Academic Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-[#ff3b11]/10 border border-[#ff3b11]/20 flex items-center justify-center text-[#ff3b11] flex-shrink-0 shadow-sm">
              <AcademicCapIcon className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-black tracking-tight group-hover:text-[#ff3b11] transition-colors">
                {education.institution}
              </h3>
              <p className="text-sm md:text-base font-semibold text-gray-700">
                {education.degree}
              </p>
            </div>
          </div>

          {/* Timeline Badge (CGPA removed as requested) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end pt-4 md:pt-0 border-t md:border-t-0 border-gray-200">
            <span className="px-5 py-2.5 rounded-full bg-[#111111] text-white text-xs md:text-sm font-extrabold tracking-wider uppercase shadow-md">
              {education.graduation}
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
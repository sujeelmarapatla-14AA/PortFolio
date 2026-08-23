import { educationList } from "@/data/content";
import SectionWrapper from "./SectionWrapper";
import GlassSurface from "@/components/ui/GlassSurface";
import { AcademicCapIcon, BookOpenIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";

export default function Education() {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <AcademicCapIcon className="w-9 h-9" />;
      case 1:
        return <BookOpenIcon className="w-9 h-9" />;
      case 2:
        return <BuildingLibraryIcon className="w-9 h-9" />;
      default:
        return <AcademicCapIcon className="w-9 h-9" />;
    }
  };

  return (
    <SectionWrapper id="education" title="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Left Header */}
        <div className="mb-10 text-left">
          <h2 className="font-devanagari text-5xl md:text-6xl text-[#ff3b11] tracking-wide font-normal">
            education
          </h2>
          <p className="text-xs md:text-sm text-gray-600 font-medium mt-2 max-w-xl">
            My academic journey and qualifications
          </p>
        </div>

        {/* Stack of Glass Surface Education Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {educationList.map((item, index) => (
            <GlassSurface
              key={item.institution}
              borderRadius={28}
              backgroundOpacity={0.3}
              blur={16}
              width="100%"
              height="auto"
              className="shadow-[0_16px_48px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-6">
                <div className="flex items-center gap-5 text-left w-full md:w-auto">
                  {/* Academic / School Icon Badge */}
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#ff3b11]/10 border border-[#ff3b11]/20 flex items-center justify-center text-[#ff3b11] flex-shrink-0 shadow-sm">
                    {getIcon(index)}
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <h3 className="font-sans text-xl md:text-2xl font-extrabold text-black tracking-tight group-hover:text-[#ff3b11] transition-colors">
                      {item.institution}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-gray-700">
                      {item.degree}
                    </p>
                  </div>
                </div>

                {/* Timeline Badge */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-300/60">
                  <span className="px-4 py-2 rounded-full bg-[#111111] text-white text-xs md:text-sm font-extrabold tracking-wider uppercase shadow-md">
                    {item.graduation}
                  </span>
                </div>
              </div>
            </GlassSurface>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
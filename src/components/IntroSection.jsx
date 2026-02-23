import React from "react";
import heroImageUrl from "../assets/img--2.jpeg";

export default function IntroSection() {
  return (
    <section className="bg-white text-black py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 px-4 sm:px-6 lg:px-8">
        {/* Image column - appears FIRST on mobile, SECOND on desktop */}
        <div className="md:col-span-5 lg:col-span-5 xl:col-span-6 order-1 md:order-2 flex items-center justify-center">
          <div
            className="
              w-full 
              aspect-[3/4]          /* base: slightly taller than square */
              sm:aspect-[4/5]        /* small screens: a bit taller */
              md:aspect-[5/8]        /* md: noticeably taller/portrait */
              lg:aspect-[4/7]        /* lg: even longer vertically */
              xl:aspect-[5/9]        /* xl: most elongated */
              overflow-hidden 
              rounded-2xl 
              shadow-2xl 
              border border-gray-200/50
              bg-gray-100               /* fallback color while loading */
            "
          >
            <img
              src={heroImageUrl}
              alt="Uju Asumpta - Transformational teacher and founder"
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text column - appears SECOND on mobile, FIRST on desktop */}
        <div className="md:col-span-7 lg:col-span-7 xl:col-span-6 order-2 md:order-1">
          <h1 className="mb-6 sm:mb-8 md:mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Meet Uju Asumpta
          </h1>

          <div className="space-y-4 sm:space-y-5 md:space-y-6 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-800">
            <p>
              Uju Asumpta is a transformational teacher, author, and speaker,
              and the founder of The Curriculum of Life™.
            </p>

            <p>
              She helps individuals, families, and organizations rediscover true
              identity, heal inwardly, live with meaning, and build lives and
              legacies that outlive them.
            </p>

            <p>
              Through her work, Uju addresses the missing education of
              humanity—the inner curriculum no school ever taught—covering
              identity, emotional intelligence, spirituality, purpose, values,
              and legacy leadership.
            </p>

            <p>
              Her message is not only that of motivation; it is transformation.
            </p>

            <p>
              She is the founder of Wellsage Ltd., a transformational education
              company delivering courses, books, programs, and experiences
              designed to help people live aligned, whole, and purpose-driven
              lives.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <a
              href="/about"
              aria-label="Learn more about Uju Asumpta"
              className="
                inline-block 
                px-6 sm:px-8 md:px-10 
                py-3 sm:py-4 
                bg-black 
                text-white 
                font-medium 
                rounded-lg 
                text-base sm:text-lg 
                transition-all duration-300 
                hover:bg-gray-900 
                hover:shadow-xl 
                focus:outline-none focus:ring-4 focus:ring-black/30
                shadow-md
              "
            >
              Discover More About Uju
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import heroImageUrl from "../assets/img--2.jpeg";

export default function IntroSection() {
  return (
    <section className="bg-white text-black py-12 sm:py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6">
        {/* Right: image - appears FIRST on mobile (order-1), SECOND on desktop (md:order-2) */}
        <div className="md:col-span-5 lg:col-span-6 order-1 md:order-2 flex items-start justify-center">
          <div
            className="w-full shadow-lg overflow-hidden rounded-xl"
            style={{ height: "300px", maxHeight: "400px" }}
          >
            <img
              src={heroImageUrl}
              alt="Portrait"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>

        {/* Left: heading, text + single CTA - appears SECOND on mobile (order-2), FIRST on desktop (md:order-1) */}
        <div className="md:col-span-7 lg:col-span-6 order-2 md:order-1">
          <h1 className="mb-6 sm:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            Meet Uju Asumpta
          </h1>

          <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl leading-relaxed text-gray-800">
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

          <div className="mt-6 sm:mt-8 flex flex-col items-start gap-3 sm:gap-4 w-full max-w-sm">
            <a
              href="/about"
              aria-label="About Uju Asumpta"
              className="w-full inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-white text-black border-2 sm:border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center text-sm sm:text-base"
            >
              About Uju Asumpta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

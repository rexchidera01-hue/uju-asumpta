import heroImageUrl from "../assets/img--3.jpeg";

export default function MeetUju() {
  return (
    <section
      aria-labelledby="meet-uju-heading"
      className="relative z-30 bg-yellow-200 py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Right: Responsive Image - appears FIRST on mobile (order-1), SECOND on desktop (md:order-2) */}
          <div className="md:col-span-5 lg:col-span-6 order-1 md:order-2">
            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden hover:shadow-3xl hover:scale-[1.02] transition-all duration-500">
              {/* Mobile: reduced height with aspect ratio */}
              {/* Desktop: full height with aspect ratio */}
              <div className="aspect-[3/4] md:aspect-[4/5] lg:aspect-[2/3]">
                <img
                  src={heroImageUrl}
                  alt="Uju Asumpta — Founder of The Curriculum of Life"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Left: Text - appears SECOND on mobile (order-2), FIRST on desktop (md:order-1) */}
          <div className="md:col-span-7 lg:col-span-6 order-2 md:order-1">
            <h2
              id="meet-uju-heading"
              className="mb-6 sm:mb-8 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 leading-tight"
            >
              I'm Uju Asumpta
              <br />
              The Founder of
              <br />
              The Curriculum of Life
            </h2>

            <p className="mb-4 sm:mb-6 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              You don't need more pressure.
              <br />
              You don't need another motivational speech.
              <br />
              You need <span className="font-bold text-gray-900">
                clarity
              </span>{" "}
              — <span className="font-bold text-gray-900">identity</span> —{" "}
              <span className="font-bold text-gray-900">meaning</span> —{" "}
              <span className="font-bold text-gray-900">healing</span>
            </p>

            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              That is what my work gives you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

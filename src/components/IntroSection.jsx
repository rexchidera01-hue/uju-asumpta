import React from "react";

const heroImageUrl =
  "https://images.unsplash.com/photo-1710188091078-e1d92210b9fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXQlMjBvZiUyMGElMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D";

export default function IntroSection() {
  return (
    <section className="bg-white text-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-16 px-4 md:px-6">
        {/* Left: heading, text + stacked CTAs */}
        <div className="md:col-span-7 lg:col-span-6">
          <h1 className="mb-10 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600">
            I'm Uju Asumpta, Founder of
            <br />
            The Curriculum of Life™
          </h1>

          <p className="mb-4 text-lg md:text-xl leading-relaxed">
            Here, you'll learn the part of life no school ever taught you — the
            human curriculum.
          </p>

          <p className="mb-6 text-lg md:text-xl font-medium leading-relaxed">
            You are not here merely to survive.
            <br />
            You are here to live deeply, grow intentionally, and leave something
            timeless behind.
          </p>

          <div className="mt-6 flex flex-col items-start gap-4 w-full max-w-sm">
            <a
              href="/curriculum"
              aria-label="Discover The Curriculum of Life"
              className="w-full inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
            >
              Discover The Curriculum of Life™
            </a>

            <a
              href="/wellsage"
              aria-label="Explore Wellsage Programs"
              className="w-full inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
            >
              Explore Wellsage Programs
            </a>

            <a
              href="/speaking"
              aria-label="Book Uju for Speaking"
              className="w-full inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
            >
              Book Uju for Speaking
            </a>
          </div>
        </div>

        {/* Right: image only — external URL, rounded corners, not cropped */}
        <div className="md:col-span-5 lg:col-span-6 md:order-last flex items-start justify-center">
          {/* container defines visible height; image is anchored to the top so the bottom is hidden */}
          <div
            className="w-full shadow-lg overflow-hidden rounded-xl"
            style={{ height: 700 /* set desired visible height */ }}
          >
            <img
              src={heroImageUrl}
              alt="Portrait"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";

const heroImageUrl =
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D";

export default function FeaturedOffer(): JSX.Element {
  return (
    <section
      aria-labelledby="featured-offer-heading"
      className="bg-white text-black py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-16 px-4 md:px-6">
        {/* Left: image (user requested image on the left) */}
        <div className="md:col-span-5 lg:col-span-6 flex items-start justify-center md:order-first">
          <div
            className="w-full shadow-lg overflow-hidden rounded-xl"
            style={{ height: 700 /* set desired visible height */ }}
          >
            <img
              src={heroImageUrl}
              alt="The Curriculum of Life cover"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right: content */}
        <div className="md:col-span-7 lg:col-span-6">
          <p className="text-sm font-medium tracking-wider text-amber-600 uppercase">
            Featured Offer
          </p>

          <h2
            id="featured-offer-heading"
            className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900"
          >
            <span className="font-semibold italic text-gray-900">
              The Curriculum of Life™
            </span>{" "}
            —{" "}
            <span className="font-extrabold not-italic text-gray-900">
              A Complete Life Transformation Blueprint
            </span>
          </h2>

          <div className="mt-6 text-lg md:text-xl space-y-3 text-gray-800">
            <p>
              <span className="italic">A course.</span>
            </p>
            <p>
              <span className="italic">A book.</span>
            </p>
            <p>
              <span className="italic">A manual.</span>
            </p>
            <p>
              <span className="italic">A movement.</span>
            </p>
            <p>
              <span className="font-semibold">A life-long companion.</span>
            </p>
          </div>

          <p className="mt-6 text-lg md:text-xl font-semibold italic text-gray-800">
            Learn what the world never taught you.
          </p>

          <div className="mt-8 flex items-start">
            <a
              href="/curriculum"
              className="inline-block px-8 py-3 bg-black text-white border-[3px] border-black rounded-md font-semibold transition-colors duration-200 hover:bg-white hover:text-black"
              aria-label="Learn more about The Curriculum of Life"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

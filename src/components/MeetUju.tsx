import React from "react";

const heroImageUrl =
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D";

export default function MeetUju(): JSX.Element {
  return (
    <section
      aria-labelledby="meet-uju-heading"
      // keep the same z-index/stacking intent as before and retain the yellow background
      className="relative z-30 text-gray-900 py-16 md:py-24 bg-yellow-200"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-16 px-4 md:px-6">
        {/* Left: heading, text + stacked CTA(s) */}
        <div className="md:col-span-7 lg:col-span-6">
          <h2
            id="meet-uju-heading"
            className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold"
          >
            Meet Uju Asumpta
          </h2>

          <p className="mb-4 text-lg md:text-xl text-gray-700 leading-relaxed">
            You don’t need more pressure.
            <br />
            You don’t need another motivational speech.
            <br />
            You need{" "}
            <span className="font-semibold text-gray-900">clarity</span> —{" "}
            <span className="font-semibold text-gray-900">identity</span> —{" "}
            <span className="font-semibold text-gray-900">meaning</span> —{" "}
            <span className="font-semibold text-gray-900">healing</span>
          </p>

          <p className="mb-6 text-lg md:text-xl font-semibold text-gray-800">
            That is what my work gives you.
          </p>

          <div className="mt-6 flex flex-col items-start gap-4 w-full max-w-sm">
            <a
              href="/about"
              className="w-full inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
              aria-label="About Uju"
            >
              About Uju Asumpta
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
              alt="Portrait of Uju"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";

const callingImage =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80";

export default function MyCallingSection() {
  return (
    <section className="bg-white text-gray-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 px-4 md:px-6 items-center">
        {/* Text */}
        <div className="lg:col-span-7 space-y-6">
          <p className="text-sm font-semibold tracking-wider text-amber-600 uppercase">
            My Calling
          </p>
          <h2 className="text-lg md:text-xl font-extrabold tracking-wide text-gray-900">
            I am here to help you remember
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight uppercase">
            Who you are
          </p>

          <div className="space-y-3 text-lg md:text-xl text-gray-800 leading-relaxed">
            <p>
              To guide you back to your soul. To help you build a life of
              meaning, depth, alignment, and legacy.
            </p>
            <p>
              If you’ve ever felt lost — despite your achievements — you are not
              alone. And you don’t have to remain there.
            </p>
            <p>Welcome to the Curriculum of Life™.</p>
          </div>

          <div className="pt-2 flex flex-col gap-3 w-full max-w-sm">
            <a
              href="/curriculum"
              className="w-full inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
            >
              Explore the Curriculum of Life™
            </a>
            <a
              href="/wellsage"
              className="w-full inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
            >
              Join a Wellsage program
            </a>
            <a
              href="/speaking"
              className="w-full inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
            >
              Book me for speaking
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="lg:col-span-5">
          <div className="w-full overflow-hidden rounded-xl shadow-lg">
            <img
              src={callingImage}
              alt="Calm horizon representing clarity and purpose"
              className="w-full h-[320px] md:h-[420px] lg:h-[520px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

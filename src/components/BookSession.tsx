import React, { useState, useEffect } from "react";
import { Mic2, Layers } from "lucide-react";

const talks = [
  "Identity & meaning",
  "Purpose-driven leadership",
  "Emotional healing & inner work",
  "Spiritual maturity",
  "Values & relationship wisdom",
  "Legacy leadership",
  "Family transformation",
  "Women empowerment",
  "Soulful success & alignment",
];

const availability = [
  "Keynotes",
  "Corporate events",
  "University seminars",
  "Conferences",
  "Retreats",
  "Workshops",
  "Panel sessions",
  "Faith-based gatherings",
];

const carouselImages = [
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
];

export default function BookUjuSection() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % carouselImages.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const next = () => setSlide((s) => (s + 1) % carouselImages.length);
  const prev = () =>
    setSlide((s) => (s - 1 + carouselImages.length) % carouselImages.length);

  return (
    <section className="bg-white text-gray-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-600">
            Book Uju Asumpta
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">
            Bring soul, clarity, and transformation to your audience.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 uppercase">
              <Mic2 size={16} />
              <span>Uju speaks on</span>
            </div>
            <ul className="space-y-1.5 text-base md:text-lg text-gray-800">
              {talks.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-700 uppercase">
              <Layers size={16} />
              <span>She is available for</span>
            </div>
            <ul className="space-y-1.5 text-base md:text-lg text-gray-800">
              {availability.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md mx-auto items-center justify-center">
          <a
            href="/speaking"
            className="flex-1 inline-block px-6 py-3 bg-black text-white rounded-md font-semibold text-center transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black whitespace-nowrap"
          >
            Request Uju for your event
          </a>
          <a
            href="/contact"
            className="flex-1 inline-block px-6 py-3 border-2 border-black text-black rounded-md font-semibold text-center transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black whitespace-nowrap"
          >
            Contact the team
          </a>
        </div>

        {/* Carousel of landscape images */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-xl shadow-lg">
            <img
              key={slide}
              src={carouselImages[slide]}
              alt={`Event landscape ${slide + 1}`}
              className="w-full h-72 sm:h-80 lg:h-96 object-cover transition-opacity duration-500"
              loading="lazy"
            />
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 rounded-full px-3 py-2 text-sm font-semibold shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 border border-gray-200 rounded-full px-3 py-2 text-sm font-semibold shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Next slide"
            >
              ›
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2.5 w-2.5 rounded-full ${
                i === slide ? "bg-amber-600" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

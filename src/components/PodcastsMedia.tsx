import React, { useEffect, useState } from "react";

/**
 * Podcasts & Media section
 * - Text content on top (centered)
 * - Carousel in the middle (landscape, taller / HD Unsplash images)
 * - CTA buttons BELOW the carousel, side-by-side and centered
 * - "Watch on YouTube" button uses an inline YouTube SVG instead of the hand emoji
 */

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80",
    alt: "Person standing on a mountain at sunrise, looking out over a valley",
  },
  {
    src: "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1920&q=80",
    alt: "Audience applauding at an inspiring talk",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1920&q=80",
    alt: "Close-up of a microphone in a recording studio",
  },
  {
    src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1920&q=80",
    alt: "Person walking on a path toward a bright horizon",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1920&q=80",
    alt: "Notebook, pen and coffee — creative workspace for ideas and reflection",
  },
];

export default function PodcastsMediaSection(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // autoplay (pause when hovered)
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isHovered]);

  function goPrev() {
    setIndex((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  }
  function goNext() {
    setIndex((i) => (i + 1) % IMAGES.length);
  }
  function goTo(i: number) {
    setIndex(i % IMAGES.length);
  }

  return (
    <section
      aria-labelledby="podcasts-media-heading"
      className="bg-white text-black py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Top: centered text */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-wider text-amber-600 uppercase">
            Podcast &amp; Media
          </p>

          <h2
            id="podcasts-media-heading"
            className="mt-3 text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight whitespace-nowrap"
          >
            Listen to weekly wisdom from The Curriculum of Life™.
          </h2>
        </div>

        {/* Middle: carousel (landscape, taller) */}
        <div
          className="w-full overflow-hidden rounded-xl shadow-lg mt-10 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={IMAGES[index].src}
            alt={IMAGES[index].alt}
            className="w-full h-72 md:h-96 lg:h-[520px] object-cover object-center transition-opacity duration-500"
            loading="lazy"
          />

          {/* Prev / Next */}
          <button
            onClick={goPrev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
          >
            ‹
          </button>

          <button
            onClick={goNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
          >
            ›
          </button>

          {/* Indicators */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Show image ${i + 1}`}
                className={`w-3 h-3 rounded-full focus:outline-none focus:ring-2 focus:ring-white ${
                  i === index ? "bg-white" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom: CTA buttons side-by-side */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/podcast"
            aria-label="The Uju Asumpta Podcast"
            className="inline-block px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black text-center"
          >
            The Uju Asumpta Podcast
          </a>

          <a
            href="https://www.youtube.com"
            aria-label="Watch on YouTube"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black border-[3px] border-black rounded-md font-medium transition-colors duration-300 hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Inline YouTube logo (accessible) */}
            <svg
              width="20"
              height="14"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <rect width="24" height="16" rx="3" fill="#FF0000" />
              <path d="M9 12V4l6 4-6 4z" fill="#fff" />
            </svg>
            Watch on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80",
    alt: "Sunrise over misty mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80",
    alt: "Forest path with soft light",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
    alt: "Calm ocean at dusk",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80",
    alt: "Desert dunes at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1920&q=80",
    alt: "Open sky over tranquil landscape",
  },
];

const QUOTES = [
  {
    text: "Clarity is the courage to see yourself without the noise.",
    author: "Uju Asumpta",
  },
  {
    text: "Identity is the memory your soul refuses to forget.",
    author: "Uju Asumpta",
  },
  {
    text: "Alignment is when your actions obey your essence.",
    author: "Uju Asumpta",
  },
  {
    text: "Healing is strength learning to be gentle with itself.",
    author: "Uju Asumpta",
  },
  { text: "Legacy is love arranged to outlive you.", author: "Uju Asumpta" },
];

export default function AboutHero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const navItems = [
    { name: "About", href: "/about" },
    { name: "The Curriculum of Life™", href: "/curriculum" },
    { name: "Wellsage", href: "/wellsage" },
    { name: "Speaking", href: "/speaking" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setQuoteIndex((c) => (c + 1) % QUOTES.length);
      setImageIndex((c) => (c + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused]);

  return (
    <>
      {/* HEADER */}
      <header className="bg-gray-50 text-black py-10">
        <div className="flex items-center justify-between px-6 md:px-10">
          {/* LOGO */}
          <Link
            to="/"
            className="text-3xl md:text-2xl font-bold tracking-tight"
          >
            <span style={{ fontFamily: "'Playwrite NO', Georgia, serif" }}>
              UJU
            </span>{" "}
            <span style={{ fontFamily: "'Ubuntu', Georgia, serif" }}>
              ASUMPTA
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex relative bg-white rounded-lg shadow-xl overflow-hidden">
            <div
              className="absolute top-1.5 bottom-1.5 left-1 bg-black/85 rounded-md transition-all duration-300 pointer-events-none"
              style={{
                width:
                  hoveredIndex !== null && linkRefs.current[hoveredIndex]
                    ? `${linkRefs.current[hoveredIndex]!.offsetWidth - 8}px`
                    : "0px",
                transform:
                  hoveredIndex !== null
                    ? `translateX(${
                        linkRefs.current
                          .slice(0, hoveredIndex)
                          .reduce(
                            (acc, el) => acc + (el?.offsetWidth || 0),
                            0
                          ) + 4
                      }px)`
                    : "translateX(0)",
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />
            {navItems.map((item, index) =>
              item.href === "/about" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  ref={(el) => (linkRefs.current[index] = el)}
                  className="relative px-6 py-3 font-medium z-10 hover:text-white"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  ref={(el) => (linkRefs.current[index] = el)}
                  className="relative px-6 py-3 font-medium z-10 hover:text-white"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="md:hidden p-2 rounded-md bg-white shadow"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <h1 className="m-20 text-3xl md:text-5xl font-extrabold text-gray-800">
            Speaking Engagements
          </h1>
        </div>
      </header>

      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={HERO_IMAGES[imageIndex].src}
            src={HERO_IMAGES[imageIndex].src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute right-8 top-1/2 -translate-y-1/2 max-w-md z-20">
          <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 text-white">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
                className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed"
              >
                “{QUOTES[quoteIndex].text}”
                <footer className="mt-4 text-amber-300 font-semibold">
                  — {QUOTES[quoteIndex].author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}

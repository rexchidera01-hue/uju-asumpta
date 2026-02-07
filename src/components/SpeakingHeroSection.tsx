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

export default function SpeakingHeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Curriculum", href: "/curriculum" },
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

  // Handle mobile menu keyboard and body scroll
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    if (mobileMenuOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      setTimeout(() => firstMobileLinkRef.current?.focus(), 0);
    } else {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Reset linkRefs array size
  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navItems.length);
  }, [navItems.length]);

  return (
    <>
      {/* HEADER */}
      <header className="bg-gray-50 text-black py-4 sm:py-6 md:py-8">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-10">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl md:text-2xl font-bold tracking-tight"
          >
            <span style={{ fontFamily: "'Playwrite NO', Georgia, serif" }}>
              UJU
            </span>{" "}
            <span style={{ fontFamily: "'Ubuntu', Georgia, serif" }}>
              ASUMPTA
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex relative bg-white rounded-lg shadow-xl overflow-hidden border-2 border-white">
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
                            0,
                          ) + 4
                      }px)`
                    : "translateX(0)",
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />
            {navItems.map((item, index) =>
              item.href === "/speaking" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  ref={(el) => (linkRefs.current[index] = el)}
                  className="relative px-6 py-3 font-medium z-10 text-black hover:text-white transition-colors"
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
                  className="relative px-6 py-3 font-medium z-10 text-black hover:text-white transition-colors"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                </a>
              ),
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="md:hidden p-2 rounded-md bg-white shadow"
          >
            {mobileMenuOpen ? (
              <X size={20} strokeWidth={2} />
            ) : (
              <Menu size={20} strokeWidth={2} />
            )}
          </button>
        </div>

        {/* TITLE SECTION - INCREASED VERTICAL PADDING */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center px-4 pb-8 sm:pb-12 md:pb-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-800 text-center">
            Speaking Engagements
          </h1>
        </div>
      </header>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            id="mobile-menu"
            aria-hidden={!mobileMenuOpen}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: 80 }}
              animate={{ x: 0 }}
              exit={{ x: 80 }}
              transition={{ duration: 0.25 }}
              className="relative ml-auto bg-white w-full max-w-xs h-full shadow-xl p-4 sm:p-6 overflow-y-auto"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <X size={18} strokeWidth={2} />
              </button>

              <nav
                className="mt-8 space-y-3 sm:space-y-4"
                aria-label="Mobile primary"
              >
                {navItems.map((item, idx) =>
                  item.href === "/speaking" ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      ref={idx === 0 ? firstMobileLinkRef : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      ref={idx === 0 ? firstMobileLinkRef : undefined}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {item.name}
                    </a>
                  ),
                )}
              </nav>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* HERO - REDUCED HEIGHT */}
      <section
        className="relative h-96 sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={HERO_IMAGES[imageIndex].src}
            src={HERO_IMAGES[imageIndex].src}
            alt={HERO_IMAGES[imageIndex].alt}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/45" />

        {/* Quote Box - responsive positioning */}
        <div className="absolute left-4 right-4 sm:right-8 sm:left-auto top-1/2 -translate-y-1/2 z-20 w-auto max-w-xs sm:max-w-md">
          <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 sm:p-6 text-white">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
                className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed"
              >
                "{QUOTES[quoteIndex].text}"
                <footer className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base text-amber-300 font-semibold">
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

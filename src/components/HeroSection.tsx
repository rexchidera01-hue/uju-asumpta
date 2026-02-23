import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-img.jpeg"; // ← your imported image

export default function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  const quotes: { text: string; author: string }[] = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
      author: "Zig Ziglar",
    },
    {
      text: "Out of your vulnerabilities will come your strength.",
      author: "Sigmund Freud",
    },
    {
      text: "Knowing yourself is the beginning of all wisdom.",
      author: "Aristotle",
    },
    {
      text: "The purpose of life is a life of purpose.",
      author: "Robert Byrne",
    },
  ];

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Curriculum", href: "/curriculum" },
    { name: "Wellsage", href: "/wellsage" },
    { name: "Speaking", href: "/speaking" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contact", href: "/contact" },
  ];

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused, quotes.length]);

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

  // Keep refs array in sync
  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navItems.length);
  }, [navItems.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Image Background */}
      <img
        src={heroBg}
        alt="Hero background - inspirational scene"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlays for readability and mood */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-orange-800/10 to-transparent z-10" />
      <div className="absolute inset-0 opacity-30 z-10 pointer-events-none">
        <div className="absolute top-[-150px] left-[-150px] w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-[-80px] right-[-80px] w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
      </div>

      {/* NAVBAR */}
      <nav
        className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-black drop-shadow-2xl tracking-tight"
        >
          <span style={{ fontFamily: "'Playwrite NO', Georgia, serif" }}>
            UJU
          </span>
          <span style={{ fontFamily: "'Ubuntu', Georgia, serif" }}>
            ASUMPTA
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex relative bg-white/90 backdrop-blur-sm rounded-lg border border-white/30 shadow-xl items-center overflow-hidden">
          <div
            className="absolute inset-y-1 left-0 bg-black/80 rounded-lg transition-all duration-300 ease-out pointer-events-none"
            style={{
              width:
                hoveredIndex !== null && linkRefs.current[hoveredIndex]
                  ? `${linkRefs.current[hoveredIndex]?.offsetWidth ?? 0}px`
                  : "0px",
              transform:
                hoveredIndex !== null && linkRefs.current[hoveredIndex]
                  ? `translateX(${linkRefs.current
                      .slice(0, hoveredIndex)
                      .reduce((acc, el) => acc + (el?.offsetWidth ?? 0), 0)}px)`
                  : "translateX(0)",
              opacity: hoveredIndex !== null ? 1 : 0,
            }}
          />

          {navItems.map((item, index) => (
            <Link
              key={item.name}
              to={item.href}
              ref={(el) => (linkRefs.current[index] = el)}
              className="relative px-4 md:px-6 py-3 text-black font-medium transition-colors duration-200 z-10 hover:text-white text-sm md:text-base"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <button
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="p-2 rounded-md bg-white/90 border border-gray-200 shadow-sm"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Quotes carousel */}
      <div
        className="absolute left-4 right-4 sm:right-8 sm:left-auto top-1/2 -translate-y-1/2 z-20 w-auto max-w-xs sm:max-w-md"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="bg-black/60 backdrop-blur-lg rounded-xl p-4 sm:p-6 text-white shadow-2xl border border-white/10">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed"
            >
              "{quotes[current].text}"
              <footer className="mt-3 text-sm sm:text-base font-semibold text-amber-300">
                — {quotes[current].author}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative ml-auto bg-white w-4/5 max-w-sm h-full shadow-2xl p-6 overflow-y-auto"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>

              <nav className="mt-16 space-y-4" aria-label="Mobile navigation">
                {navItems.map((item, idx) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </section>
  );
}

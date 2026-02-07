import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import videoBg from "../assets/vid-img.mp4";

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

  const [current, setCurrent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

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

  // Reset linkRefs array size to match navItems
  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, navItems.length);
  }, [navItems.length]);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={videoBg} type="video/mp4" />
        </video>

        {/* Fallback Image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)",
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-orange-800/20 to-transparent z-10" />
        <div className="absolute inset-0 opacity-40 z-10">
          <div className="absolute top-[-200px] left-[-200px] w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-orange-500 rounded-full blur-3xl" />
        </div>

        {/* NAVBAR */}
        <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl md:text-5xl lg:text-2xl font-bold text-black drop-shadow-2xl tracking-tight"
          >
            <span style={{ fontFamily: "'Playwrite NO', Georgia, serif" }}>
              UJU
            </span>
            <span style={{ fontFamily: "'Ubuntu', Georgia, serif" }}>
              ASUMPTA
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex relative bg-white rounded-lg border-2 border-white shadow-xl flex items-center overflow-hidden">
            <div
              className="absolute top-1 bottom-1 left-0 bg-black/85 rounded-lg transition-all duration-300 ease-out pointer-events-none"
              style={{
                width:
                  hoveredIndex !== null && linkRefs.current[hoveredIndex]
                    ? `${linkRefs.current[hoveredIndex]!.offsetWidth}px`
                    : "0px",
                transform:
                  hoveredIndex !== null && linkRefs.current[hoveredIndex]
                    ? `translateX(${linkRefs.current
                        .slice(0, hoveredIndex)
                        .reduce(
                          (acc, el) => acc + (el?.offsetWidth || 0),
                          0,
                        )}px)`
                    : "translateX(0)",
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {navItems.map((item, index) =>
              item.href === "/about" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  ref={(el) =>
                    (linkRefs.current[index] = el as HTMLAnchorElement | null)
                  }
                  className="relative px-4 md:px-6 py-3 text-black font-medium transition-colors duration-200 z-10 hover:text-white text-sm md:text-base"
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
                  className="relative px-4 md:px-6 py-3 text-black font-medium transition-colors duration-200 z-10 hover:text-white text-sm md:text-base"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                </a>
              ),
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="relative z-50 inline-flex items-center justify-center p-2 rounded-md bg-white/90 border border-gray-200 shadow-sm"
            >
              {mobileMenuOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </nav>

        {/* Quotes carousel - NOW VISIBLE ON ALL SCREEN SIZES */}
        <div
          className="absolute left-4 right-4 sm:right-8 sm:left-auto top-1/2 transform -translate-y-1/2 z-20 w-auto max-w-xs sm:max-w-md"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 sm:p-6 text-white shadow-lg">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-sm sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed"
              >
                "{quotes[current].text}"
                <footer className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base font-semibold text-amber-300">
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
              aria-hidden={!mobileMenuOpen}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 md:hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black"
                onClick={() => setMobileMenuOpen(false)}
              />

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
                    item.href === "/about" ? (
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
      </section>
    </>
  );
}

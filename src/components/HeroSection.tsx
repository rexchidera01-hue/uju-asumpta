import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import videoBg from "../assets/vid-img.mp4";

export default function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Mobile menu state & focus ref
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Quotes carousel data (edit these as you like)
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
    { name: "The Curriculum of Life™", href: "/curriculum" },
    { name: "Wellsage", href: "/wellsage" },
    { name: "Speaking", href: "/speaking" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contact", href: "/contact" },
  ];

  const [current, setCurrent] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isPaused, quotes.length]);

  // Close mobile menu on Escape and manage body scroll when open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    if (mobileMenuOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      // Focus the first link for keyboard users
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

        {/* Fallback Image (kept behind the video) */}
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
        <nav className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between">
          {/* LOGO / NAME — CLICKS TO HOME ("/") */}
          <Link
            to="/"
            className="text-4xl md:text-5xl lg:text-2xl font-bold text-black drop-shadow-2xl tracking-tight"
          >
            <span style={{ fontFamily: "'Playwrite NO', Georgia, serif" }}>
              UJU
            </span>
            <span style={{ fontFamily: "'Ubuntu', Georgia, serif" }}>
              ASUMPTA
            </span>
          </Link>

          {/* Desktop nav (visible md+) */}
          <div className="hidden md:flex relative bg-white rounded-lg border-2 border-white shadow-xl flex items-center overflow-hidden">
            {/* Sliding black pill */}
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
                          0
                        )}px)`
                    : "translateX(0)",
                opacity: hoveredIndex !== null ? 1 : 0,
              }}
            />

            {navItems.map((item, index) =>
              // Use react-router Link for the About item so it performs client-side navigation
              item.href === "/about" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  ref={(el) =>
                    (linkRefs.current[index] = el as HTMLAnchorElement | null)
                  }
                  className="relative px-6 md:px-6 py-3 text-black font-medium transition-colors duration-200 z-10 hover:text-white"
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
                  className="relative px-6 md:px-6 py-3 text-black font-medium transition-colors duration-200 z-10 hover:text-white"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* Mobile hamburger (visible < md) using lucide-react */}
          <div className="md:hidden flex items-center">
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="relative z-60 inline-flex items-center justify-center p-2 rounded-md bg-white/90 border border-gray-200 shadow-sm"
            >
              {/* show Menu when closed, X when open */}
              {mobileMenuOpen ? (
                <X size={20} strokeWidth={2} />
              ) : (
                <Menu size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </nav>

        {/* Quotes carousel on the middle-right of the hero */}
        <div
          className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 max-w-md w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 text-white shadow-lg">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-lg sm:text-xl md:text-2xl font-medium leading-relaxed"
              >
                “{quotes[current].text}”
                <footer className="mt-4 text-sm md:text-base font-semibold text-amber-300">
                  — {quotes[current].author}
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile menu overlay/drawer (no Get Started button) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.aside
              id="mobile-menu"
              aria-hidden={!mobileMenuOpen}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-60 md:hidden"
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

              {/* Panel */}
              <motion.div
                initial={{ x: 80 }}
                animate={{ x: 0 }}
                exit={{ x: 80 }}
                transition={{ duration: 0.25 }}
                className="relative bg-white w-full max-w-xs h-full shadow-xl p-6"
              >
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="absolute top-4 right-4 p-2 rounded-md text-gray-700"
                >
                  <X size={18} strokeWidth={2} />
                </button>

                <nav className="mt-8 space-y-4" aria-label="Mobile primary">
                  {navItems.map((item, idx) =>
                    item.href === "/about" ? (
                      <Link
                        key={item.name}
                        to={item.href}
                        ref={idx === 0 ? firstMobileLinkRef : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        ref={idx === 0 ? firstMobileLinkRef : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-3 rounded-md text-base font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        {item.name}
                      </a>
                    )
                  )}
                </nav>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </section>

      {/* rest of the HeroSection content and subsequent sections remain unchanged */}
    </>
  );
}

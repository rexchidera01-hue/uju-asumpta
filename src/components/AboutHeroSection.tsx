import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

// Single hero image import (change path/name to your actual asset)
import heroImage from "../assets/about-img.jpeg"; // ← your single image here

const QUOTES = [
  {
    text: "True power is not becoming more—it is remembering who you have always been.",
    author: "Uju Asumpta",
  },
  {
    text: "When you align with Truth, life stops resisting you and begins to respond.",
    author: "Uju Asumpta",
  },
  {
    text: "Love is not something you fall into; it is something you awaken to within.",
    author: "Uju Asumpta",
  },
  {
    text: "Healing begins the moment you stop fighting your past and start listening to its wisdom.",
    author: "Uju Asumpta",
  },
  {
    text: "Legacy is not what you leave behind—it is who you awaken along the way.",
    author: "Uju Asumpta",
  },
];

export default function AboutHeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const firstMobileLinkRef = useRef<HTMLAnchorElement | null>(null);

  const quoteTimerRef = useRef<number | null>(null);
  const lastQuoteTickRef = useRef<number>(Date.now());
  const INTERVAL_MS = 5000;

  const navItems = [
    { name: "About", href: "/about" },
    { name: "Curriculum", href: "/curriculum" },
    { name: "Wellsage", href: "/wellsage" },
    { name: "Speaking", href: "/speaking" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contact", href: "/contact" },
  ];

  // Start / clear quote timer
  const clearQuoteTimer = () => {
    if (quoteTimerRef.current != null) {
      window.clearInterval(quoteTimerRef.current);
      quoteTimerRef.current = null;
    }
  };

  const startQuoteTimer = () => {
    clearQuoteTimer();
    lastQuoteTickRef.current = Date.now();
    quoteTimerRef.current = window.setInterval(() => {
      setQuoteIndex((c) => {
        lastQuoteTickRef.current = Date.now();
        return (c + 1) % QUOTES.length;
      });
    }, INTERVAL_MS);
  };

  // Mount / unmount
  useEffect(() => {
    startQuoteTimer();
    return () => clearQuoteTimer();
  }, []);

  // Pause/resume
  useEffect(() => {
    if (!isPaused) {
      startQuoteTimer();
    } else {
      clearQuoteTimer();
    }
    return () => clearQuoteTimer();
  }, [isPaused]);

  // Sync on tab visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !isPaused) {
        const now = Date.now();
        const elapsed = now - lastQuoteTickRef.current;
        const steps = Math.floor(elapsed / INTERVAL_MS);

        if (steps > 0) {
          setQuoteIndex((c) => (c + steps) % QUOTES.length);
          lastQuoteTickRef.current = now;
          startQuoteTimer();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPaused]);

  // Mobile menu keyboard + body scroll lock
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

  // Keep refs in sync
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
            {navItems.map((item, index) => (
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
            ))}
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

        {/* TITLE */}
        <div className="mt-8 sm:mt-12 md:mt-16 flex justify-center px-4 pb-8 sm:pb-12 md:pb-16">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-800 text-center">
            About Uju Asumpta
          </h1>
        </div>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            id="mobile-menu"
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
                className="absolute top-4 right-4 p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <X size={18} strokeWidth={2} />
              </button>

              <nav
                className="mt-8 space-y-3 sm:space-y-4"
                aria-label="Mobile primary"
              >
                {navItems.map((item, idx) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    ref={idx === 0 ? firstMobileLinkRef : undefined}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* HERO SECTION – single fixed image, quotes only on md+ */}
      <section
        className="relative h-96 sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Fixed background image */}
        <img
          src={heroImage}
          alt="Inspirational landscape representing transformation and purpose"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/45" />

        {/* Quote carousel – hidden on mobile, visible from md (768px) */}
        <div className="hidden md:block absolute left-4 right-4 lg:right-8 lg:left-auto top-1/2 -translate-y-1/2 z-20 w-auto max-w-xs lg:max-w-md">
          <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 sm:p-6 text-white">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quoteIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6 }}
                className="text-base lg:text-xl font-bold leading-relaxed"
              >
                "{QUOTES[quoteIndex].text}"
                <footer className="mt-3 text-sm lg:text-base text-amber-300 font-semibold">
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

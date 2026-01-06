import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
    alt: "Soft waves rolling over a sunrise beach",
  },
  {
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80",
    alt: "Mountain ridge above the clouds at dawn",
  },
  {
    src: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1920&q=80",
    alt: "Dramatic coastline cliffs with ocean mist",
  },
  {
    src: "https://images.unsplash.com/photo-1472791108553-c9405341e398?auto=format&fit=crop&w=1920&q=80",
    alt: "Calm turquoise sea under open sky",
  },
  {
    src: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=1920&q=80",
    alt: "Golden hour light over a quiet shoreline",
  },
];

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

export default function AboutHero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // timers & last-tick refs
  const imageTimerRef = useRef<number | null>(null);
  const quoteTimerRef = useRef<number | null>(null);
  const lastImageTickRef = useRef<number>(Date.now());
  const lastQuoteTickRef = useRef<number>(Date.now());

  const INTERVAL_MS = 5000;

  const navItems = [
    { name: "About", href: "/about" },
    { name: "The Curriculum of Life™", href: "/curriculum" },
    { name: "Wellsage", href: "/wellsage" },
    { name: "Speaking", href: "/speaking" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contact", href: "/contact" },
  ];

  // helpers to start/clear timers
  const clearImageTimer = () => {
    if (imageTimerRef.current != null) {
      window.clearInterval(imageTimerRef.current);
      imageTimerRef.current = null;
    }
  };
  const clearQuoteTimer = () => {
    if (quoteTimerRef.current != null) {
      window.clearInterval(quoteTimerRef.current);
      quoteTimerRef.current = null;
    }
  };

  const startImageTimer = () => {
    clearImageTimer();
    lastImageTickRef.current = Date.now();
    imageTimerRef.current = window.setInterval(() => {
      setImageIndex((c) => {
        lastImageTickRef.current = Date.now();
        return (c + 1) % HERO_IMAGES.length;
      });
    }, INTERVAL_MS);
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

  // Start timers on component mount
  useEffect(() => {
    startImageTimer();
    startQuoteTimer();

    return () => {
      clearImageTimer();
      clearQuoteTimer();
    };
  }, []);

  // pause/resume on hover
  useEffect(() => {
    if (!isPaused) {
      startImageTimer();
      startQuoteTimer();
    } else {
      clearImageTimer();
      clearQuoteTimer();
    }

    return () => {
      clearImageTimer();
      clearQuoteTimer();
    };
  }, [isPaused]);

  // Sync when tab becomes visible again
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && !isPaused) {
        const now = Date.now();

        const elapsedImage = now - lastImageTickRef.current;
        const stepsImage = Math.floor(elapsedImage / INTERVAL_MS);
        if (stepsImage > 0) {
          setImageIndex((c) => (c + stepsImage) % HERO_IMAGES.length);
          lastImageTickRef.current = now;
          startImageTimer();
        }

        const elapsedQuote = now - lastQuoteTickRef.current;
        const stepsQuote = Math.floor(elapsedQuote / INTERVAL_MS);
        if (stepsQuote > 0) {
          setQuoteIndex((c) => (c + stepsQuote) % QUOTES.length);
          lastQuoteTickRef.current = now;
          startQuoteTimer();
        }
      }
    };

    const handleFocus = () => handleVisibility();

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
    };
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
            About Uju Asumpta
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
            alt={HERO_IMAGES[imageIndex].alt}
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

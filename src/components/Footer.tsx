import React, { useState } from "react";
import { Youtube, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  function validateEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Brand / About */}
          <div className="sm:col-span-2 md:col-span-4">
            <a
              href="/"
              className="inline-block text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="The Curriculum of Life homepage"
            >
              <span className="sr-only">The Curriculum of Life</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-400 rounded-md flex items-center justify-center text-gray-900 font-bold text-sm sm:text-base">
                  U
                </div>
                <span className="text-base sm:text-lg font-bold">
                  Uju Asumpta
                </span>
              </div>
            </a>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-300">
              Tools, courses, and resources for living deeply, growing
              intentionally, and leaving something timeless behind.
            </p>

            <div className="mt-4 sm:mt-6 flex items-center gap-3">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube
                  size={18}
                  className="sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter
                  size={18}
                  className="sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram
                  size={18}
                  className="sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin
                  size={18}
                  className="sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="sm:col-span-2 md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200">
                Explore
              </h3>
              <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="/curriculum" className="hover:text-white">
                    Curriculum
                  </a>
                </li>
                <li>
                  <a href="/wellsage" className="hover:text-white">
                    Wellsage
                  </a>
                </li>
                <li>
                  <a href="/podcast" className="hover:text-white">
                    Podcast
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200">
                About
              </h3>
              <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="/about" className="hover:text-white">
                    About Uju
                  </a>
                </li>
                <li>
                  <a href="/speaking" className="hover:text-white">
                    Speaking
                  </a>
                </li>
                <li>
                  <a href="/media" className="hover:text-white">
                    Media
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-200">
                Support
              </h3>
              <ul className="mt-2 sm:mt-3 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-300">
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 md:col-span-3">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-200">
              Join the mailing list
            </h3>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300">
              Receive weekly messages that ground, strengthen, and transform.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 sm:mt-8 border-t border-gray-800 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} The Curriculum of Life™. Created by Rex
            Chidera. All rights reserved.
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="/sitemap.xml"
              className="text-xs text-gray-300 hover:text-white"
            >
              Sitemap
            </a>
            <a
              href="/contact"
              className="text-xs text-gray-300 hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

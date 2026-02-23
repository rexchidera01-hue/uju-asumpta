// src/components/WealthMasterclassSection.tsx
import React, { useState } from "react";
import toast from "react-hot-toast";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzbvbdp";

// ← Replace with real Zoom details when ready
const ZOOM_LINK =
  "https://us06web.zoom.us/meeting/register/y79IIooeSiSllRYRlozboA";
const MEETING_ID = "845 6680 0082";
const PASSCODE = "340500";

export default function WealthMasterclassSection(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email please, sis — we need to reach you! 😅");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      if (res.ok) {
        toast.success("You're locked in! 💚");
        setSubmitted(true);
        setName("");
        setEmail("");
      } else {
        toast.error("Oops — try again real quick");
      }
    } catch {
      toast.error("Network acting shady — check connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-12 md:py-28 px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Top Badge – biggest on desktop, still prominent on mobile */}
        <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 md:mb-8 text-left">
          <span className="text-green-600">FREE</span> Live Training on Zoom
        </p>

        {/* Main Headline – serif, nowrap on mobile, smaller to fit one line */}
        <h2
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-extrabold text-gray-900 leading-tight mb-4 md:mb-8 text-left whitespace-nowrap"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Wealth Awareness Masterclass
        </h2>

        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-8 md:mb-12 text-left">
          Build Wealth With Structure, Not Hustle
        </p>

        {/* Core Message */}
        <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed space-y-4 md:space-y-6 mb-10 md:mb-16 text-left max-w-4xl">
          <p>
            Most people chase income. Few understand wealth. Even fewer build it
            intentionally.
          </p>
          <p className="font-medium italic">
            This is not hype. This is architecture.
          </p>
          <p>
            The Wealth Awareness Masterclass is a powerful live session designed
            to shift your thinking from survival and hustle to structure and
            legacy.
          </p>
        </div>

        {/* Event Details */}
        <div className="bg-gray-50 rounded-xl md:rounded-2xl shadow-lg p-6 md:p-10 mb-10 md:mb-16 border border-gray-100 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Title
              </p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                Wealth Awareness Masterclass
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Format
              </p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                Live on Zoom
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Cost
              </p>
              <p className="font-semibold text-green-600 text-sm sm:text-base">
                Free
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Duration
              </p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                90 Minutes
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Date
              </p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                23 February, 2026
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Time
              </p>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                8:00 PM - 10:00 PM WAT
              </p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="max-w-4xl mb-10 md:mb-16 text-left">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-5 md:mb-8">
            What You Will Learn
          </h3>
          <ul className="space-y-3 md:space-y-5 text-sm sm:text-base md:text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-lg sm:text-xl md:text-2xl font-bold">
                •
              </span>
              The real difference between income and true wealth
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-lg sm:text-xl md:text-2xl font-bold">
                •
              </span>
              Why most people remain trapped in financial cycles
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-lg sm:text-xl md:text-2xl font-bold">
                •
              </span>
              The identity shift required to build lasting wealth
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-lg sm:text-xl md:text-2xl font-bold">
                •
              </span>
              How to design systems that generate consistent income
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-lg sm:text-xl md:text-2xl font-bold">
                •
              </span>
              The foundation of generational wealth architecture
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-lg sm:text-xl md:text-2xl font-bold">
                •
              </span>
              The 5 pillars required to build wealth that outlives you
            </li>
          </ul>
          <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl italic font-medium text-gray-800">
            You will leave with clarity, structure, and a new financial lens.
          </p>
        </div>

        {/* Reserve Your Spot Form */}
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-5 md:mb-6 text-left">
            Reserve Your Spot
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8 text-left">
            Enter your details to get the Zoom link and reminders.
          </p>

          {submitted ? (
            <div className="text-left py-8 md:py-10">
              <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-green-600 mb-5 md:mb-6">
                Thank you for signing in! 🎉
              </h4>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 md:mb-8">
                You're officially part of the Wealth Awareness Masterclass.
                Here's your access:
              </p>

              <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200">
                <p className="text-base sm:text-lg font-semibold text-gray-800 mb-3 md:mb-4">
                  Zoom Link:
                </p>
                <a
                  href={ZOOM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 font-medium break-all underline text-sm sm:text-base md:text-lg block mb-4 md:mb-6"
                >
                  {ZOOM_LINK}
                </a>

                <div className="space-y-2 md:space-y-4 text-sm sm:text-base md:text-lg text-gray-800">
                  <p>
                    <span className="font-bold">Meeting ID:</span> {MEETING_ID}
                  </p>
                  <p>
                    <span className="font-bold">Passcode:</span> {PASSCODE}
                  </p>
                </div>
              </div>

              <p className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg italic text-gray-800">
                Join 5–10 minutes early, bring your notebook, and get ready to
                build wealth that outlives you 💛
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 sm:px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              />
              <input
                type="email"
                placeholder="Your best email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 sm:px-5 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm sm:text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 sm:py-4 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition shadow-lg text-sm sm:text-base ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:scale-[1.02]"
                }`}
              >
                {loading ? "Reserving..." : "Get Zoom Link"}
              </button>
            </form>
          )}

          <p className="mt-6 text-xs sm:text-sm text-gray-600 text-center">
            No spam. Just pure transformation vibes 💛
          </p>
        </div>
      </div>
    </section>
  );
}

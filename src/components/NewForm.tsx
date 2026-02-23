// src/components/WealthMasterclassSection.tsx
import React, { useState } from "react";
import toast from "react-hot-toast";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mvzbvbdp";

// ← Replace these with your REAL Zoom details when ready
const ZOOM_LINK =
  "https://us06web.zoom.us/meeting/register/y79IIooeSiSllRYRlozboA "; // ← update
const MEETING_ID = "845 6680 0082"; // ← update
const PASSCODE = "340500"; // ← update

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
    <section className="bg-gradient-to-br from-amber-50 via-white to-orange-50 py-16 md:py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Badge */}
        <p className="text-sm md:text-base font-semibold tracking-wider text-amber-600 uppercase mb-4">
          Free Live Training on Zoom
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Wealth Awareness Masterclass
        </h2>
        <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-8">
          Build Wealth With Structure — Not Hustle
        </p>

        {/* Core Message */}
        <div className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed space-y-6 mb-12">
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
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 mb-12 max-w-3xl mx-auto border border-amber-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Title</p>
              <p className="font-semibold text-gray-900">
                Wealth Awareness Masterclass
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Format</p>
              <p className="font-semibold text-gray-900">Live on Zoom</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Cost</p>
              <p className="font-semibold text-green-600">Free</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Duration</p>
              <p className="font-semibold text-gray-900">90 Minutes</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Date</p>
              <p className="font-semibold text-gray-900">23 February, 2026</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Time</p>
              <p className="font-semibold text-gray-900">
                8:00 PM - 10:00 PM WAT
              </p>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="text-left max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            What You Will Learn
          </h3>
          <ul className="space-y-4 text-lg text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-xl font-bold">•</span>
              The real difference between income and true wealth
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-xl font-bold">•</span>
              Why most people remain trapped in financial cycles
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-xl font-bold">•</span>
              The identity shift required to build lasting wealth
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-xl font-bold">•</span>
              How to design systems that generate consistent income
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-xl font-bold">•</span>
              The foundation of generational wealth architecture
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 text-xl font-bold">•</span>
              The 5 pillars required to build wealth that outlives you
            </li>
          </ul>
          <p className="mt-6 text-lg italic font-medium text-gray-800">
            You will leave with clarity, structure, and a new financial lens.
          </p>
        </div>

        {/* Who This Is For */}
        <div className="text-left max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Who This Is For
          </h3>
          <p className="text-lg text-gray-700 mb-4">
            This session is designed for:
          </p>
          <ul className="space-y-3 text-lg text-gray-700">
            <li>• Faith-driven entrepreneurs</li>
            <li>• Professionals seeking financial structure</li>
            <li>• Leaders who want to build legacy</li>
            <li>• Anyone ready to move from earning to building</li>
          </ul>
          <p className="mt-6 text-lg font-medium text-gray-800">
            If you're serious about building wealth aligned with purpose, this
            masterclass is for you.
          </p>
        </div>

        {/* What You'll Walk Away With */}
        <div className="bg-amber-50 rounded-2xl p-8 md:p-12 mb-12 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            What You’ll Walk Away With
          </h3>
          <ul className="space-y-4 text-lg text-gray-800">
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>A new wealth
              mindset framework
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              Clarity on where you are financially
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>A simple action
              roadmap to begin building
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 text-2xl">✓</span>
              Access to the Generational Wealth Architecture Model
            </li>
          </ul>
          <p className="mt-8 text-xl font-semibold italic text-amber-800">
            This session can permanently shift how you approach money.
          </p>
        </div>

        {/* Important Instructions */}
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Important Instructions
          </h3>
          <ul className="space-y-4 text-lg text-gray-700 list-disc list-inside">
            <li>Join 5–10 minutes early</li>
            <li>Bring a notebook</li>
            <li>Eliminate distractions</li>
            <li>Stay until the end for implementation guidance</li>
          </ul>
          <p className="mt-6 text-xl font-semibold text-red-600">
            Spots are limited to ensure engagement and live interaction.
          </p>
        </div>

        {/* Final Note */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-xl md:text-2xl font-bold italic text-gray-900">
            Wealth does not happen accidentally. It is built intentionally.
          </p>
          <p className="text-lg text-gray-800 mt-4">
            Awareness is the beginning of wealth. Structure is what sustains it.
            Legacy is what defines it.
          </p>
        </div>

        {/* Sign-In / Reserve Form */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 border border-amber-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Reserve Your Spot
          </h3>
          <p className="text-gray-700 mb-8">
            Enter your details to get the Zoom link and reminders.
          </p>

          {submitted ? (
            <div className="text-center py-8">
              <h4 className="text-2xl font-bold text-green-600 mb-6">
                Thank you for signing in! 🎉
              </h4>
              <p className="text-lg text-gray-700 mb-8">
                You're officially part of the Wealth Awareness Masterclass.
                Here's your access:
              </p>

              <div className="bg-amber-50 rounded-xl p-6 mb-8 border border-amber-200">
                <p className="text-base font-semibold text-gray-800 mb-3">
                  Zoom Link:
                </p>
                <a
                  href={ZOOM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:text-amber-900 font-medium break-all underline text-lg block mb-6"
                >
                  {ZOOM_LINK}
                </a>

                <div className="space-y-3 text-left text-gray-800">
                  <p>
                    <span className="font-semibold">Meeting ID:</span>{" "}
                    {MEETING_ID}
                  </p>
                  <p>
                    <span className="font-semibold">Passcode:</span> {PASSCODE}
                  </p>
                </div>
              </div>

              <p className="text-base italic text-gray-800">
                Join 5–10 minutes early, bring your notebook, and get ready to
                build wealth that outlives you 💛
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
              />
              <input
                type="email"
                placeholder="Your best email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 bg-white border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition shadow-lg text-base ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
                }`}
              >
                {loading ? "Reserving..." : "Get Zoom Link"}
              </button>
            </form>
          )}

          <p className="mt-6 text-sm text-gray-600 text-center">
            No spam. Just pure transformation vibes 💛
          </p>
        </div>
      </div>
    </section>
  );
}

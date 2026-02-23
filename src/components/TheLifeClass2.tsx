import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ClarityCommunitySection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setStatusMessage("Please enter a valid email address.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");
    setStatusType("");

    // TODO: Replace this with your actual backend call (e.g., Convex mutation, Supabase insert, EmailJS, or form API)
    // Example placeholder: simulate sending email with invite link
    try {
      // Simulate API call (2 seconds delay)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // On success
      setStatusMessage(
        "Great! The WhatsApp invite link has been sent to your email.",
      );
      setStatusType("success");
      setEmail(""); // clear input
    } catch (err) {
      setStatusMessage(
        "Something went wrong. Please try again or contact support.",
      );
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-amber-50 via-white to-amber-50 overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-300 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 md:px-12 max-w-4xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-amber-900 mb-6"
        >
          Join the Clarity Sessions Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto text-left"
        >
          A sacred space where seekers come together to gain clarity, deepen
          their purpose, heal old wounds, and walk in alignment with God's
          calling. Here we share insights, testimonies, guided reflections, and
          encouragement, all rooted in faith and transformation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-xl border border-amber-200 mb-10 text-left"
        >
          <p className="text-xl md:text-3xl font-bold text-amber-800 mb-2">
            Special Lenten Offering
          </p>
          <p className="text-xl md:text-2xl font-semibold text-amber-800 mb-6">
            Completely Free Access for the Next 40 Days
          </p>

          <p className="text-gray-700 mb-6">
            During this holy season of reflection and renewal, we're opening the
            community doors wide; no cost, no barriers. Join us for 40 days of
            guided clarity sessions, daily inspirations, and fellowship as we
            journey toward Easter with open hearts.
          </p>

          {/* Upcoming communities */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-amber-900 mb-3">
              Coming Soon: Deeper Spaces for Continued Growth
            </p>
            <ul className="space-y-4 text-gray-800">
              <li className="flex items-start">
                <span className="inline-block w-3 h-3 mt-2 mr-3 bg-amber-600 rounded-full flex-shrink-0"></span>
                <div>
                  <span className="font-medium text-amber-800">
                    The Inner Circle
                  </span>{" "}
                  — An intimate, ongoing community for those who want consistent
                  accountability, deeper mentorship, and advanced teachings on
                  identity, purpose, and legacy.
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-3 h-3 mt-2 mr-3 bg-amber-600 rounded-full flex-shrink-0"></span>
                <div>
                  <span className="font-medium text-amber-800">One-on-One</span>{" "}
                  — Personalized sessions with Uju Asumpta for tailored
                  guidance, breakthrough coaching, and direct support on your
                  unique journey of healing and transformation.
                </div>
              </li>
            </ul>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-left text-gray-700 font-medium mb-2"
              >
                Enter your email to receive the WhatsApp invite link
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@example.com"
                required
                className="w-full px-5 py-4 rounded-lg border border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 bg-white text-gray-800 placeholder-gray-400 outline-none transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-8 rounded-lg font-semibold text-lg shadow-md transition-all ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700 text-white"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Invite Link"}
            </motion.button>

            {statusMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 text-sm font-medium ${
                  statusType === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {statusMessage}
              </motion.p>
            )}
          </form>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-600 italic text-sm md:text-base"
        >
          Spaces are limited during this special season. Enter your email now
          and step into clarity; the journey continues beyond these 40 days.
        </motion.p>
      </div>
    </section>
  );
}

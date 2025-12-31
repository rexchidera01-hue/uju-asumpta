import React from "react";

const whyItems = [
  "Because life is not lived on autopilot.",
  "Life is lived with awareness.",
  "With identity.",
  "With intention.",
  "With meaning.",
  "With wisdom.",
  "With alignment.",
  "With guidance.",
];

const sideImage =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80";

export default function CurriculumWhyItMattersSection() {
  return (
    <section className="bg-gray-50 text-gray-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Text + list */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Why It Matters
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              The Curriculum of Life™ gives you the tools to become whole again.
            </h2>
          </div>

          <ul className="space-y-3 text-lg text-gray-800">
            {whyItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image */}
        <div className="lg:col-span-6">
          <div className="w-full overflow-hidden rounded-xl shadow-lg bg-white">
            <img
              src={sideImage}
              alt="Open horizon representing clarity and purpose"
              className="w-full h-[320px] md:h-[420px] lg:h-[520px] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

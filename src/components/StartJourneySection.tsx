import React from "react";

export default function StartJourneySection() {
  const ctas = [
    { label: "Take the Course", href: "/course" },
    { label: "Read the Book", href: "/book" },
    { label: "Join the Community", href: "/community" },
    { label: "Become Certified", href: "/certification" },
  ];

  return (
    <section className="bg-white text-gray-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-amber-600">
            Start the Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            Step into the Curriculum of Life™
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-md font-semibold text-center transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black whitespace-nowrap"
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

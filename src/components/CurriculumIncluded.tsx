import React from "react";

export default function CurriculumIncludedSection() {
  const items = [
    "A transformational course",
    "A foundational book",
    "A journal & workbook",
    "A facilitator certification",
    "Audio teachings",
    "Guided meditations",
    "Worksheets & exercises",
    "Family circles",
    "Community programs",
    "Lifelong tools for meaning and growth",
  ];

  return (
    <section className="bg-white text-gray-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase">
            What Is Included?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            The Curriculum of Life™ includes:
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white/70 px-4 py-3 shadow-sm"
            >
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
              <p className="text-base md:text-lg text-gray-800">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

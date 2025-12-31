import React from "react";

export default function CurriculumOfLifeSection() {
  const questions = [
    "Who am I?",
    "Why am I here?",
    "How do I heal?",
    "How do I find meaning?",
    "How do I build values?",
    "How do I create healthy relationships?",
    "How do I grow spiritually?",
    "How do I lead?",
    "How do I build a legacy?",
  ];

  return (
    <section className="bg-white text-gray-900 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-semibold tracking-widest text-amber-600 uppercase">
            What Is The Curriculum of Life™?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
            It is the missing manual for the human journey.
          </h2>
          <p className="text-lg md:text-xl text-gray-700">
            It teaches the part of life that universities and institutions never
            taught.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {questions.map((q) => (
            <div
              key={q}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white/70 px-4 py-3 shadow-sm"
            >
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
              <p className="text-base md:text-lg text-gray-800">{q}</p>
            </div>
          ))}
        </div>

        <div className="text-center text-lg md:text-xl font-semibold text-gray-900">
          This is the education of the soul.
        </div>
      </div>
    </section>
  );
}

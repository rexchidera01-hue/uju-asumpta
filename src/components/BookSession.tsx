import { Mic2, Layers } from "lucide-react";

const talks = [
  "Identity & meaning",
  "Purpose-driven leadership",
  "Emotional healing & inner work",
  "Spiritual maturity",
  "Values & relationship wisdom",
  "Legacy leadership",
  "Family transformation",
  "Women empowerment",
  "Soulful success & alignment",
];

const availability = [
  "Keynotes",
  "Corporate events",
  "University seminars",
  "Conferences",
  "Retreats",
  "Workshops",
  "Panel sessions",
  "Faith-based gatherings",
];

export default function SpeakingSection() {
  return (
    <section className="bg-white text-gray-900 py-12 sm:py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-amber-600">
            Book Uju Asumpta
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-gray-900">
            Bring soul, clarity, and transformation to your audience.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-700 uppercase">
              <Mic2 size={16} aria-hidden="true" />
              <span>Uju speaks on</span>
            </div>
            <ul className="space-y-1 sm:space-y-1.5 text-sm sm:text-base md:text-lg text-gray-800">
              {talks.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-700 uppercase">
              <Layers size={16} aria-hidden="true" />
              <span>She is available for</span>
            </div>
            <ul className="space-y-1 sm:space-y-1.5 text-sm sm:text-base md:text-lg text-gray-800">
              {availability.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full max-w-md mx-auto items-stretch sm:items-center justify-center">
          <a
            href="/speaking"
            className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-md font-semibold text-center text-sm sm:text-base transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black whitespace-nowrap"
          >
            Request Uju for your event
          </a>
          <a
            href="/contact"
            className="inline-block px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-black text-black rounded-md font-semibold text-center text-sm sm:text-base transition hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black whitespace-nowrap"
          >
            Contact the team
          </a>
        </div>
      </div>
    </section>
  );
}

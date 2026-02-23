import React from "react";
import toast from "react-hot-toast"; // ← add this import

export default function WellsageSection(): JSX.Element {
  const handleVisitClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // stop navigation for now
    toast.success("Wellsage coming soon! 🚀 Stay tuned 💚");
    // Optional: you can still open a link in new tab if you want later
    // window.open("https://example.com", "_blank");
  };

  return (
    <section
      aria-labelledby="wellsage-heading"
      className="bg-white text-black py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-xs sm:text-sm font-medium tracking-wider text-amber-600 uppercase">
          Wellsage Ltd.
        </p>

        <h2
          id="wellsage-heading"
          className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"
        >
          Your transformational home for:
        </h2>

        <div className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl space-y-2 sm:space-y-3 text-gray-800 px-2">
          <p className="italic">Courses &amp; digital programs</p>
          <p className="italic">Family and community transformation</p>
          <p className="italic">Life curriculum tools</p>
          <p className="italic">Conferences &amp; events</p>
          <p className="italic">Certification training</p>
          <p className="italic">Books, journals, and media resources</p>
        </div>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-semibold italic text-gray-800 px-2">
          Learn what the world never taught you.
        </p>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <a
            href="/wellsage"
            onClick={handleVisitClick}
            className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white border-2 sm:border-[3px] border-black rounded-md font-semibold transition-colors duration-200 hover:bg-white hover:text-black text-sm sm:text-base"
            aria-label="Visit Wellsage"
          >
            Visit Wellsage
          </a>
        </div>
      </div>
    </section>
  );
}

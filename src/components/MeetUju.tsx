import heroImageUrl from "../assets/img--3.jpeg";

export default function MeetUju(): JSX.Element {
  return (
    <section
      aria-labelledby="meet-uju-heading"
      // keep the same z-index/stacking intent as before and retain the yellow background
      className="relative z-30 text-gray-900 py-16 md:py-24 bg-yellow-200"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-16 px-4 md:px-6">
        {/* Left: heading, text + stacked CTA(s) */}
        <div className="md:col-span-7 lg:col-span-6">
          <h2
            id="meet-uju-heading"
            className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900"
          >
            I'm Uju Asumpta <br />
            The Founder of <br />
            The Curriculum of Life
          </h2>

          <p className="mb-4 text-lg md:text-xl text-gray-700 leading-relaxed">
            You don’t need more pressure.
            <br />
            You don’t need another motivational speech.
            <br />
            You need{" "}
            <span className="font-semibold text-gray-900">clarity</span> —{" "}
            <span className="font-semibold text-gray-900">identity</span> —{" "}
            <span className="font-semibold text-gray-900">meaning</span> —{" "}
            <span className="font-semibold text-gray-900">healing</span>
          </p>

          <p className="mb-6 text-lg md:text-xl font-semibold text-gray-800">
            That is what my work gives you.
          </p>
        </div>

        {/* Right: image only — external URL, rounded corners, not cropped */}
        <div className="md:col-span-5 lg:col-span-6 md:order-last flex items-start justify-center">
          {/* container defines visible height; image is anchored to the top so the bottom is hidden */}
          <div
            className="w-full shadow-lg overflow-hidden rounded-xl"
            style={{ height: 700 /* set desired visible height */ }}
          >
            <img
              src={heroImageUrl}
              alt="Portrait of Uju"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

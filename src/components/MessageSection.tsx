import React from "react";
import {
  User,
  Heart,
  Smile,
  Compass,
  BookOpen,
  Users,
  DollarSign,
  Scale,
  Flag,
  Feather,
  type LucideProps,
} from "lucide-react";

type Offer = {
  title: string;
  Icon: (props: LucideProps) => JSX.Element;
};

const offers: Offer[] = [
  { title: "Identity", Icon: User },
  { title: "Healing", Icon: Heart },
  { title: "Emotional intelligence", Icon: Smile },
  { title: "Purpose", Icon: Compass },
  { title: "Spiritual depth", Icon: Feather },
  { title: "Relationship clarity", Icon: Users },
  { title: "Meaning", Icon: BookOpen },
  { title: "Wealth wisdom", Icon: DollarSign },
  { title: "Values", Icon: Scale },
  { title: "Legacy leadership", Icon: Flag },
];

export default function MessageSection(): JSX.Element {
  return (
    <section
      aria-labelledby="message-heading"
      className="bg-gray-50 text-black py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="mb-8 text-center">
          <h2
            id="message-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800"
          >
            The Message
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            The greatest tragedy is not that people fail — it is that people
            rise in status but remain lost inside. The Curriculum of Life™ is
            the journey back home to yourself.
          </p>
        </header>

        <p className="mb-6 sm:mb-8 text-center text-base sm:text-lg text-gray-700 px-2">
          It teaches what every human being must know to live well.
        </p>

        {/* Cards grid - 2 columns on mobile, 3 on tablet, 5 on desktop */}
        <ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
        >
          {offers.map((o) => {
            const Icon = o.Icon;
            return (
              <li key={o.title}>
                <article
                  className="h-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-200 p-3 sm:p-4 md:p-6 flex flex-col items-center text-center"
                  aria-labelledby={`offer-${o.title}`}
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-2 sm:mb-3 md:mb-4 rounded-full flex items-center justify-center bg-amber-50">
                    <Icon
                      className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-amber-400"
                      aria-hidden
                    />
                  </div>

                  <h3
                    id={`offer-${o.title}`}
                    className="mt-2 text-sm sm:text-base md:text-lg font-semibold text-gray-800"
                  >
                    {o.title}
                  </h3>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

import React from "react";
import {
  Building2,
  Globe,
  GraduationCap,
  Users,
  BookOpen,
  Briefcase,
  HeartHandshake,
  Radio,
} from "lucide-react";

const offerings = [
  { title: "Courses & digital programs", icon: GraduationCap },
  { title: "The Curriculum of Life™", icon: Globe },
  { title: "Conferences & summits", icon: Users },
  { title: "Workshops & retreats", icon: HeartHandshake },
  { title: "Certification programs", icon: BadgeCheck },
  { title: "Books, journals, and guides", icon: BookOpen },
  { title: "Corporate transformation trainings", icon: Briefcase },
  { title: "Family & community tools", icon: Building2 },
  { title: "Media content", icon: Radio },
];

// If BadgeCheck is unavailable in your icon set, replace with Award or ShieldCheck.
function BadgeCheck(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={props.size || 20}
      height={props.size || 20}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 12 2 2 4-4" />
      <path d="M20 15.27V8.73a2 2 0 0 0-1.06-1.76l-6-3.18a2 2 0 0 0-1.88 0l-6 3.18A2 2 0 0 0 4 8.73v6.54A2 2 0 0 0 5.06 17l6 3.18a2 2 0 0 0 1.88 0l6-3.18A2 2 0 0 0 20 15.27Z" />
    </svg>
  );
}

export default function WellsageSection() {
  return (
    <section className="bg-white text-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-10">
        <div className="space-y-3 text-center">
          <p className="text-sm font-medium tracking-wider text-amber-600 uppercase">
            My Company: Wellsage Ltd.
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Wellsage is the structure that delivers my message to the world.
          </h2>
          <div className="text-lg md:text-xl text-gray-800 space-y-1">
            <p>Wellsage is the engine.</p>
            <p>My voice is the message.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerings.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <Icon size={22} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

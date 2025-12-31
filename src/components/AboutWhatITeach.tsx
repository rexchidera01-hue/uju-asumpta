import React from "react";
import {
  User,
  HeartHandshake,
  Compass,
  Brain,
  Sparkles,
  Users,
  Scale,
  Coins,
  Crown,
} from "lucide-react";

const pillars = [
  { title: "Identity", icon: User },
  { title: "Inner healing", icon: HeartHandshake },
  { title: "Purpose clarity", icon: Compass },
  { title: "Emotional intelligence", icon: Brain },
  { title: "Spiritual depth", icon: Sparkles },
  { title: "Relationship wisdom", icon: Users },
  { title: "Meaning, values & alignment", icon: Scale },
  { title: "Wealth and life stewardship", icon: Coins },
  { title: "Legacy leadership", icon: Crown },
];

export default function WhatITeachSection() {
  return (
    <section className="bg-white text-black py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-wider text-amber-600 uppercase">
            What I Teach
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-gray-900">
            I guide you through the essential pillars of life
          </h2>
          <p className="mt-4 text-lg md:text-xl text-gray-800">
            My work is not motivation.{" "}
            <span className="font-semibold">It is transformation.</span>
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  {pillar.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

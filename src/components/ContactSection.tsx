import React from "react";

export default function ContactSection() {
  return (
    <section className="bg-white text-gray-900 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 md:px-6 space-y-8">
        <div className="space-y-3 text-center">
          <p className="text-lg md:text-xl font-semibold text-gray-800">
            I would love to hear from you. Whether you have a question, a
            project idea, or just want to say hello, feel free to reach out!
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-800"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex justify-center px-6 py-3 bg-black text-white rounded-md font-semibold transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

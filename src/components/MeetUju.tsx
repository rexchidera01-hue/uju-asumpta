import React, { useState } from "react";

export default function MailingListSection(): JSX.Element {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [loading, setLoading] = useState(false);

  function validateEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!validateEmail(email)) {
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      aria-labelledby="mailing-list-heading"
      className="text-black py-12 sm:py-16 md:py-24 bg-gray-100"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2
          id="mailing-list-heading"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-extrabold text-gray-900"
        >
          Join the Mailing List
        </h2>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-800">
          Receive weekly messages that ground, strengthen, and transform.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2 sm:gap-3"
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full sm:w-auto min-w-[200px] px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Email address"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-block px-6 sm:px-6 py-2.5 sm:py-3 bg-black text-white border-2 sm:border-[3px] border-black rounded-md font-semibold transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-60 text-sm sm:text-base"
            aria-label="Subscribe"
          >
            {loading ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-700 font-medium text-sm sm:text-base">
            Thanks — you're subscribed! Check your inbox for a confirmation.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600 font-medium text-sm sm:text-base">
            Please enter a valid email address and try again.
          </p>
        )}
      </div>
    </section>
  );
}
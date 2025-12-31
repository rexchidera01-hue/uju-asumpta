import React, { useState } from "react";

/**
 * Mailing List section with a simple subscription form.
 * - Validates basic email format and shows a success message.
 * - You can wire up the onSubmit handler to your mailing list provider.
 */

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

    // Placeholder behaviour — replace with real mailing-list submission.
    setLoading(true);
    try {
      // Example: await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
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
      className="text-black py-16 md:py-24 bg-gray-100"
    >
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2
          id="mailing-list-heading"
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900"
        >
          Join the Mailing List
        </h2>

        <p className="mt-4 text-lg md:text-xl text-gray-800">
          Receive weekly messages that ground, strengthen, and transform.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
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
            className="w-full sm:w-auto min-w-[240px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            aria-label="Email address"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-block px-6 py-3 bg-black text-white border-[3px] border-black rounded-md font-semibold transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-60"
            aria-label="Subscribe"
          >
            {loading ? "Subscribing…" : "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-700 font-medium">
            Thanks — you’re subscribed! Check your inbox for a confirmation.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-600 font-medium">
            Please enter a valid email address and try again.
          </p>
        )}
      </div>
    </section>
  );
}

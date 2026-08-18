import React, { useState } from "react";
import { Instagram } from "lucide-react";

const PARTNERS = [
  {
    name: "NIV Art Centre",
    logo: "/partners/niv-art-centre-logo.jpg",
    note: "The collaboration between Vijit Veer Hooda and the NIV Art Centre acts as a strategic cultural conduit — the partnership identifies visionary Indian artists within NIV's extensive network and positions their work for high-profile exposure to international collectors, institutions, and buyers.",
    instagram: "https://www.instagram.com/nivartcentre/",
    handle: "@nivartcentre",
  },
];

// Interim, backend-free submission endpoint — mirrors the For Artists form.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/viratmohan@gmail.com";
const CC_EMAILS = "vijit.hooda@gmail.com,portfolio@indiacontemporary.net,udithooda@gmail.com";

const emptyForm = {
  organisation: "",
  contactName: "",
  email: "",
  website: "",
  message: "",
};

export default function PartnershipsPage() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Partnership Inquiry — India Contemporary",
          _cc: CC_EMAILS,
          _template: "table",
          Organisation: form.organisation,
          "Contact Name": form.contactName,
          Email: form.email,
          Website: form.website,
          Message: form.message,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError(
        "We couldn't send your message automatically. Please email us directly at portfolio@indiacontemporary.net."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto text-center mb-20">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
          Working Together
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-6">
          Partnerships
        </h1>
        <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
          We work with galleries, studios, and cultural spaces in India to bring
          artists' work to collectors in Europe and beyond. Here's who we currently
          partner with.
        </p>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-8 mb-24">
        {PARTNERS.map((p) => (
          <div
            key={p.name}
            className="border border-line/60 p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
          >
            <div className="flex items-start gap-6">
              {p.logo && (
                <img
                  src={p.logo}
                  alt={`${p.name} logo`}
                  className="w-16 h-16 object-contain flex-shrink-0"
                />
              )}
              <div>
                <h2 className="font-serif text-2xl font-light text-ink-primary mb-2">
                  {p.name}
                </h2>
                <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                  {p.note}
                </p>
              </div>
            </div>
            <a
              href={p.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans flex-shrink-0"
            >
              <Instagram size={16} strokeWidth={1.5} /> {p.handle}
            </a>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto pt-16 border-t border-line/50">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            Get In Touch
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink-primary tracking-tight">
            Partner With Us
          </h2>
        </div>

        {submitted ? (
          <p className="text-center text-ink-secondary font-sans font-light">
            Thank you — we've received your message and will be in touch shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Organisation
              </label>
              <input
                type="text"
                name="organisation"
                required
                value={form.organisation}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Contact Name
              </label>
              <input
                type="text"
                name="contactName"
                required
                value={form.contactName}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Website / Instagram
              </label>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            {error && (
              <p className="text-sm text-red-700 font-sans">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

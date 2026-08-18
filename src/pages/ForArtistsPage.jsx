import React, { useState } from "react";
import { ArrowRight, Landmark, Gem, TrendingUp, ShieldCheck } from "lucide-react";

const WHATSAPP_NUMBER = "919811165111";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I'm an artist interested in India Contemporary."
)}`;

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.36.657 4.566 1.797 6.45L3 29l7.222-2.257A12.44 12.44 0 0016 28c6.894 0 12.5-5.607 12.5-12.5S22.895 3 16.001 3zm0 22.7a10.16 10.16 0 01-5.18-1.42l-.372-.22-4.286 1.34 1.36-4.176-.242-.385A10.15 10.15 0 015.8 15.5c0-5.634 4.567-10.2 10.201-10.2 5.633 0 10.2 4.566 10.2 10.2 0 5.633-4.567 10.2-10.2 10.2zm5.593-7.646c-.306-.153-1.81-.893-2.091-.995-.28-.102-.484-.153-.688.153-.204.306-.79.995-.968 1.199-.178.204-.357.23-.663.077-.306-.153-1.293-.477-2.463-1.52-.91-.812-1.525-1.815-1.703-2.121-.178-.306-.019-.472.134-.624.138-.137.306-.357.459-.535.153-.178.204-.306.306-.51.102-.204.051-.383-.026-.536-.077-.153-.688-1.658-.943-2.271-.248-.596-.5-.516-.688-.525l-.586-.01c-.204 0-.535.076-.815.383-.28.306-1.068 1.044-1.068 2.548 0 1.503 1.093 2.955 1.245 3.159.153.204 2.15 3.283 5.208 4.604.728.314 1.295.502 1.738.642.73.232 1.394.199 1.92.121.586-.088 1.81-.74 2.065-1.454.255-.715.255-1.327.179-1.454-.077-.128-.281-.204-.587-.357z" />
    </svg>
  );
}

// Interim, backend-free submission endpoint: FormSubmit relays the payload by
// email to both addresses below. Once the Phase 2 admin review-queue backend
// is live, swap this for a POST to our own API instead.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/viratmohan@gmail.com";
const CC_EMAILS = "vijit.hooda@gmail.com,portfolio@indiacontemporary.net,udithooda@gmail.com";

const emptyForm = {
  name: "",
  email: "",
  city: "",
  portfolioUrl: "",
  instagram: "",
  statement: "",
};

export default function ForArtistsPage() {
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
      const raw = localStorage.getItem("ic_artist_applications");
      const applications = raw ? JSON.parse(raw) : [];
      applications.push({ ...form, submittedAt: new Date().toISOString(), status: "pending_review" });
      localStorage.setItem("ic_artist_applications", JSON.stringify(applications));
    } catch {
      /* localStorage backup only, non-critical */
    }

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Artist Application — India Contemporary",
          _cc: CC_EMAILS,
          _template: "table",
          "Full Name": form.name,
          Email: form.email,
          "City, India": form.city,
          "Portfolio URL": form.portfolioUrl,
          Instagram: form.instagram,
          "Artist Statement": form.statement,
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError(
        "We couldn't send your application automatically. Please email us directly at portfolio@indiacontemporary.net."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform duration-300"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted mb-6 font-sans">
          Call To Artists
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ink-primary tracking-tight leading-tight max-w-3xl mx-auto mb-8">
          An initiative to bring Indian contemporary art to the European collector
          & beyond.
        </h1>
        <p className="text-base lg:text-lg text-ink-secondary font-sans font-light max-w-2xl mx-auto">
          Founded by renowned Indo-Austrian artist{" "}
          <span className="text-ink-primary">Vijit Veer Hooda</span>, with the goal of bringing
          exceptional Indian contemporary art to the thriving European market
          & beyond.
        </p>
      </section>

      {/* Value props */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-bg-alt border-y border-line/50">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-12 text-center">
          <div>
            <Landmark className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.25} />
            <h3 className="font-serif text-xl font-light text-ink-primary mb-3">
              Auction Houses &amp; Galleries
            </h3>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              We work with leading auction houses and galleries across Europe
              & beyond to place your work in front of serious collectors.
            </p>
          </div>
          <div>
            <TrendingUp className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.25} />
            <h3 className="font-serif text-xl font-light text-ink-primary mb-3">
              High Visibility, Top-Tier Valuations
            </h3>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              We secure high visibility and top-tier valuations for your work, positioning
              it appropriately for the European market & beyond.
            </p>
          </div>
          <div>
            <Gem className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.25} />
            <h3 className="font-serif text-xl font-light text-ink-primary mb-3">
              A Track Record
            </h3>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              Numerous artworks by Indian contemporary artists have already been
              successfully auctioned to collectors across Europe & beyond.
            </p>
          </div>
          <div>
            <ShieldCheck className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.25} />
            <h3 className="font-serif text-xl font-light text-ink-primary mb-3">
              Transparency &amp; Prompt Payments
            </h3>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              Clear terms on commission and pricing from the start, and payment
              reaches you promptly once a piece sells — no chasing, no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* Call to artists + application form */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            Join The Initiative
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink-primary tracking-tight mb-6">
            Call To Artists
          </h2>
          <p className="text-base text-ink-secondary font-sans font-light">
            We are actively looking for talented Indian contemporary artists. Join our
            initiative to access an affluent global market and build a powerful,
            sustainable international income — with complete control of your artist
            practice and creative output.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <h3 className="text-center font-sans font-bold uppercase tracking-[0.15em] text-sm text-ink-primary mb-4">
            Connect With Us
          </h3>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-ink-secondary hover:text-accent transition-colors font-sans mb-8"
          >
            <WhatsAppIcon className="w-4 h-4" />
            +91 98111 65111
          </a>
          {submitted ? (
            <div className="bg-bg-alt border border-line/60 p-10 text-center">
              <h3 className="font-serif text-2xl font-light text-ink-primary mb-3">
                Thank You
              </h3>
              <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                Your application has been recorded. Our team reviews every submission
                personally and will be in touch if there's a fit.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  Full Name
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  City, India
                </label>
                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  Portfolio URL
                </label>
                <input
                  name="portfolioUrl"
                  placeholder="https://"
                  value={form.portfolioUrl}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  Instagram Handle
                </label>
                <input
                  name="instagram"
                  placeholder="@yourhandle"
                  value={form.instagram}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  Tell Us About Your Practice
                </label>
                <textarea
                  required
                  name="statement"
                  rows={4}
                  value={form.statement}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus resize-none"
                />
              </div>

              {error && (
                <p className="text-sm text-red-700 font-sans">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Submit Application"}{" "}
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
              <p className="text-xs text-ink-muted font-sans leading-relaxed">
                Every application is reviewed personally by our team before an artist is
                onboarded — nothing here is auto-approved.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

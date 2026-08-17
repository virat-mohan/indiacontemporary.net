import React, { useState } from "react";
import { ArrowRight, Landmark, Gem, TrendingUp } from "lucide-react";

// Interim, backend-free submission endpoint: FormSubmit relays the payload by
// email to both addresses below. Once the Phase 2 admin review-queue backend
// is live, swap this for a POST to our own API instead.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/viratmohan@gmail.com";
const CC_EMAILS = "vijit.hooda@gmail.com,portfolio@indiacontemporary.net";

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
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-24 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-ink-muted mb-6 font-sans">
          Call To Artists
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-ink-primary tracking-tight leading-tight max-w-3xl mx-auto mb-8">
          An initiative to bring Indian contemporary art to the European collector.
        </h1>
        <p className="text-base lg:text-lg text-ink-secondary font-sans font-light max-w-2xl mx-auto">
          Founded by renowned Indo-Austrian artist{" "}
          <span className="text-ink-primary">Vijit Veer Hooda</span>, with the goal of bringing
          exceptional Indian contemporary art to the thriving European market.
        </p>
      </section>

      {/* Value props */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-24 bg-bg-alt border-y border-line/50">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center">
          <div>
            <Landmark className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.25} />
            <h3 className="font-serif text-xl font-light text-ink-primary mb-3">
              Auction Houses &amp; Galleries
            </h3>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              We work with Europe's leading auction houses and galleries to place your
              work in front of serious collectors.
            </p>
          </div>
          <div>
            <TrendingUp className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.25} />
            <h3 className="font-serif text-xl font-light text-ink-primary mb-3">
              High Visibility, Top-Tier Valuations
            </h3>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              We secure high visibility and top-tier valuations for your work, positioning
              it appropriately for the European market.
            </p>
          </div>
          <div>
            <Gem className="mx-auto mb-5 text-accent" size={28} strokeWidth={1.25} />
            <h3 className="font-serif text-xl font-light text-ink-primary mb-3">
              A Track Record
            </h3>
            <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
              Numerous artworks by Indian contemporary artists have already been
              successfully auctioned to collectors across Europe.
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
          <h3 className="text-center font-sans font-bold uppercase tracking-[0.15em] text-sm text-ink-primary mb-8">
            Connect With Us
          </h3>
          {submitted ? (
            <div className="bg-bg-alt border border-line/60 p-10 text-center">
              <h3 className="font-serif text-2xl font-light text-ink-primary mb-3">
                Thank You
              </h3>
              <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                Your application has been recorded. Our team reviews every submission
                personally and will be in touch at {form.email} if there's a fit.
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

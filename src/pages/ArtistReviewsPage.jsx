import React from "react";
import { Link } from "react-router-dom";
import { artistReviews } from "@/data/artistReviews";
import { ArrowRight, Quote } from "lucide-react";

export default function ArtistReviewsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            From The Artists
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-6">
            What It's Like To Work With Us
          </h1>
          <p className="text-base text-ink-secondary font-sans font-light max-w-xl mx-auto">
            We ask every artist we represent the same thing: was this efficient, was
            it transparent, and would you do it again. Here's what they've told us.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {artistReviews.map((r, i) => (
            <div key={i} className="bg-bg-alt border border-line/60 p-8">
              <Quote size={22} strokeWidth={1.5} className="text-accent mb-5" />
              <p className="font-serif text-lg text-ink-primary font-light leading-relaxed mb-6">
                &ldquo;{r.quote}&rdquo;
              </p>
              <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">
                {r.name} &middot; {r.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 pt-16 border-t border-line/50">
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink-primary tracking-tight mb-4">
            Efficient. Transparent. Built On Trust.
          </h2>
          <p className="text-base text-ink-secondary font-sans font-light max-w-xl mx-auto mb-10 leading-relaxed">
            No lengthy back-and-forth, no vague commission terms, no guessing where
            your work stands. Every artist works directly with Vijit — someone who
            has spent years in both India and Europe, and understands exactly how to
            position Indian contemporary work for a European collector — or a
            collector anywhere else in the world.
          </p>
          <Link
            to="/for-artists"
            className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
          >
            Apply To Join <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

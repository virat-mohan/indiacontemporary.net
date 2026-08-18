import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto text-center mb-20">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
          Our Story
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-8">
          Bridging India's Studios and the World's Collectors
        </h1>
        <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
          India Contemporary was founded to close the distance between India's most
          exciting working artists and collectors in Europe & beyond who rarely
          get to see their work in person. We travel to studios
          across the country, work directly with each artist, and handle every
          step of authentication, insurance, and shipping — so a piece made in a
          Mumbai studio can hang on a wall in Paris, Berlin, Amsterdam, or beyond
          with nothing lost in translation.
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div>
          <h3 className="font-serif text-2xl font-light text-ink-primary mb-3">
            Direct From Studio
          </h3>
          <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
            No galleries, no markups from intermediaries. We work with artists
            directly and pass that relationship on to you.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-2xl font-light text-ink-primary mb-3">
            Authenticated & Insured
          </h3>
          <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
            Every piece ships with a certificate of authenticity and is fully
            insured door to door.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-2xl font-light text-ink-primary mb-3">
            Delivered Across Europe &amp; Beyond
          </h3>
          <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
            Customs, framing, and white-glove delivery handled end to end,
            wherever the destination.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mt-24 pt-16 border-t border-line/50">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
          Founder
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink-primary tracking-tight mb-6">
          Meet Vijit Veer Hooda
        </h2>
        <Link
          to="/founder"
          className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans"
        >
          Read His Story <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}

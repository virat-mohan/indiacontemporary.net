import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { artists } from "@/data/artists";

const FOUNDER_IMAGE = "/founder/vijit-veer-hooda-new.jpg";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=1800&q=80"
            alt="Gallery interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2A2825]/50" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto animate-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D3C5B3] mb-6 font-sans">
            Contemporary Art From India
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight mb-2">
            India Contemporary
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-[#D3C5B3] mb-8">
            by Vijit Veer Hooda
          </p>
          <p className="text-base lg:text-lg text-[#D3C5B3] font-sans font-light mb-12 max-w-lg mx-auto">
            Original work from India's leading contemporary artists, curated with
            intention and delivered to collectors across Europe.
          </p>
          <Link
            to="/artworks"
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-white hover:text-accent transition-all duration-500"
          >
            Explore The Artworks <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Meet the Curator */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-center">
          <div className="bevel-shadow aspect-[4/5] overflow-hidden bg-[#EBE7DF] max-w-sm mx-auto lg:mx-0">
            <img
              src={FOUNDER_IMAGE}
              alt="Vijit Veer Hooda"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
              Meet The Curator
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink-primary tracking-tight mb-6">
              Vijit Veer Hooda
            </h2>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed mb-4">
              Welcome — I'm Vijit Veer Hooda, an Indo-Austrian artist and curator based
              in Vienna. India Contemporary exists to close the distance between India's
              most compelling working artists and discerning collectors across Europe —
              no intermediaries, no compromises, just the work and the story behind it.
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed mb-8">
              Every artist here is visited and vetted personally, and every piece is
              backed by that relationship.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link
                to="/founder"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-ink-primary hover:text-accent transition-colors font-sans underline underline-offset-4 decoration-line hover:decoration-accent"
              >
                Read His Story <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
              <Link
                to="/sold-works"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-widest text-ink-primary hover:text-accent transition-colors font-sans underline underline-offset-4 decoration-line hover:decoration-accent"
              >
                See Sold Works <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="py-24 md:py-32 bg-[#2A2825] px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
              India, Rendered New
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-bg tracking-tight">
              The Artists
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {artists.map((a, i) => (
              <Link
                to={`/artists/${a.id}`}
                key={a.id}
                className="group text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
              >
                <h4 className="font-serif text-xl text-bg font-light mb-1 group-hover:text-white transition-colors">
                  {a.name}
                </h4>
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">
                  {a.city}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-line/50">
        <div className="max-w-[1600px] mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-ink-primary tracking-tight mb-6">
            Begin Your Collection
          </h2>
          <p className="text-base text-ink-secondary font-sans font-light mb-10 max-w-md mx-auto">
            Every piece is curated directly from the artist's studio and shipped,
            insured, to your door anywhere in Europe.
          </p>
          <Link
            to="/artworks"
            className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
          >
            Browse Artworks <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}

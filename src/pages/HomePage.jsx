import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { artists } from "@/data/artists";
import { platformSales } from "@/data/platformSales";

export default function HomePage() {
  // Every genuine sold work, grouped by artist (linked-profile artists
  // first) — an artist with several pieces gets one row with all of them
  // in a horizontal scroller, instead of picking just one.
  const withArtist = platformSales
    .filter((s) => s.image)
    .map((s) => ({ ...s, linkedArtist: s.artistId ? artists.find((a) => a.id === s.artistId) : null }));
  const groupsByKey = new Map();
  withArtist.forEach((s) => {
    const key = s.artistId || s.artistName;
    if (!groupsByKey.has(key)) {
      groupsByKey.set(key, { key, artistName: s.artistName, linkedArtist: s.linkedArtist, items: [] });
    }
    groupsByKey.get(key).items.push(s);
  });
  // Featured order: Neeraj Rawal and Shaji Appukuttan lead (bigger names),
  // Karam Singh always last, everyone else in between.
  const groupPriority = (group) => {
    if (group.key === "neeraj-rawal" || group.artistName === "Shaji Appukuttan") return 0;
    if (group.key === "karam-singh") return 2;
    return 1;
  };
  const soldGroups = Array.from(groupsByKey.values()).sort(
    (a, b) => groupPriority(a) - groupPriority(b)
  );

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

      {/* Featured: genuine sold works */}
      <section id="featured" className="py-24 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24 scroll-mt-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
                Sold Through India Contemporary
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink-primary tracking-tight">
                Featured
              </h2>
            </div>
            <Link
              to="/sold-works"
              className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="flex flex-col gap-16">
            {soldGroups.map((group, gi) => (
              <div
                key={group.key}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${gi * 0.1}s`, animationFillMode: "forwards" }}
              >
                {group.linkedArtist ? (
                  <Link
                    to={`/artists/${group.linkedArtist.id}`}
                    className="text-sm uppercase tracking-widest text-ink-primary hover:text-accent underline underline-offset-4 decoration-line hover:decoration-accent transition-colors font-sans mb-5 block w-fit"
                  >
                    {group.artistName}
                  </Link>
                ) : (
                  <p className="text-sm uppercase tracking-widest text-ink-primary font-sans mb-5">
                    {group.artistName}
                  </p>
                )}
                <div className="flex gap-8 md:gap-10 overflow-x-auto pb-6 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 snap-x snap-mandatory scroll-smooth">
                  {group.items.map((sale, i) => (
                    <div
                      key={i}
                      className="w-[82vw] xs:w-[60vw] sm:w-[26rem] lg:w-[30rem] flex-shrink-0 snap-start"
                    >
                      <div className="sold-work-backdrop p-4 md:p-6">
                        <div className="artwork-tilt overflow-hidden bg-[#EBE7DF] aspect-[3/4] relative">
                          <img
                            src={sale.image}
                            alt={sale.title || group.artistName}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-4 left-4 bg-[#3D372E] text-bg px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-sans">
                            Sold
                          </span>
                        </div>
                      </div>
                      {sale.title && (
                        <h3 className="font-serif text-lg font-light text-ink-primary mt-4">
                          {sale.title} {sale.year && <span className="text-ink-muted">&middot; {sale.year}</span>}
                        </h3>
                      )}
                      {(sale.medium || sale.size) && (
                        <p className="text-sm text-ink-muted font-sans font-light mt-1">
                          {sale.medium}
                          {sale.medium && sale.size && " · "}
                          {sale.size}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

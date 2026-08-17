import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { artworks, collections } from "@/data/artworks";
import { artists } from "@/data/artists";
import { platformSales } from "@/data/platformSales";

export default function HomePage() {
  const recent = artworks.slice(3, 7);

  const withArtist = platformSales
    .filter((s) => s.image)
    .map((s) => ({ ...s, linkedArtist: s.artistId ? artists.find((a) => a.id === s.artistId) : null }));
  // One piece per artist, linked-profile artists first, so Featured shows
  // variety instead of one artist's whole run of sold works.
  const seenArtists = new Set();
  const featuredSold = [
    ...withArtist.filter((s) => s.linkedArtist),
    ...withArtist.filter((s) => !s.linkedArtist),
  ]
    .filter((s) => {
      const key = s.artistId || s.artistName;
      if (seenArtists.has(key)) return false;
      seenArtists.add(key);
      return true;
    })
    .slice(0, 3);

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
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-tight mb-8">
            India Contemporary
          </h1>
          <p className="text-base lg:text-lg text-[#D3C5B3] font-sans font-light mb-12 max-w-lg mx-auto">
            Original work from India's leading contemporary artists, sourced with
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
      <section className="py-24 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
                Genuine Sales, Through India Contemporary
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {featuredSold.map((sale, i) => (
              <div
                key={i}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "forwards" }}
              >
                <div className="artwork-tilt overflow-hidden bg-[#EBE7DF] aspect-[3/4] mb-6 relative">
                  <img
                    src={sale.image}
                    alt={sale.title || sale.artistName}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 left-4 bg-[#3D372E] text-bg px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-sans">
                    Sold
                  </span>
                </div>
                {sale.linkedArtist ? (
                  <Link
                    to={`/artists/${sale.linkedArtist.id}`}
                    className="text-xs uppercase tracking-widest text-ink-muted hover:text-accent underline underline-offset-4 decoration-line hover:decoration-accent transition-colors font-sans mb-2 block w-fit"
                  >
                    {sale.artistName}
                  </Link>
                ) : (
                  <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                    {sale.artistName}
                  </p>
                )}
                {sale.title && (
                  <h3 className="font-serif text-xl font-light text-ink-primary">{sale.title}</h3>
                )}
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
                <div className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden bg-[#5D574E]/30">
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-serif text-xl text-bg font-light mb-1">{a.name}</h4>
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">
                  {a.city}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent additions */}
      <section className="py-24 md:py-32 lg:py-48 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
              New Arrivals
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink-primary tracking-tight">
              Recently Added
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {recent.map((art, i) => (
              <Link to={`/artwork/${art.id}`} key={art.id} className="group">
                <div className="overflow-hidden bg-[#EBE7DF] aspect-square mb-4">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-serif text-lg font-light text-ink-primary mb-1">
                  {art.title}
                </h4>
                <p className="text-sm text-ink-muted font-sans font-light">
                  &euro;{art.price.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-line/50">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
                Curated Selections
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink-primary tracking-tight">
                Explore Collections
              </h2>
            </div>
            <Link
              to="/collections"
              className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans"
            >
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((col) => (
              <Link to={`/collections/${col.id}`} key={col.id} className="group">
                <div className="aspect-square overflow-hidden bg-[#EBE7DF] relative">
                  <img
                    src={col.cover}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#2A2825]/30 group-hover:bg-[#2A2825]/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <h3 className="font-serif text-base md:text-lg text-white font-light">
                      {col.name}
                    </h3>
                  </div>
                </div>
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
            Every piece is sourced directly from the artist's studio and shipped,
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

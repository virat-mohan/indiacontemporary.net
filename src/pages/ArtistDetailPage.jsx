import React from "react";
import { useParams, Link } from "react-router-dom";
import { artists } from "@/data/artists";
import { artworks } from "@/data/artworks";
import { platformSales } from "@/data/platformSales";
import ArtworkCard from "@/components/ArtworkCard";
import { ArrowLeft } from "lucide-react";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id);
  const works = artworks.filter((a) => a.artistId === id);
  const soldThroughPlatform = platformSales.filter((s) => s.artistId === id && s.image);

  if (!artist) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary">Artist not found.</p>
        <Link to="/artists" className="text-accent underline font-sans">
          Back to artists
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <Link
          to="/artists"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans mb-10"
        >
          <ArrowLeft size={14} /> All Artists
        </Link>

        {artist.profileNote && (
          <p className="text-xs text-ink-muted font-sans font-light italic mb-8 max-w-2xl">
            {artist.profileNote}
          </p>
        )}

        <div
          className={`grid grid-cols-1 ${
            artist.image ? "lg:grid-cols-[320px_1fr]" : ""
          } gap-10 lg:gap-16 mb-20`}
        >
          {artist.image && (
            <div>
              <div className="bevel-shadow aspect-[4/5] overflow-hidden bg-[#EBE7DF] mb-6">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="font-serif text-3xl font-light text-ink-primary mb-1">
                {artist.name}
              </h1>
              <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">
                {artist.role} &middot; {artist.city}
              </p>
            </div>
          )}

          <div className="flex flex-col justify-center gap-5 max-w-2xl">
            {!artist.image && (
              <div className="mb-2">
                <h1 className="font-serif text-3xl font-light text-ink-primary mb-1">
                  {artist.name}
                </h1>
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">
                  {artist.role} &middot; {artist.city}
                </p>
              </div>
            )}
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              {artist.bio}
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              {artist.philosophy}
            </p>
            {artist.awards?.length > 0 && (
              <div className="pt-2">
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  Awards &amp; Recognition
                </p>
                <ul className="text-sm text-ink-secondary font-sans font-light">
                  {artist.awards.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-16 border-t border-line/50">
          {artist.exhibitions?.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
                Track Record
              </p>
              <h2 className="font-serif text-2xl font-light text-ink-primary tracking-tight mb-8">
                Exhibitions
              </h2>
              <div className="flex flex-col">
                {artist.exhibitions.map((ex, i) => (
                  <div
                    key={i}
                    className="flex gap-6 py-4 border-t border-line/50 last:border-b"
                  >
                    <span className="text-sm text-ink-muted font-sans tabular-nums w-12 flex-shrink-0">
                      {ex.year || "—"}
                    </span>
                    <div>
                      <p className="text-sm text-ink-primary font-sans">{ex.title}</p>
                      <p className="text-sm text-ink-muted font-sans font-light">{ex.venue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {artist.pastSales?.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
                Market History
              </p>
              <h2 className="font-serif text-2xl font-light text-ink-primary tracking-tight mb-2">
                Previously Sold
              </h2>
              <p className="text-xs text-ink-muted font-sans font-light mb-6">
                Prior sales through other galleries and auctions, shared for pricing
                context — not sold through India Contemporary.
              </p>
              <div className="flex flex-col">
                {artist.pastSales.map((sale, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-6 py-4 border-t border-line/50 last:border-b"
                  >
                    <div className="flex items-start gap-4">
                      {sale.image && (
                        <div className="artwork-tilt w-16 h-16 flex-shrink-0 overflow-hidden bg-[#EBE7DF]">
                          <img
                            src={sale.image}
                            alt={sale.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-ink-primary font-sans">
                          {sale.title} <span className="text-ink-muted">&middot; {sale.year}</span>
                        </p>
                        <p className="text-sm text-ink-muted font-sans font-light">{sale.medium}</p>
                        <p className="text-xs text-ink-muted font-sans font-light mt-0.5">{sale.note}</p>
                      </div>
                    </div>
                    <p className="text-sm text-ink-secondary font-sans tabular-nums whitespace-nowrap">
                      &euro;{sale.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="pt-16 mt-20 border-t border-line/50">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            Available Now
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink-primary tracking-tight mb-10">
            Works By {artist.name}
          </h2>
          {works.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {works.map((art, i) => (
                <ArtworkCard art={art} key={art.id} index={i} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-ink-muted font-sans">
              No pieces currently listed &mdash; check back soon.
            </p>
          )}
        </div>

        {soldThroughPlatform.length > 0 && (
          <div className="pt-16 mt-20 border-t border-line/50">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
              Provenance
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink-primary tracking-tight mb-10">
              Sold Through India Contemporary
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
              {soldThroughPlatform.map((sale, i) => (
                <div key={i}>
                  <div className="sold-work-backdrop p-4 md:p-6 mb-4">
                    <div className="artwork-tilt aspect-[4/5] overflow-hidden bg-[#EBE7DF]">
                      <img
                        src={sale.image}
                        alt={sale.title || artist.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {sale.title && (
                    <p className="text-sm text-ink-primary font-sans">
                      {sale.title} {sale.year && <span className="text-ink-muted">&middot; {sale.year}</span>}
                    </p>
                  )}
                  {(sale.medium || sale.size) && (
                    <p className="text-sm text-ink-muted font-sans font-light">
                      {sale.medium}
                      {sale.medium && sale.size && " · "}
                      {sale.size}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { artists } from "@/data/artists";
import { platformSales } from "@/data/platformSales";

// Unlike each artist's "Previously Sold" (market history from other
// galleries/auctions), this page shows only genuine works sold THROUGH
// India Contemporary — sourced from platformSales.js, not artists.js.
const soldWorks = platformSales
  .filter((sale) => sale.image)
  .map((sale) => ({ ...sale, artist: artists.find((a) => a.id === sale.artistId) }))
  .filter((sale) => sale.artist);

export default function SoldWorksPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            Provenance
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-6">
            Sold Works
          </h1>
          <p className="text-base text-ink-secondary font-sans font-light">
            Genuine works sold through India Contemporary — not market history from
            elsewhere, but sales made directly through this platform.
          </p>
        </div>

        {soldWorks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {soldWorks.map((sale, i) => (
              <div
                key={i}
                className="opacity-0 animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
              >
                <div className="artwork-tilt aspect-[4/5] overflow-hidden bg-[#EBE7DF] mb-5">
                  <img
                    src={sale.image}
                    alt={sale.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Link
                  to={`/artists/${sale.artist.id}`}
                  className="text-xs uppercase tracking-widest text-ink-muted hover:text-accent transition-colors font-sans mb-2 block w-fit"
                >
                  {sale.artist.name}
                </Link>
                <h3 className="font-serif text-lg font-light text-ink-primary mb-1">
                  {sale.title} <span className="text-ink-muted">&middot; {sale.year}</span>
                </h3>
                <p className="text-sm text-ink-muted font-sans font-light">{sale.medium}</p>
                <p className="text-sm text-ink-secondary font-sans tabular-nums mt-1">
                  &euro;{sale.price.toLocaleString()}
                  {sale.note && <span className="text-ink-muted"> &middot; {sale.note}</span>}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-muted font-sans">
            We're adding photos of genuine sold work here shortly — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { artists } from "@/data/artists";

export default function ArtistsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            India, Rendered New
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-4">
            The Artists
          </h1>
          <p className="text-base text-ink-secondary font-sans font-light">
            Every artist we work with is visited, vetted, and represented directly —
            no intermediaries between the studio and the collector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          {artists.map((artist, i) => (
            <Link
              to={`/artists/${artist.id}`}
              key={artist.id}
              className="group opacity-0 animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "forwards" }}
            >
              {artist.image && (
                <div className="aspect-[4/5] overflow-hidden bg-[#EBE7DF] mb-5">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="font-serif text-xl font-light text-ink-primary mb-1">
                {artist.name}
              </h2>
              <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-3">
                {artist.role} &middot; {artist.city}
              </p>
              <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                {artist.bio}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

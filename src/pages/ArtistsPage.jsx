import React from "react";
import { artists } from "@/data/artists";
import { artworks } from "@/data/artworks";
import ArtworkCard from "@/components/ArtworkCard";

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

        <div className="flex flex-col gap-24 md:gap-32">
          {artists.map((artist, i) => {
            const works = artworks.filter((a) => a.artistId === artist.id);
            return (
              <div
                key={artist.id}
                className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16"
              >
                <div>
                  <div className="aspect-[4/5] overflow-hidden bg-[#EBE7DF] mb-6">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h2 className="font-serif text-2xl font-light text-ink-primary mb-1">
                    {artist.name}
                  </h2>
                  <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-4">
                    {artist.role} &middot; {artist.city}
                  </p>
                  <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                    {artist.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 content-start">
                  {works.map((art, j) => (
                    <ArtworkCard art={art} key={art.id} index={j} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

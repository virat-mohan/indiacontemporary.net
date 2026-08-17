import React from "react";
import { useParams, Link } from "react-router-dom";
import { artists } from "@/data/artists";
import { artworks } from "@/data/artworks";
import ArtworkCard from "@/components/ArtworkCard";
import { ArrowLeft } from "lucide-react";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const artist = artists.find((a) => a.id === id);
  const works = artworks.filter((a) => a.artistId === id);

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

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 mb-20">
          <div>
            <div className="aspect-[4/5] overflow-hidden bg-[#EBE7DF] mb-6">
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

          <div className="flex flex-col justify-center gap-5 max-w-2xl">
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              {artist.bio}
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              {artist.philosophy}
            </p>
          </div>
        </div>

        <div className="border-t border-line/50 pt-16">
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
      </div>
    </div>
  );
}

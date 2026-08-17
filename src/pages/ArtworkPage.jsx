import React from "react";
import { useParams, Link } from "react-router-dom";
import { artworks } from "@/data/artworks";
import { artists } from "@/data/artists";
import { ArrowLeft } from "lucide-react";

export default function ArtworkPage() {
  const { id } = useParams();
  const art = artworks.find((a) => a.id === id);
  const artist = art ? artists.find((p) => p.id === art.artistId) : null;

  if (!art) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary">Artwork not found.</p>
        <Link to="/collection" className="text-accent underline font-sans">
          Back to collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans mb-10"
        >
          <ArrowLeft size={14} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="bg-[#EBE7DF] overflow-hidden aspect-[3/4]">
            <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-widest text-ink-muted mb-3 font-sans">
              {artist?.name}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink-primary tracking-tight mb-6">
              {art.title}
            </h1>
            <p className="text-sm text-ink-secondary font-sans font-light mb-1">
              {art.medium}
            </p>
            <p className="text-sm text-ink-muted font-sans font-light mb-8">
              {art.dimensions}
            </p>
            <p
              className={`text-2xl font-serif font-light mb-10 ${
                art.status === "sold_out" ? "text-ink-muted line-through" : "text-ink-primary"
              }`}
            >
              &euro;{art.price.toLocaleString()}
            </p>

            {art.status === "sold_out" ? (
              <span className="inline-flex w-fit bg-ink-muted/20 text-ink-secondary px-8 py-4 text-sm tracking-widest uppercase font-sans">
                Sold Out
              </span>
            ) : (
              <button className="inline-flex w-fit bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300">
                Enquire to Purchase
              </button>
            )}

            <p className="text-xs text-ink-muted font-sans mt-8 leading-relaxed max-w-sm">
              Shipped insured from the artist's studio in India to anywhere in the EU.
              Certificate of authenticity included.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

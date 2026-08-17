import React from "react";
import { useParams, Link } from "react-router-dom";
import { collections, artworks } from "@/data/artworks";
import ArtworkCard from "@/components/ArtworkCard";
import { ArrowLeft } from "lucide-react";

export default function CollectionDetailPage() {
  const { id } = useParams();
  const collection = collections.find((c) => c.id === id);
  const items = artworks.filter((a) => a.collectionId === id);

  if (!collection) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary">Collection not found.</p>
        <Link to="/collections" className="text-accent underline font-sans">
          Back to collections
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans mb-10"
        >
          <ArrowLeft size={14} /> All Collections
        </Link>

        <div className="mb-16 max-w-2xl">
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-4">
            {collection.name}
          </h1>
          <p className="text-base text-ink-secondary font-sans font-light">
            {collection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {items.map((art, i) => (
            <ArtworkCard art={art} key={art.id} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

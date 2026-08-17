import React, { useMemo, useState } from "react";
import { artworks } from "@/data/artworks";
import ArtworkCard from "@/components/ArtworkCard";

const FILTERS = ["All", "Painting", "Sculpture", "Print", "Textile"];

const mediumToFilter = (medium) => {
  const m = medium.toLowerCase();
  if (m.includes("canvas")) return "Painting";
  if (m.includes("bronze") || m.includes("terracotta")) return "Sculpture";
  if (m.includes("print") || m.includes("etching") || m.includes("linocut")) return "Print";
  if (m.includes("textile") || m.includes("fibre")) return "Textile";
  return "All";
};

export default function ArtworksPage() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return artworks;
    return artworks.filter((a) => mediumToFilter(a.medium) === filter);
  }, [filter]);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            All Artworks
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight">
            Available Works
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 border text-sm uppercase tracking-wider transition-colors font-sans ${
                filter === f
                  ? "border-accent text-accent"
                  : "border-line text-ink-secondary hover:border-accent hover:text-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {filtered.map((art, i) => (
            <ArtworkCard art={art} key={art.id} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

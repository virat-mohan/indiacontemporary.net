import React from "react";
import { Link } from "react-router-dom";
import { collections } from "@/data/artworks";

export default function CollectionsListPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            Curated Selections
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight">
            Collections
          </h1>
        </div>

        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {collections.map((col) => (
              <Link to={`/collections/${col.id}`} key={col.id} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-[#EBE7DF] mb-6">
                  <img
                    src={col.cover}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-serif text-2xl font-light text-ink-primary mb-2">
                  {col.name}
                </h3>
                <p className="text-sm text-ink-secondary font-sans font-light">
                  {col.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-ink-muted font-sans">
            No collections currently curated &mdash; check back soon.
          </p>
        )}
      </div>
    </div>
  );
}

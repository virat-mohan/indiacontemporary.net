import React from "react";
import { Link } from "react-router-dom";

export default function ArtworkCard({ art, index = 0 }) {
  return (
    <Link
      to={`/artwork/${art.id}`}
      className="group opacity-0 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
    >
      <div className="overflow-hidden bg-[#EBE7DF] aspect-[3/4] mb-6 relative">
        <img
          src={art.image}
          alt={art.title}
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-500"
          loading="lazy"
        />
        {art.status === "sold_out" && (
          <div className="absolute inset-0 bg-bg/60 flex items-center justify-center">
            <span className="bg-ink-primary text-bg px-4 py-1.5 text-xs uppercase tracking-[0.2em] font-sans">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <p className="text-xs uppercase tracking-widest text-ink-muted mb-2 font-sans">
        {art.artist}
      </p>
      <h3 className="font-serif text-xl font-light text-ink-primary mb-1">{art.title}</h3>
      <p
        className={`text-sm font-sans font-light ${
          art.status === "sold_out" ? "text-ink-muted line-through" : "text-ink-secondary"
        }`}
      >
        {art.medium} &middot; &euro;{art.price.toLocaleString()}
      </p>
    </Link>
  );
}

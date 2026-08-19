import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { artworks } from "@/data/artworks";
import { artists } from "@/data/artists";
import { useCart } from "@/context/CartContext";
import ArtworkCard from "@/components/ArtworkCard";
import { ArrowLeft } from "lucide-react";

const CURRENCY_SYMBOLS = { EUR: "€", INR: "₹" };

export default function ArtworkPage() {
  const { id } = useParams();
  const art = artworks.find((a) => a.id === id);
  const artist = art ? artists.find((p) => p.id === art.artistId) : null;
  const moreFromArtist = art
    ? artworks.filter((a) => a.artistId === art.artistId && a.id !== art.id)
    : [];
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", message: "", subscribeNewsletter: true });
  const [enquirySubmitting, setEnquirySubmitting] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryError, setEnquiryError] = useState("");

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setEnquiryError("");
    setEnquirySubmitting(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: enquiryForm.name,
          email: enquiryForm.email,
          message: enquiryForm.message,
          subscribeNewsletter: enquiryForm.subscribeNewsletter,
          artworkTitle: art?.title,
          artistName: artist?.name,
          artworkUrl: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send your enquiry.");
      setEnquirySubmitted(true);
    } catch (err) {
      setEnquiryError(err.message);
    } finally {
      setEnquirySubmitting(false);
    }
  };

  if (!art) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary">Artwork not found.</p>
        <Link to="/artworks" className="text-accent underline font-sans">
          Back to artworks
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <Link
          to="/artworks"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans mb-10"
        >
          <ArrowLeft size={14} /> Back to Artworks
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="artwork-tilt bg-[#EBE7DF] overflow-hidden flex items-center justify-center">
            <img
              src={art.image}
              alt={art.title}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            {artist && (
              <Link
                to={`/artists/${artist.id}`}
                className="text-xs uppercase tracking-widest text-ink-muted hover:text-accent transition-colors mb-3 font-sans w-fit"
              >
                {artist.name}
              </Link>
            )}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink-primary tracking-tight mb-6">
              {art.title}
            </h1>
            {(art.medium || art.year) && (
              <p className="text-sm text-ink-secondary font-sans font-light mb-1">
                {art.medium}{art.medium && art.year ? `, ${art.year}` : art.year}
              </p>
            )}
            {art.dimensions && (
              <p className="text-sm text-ink-muted font-sans font-light mb-8">
                {art.dimensions}
              </p>
            )}
            <p
              className={`text-2xl font-serif font-light mb-10 ${
                art.status === "sold_out" ? "text-ink-muted line-through" : "text-ink-primary"
              }`}
            >
              {art.price != null
                ? `${CURRENCY_SYMBOLS[art.currency] || "€"}${art.price.toLocaleString()}`
                : "Price on request"}
            </p>

            {art.status === "sold_out" ? (
              <span className="inline-flex w-fit bg-ink-muted/20 text-ink-secondary px-8 py-4 text-sm tracking-widest uppercase font-sans">
                Sold Out
              </span>
            ) : art.price != null ? (
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    addItem(art.id, 1);
                    setAdded(true);
                  }}
                  className="inline-flex w-fit bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
                >
                  {added ? "Added" : "Add to Cart"}
                </button>
                {added && (
                  <button
                    onClick={() => navigate("/cart")}
                    className="inline-flex w-fit border border-accent text-accent px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent hover:text-white transition-colors duration-300"
                  >
                    View Cart
                  </button>
                )}
              </div>
            ) : enquirySubmitted ? (
              <p className="text-sm text-ink-secondary font-sans font-light max-w-sm">
                Thank you — your enquiry has been sent. We'll be in touch shortly.
              </p>
            ) : enquiryOpen ? (
              <form onSubmit={handleEnquirySubmit} className="flex flex-col gap-4 max-w-sm">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={enquiryForm.name}
                  onChange={(e) => setEnquiryForm((f) => ({ ...f, name: e.target.value }))}
                  className="border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Your Email"
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm((f) => ({ ...f, email: e.target.value }))}
                  className="border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors"
                />
                <textarea
                  rows={3}
                  placeholder="Message (optional)"
                  value={enquiryForm.message}
                  onChange={(e) => setEnquiryForm((f) => ({ ...f, message: e.target.value }))}
                  className="border border-line bg-transparent px-4 py-3 text-sm font-sans text-ink-primary focus:outline-none focus:border-accent transition-colors resize-none"
                />
                <label className="flex items-center gap-2 text-xs text-ink-secondary font-sans">
                  <input
                    type="checkbox"
                    checked={enquiryForm.subscribeNewsletter}
                    onChange={(e) =>
                      setEnquiryForm((f) => ({ ...f, subscribeNewsletter: e.target.checked }))
                    }
                  />
                  Subscribe to our newsletter
                </label>
                {enquiryError && <p className="text-xs text-red-700 font-sans">{enquiryError}</p>}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={enquirySubmitting}
                    className="bg-accent text-white px-6 py-3 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50"
                  >
                    {enquirySubmitting ? "Sending..." : "Send Enquiry"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEnquiryOpen(false)}
                    className="border border-line px-6 py-3 text-sm tracking-widest uppercase font-sans text-ink-secondary hover:border-accent transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setEnquiryOpen(true)}
                className="inline-flex w-fit bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
              >
                Enquire
              </button>
            )}

            <p className="text-xs text-ink-muted font-sans mt-8 leading-relaxed max-w-sm">
              Shipped insured from the artist's studio in India to anywhere in Europe.
              Certificate of authenticity included.
            </p>

            {art.description && (
              <div className="mt-12 pt-8 border-t border-line/50">
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-3">
                  About This Piece
                </p>
                <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed max-w-md">
                  {art.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {moreFromArtist.length > 0 && artist && (
          <div className="mt-24 pt-16 border-t border-line/50">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
                  Same Studio
                </p>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-ink-primary tracking-tight">
                  More From {artist.name}
                </h2>
              </div>
              <Link
                to={`/artists/${artist.id}`}
                className="hidden md:block text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans"
              >
                View Profile
              </Link>
            </div>
            <div className="flex gap-6 md:gap-8 overflow-x-auto pb-4 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24 snap-x snap-mandatory scroll-smooth">
              {moreFromArtist.map((a, i) => (
                <div key={a.id} className="w-[65vw] xs:w-[45vw] sm:w-64 flex-shrink-0 snap-start">
                  <ArtworkCard art={a} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

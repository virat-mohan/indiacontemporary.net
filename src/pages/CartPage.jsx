import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, X, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <h1 className="font-serif text-3xl font-light text-ink-primary mb-4">Your Cart Is Empty</h1>
        <p className="text-ink-secondary font-sans font-light mb-8">
          Browse the artworks to find a piece for your walls.
        </p>
        <Link
          to="/artworks"
          className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
        >
          Explore The Artworks <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-12">
          Your Cart
        </h1>

        <div className="flex flex-col divide-y divide-line/50">
          {items.map(({ artworkId, qty, art }) => (
            <div key={artworkId} className="flex gap-6 py-8 first:pt-0">
              <Link to={`/artwork/${art.id}`} className="w-28 h-32 flex-shrink-0 bg-[#EBE7DF] overflow-hidden">
                <img src={art.image} alt={art.title} className="w-full h-full object-contain" />
              </Link>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-1">
                      {art.artist}
                    </p>
                    <Link to={`/artwork/${art.id}`} className="font-serif text-xl text-ink-primary hover:text-accent transition-colors">
                      {art.title}
                    </Link>
                    <p className="text-sm text-ink-muted font-sans font-light mt-1">{art.medium}</p>
                  </div>
                  <button
                    onClick={() => removeItem(art.id)}
                    aria-label={`Remove ${art.title}`}
                    className="text-ink-muted hover:text-accent transition-colors"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3 border border-line px-3 py-1.5">
                    <button
                      onClick={() => updateQty(art.id, qty - 1)}
                      disabled={qty <= 1}
                      aria-label="Decrease quantity"
                      className="text-ink-secondary hover:text-accent disabled:opacity-30 transition-colors"
                    >
                      <Minus size={14} strokeWidth={1.5} />
                    </button>
                    <span className="text-sm font-sans w-4 text-center">{qty}</span>
                    <button
                      onClick={() => updateQty(art.id, qty + 1)}
                      disabled={qty >= art.stock}
                      aria-label="Increase quantity"
                      className="text-ink-secondary hover:text-accent disabled:opacity-30 transition-colors"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                  <p className="font-serif text-lg text-ink-primary">
                    &euro;{(art.price * qty).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-8 flex flex-col items-end gap-2">
          <p className="text-sm text-ink-muted font-sans">
            Shipping & customs calculated at checkout
          </p>
          <p className="font-serif text-2xl text-ink-primary">
            Subtotal: &euro;{subtotal.toLocaleString()}
          </p>
          <Link
            to="/checkout"
            className="inline-flex items-center gap-3 mt-4 bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
          >
            Proceed to Checkout <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
}

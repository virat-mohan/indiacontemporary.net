import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ic_last_order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      setOrder(null);
    }
  }, []);

  if (!order) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary mb-6">No recent order found.</p>
        <Link to="/artworks" className="text-accent underline font-sans">
          Explore the artworks
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-14 h-14 mx-auto mb-8 rounded-full bg-accent flex items-center justify-center">
          <Check size={24} color="white" strokeWidth={2} />
        </div>
        <h1 className="font-serif text-4xl font-light text-ink-primary tracking-tight mb-4">
          Order Received
        </h1>
        <p className="text-ink-secondary font-sans font-light mb-2">
          Order <span className="text-ink-primary">{order.orderNumber}</span>
        </p>
        <p className="text-ink-secondary font-sans font-light mb-12 max-w-md mx-auto">
          We've recorded your order and will be in touch by email at {order.customer.email} to
          confirm shipment from the artist's studio in India.
        </p>

        <div className="text-left bg-bg-alt border border-line/60 p-8 mb-12">
          <div className="flex flex-col gap-3 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm font-sans">
                <span className="text-ink-secondary">
                  {item.title} {item.qty > 1 ? `x${item.qty}` : ""}
                  {item.framing && (
                    <span className="block text-xs text-ink-muted">{item.framing}</span>
                  )}
                </span>
                <span className="text-ink-primary">
                  &euro;{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-line/60 pt-4 flex justify-between font-serif text-lg text-ink-primary">
            <span>Total</span>
            <span>&euro;{order.total.toLocaleString()}</span>
          </div>
        </div>

        <Link
          to="/artworks"
          className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
        >
          Continue Browsing <ArrowRight size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}

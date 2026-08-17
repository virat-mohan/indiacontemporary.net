import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { euCountries } from "@/data/euCountries";
import { ArrowRight } from "lucide-react";

const SHIPPING_FLAT_FEE = 180;

const emptyForm = {
  fullName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: euCountries[0],
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <p className="font-sans text-ink-secondary mb-6">Your cart is empty.</p>
        <Link to="/collection" className="text-accent underline font-sans">
          Explore the collection
        </Link>
      </div>
    );
  }

  const shipping = SHIPPING_FLAT_FEE;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      orderNumber: `IC-${Date.now().toString().slice(-8)}`,
      placedAt: new Date().toISOString(),
      customer: form,
      items: items.map(({ art, qty }) => ({
        id: art.id,
        title: art.title,
        artist: art.artist,
        price: art.price,
        qty,
      })),
      subtotal,
      shipping,
      total,
    };
    localStorage.setItem("ic_last_order", JSON.stringify(order));
    clearCart();
    navigate("/checkout/success");
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16">
        <div>
          <h1 className="font-serif text-4xl font-light text-ink-primary tracking-tight mb-10">
            Checkout
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Full Name
              </label>
              <input
                required
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Shipping Address
              </label>
              <input
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  City
                </label>
                <input
                  required
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                  Postal Code
                </label>
                <input
                  required
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  className="w-full border border-line bg-transparent px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-ink-muted font-sans mb-2">
                Country
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border border-line bg-bg px-4 py-3 font-sans text-ink-primary focus:outline-none focus:border-line-focus"
              >
                {euCountries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex items-center justify-center gap-3 bg-accent text-white px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-accent-hover transition-colors duration-300"
            >
              Place Order <ArrowRight size={16} strokeWidth={1.5} />
            </button>
            <p className="text-xs text-ink-muted font-sans leading-relaxed">
              Payment processing is not yet connected — placing an order records it locally
              as a preview of the checkout flow. Live payments (Stripe) come online with the
              backend.
            </p>
          </form>
        </div>

        <div className="bg-bg-alt border border-line/60 p-8 h-fit">
          <h2 className="font-serif text-xl font-light text-ink-primary mb-6">Order Summary</h2>
          <div className="flex flex-col gap-4 mb-6">
            {items.map(({ art, qty }) => (
              <div key={art.id} className="flex justify-between gap-4 text-sm font-sans">
                <span className="text-ink-secondary">
                  {art.title} {qty > 1 ? `x${qty}` : ""}
                </span>
                <span className="text-ink-primary">&euro;{(art.price * qty).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-line/60 pt-4 flex flex-col gap-2 text-sm font-sans">
            <div className="flex justify-between text-ink-secondary">
              <span>Subtotal</span>
              <span>&euro;{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-ink-secondary">
              <span>Insured Shipping (EU)</span>
              <span>&euro;{shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-ink-primary font-serif text-lg pt-2">
              <span>Total</span>
              <span>&euro;{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

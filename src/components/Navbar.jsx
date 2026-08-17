import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/collection", label: "Collection" },
  { href: "/collections", label: "Collections" },
  { href: "/artists", label: "Artists" },
  { href: "/for-artists", label: "For Artists" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line/50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            to="/"
            className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-ink-primary hover:text-accent transition-colors"
          >
            INDIA CONTEMPORARY
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className="hidden md:inline-flex text-ink-secondary hover:text-accent transition-colors"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative text-ink-secondary hover:text-accent transition-colors"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-white text-[10px] flex items-center justify-center rounded-full font-sans">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-ink-secondary"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden flex flex-col gap-6 pb-8 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-widest text-ink-secondary font-sans"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

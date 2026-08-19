import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/artworks", label: "Artworks" },
  { href: "/sold-works", label: "Sold Works" },
  {
    label: "Artists",
    href: "/artists",
    children: [
      { href: "/artists", label: "All Artists" },
      { href: "/reviews", label: "Artist Reviews" },
    ],
  },
  {
    label: "Journal",
    href: "/blog",
    children: [
      { href: "/blog", label: "The Journal" },
      { href: "/news", label: "In The News" },
    ],
  },
  { href: "/for-artists", label: "For Artists" },
  { href: "/founder", label: "Founder" },
  { href: "/about", label: "About" },
];

function NavDropdown({ link }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans whitespace-nowrap"
        aria-expanded={open}
      >
        {link.label}
        <ChevronDown size={13} strokeWidth={1.5} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
          <div className="bg-bg border border-line/60 shadow-lg py-2 min-w-[180px]">
            {link.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 text-sm uppercase tracking-widest text-ink-secondary hover:text-accent hover:bg-bg-alt transition-colors font-sans whitespace-nowrap"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-line/50">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="group leading-tight">
            <span className="block font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-ink-primary group-hover:text-accent transition-colors">
              INDIA CONTEMPORARY
            </span>
            <span className="block font-serif italic text-[11px] md:text-xs text-ink-muted tracking-normal">
              by Vijit Veer Hooda
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <NavDropdown link={link} key={link.label} />
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm uppercase tracking-widest text-ink-secondary hover:text-accent transition-colors font-sans whitespace-nowrap"
                >
                  {link.label}
                </Link>
              )
            )}
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
          <div className="md:hidden flex flex-col gap-1 pb-8 pt-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="border-b border-line/30 last:border-b-0">
                  <button
                    onClick={() =>
                      setMobileExpanded((v) => (v === link.label ? null : link.label))
                    }
                    className="w-full flex items-center justify-between py-3 text-sm uppercase tracking-widest text-ink-secondary font-sans"
                  >
                    {link.label}
                    <ChevronDown
                      size={15}
                      strokeWidth={1.5}
                      className={`transition-transform ${mobileExpanded === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {mobileExpanded === link.label && (
                    <div className="flex flex-col gap-4 pb-4 pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setOpen(false)}
                          className="text-sm uppercase tracking-widest text-ink-muted font-sans"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm uppercase tracking-widest text-ink-secondary font-sans border-b border-line/30 last:border-b-0"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

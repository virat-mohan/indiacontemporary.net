import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2A2825] text-ink-inverse px-6 md:px-12 lg:px-24 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <p className="font-serif text-2xl font-light tracking-[0.15em] mb-1">
            INDIA CONTEMPORARY
          </p>
          <p className="font-serif italic text-base text-[#B8B0A2] mb-4">
            by Vijit Veer Hooda
          </p>
          <p className="text-sm text-[#B8B0A2] font-sans font-light leading-relaxed">
            Original work from India's contemporary artists, curated with care and
            delivered to collectors across Europe.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#8A847A] font-sans mb-4">
            Explore
          </p>
          <div className="flex flex-col gap-3 font-sans text-sm text-[#D3C5B3]">
            <Link to="/artworks" className="hover:text-white transition-colors">Artworks</Link>
            <Link to="/artists" className="hover:text-white transition-colors">Artists</Link>
            <Link to="/for-artists" className="hover:text-white transition-colors">For Artists</Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#8A847A] font-sans mb-4">
            Gallery
          </p>
          <div className="flex flex-col gap-3 font-sans text-sm text-[#D3C5B3]">
            <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link to="/founder" className="hover:text-white transition-colors">Founder</Link>
            <Link to="/blog" className="hover:text-white transition-colors">Journal</Link>
            <Link to="/news" className="hover:text-white transition-colors">In The News</Link>
            <Link to="/reviews" className="hover:text-white transition-colors">Artist Reviews</Link>
            <Link to="/sold-works" className="hover:text-white transition-colors">Sold Works</Link>
            <Link to="/partnerships" className="hover:text-white transition-colors">Partnerships</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/shipping" className="hover:text-white transition-colors">Shipping to Europe</Link>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-[#8A847A] font-sans mb-4">
            Contact
          </p>
          <div className="flex flex-col gap-3 font-sans text-sm text-[#D3C5B3]">
            <a href="mailto:hello@indiacontemporary.net" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} strokeWidth={1.5} /> hello@indiacontemporary.net
            </a>
            <a
              href="https://www.instagram.com/indiacontemporary.art"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Instagram size={14} strokeWidth={1.5} /> @indiacontemporary.art
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8A847A] font-sans">
        <p>&copy; {new Date().getFullYear()} India Contemporary. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

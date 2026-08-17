import React from "react";
import { Mail, Instagram } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
          Get In Touch
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-8">
          Contact Us
        </h1>
        <p className="text-base text-ink-secondary font-sans font-light leading-relaxed mb-12">
          Questions about a piece, shipping to your country, or interested in
          having us represent your work? Reach out directly.
        </p>

        <div className="flex flex-col items-center gap-4 font-sans text-ink-secondary">
          <a
            href="mailto:hello@indiacontemporary.net"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <Mail size={16} strokeWidth={1.5} /> hello@indiacontemporary.net
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-accent transition-colors">
            <Instagram size={16} strokeWidth={1.5} /> @indiacontemporary
          </a>
        </div>
      </div>
    </div>
  );
}

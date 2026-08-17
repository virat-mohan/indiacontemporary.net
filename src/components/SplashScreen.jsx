import React, { useState } from "react";
import { X } from "lucide-react";

export default function SplashScreen() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center px-6 py-10 overflow-y-auto">
      <button
        onClick={() => setDismissed(true)}
        aria-label="Close announcement"
        className="absolute top-6 right-6 md:top-8 md:right-8 text-ink-primary hover:text-accent transition-colors"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      <div className="w-full max-w-md bg-[#E4E1D9] text-center animate-fade-up">
        <div className="px-8 pt-12">
          <p className="text-xs md:text-sm font-sans font-bold uppercase tracking-[0.1em] text-ink-primary leading-relaxed mb-10">
            An Initiative To Bring Indian Contemporary Art
            <br />
            To The European Collector
          </p>
          <h1 className="leading-[0.85] mb-4">
            <span className="block font-serif text-6xl sm:text-7xl font-light text-ink-primary tracking-tight">
              INDIA
            </span>
            <span className="block font-sans text-5xl sm:text-6xl font-bold text-ink-primary tracking-tight -mt-2">
              CONTEMPORARY
            </span>
          </h1>
          <p className="text-sm font-sans tracking-widest text-ink-secondary mb-10">
            BY VIJIT VEER HOODA
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544450489-2827b7132e93?auto=format&fit=crop&w=900&q=80"
            alt="Contemporary artwork"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

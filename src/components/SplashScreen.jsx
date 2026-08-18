import React, { useState } from "react";
import { Link } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

export default function SplashScreen() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#201D18]/80 backdrop-blur-[2px]" />
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Close"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[101] text-white/80 hover:text-white transition-colors"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      <div className="relative min-h-full flex px-6 py-20">
        <div className="w-full max-w-2xl mx-auto m-auto text-center animate-fade-up">
          <p className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-[#D3C5B3] mb-8">
            An Initiative To Bring Indian Contemporary Art
            <br />
            To The European Collector And The Rest Of The World
          </p>

          <h1 className="leading-[0.9] mb-10">
            <span className="block font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-white tracking-tight">
              INDIA
            </span>
            <span className="block font-sans text-3xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight -mt-1 sm:-mt-2">
              CONTEMPORARY
            </span>
          </h1>

          <p className="text-sm sm:text-base font-sans font-light text-[#D3C5B3] mb-12">
            Founded by Vijit Veer Hooda
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/for-artists"
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 text-sm tracking-widest uppercase font-sans hover:bg-white hover:text-[#1A1A1A] transition-all duration-500"
            >
              Call To Artists <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setDismissed(true)}
              className="text-sm tracking-widest uppercase font-sans text-white/70 hover:text-white underline underline-offset-4 transition-colors"
            >
              See Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

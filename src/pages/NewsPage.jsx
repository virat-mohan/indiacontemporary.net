import React from "react";
import { newsItems } from "@/data/news";
import { ArrowUpRight } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            In The News
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-ink-primary tracking-tight mb-6">
            Indian Art, On The World Stage
          </h1>
          <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
            A running list of reporting on the Indian contemporary art market —
            auction records, institutional recognition, collector trends. We link
            out to the original source; the facts and figures are theirs.
          </p>
        </div>

        <div className="flex flex-col">
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group py-8 border-t border-line/50 last:border-b grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-6"
            >
              <div className="artwork-tilt aspect-[4/3] overflow-hidden bg-[#EBE7DF]">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans mb-3">
                  {item.date} &middot; {item.source}
                </p>
                <h2 className="font-serif text-2xl font-light text-ink-primary tracking-tight mb-3 flex items-start gap-2 group-hover:text-accent transition-colors">
                  {item.headline}
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="mt-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </h2>
                <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed max-w-xl">
                  {item.summary}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from "react";

const FOUNDER_IMAGE = "/founder/vijit-veer-hooda-new.jpg";

const conduits = [
  {
    title: "An Educational Conduit",
    body: "Demystifying the rich, multi-layered metaphors of modern Indian art forms for European audiences.",
  },
  {
    title: "A Commercial Bridge",
    body: "Showcasing highly collectible, curated editions and original masterpieces across key European art hubs.",
  },
  {
    title: "A Dialogue Space",
    body: "Fostering an exchange where the unpredictability and colour of Indian expressionism seamlessly dialogues with classical and modern European design sensibilities.",
  },
];

const exhibitions = [
  { year: 2025, title: "Gallery Steiner", venue: "Vienna" },
  { year: 2024, title: "Kunsthof Vienna", venue: "Group Exhibition, Vienna" },
  { year: 2024, title: "DAG India", venue: "Group Exhibition, India" },
  { year: 2023, title: "Heritage Center India", venue: "Group Exhibition, India" },
  { year: 2022, title: "MAK Vienna", venue: "Robert Kinsky Group Exhibition, Vienna" },
  { year: 2022, title: "Galerie Krinzinger", venue: "Group Exhibition, Vienna" },
];

export default function FounderPage() {
  return (
    <div className="pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 mb-20">
          <div>
            <div className="bevel-shadow aspect-[4/5] overflow-hidden bg-[#EBE7DF] mb-6 flex items-center justify-center">
              {FOUNDER_IMAGE ? (
                <img
                  src={FOUNDER_IMAGE}
                  alt="Vijit Veer Hooda"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-xs uppercase tracking-widest text-ink-muted font-sans px-6 text-center">
                  Portrait to be added
                </p>
              )}
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
              Founder
            </p>
            <h1 className="font-serif text-3xl font-light text-ink-primary tracking-tight mb-1">
              Vijit Veer Hooda
            </h1>
            <p className="text-xs uppercase tracking-widest text-ink-muted font-sans">
              Born 1985, India
            </p>
          </div>

          <div className="flex flex-col justify-center gap-5 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-muted font-sans mb-1">
              Vijit Veer Hooda and the India Contemporary Initiative
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              The India Contemporary initiative represents a vital cultural bridge,
              designed to connect the sophisticated, vibrant landscape of contemporary
              Indian art with discerning European collectors.
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              At the heart of this movement is Vijit Veer Hooda, an Indo-Austrian artist
              and curator based in Vienna. Raised in India and deeply inspired by the
              artistic heritage of Europe, Hooda possesses a rare dual perspective that
              uniquely qualifies him to navigate, curate, and translate these two
              distinct art worlds.
            </p>

            <p className="font-serif text-xl font-light text-ink-primary mt-4">
              The Curator's Vision
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              As a curator, Hooda channels his understanding of identity, heritage, and
              contemporary art into building a platform where Indian artists can thrive
              on the global stage. The initiative targets a critical gap in the market:
              while the European art collector values deep-rooted storytelling and high
              aesthetic execution, the immense depth of India's current contemporary
              scene remains largely untapped in Europe. Under Hooda's curatorial
              guidance, India Contemporary serves as:
            </p>
            <div className="flex flex-col gap-4 mt-1">
              {conduits.map((c) => (
                <div key={c.title}>
                  <p className="text-sm text-ink-primary font-sans mb-1">{c.title}</p>
                  <p className="text-sm text-ink-secondary font-sans font-light leading-relaxed">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-serif text-xl font-light text-ink-primary mt-4">
              About the Artist-Curator
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              Born in India in 1985 and later finding his creative home in Vienna,
              Austria, Vijit Veer Hooda's personal portfolio consists of a vibrant
              art-decor palette of works recognised on the biggest stages for
              contemporary art. Represented by one of the most prestigious galleries in
              Austria — The Gallery Steiner — with exhibitions and sold-out shows
              ranging from Miami Art Basel to New York Art Expo, Vijit Veer Hooda brings
              a passionate and vibrant voice to his genre.
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              His background as an artist and curator gives him an authentic,
              artist-first approach to curation. Rather than treating art as a simple
              commodity, his curation ensures that every brushstroke and narrative
              retains its soul, ultimately helping European collectors find pieces that
              intimately resonate with their own lives.
            </p>
          </div>
        </div>

        <div className="pt-16 border-t border-line/50">
          <p className="text-xs uppercase tracking-[0.25em] text-ink-muted mb-3 font-sans">
            Track Record
          </p>
          <h2 className="font-serif text-2xl font-light text-ink-primary tracking-tight mb-8">
            Exhibitions
          </h2>
          <div className="max-w-2xl flex flex-col">
            {exhibitions.map((ex, i) => (
              <div key={i} className="flex gap-6 py-4 border-t border-line/50 last:border-b">
                <span className="text-sm text-ink-muted font-sans tabular-nums w-12 flex-shrink-0">
                  {ex.year}
                </span>
                <div>
                  <p className="text-sm text-ink-primary font-sans">{ex.title}</p>
                  <p className="text-sm text-ink-muted font-sans font-light">{ex.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

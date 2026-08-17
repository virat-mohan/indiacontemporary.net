import React from "react";

// Photo pending — swap the placeholder box below for Vijit's actual
// portrait once it's provided (source page for bio + photo was
// artbyhooda.com/about-6, blocked from automated fetch here).
const FOUNDER_IMAGE = null;

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
              The Story
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              One full of love and tragedy, Veer Hooda learned about life's beauty and
              brutal abstraction at an early age.
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              Born into a loving, large, affluent family in India in 1985 to an artist
              mother and a respected businessman, Veer Hooda grew up seeing connection
              and community. Spending entire summers in the deep Himalayas, exploring
              the mountains as a child, filled the artist with a deep sense of nature
              and the context in which we fit into that scene as humans.
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              Veer Hooda used his mother's talent and influence to take a deep interest
              in the arts early in his life. His creativity took another turn after
              joining music school and eventually joining a band, pursuing his creative
              output through music and playing the drums. His first vocation, at
              fifteen, was as a music teacher.
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              The early and sudden loss of his father, a central figure in his life and
              community, affected the artist in a profound way. The abstract way in
              which life works became apparent, and the appreciation of the fragility
              of life became a central principle of his life.
            </p>
            <p className="text-base text-ink-secondary font-sans font-light leading-relaxed">
              Veer Hooda pursued a degree in Business and Mathematics, going on to work
              with some of the best firms in the industry. After two decades of working
              in business, entrepreneurship, and diplomacy, Veer Hooda — a few months
              before his own daughter was born — decided to become an artist.
            </p>
            <p className="font-serif italic text-xl text-ink-primary leading-relaxed mt-4">
              &ldquo;Join me in this journey, we'll go places together.&rdquo;
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

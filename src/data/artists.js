// NOTE: `exhibitions` and `pastSales` below are placeholder content for
// design/layout purposes only. Replace with each artist's real exhibition
// history and verified sales records before this goes live to real buyers —
// published prices need to be accurate, not illustrative. `pastSales` is
// market history from OTHER galleries/auctions, not sales made through
// India Contemporary — for genuine platform sales, see platformSales.js.

export const artists = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    city: "Mumbai",
    role: "Painter, Abstract Expressionism",
    bio: "Arjun's canvases draw on the chaos and colour of Mumbai's streets, translated into large-scale abstract works.",
    philosophy:
      "He paints fast and rarely revisits a canvas once it's dry, working from memory of a place rather than photographs of it. Most pieces are finished in a single sitting of six to eight hours.",
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    exhibitions: [
      { year: 2024, title: "Fractures & Form", venue: "Gallery Modern, Vienna" },
      { year: 2023, title: "Monsoon Cities", venue: "Kunstraum 12, Berlin" },
      { year: 2022, title: "New Abstraction from South Asia", venue: "Jehangir Art Gallery, Mumbai" },
      { year: 2021, title: "Colour Fields", venue: "Studio X, Amsterdam" },
    ],
    pastSales: [
      { title: "Harbour Light", year: 2023, medium: "Oil on canvas", price: 3900, note: "Private collection, Vienna" },
      { title: "Red Quarter", year: 2022, medium: "Acrylic on canvas", price: 3200, note: "Private collection, Munich" },
      { title: "Static II", year: 2021, medium: "Oil on canvas", price: 2800, note: "Private collection, Mumbai" },
    ],
  },
  {
    id: "meera-krishnan",
    name: "Meera Krishnan",
    city: "Chennai",
    role: "Sculptor & Mixed Media",
    bio: "Meera reworks traditional Tanjore techniques into sculptural pieces that sit between craft and fine art.",
    philosophy:
      "She builds every piece in terracotta first, by hand, before it's cast in bronze — so the final work still carries her fingerprints and tool marks from the original form.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
    exhibitions: [
      { year: 2024, title: "Cast & Carried", venue: "Galerie Sud, Paris" },
      { year: 2023, title: "Material Histories", venue: "DAG Modern, New Delhi" },
      { year: 2022, title: "Bronze Age Now", venue: "Kochi-Muziris Biennale, Kochi" },
      { year: 2020, title: "Tanjore Reworked", venue: "Lalit Kala Akademi, Chennai" },
    ],
    pastSales: [
      { title: "Vessel Study I", year: 2023, medium: "Cast bronze", price: 5100, note: "Private collection, Paris" },
      { title: "Kinship", year: 2022, medium: "Bronze & terracotta", price: 4600, note: "Private collection, Zurich" },
      { title: "Standing Form", year: 2021, medium: "Cast bronze", price: 3900, note: "Private collection, Chennai" },
    ],
  },
  {
    id: "rohan-das",
    name: "Rohan Das",
    city: "Kolkata",
    role: "Printmaker & Illustrator",
    bio: "Rohan's linocuts and etchings revisit Bengal's storytelling traditions through a contemporary, political lens.",
    philosophy:
      "Every edition is pulled by hand on his own press in small batches, so no two prints in a run are quite identical. He sees the small imperfections as part of the work, not a flaw in it.",
    image:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&w=600&q=80",
    exhibitions: [
      { year: 2024, title: "Ink & Dissent", venue: "Espace Nord, Brussels" },
      { year: 2023, title: "Bengal Now", venue: "Akar Prakar, Kolkata" },
      { year: 2022, title: "Print/Politic", venue: "V&A Waterfront Gallery, London" },
    ],
    pastSales: [
      { title: "Tram Line, Dusk", year: 2022, medium: "Etching, edition of 10", price: 780, note: "Private collection, London" },
      { title: "River Script", year: 2021, medium: "Linocut, edition of 15", price: 650, note: "Private collection, Brussels" },
      { title: "Market Voices", year: 2020, medium: "Etching, edition of 8", price: 720, note: "Private collection, Kolkata" },
    ],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    city: "Jaipur",
    role: "Textile & Fibre Artist",
    bio: "Priya works with hand-dyed textiles and natural fibres, bridging Rajasthani craft with modern installation art.",
    philosophy:
      "She dyes every thread herself using indigo, madder root, and turmeric, and treats the loom as a drawing tool rather than a production method — no two panels come out the same colour twice.",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=600&q=80",
    exhibitions: [
      { year: 2024, title: "Woven Ground", venue: "Textile Museum, Amsterdam" },
      { year: 2023, title: "Natural Dye, New Form", venue: "Jawahar Kala Kendra, Jaipur" },
      { year: 2022, title: "Fibre as Language", venue: "Somerset House, London" },
    ],
    pastSales: [
      { title: "Indigo Field", year: 2023, medium: "Natural-dyed textile", price: 4400, note: "Private collection, Amsterdam" },
      { title: "Desert Weave", year: 2022, medium: "Hand-dyed fibre installation", price: 3800, note: "Private collection, London" },
      { title: "Madder Study", year: 2021, medium: "Natural-dyed textile", price: 2900, note: "Private collection, Jaipur" },
    ],
  },
];

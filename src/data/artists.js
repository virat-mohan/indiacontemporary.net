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

  // --- Real artists behind genuine platformSales.js pieces ---------------
  // Bios below are compiled from public web search results (gallery sites,
  // press coverage) matched by name — NOT personally verified by India
  // Contemporary, and photo fetches from the source galleries were blocked
  // in this environment, so there's no portrait yet. `profileNote` renders
  // as a visible disclaimer on the page until someone confirms identity and
  // supplies a real photo. No pastSales/pricing invented for real people —
  // their one confirmed sale lives in platformSales.js.
  {
    id: "rajnish-chhanesh",
    name: "Rajnish Chhanesh",
    city: "New Delhi",
    role: "Painter",
    profileNote:
      "Profile compiled from public gallery listings and press (Kalakriti Art Gallery, Exhibit320, India Art Fair) — not yet personally confirmed.",
    bio: "An ecologically driven painter working in New Delhi, entwining the visual language of traditional Indian miniature painting with contemporary subject matter.",
    philosophy:
      "His work takes on the role of a visual archivist, illustrating the idiosyncrasies of human society and its impact on the natural world — social, political, and ecological anxieties rendered in the detailed, layered style of miniature painting.",
    image: null,
    exhibitions: [
      { year: 2025, title: "YCWG Bangalore", venue: "Cultivate Art, Bangalore" },
      { year: null, title: "Blind Witness", venue: "India Art Fair" },
      { year: null, title: "Represented by", venue: "Kalakriti Art Gallery" },
      { year: null, title: "Represented by", venue: "Exhibit320" },
    ],
    awards: ["Kejriwal Young Artist Award, 2010"],
  },
  {
    id: "shekh-hifzul-kabeer",
    name: "Shekh Hifzul Kabeer",
    city: "Delhi",
    role: "Painter",
    profileNote:
      "Profile compiled from public gallery listings and press (Florescence Art Gallery, Artspeaks India) — not yet personally confirmed.",
    bio: "Born in 1978 in a village in Khairagarh, Chhattisgarh, and now based in Delhi. Kabeer holds an MFA in painting from Indira Kala Sangeet Vishwavidyalaya (2002).",
    philosophy:
      "His paintings explore signs, symbols, and mythology, blending the folklore and indigenous art of his hometown with contemporary figures and a visible influence of Mughal painting — giving old stories a present-day twist.",
    image: null,
    exhibitions: [
      { year: 2026, title: "Parallel Realities", venue: "Marwah Art Gallery, Bikaner House" },
      { year: 2007, title: "Group Exhibition", venue: "The Fine Art Museum, Chandigarh" },
      { year: null, title: "Contemporary Avatars of Ancient Myths", venue: "Artspeaks India, viewing room" },
    ],
    awards: ["Junior Fellowship, Ministry of Culture, Government of India, 2010–11"],
  },
  {
    id: "anoop-kamath",
    name: "Anoop Kamath",
    city: "Delhi",
    role: "Painter",
    profileNote:
      "Profile compiled from public gallery listings and press (Gallery Ragini, ArtMajeur) — not yet personally confirmed.",
    bio: "Born in Kochi, Kerala, Kamath graduated from Manipal before moving to Delhi in 1990, where he worked as a graphic artist and art director for Business Standard, Business World, Outlook, Hindustan Times, and the Indian Express Group. He has exhibited since 1996.",
    philosophy:
      "His figurative paintings typically present subjects in grayscale against a single vivid, solid-colour background — a style built through his REBELS series (displaced children from Afghanistan, Iraq, Pakistan, and Africa) and Kokum Dreams, drawn from memories of Goa.",
    image: null,
    exhibitions: [
      { year: null, title: "REBELS", venue: "Solo series" },
      { year: null, title: "Kokum Dreams", venue: "Solo series" },
      { year: null, title: "Represented by", venue: "Gallery Ragini" },
    ],
  },
  {
    id: "gopal-samantray",
    name: "Gopal Samantray",
    city: "Odisha",
    role: "Painter",
    profileNote:
      "Profile compiled from public gallery listings and press (Verve Magazine, Artisera, Artflute) — not yet personally confirmed.",
    bio: "Born in 1976 in the village of Adhanga, Odisha. Samantray completed his BFA and MFA at B.K. College of Art, Odisha, in 2002 and 2004.",
    philosophy:
      "Drawn to nature and wildlife since a childhood spent in the forests of Odisha, his brightly coloured paintings — inspired by Picasso and Dalí — depict displaced animals as a comment on humankind's indifference to the natural world, global warming, and deforestation.",
    image: null,
    exhibitions: [
      { year: null, title: "The Enigma of a New Landscape", venue: "Art District XIII, New Delhi" },
      { year: null, title: "Group Exhibition", venue: "India Art Fair" },
    ],
    awards: ["Government of Odisha, World Environment Day recognition, 2001"],
  },
  {
    id: "shaji-appukuttan",
    name: "Shaji Appukuttan",
    city: "Kerala",
    role: "Painter",
    profileNote:
      "Profile compiled from public gallery listings and press (ArtZolo, iArt, APRE Art House) — not yet personally confirmed.",
    bio: "Born in 1970 in Kerala, Appukuttan graduated from Government Fine Arts College, Trichur (1985–89).",
    philosophy:
      "His practice engages with geopolitics and planetary survival as an existential concern rather than spectacle — nature and landscape rendered with a persistent awareness of what's at stake.",
    image: null,
    exhibitions: [
      { year: 2023, title: "Ghost Trees", venue: "Lalithakala Akademi Art Gallery, Payyannur" },
      { year: 2021, title: "Lokame Tharavadu", venue: "Kochi Biennale Foundation, Alappuzha" },
      { year: 2017, title: "Symphony of Land", venue: "Lalithakala Academy Art Gallery, Kozhikkode" },
      { year: null, title: "Karuna", venue: "White Walls Art Gallery, Ernakulam" },
      { year: null, title: "Spiritual Earth", venue: "Durbar Hall Gallery, Ernakulam" },
    ],
    awards: [
      "Kerala Lalitha Kala Akademi State Award, 1992",
      "Siddhartha Foundation Award, 2018",
      "Jackson Pollock–Krasner Foundation grant, 2020–21",
    ],
  },
];

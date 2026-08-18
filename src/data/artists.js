// All artists here are real people. The first 5 (Rajnish Chhanesh through
// Shaji Appukuttan) are behind genuine platformSales.js pieces sold under a
// prior collaboration; their bios are compiled from public web search
// results (gallery sites, press coverage) matched by name — NOT personally
// verified by India Contemporary, and photo fetches from the source
// galleries were blocked in this environment, so there's no portrait yet
// (image: null — no placeholder is shown for it). `profileNote` renders as
// a visible disclaimer on the page until someone confirms identity and
// supplies a real photo.
//
// The remaining 4 (Karam Singh, Guruvinayak, Manoj Paswan, Neeraj Rawal)
// are directly onboarded through the India Contemporary / NIV Art Centre
// partnership — their bios, portraits, and artwork photos were supplied
// directly by the curator, not reconstructed from web search, so no
// disclaimer is needed. Where a `profileNote` does appear on one of these
// (e.g. Manoj Paswan), it's a source citation, not an uncertainty flag.
//
// `exhibitions` are real, sourced facts, not placeholders. No
// pastSales/pricing invented for real people.

export const artists = [
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
  {
    id: "karam-singh",
    name: "Karam Singh",
    city: "New Delhi",
    role: "Painter",
    bio: "Karam Singh is known for his deep, texturally rich canvases that explore themes of human emotion, isolation, and resilience against natural elements, capturing both the external world and internal psychological landscapes. Working primarily out of New Delhi, his signature style blends deep palettes, sweeping palette-knife strokes, and intense lighting to render figures and natural motifs suspended mid-motion.",
    philosophy:
      "His practice centres on the democratisation of art — bringing high-concept gallery pieces into public infrastructure to interact with everyday commuters. His most renowned public commission is a massive, multi-panelled mural at Jaipur International Airport Terminal; beyond Jaipur, his larger-than-life canvases and installations feature in prominent institutional lobbies across New Delhi, including corporate headquarters in Cyber City and government-backed cultural centres.",
    image: "/artist-portraits/karam-singh.jpg",
    exhibitions: [
      { year: 2024, title: "Surge & Serenity", venue: "Jehangir Art Gallery, Mumbai" },
      { year: null, title: "The Deep Current", venue: "Visual Art Gallery, India Habitat Centre" },
      { year: null, title: "Echoes of Fluidity", venue: "Kalaneri Art Gallery" },
      { year: null, title: "The Art of India Annual Exhibit", venue: "Bharat Mandapam, New Delhi" },
      { year: null, title: "Contemporary Visages", venue: "Academy of Fine Arts, Kolkata" },
      { year: 2023, title: "The Indian Abstraction Movement", venue: null },
    ],
    installations: [
      "Multi-panelled mural — Jaipur International Airport Terminal",
      "Large commission works — international airports, the Home Ministry Office of the Government of India, and the India Heritage Institute",
      "Corporate headquarters in Cyber City and government-backed cultural centres, New Delhi",
    ],
  },
  {
    id: "guruvinayak",
    name: "Guruvinayak",
    city: null,
    role: "Painter",
    bio: "I call my practice 'magical realism' — a language that lets me move between the internal and external, where personal memory, mythology, and history collapse into a shared psychological space, a rebellion against 'the outsider's eye'. My paintings are constructed thresholds where the ephemeral is held, suspended, and made 'forever'. I often think of myself as an emotional hoarder: I collect fragments of feelings, stories, residues of lived and inherited experience, driven by a fear of their disappearance.",
    philosophy:
      "Painting becomes a way of holding on, of resisting the erosion of memory and meaning — even while I know that nothing is truly permanent, and that it is within this tension, between retention and inevitable loss, that my work thrives. I trace recurring emotional structures across history, paleo-geology, theology, and linguistics: echoes of a collective unconscious that surface across time and culture. I work primarily in oil, a medium chosen as much for its historical weight as for its resistance to time. For me, each work becomes an excavation, an attempt to hold what is always already slipping away — I hope they feel less like objects and more like invitations, worlds to step into, stay with, and be changed by.",
    image: "/artist-portraits/guruvinayak.jpg",
    exhibitions: [],
  },
  {
    id: "manoj-paswan",
    name: "Manoj Paswan",
    city: "New Delhi",
    role: "Painter",
    profileNote:
      "Profile drawn from \"Complexities of Contemporary Life: The Art of Manoj Paswan\" by Dr. Ved Prakash Bhardwaj, Art News India, December 2025.",
    bio: "Manoj Paswan (b. 1982) is a painter deeply engaged with the complexities of contemporary life. A postgraduate from Jamia Millia Islamia, New Delhi, he responds to the contradictions he encounters daily in the city, expressing them symbolically through a figurative visual language that foregrounds reality while remaining open to layered interpretation. Originally from Bihar, his understanding of displacement, construction, and destruction comes from personal experience as well as shared narratives.",
    philosophy:
      "For Manoj, a painting is not a scene or a report — it is an idea. His works encourage viewers to think beyond the visible and reflect on the social and political concerns embedded within them. Ants represent both a growing population and relentless systems of consumption, while motifs such as food boxes with wings, or buildings standing on human bones, point to disturbing paradoxes of survival and development. Through careful selection of themes, shapes, and colours, he transforms lived realities into evocative visual metaphors — in one striking work, multiple images of the Buddha confront a tank, suggesting with quiet force that peace remains humanity's most urgent need.",
    image: "/artist-portraits/manoj-paswan.jpg",
    exhibitions: [
      { year: 2025, title: "Group Exhibition", venue: "Palm Court Gallery, India Habitat Centre, New Delhi" },
    ],
  },
  {
    id: "neeraj-rawal",
    name: "Neeraj Rawal",
    city: "New Delhi",
    role: "Sculptor",
    bio: "Neeraj Rawal is an Indian contemporary sculptor based in New Delhi. He completed his Bachelor of Fine Arts (BFA) at the College of Art, New Delhi, graduating in 2012, and has been engaged in independent studio practice since 2013. Working primarily with bronze, metal, and chrome, Rawal's sculptural practice explores themes of memory, human relationships, and collective identity.",
    philosophy:
      "His work often draws from childhood imagination, everyday gestures, and symbolic narratives, translating emotional and social experiences into both intimate forms and large-scale public sculptures. He is widely recognised for his ability to combine craftsmanship with conceptual depth, creating works that activate public space and invite dialogue — further, his work is on display at highly prestigious institutions in India, including the Supreme Court of India (Lady Justice).",
    image: "/artist-portraits/neeraj-rawal.jpg",
    instagram: "https://www.instagram.com/sculptorneerajrawal/",
    exhibitions: [
      { year: 2025, title: "Group Exhibition", venue: "India Habitat Centre, New Delhi" },
      { year: 2025, title: "Group Exhibition", venue: "Russian Cultural Centre, New Delhi" },
      { year: 2022, title: "Group Exhibition", venue: "India Habitat Centre, New Delhi" },
      { year: 2013, title: "Group Exhibition", venue: "Hyatt Hotel, Bhikaji Cama Place, New Delhi" },
    ],
    installations: [
      "Justice Lady — Supreme Court Library, New Delhi",
      "Bronze statue of former Chief Minister Sahib Singh Verma",
      "120 ft. Lizard Installation — Lokayata Art Gallery, Hauz Khas, New Delhi",
      "Statue of Durga Das Rathod — Sadar Bazar, New Delhi",
      "Gandhi Concept Installation — Gandhi Smriti Museum, Tees January Marg, New Delhi",
      "Installation — Naval Headquarters, Sarojini Nagar, New Delhi",
      "Statue of Soldiers — Defence Colony, New Delhi",
      "Installation — Rail Bhawan, New Delhi",
      "High relief sculpture — Jammu & Kashmir",
      "High relief of freedom fighters — Shaheed Smarak, Agra, Uttar Pradesh",
      "Metal sculpture — Dilli Haat, INA (cultural programme supported by the Government of India and the European Embassy)",
      "15 ft. sculpture — Galatians University",
    ],
  },
];

// Artists here are the ones directly onboarded through the India
// Contemporary / NIV Art Centre partnership — their bios, portraits, and
// artwork photos were supplied directly by the curator, not reconstructed
// from web search, so no "not yet personally confirmed" disclaimer is
// needed. Where a `profileNote` does appear (e.g. Manoj Paswan), it's a
// source citation, not an uncertainty flag.
//
// A separate, earlier roster of artists (Rajnish Chhanesh, Shekh Hifzul
// Kabeer, Anoop Kamath, Gopal Samantray, Shaji Appukuttan) sold work
// through a prior collaboration and have genuine sold pieces in
// platformSales.js, but deliberately have NO profile here and no bio
// page — their names show as plain text wherever they're credited
// (artistId: null on those platformSales.js entries), not as links.
//
// `exhibitions` are real, sourced facts, not placeholders. No
// pastSales/pricing invented for real people.

export const artists = [
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

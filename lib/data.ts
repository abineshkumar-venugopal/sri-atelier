/** What the work was. Shown on each project alongside its sector. */
export type ProjectCategory =
  | "interior"
  | "exterior"
  | "construction"
  | "restoration";

/** Who the building is for. Drives the filters on the projects page. */
export type ProjectSector = "residential" | "commercial";

export const categoryLabels: Record<ProjectCategory, string> = {
  interior: "Interior",
  exterior: "Exterior",
  construction: "Construction",
  restoration: "Restoration",
};

export const sectorLabels: Record<ProjectSector, string> = {
  commercial: "Commercial",
  residential: "Residential",
};

export interface Project {
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  sector: ProjectSector;
  year: string;
  description: string;
  image: string;
  thumb: string;
  /** More photos, shown after `image` in the project's gallery. */
  gallery?: string[];
}

export const projects: Project[] = [
  {
    slug: "amutha-surabi-resto-bar",
    name: "Amutha Surabi Resto Bar",
    location: "Chennai",
    category: "exterior",
    sector: "commercial",
    year: "2025",
    description:
      "A commercial hospitality project shaped around volume, shade, and a strong street presence.",
    image:
      "/gallery-2/commercial/exterior/amutha surabi resto bar/photo_2025-11-11_19-56-09.jpg",
    thumb:
      "/gallery-2/commercial/exterior/amutha surabi resto bar/photo_2025-11-11_19-56-09.jpg",
  },
  {
    slug: "murugan-hospital",
    name: "Murugan Hospital",
    location: "Chennai",
    category: "exterior",
    sector: "commercial",
    year: "2025",
    description:
      "A clinical commercial building designed for clarity, access, and daily ease of movement.",
    image:
      "/gallery-2/commercial/exterior/murugan hospital/ChatGPT Image Sep 29, 2026, 01_59_43 PM.png",
    thumb:
      "/gallery-2/commercial/exterior/murugan hospital/ChatGPT Image Sep 29, 2026, 01_59_43 PM.png",
  },
  {
    slug: "vardha-resort",
    name: "Vardha Resort",
    location: "Tamil Nadu",
    category: "exterior",
    sector: "commercial",
    year: "2025",
    description:
      "A hospitality exterior project with a layered arrival experience and a softened landscape edge.",
    image: "/gallery-2/commercial/exterior/vardha resort/elevation.png",
    thumb: "/gallery-2/commercial/exterior/vardha resort/elevation.png",
    gallery: [
      "/gallery-2/commercial/exterior/vardha resort/gate.png",
    ],
  },
  {
    slug: "amudha-surabi-cafe",
    name: "Amudha Surabi Cafe",
    location: "Chennai",
    category: "interior",
    sector: "commercial",
    year: "2025",
    description:
      "A hospitality interior shaped by warmth, rhythm, and a strong visual identity.",
    image:
      "/gallery-2/commercial/interior/amudhasurabi  cafe/amudhasurabi cafe render.png",
    thumb:
      "/gallery-2/commercial/interior/amudhasurabi  cafe/amudhasurabi cafe render.png",
  },
  {
    slug: "deva-residence-rain-bownagar",
    name: "Deva Residence, Rain Bownagar",
    location: "Chennai",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "A residential exterior shaped by a strong front elevation, light, and contextual materiality.",
    image: "/gallery-2/residential/exterior/deva residence rain bownagar/1.jpg",
    thumb: "/gallery-2/residential/exterior/deva residence rain bownagar/1.jpg",
    gallery: [
      "/gallery-2/residential/exterior/deva residence rain bownagar/2.jpg",
      "/gallery-2/residential/exterior/deva residence rain bownagar/3.jpg",
      "/gallery-2/residential/exterior/deva residence rain bownagar/4.jpg",
    ],
  },
  {
    slug: "guru-nagar-residence",
    name: "Guru Nagar Residence",
    location: "Chennai",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "A modern residence harmonised with the street edge and a warm, tropical palette.",
    image:
      "/gallery-2/residential/exterior/guru nagar residence/photo_2025-12-26_19-40-05.jpg",
    thumb:
      "/gallery-2/residential/exterior/guru nagar residence/photo_2025-12-26_19-40-05.jpg",
    gallery: [
      "/gallery-2/residential/exterior/guru nagar residence/photo_2025-12-26_19-40-05 (2).jpg",
      "/gallery-2/residential/exterior/guru nagar residence/photo_2025-12-26_19-40-05 (3).jpg",
      "/gallery-2/residential/exterior/guru nagar residence/photo_2025-12-26_19-40-05 (4).jpg",
    ],
  },
  {
    slug: "essai-residence",
    name: "Essai Residence",
    location: "Chennai",
    category: "interior",
    sector: "residential",
    year: "2025",
    description:
      "A residence refined through calm interiors, layered textures, and naturally lit living spaces.",
    image: "/gallery-2/residential/interior/essai residence/1.png",
    thumb: "/gallery-2/residential/interior/essai residence/1.png",
    gallery: [
      "/gallery-2/residential/interior/essai residence/2.png",
      "/gallery-2/residential/interior/essai residence/3.png",
      "/gallery-2/residential/interior/essai residence/4.png",
      "/gallery-2/residential/interior/essai residence/5.png",
      "/gallery-2/residential/interior/essai residence/6.png",
      "/gallery-2/residential/interior/essai residence/7.png",
      "/gallery-2/residential/interior/essai residence/8.png",
    ],
  },
  {
    slug: "terrace-garden",
    name: "Terrace Garden",
    location: "Chennai",
    category: "interior",
    sector: "residential",
    year: "2025",
    description:
      "An outdoor living experience designed for green relief, shade, and relaxed everyday use.",
    image: "/gallery-2/residential/interior/terrace garden/photo_2025-11-11_19-56-09 (2).jpg",
    thumb: "/gallery-2/residential/interior/terrace garden/photo_2025-11-11_19-56-09 (2).jpg",
    gallery: [
      "/gallery-2/residential/interior/terrace garden/photo_2025-11-11_19-56-09 (6).jpg",
    ],
  },
  {
    slug: "ram-kumar-residence",
    name: "Ram Kumar Residence",
    location: "Chennai",
    category: "interior",
    sector: "residential",
    year: "2025",
    description:
      "A family living space brought together through a measured material palette and practical comfort.",
    image:
      "/gallery-2/residential/interior/ram kumar residence/hall/3_PDFsam_ram kumar.jpg",
    thumb:
      "/gallery-2/residential/interior/ram kumar residence/hall/3_PDFsam_ram kumar.jpg",
    gallery: [
      "/gallery-2/residential/interior/ram kumar residence/hall/4_PDFsam_ram kumar.jpg",
      "/gallery-2/residential/interior/ram kumar residence/hall/5_PDFsam_ram kumar.jpg",
      "/gallery-2/residential/interior/ram kumar residence/hall/6_PDFsam_ram kumar.jpg",
      "/gallery-2/residential/interior/ram kumar residence/room/3_5 - Photo.jpg",
      "/gallery-2/residential/interior/ram kumar residence/room/3_6 - Photo.jpg",
      "/gallery-2/residential/interior/ram kumar residence/room/3_7 - Photo.jpg",
    ],
  },
  {
    slug: "villa-residence",
    name: "Villa Residence",
    location: "Chennai",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "A residence where the day-view volume and landscape framing establish the overall character.",
    image: "/gallery-2/residential/exterior/villa residence/option 1 day view.png",
    thumb: "/gallery-2/residential/exterior/villa residence/option 1 day view.png",
    gallery: [
      "/gallery-2/residential/exterior/villa residence/option 2 day view.png",
    ],
  },
  {
    slug: "club-mahindra",
    name: "Club Mahindra",
    location: "Tamil Nadu",
    category: "interior",
    sector: "commercial",
    year: "2025",
    description:
      "Commercial interiors developed across cabins, conference rooms, and work stations with a consistent hospitality-focused material language.",
    image:
      "/gallery-2/commercial/interior/club mhindra/cabins/1_10 - Photo.jpg",
    thumb:
      "/gallery-2/commercial/interior/club mhindra/cabins/1_10 - Photo.jpg",
    gallery: [
      "/gallery-2/commercial/interior/club mhindra/cabins/1_11 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/1_12 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/1_13 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/1_15 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/1_16 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/1_17 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/1_18 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/2_1 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/cabins/2_2 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 1/1_1 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 1/1_2 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 1/1_3 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 1/1_4 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 1/1_5 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 1/1_6 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 2/1_2 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 2/1_3 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 2/1_4 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 2/1_5 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/conference room/option 2/1_6 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 1/1_14 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 1/1_7 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 1/1_8 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 1/1_9 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 2/2_3 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 2/2_4 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 2/2_5 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 2/2_6 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 2/2_7 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 2/2_8 - Photo.jpg",
      "/gallery-2/commercial/interior/club mhindra/work station/work staion 2/2_9 - Photo.jpg",
    ],
  },
  {
    slug: "cazy-st-french-elevation",
    name: "Cazy St French Elevation",
    location: "Tamil Nadu",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "A French-inspired residential elevation composed around balcony proportions, classical detailing, and a balanced facade.",
    image:
      "/gallery-2/residential/exterior/cazy st french elevation/gazar st front elevation.png",
    thumb:
      "/gallery-2/residential/exterior/cazy st french elevation/gazar st front elevation.png",
    gallery: [
      "/gallery-2/residential/exterior/cazy st french elevation/gazar st front elevation 2.png",
      "/gallery-2/residential/exterior/cazy st french elevation/gazar st balcony.png",
    ],
  },
  {
    slug: "doctor-villa-redyarpallayam",
    name: "Doctor Villa, Redyarpallayam",
    location: "Redyarpallayam",
    category: "exterior",
    sector: "residential",
    year: "2026",
    description:
      "A contemporary villa exterior resolved for a clear street elevation and a calm, composed day-view presence.",
    image:
      "/gallery-2/residential/exterior/doctor villa redyarpallayam/day render.png",
    thumb:
      "/gallery-2/residential/exterior/doctor villa redyarpallayam/day render.png",
  },
  {
    slug: "guna-residence",
    name: "Guna Residence",
    location: "Tamil Nadu",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "A modern residential facade with strong volumetric balance, filtered shade, and a restrained material palette.",
    image:
      "/gallery-2/residential/exterior/guna residence/photo_2025-11-11_19-56-09 (5).jpg",
    thumb:
      "/gallery-2/residential/exterior/guna residence/photo_2025-11-11_19-56-09 (5).jpg",
  },
  {
    slug: "hari-residence",
    name: "Hari Residence",
    location: "Tamil Nadu",
    category: "exterior",
    sector: "residential",
    year: "2026",
    description:
      "A sculptural contemporary residence shaped by generous openings, layered planes, and confident facade geometry.",
    image:
      "/gallery-2/residential/exterior/hari  residence/ChatGPT Image Jul 6, 2026, 01_58_54 AM.png",
    thumb:
      "/gallery-2/residential/exterior/hari  residence/ChatGPT Image Jul 6, 2026, 01_58_54 AM.png",
  },
  {
    slug: "mahavar-nagar-residence",
    name: "Mahavar Nagar Residence",
    location: "Lawspet",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "A Lawspet residence presented through two facade studies with contrasting light, massing, and framing.",
    image:
      "/gallery-2/residential/exterior/mahavar nagar residence at lawspet/day view (2).png",
    thumb:
      "/gallery-2/residential/exterior/mahavar nagar residence at lawspet/day view (2).png",
    gallery: [
      "/gallery-2/residential/exterior/mahavar nagar residence at lawspet/DAY VIEW (3).png",
    ],
  },
  {
    slug: "mailam-elevation",
    name: "Mailam Elevation",
    location: "Mailam",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "A collection of residential facade directions exploring glass balconies, neoclassical proportions, steel railings, and tropical forms.",
    image:
      "/gallery-2/residential/exterior/mailam elevation/Modern Glass-Balcony Residency at Twilight.png",
    thumb:
      "/gallery-2/residential/exterior/mailam elevation/Modern Glass-Balcony Residency at Twilight.png",
    gallery: [
      "/gallery-2/residential/exterior/mailam elevation/Modern Neoclassical Residency at Sunset (1).png",
      "/gallery-2/residential/exterior/mailam elevation/Modern Residence with Stainless Steel Railings.png",
      "/gallery-2/residential/exterior/mailam elevation/Modern Tropical Residence Exterior (1).png",
    ],
  },
  {
    slug: "essai-residence-exterior",
    name: "Essai Residence Exterior",
    location: "Chennai",
    category: "exterior",
    sector: "residential",
    year: "2025",
    description:
      "The exterior expression of Essai Residence, with layered volumes and a measured contemporary facade.",
    image: "/gallery-2/residential/exterior/essai residence/1.png",
    thumb: "/gallery-2/residential/exterior/essai residence/1.png",
    gallery: [
      "/gallery-2/residential/exterior/essai residence/2.png",
      "/gallery-2/residential/exterior/essai residence/3.png",
    ],
  },
  {
    slug: "ram-kumar-residence-exterior",
    name: "Ram Kumar Residence Exterior",
    location: "Chennai",
    category: "exterior",
    sector: "residential",
    year: "2026",
    description:
      "A residential exterior developed around the site's proportions, opening rhythm, and a clear front elevation.",
    image:
      "/gallery-2/residential/exterior/ram kumar residence/WhatsApp Image 2026-11-13 at 10.46.01 PM.jpeg",
    thumb:
      "/gallery-2/residential/exterior/ram kumar residence/WhatsApp Image 2026-11-13 at 10.46.01 PM.jpeg",
  },
];

export const homeCarouselSlugs = [
  "amutha-surabi-resto-bar",
  "vardha-resort",
  "deva-residence-rain-bownagar",
  "essai-residence",
  "murugan-hospital",
];

export const homeFeaturedSlugs = [
  "amutha-surabi-resto-bar",
  "vardha-resort",
  "essai-residence",
  "deva-residence-rain-bownagar",
  "murugan-hospital",
  "amudha-surabi-cafe",
];

/** Every photo of a project, cover first. */
export function projectImages(project: Project): string[] {
  return [...new Set([project.image, ...(project.gallery ?? [])])];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export type ServiceIcon =
  | "architecture"
  | "interior"
  | "landscape"
  | "construction"
  | "planning"
  | "visualisation";

export interface Service {
  /** Shown above the card, as in the numbered grid. */
  num: string;
  name: string;
  description: string;
  icon: ServiceIcon;
}

export const services: Service[] = [
  {
    num: "01",
    name: "Architectural Design & Drawing",
    description:
      "Buildings that earn their place — sited to the light and the street, planned around how people actually move, and detailed so they age well. We work across private homes, workplaces, and cultural and institutional projects, from first sketch to the drawings a contractor builds from.",
    icon: "architecture",
  },
  {
    num: "02",
    name: "Interior Design",
    description:
      "Rooms resolved to the same standard as the shell that holds them. Layout, light, materials, joinery and furniture are drawn together rather than applied afterwards, so the interior reads as part of the architecture and not a layer added at the end.",
    icon: "interior",
  },
  {
    num: "03",
    name: "Landscape Design",
    description:
      "Ground, planting and water treated as architecture rather than decoration. Courtyards, terraces and thresholds are shaped to soften a building against the South Indian climate — shade where it is needed, breeze drawn through, and planting chosen to thrive locally.",
    icon: "landscape",
  },
  {
    num: "04",
    name: "Planning & Feasibility",
    description:
      "The work before the design. Site appraisal, massing studies, regulatory review and honest cost and programme advice, so a brief is tested against what the site, the approvals and the budget will genuinely allow before commitments are made.",
    icon: "planning",
  },
  {
    num: "05",
    name: "3D Models & Visualisation",
    description:
      "Photoreal images, walkthroughs and physical models made during design, not after it. Seeing a scheme in material and daylight is how clients make confident decisions — and how we catch what a plan and section alone will not reveal.",
    icon: "visualisation",
  },
  {
    num: "06",
    name: "Execution & Handover",
    description:
      "Design and delivery under one roof. We tender, appoint and coordinate the trades, hold the programme and the budget, and stay on site through the work — so responsibility for what gets built sits with the people who drew it.",
    icon: "construction",
  },
];

export interface ProcessStep {
  num: string;
  name: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    name: "Consultation & Requirement Analysis",
    description:
      "We begin by listening. Site visits, long conversations, and a careful read of how you actually live or work — the light you wake up to, the rooms you avoid, the way a family or a team moves through a day. Nothing is drawn until the brief has been earned, understood, refined, and thoughtfully shaped.",
  },
  {
    num: "02",
    name: "Design & Development",
    description:
      "Concepts take shape as sketches, models, and material boards, then are tested against sun path, structure, and budget. We work through several schemes rather than defending the first, refining plan and section until the idea holds from the street down to a door handle.",
  },
  {
    num: "03",
    name: "Execution & Coordination",
    description:
      "Drawings become a building. We stay on site through the work, coordinating contractors, checking every pour and joint, and resolving the details that only reveal themselves once the structure is standing. Material honesty is protected here or it is lost, through careful execution and attention.",
  },
  {
    num: "04",
    name: "Deliver",
    description:
      "Snagging, finishes, and a full handover — every system explained, every drawing archived. We return after the first season to see how the space has settled and how you have made it your own, because a building is only finished once it is lived in, loved, truly experienced, and cherished daily.",
  },
];

export interface Value {
  num: string;
  name: string;
  description: string;
}

export const values: Value[] = [
  {
    num: "01",
    name: "Restraint",
    description:
      "We add nothing that does not serve the whole. Every element earns its place.",
  },
  {
    num: "02",
    name: "Material Honesty",
    description:
      "We use materials for what they are, not what they can be made to resemble.",
  },
  {
    num: "03",
    name: "Context",
    description:
      "Architecture that belongs — to its site, its climate, its culture, its time.",
  },
  {
    num: "04",
    name: "Longevity",
    description:
      "We design for decades, not for trends. Beauty that deepens with age.",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

export const team: TeamMember[] = [
  {
    name: "Ananya Krishnamurthy",
    role: "Founding Principal",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop&crop=face",
  },
  {
    name: "Rohan Desai",
    role: "Design Director",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face",
  },
  {
    name: "Meera Pillai",
    role: "Interior Lead",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&fit=crop&crop=face",
  },
  {
    name: "Vikram Iyer",
    role: "Project Manager",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop&crop=face",
  },
];

export interface Testimonial {
  quote: string;
  author: string;
  /** Project and city, shown under the author's name. */
  project: string;
  /** Still shown before playback. */
  poster: string;
  /**
   * PLACEHOLDER. Stock clips standing in until the real client interviews are
   * filmed — swap these for self-hosted files under /public and add a WebM
   * source alongside each MP4.
   */
  video: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Forma transformed not just our home, but the way we live in it. Every corner holds intention.",
    author: "Priya & Arjun Mehta",
    project: "Meridian House, Chennai",
    poster:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&fit=crop",
    video: "https://mdn.github.io/shared-assets/videos/flower.mp4",
  },
  {
    quote:
      "They listened before they drew. What came back was the brief we could not articulate ourselves.",
    author: "Kavitha Raghavan",
    project: "The Loft Collection, Bengaluru",
    poster:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200&q=80&fit=crop",
    video: "https://mdn.github.io/shared-assets/videos/friday.mp4",
  },
  {
    quote:
      "Sixteen months, no surprises. The detailing is what we notice now — and it still surprises us.",
    author: "Sanjay Nair",
    project: "Studio Norte, Kochi",
    poster:
      "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=1200&q=80&fit=crop",
    video:
      "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
  },
];

export interface Stat {
  /** Counted up to from zero when the band scrolls into view. */
  value: number;
  suffix?: string;
  label: string;
}

/**
 * Years and project count follow the copy elsewhere on the site ("over sixteen
 * years", "across sixty-four projects"). The floor area and city count are
 * placeholders — confirm them before this goes live.
 */
export const stats: Stat[] = [
  { value: 5, suffix: "+", label: "Years of Practice" },
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 1000000, suffix: "+", label: "Sq Ft Designed" },
  { value: 9, label: "Cities Across South India" },
];

export interface Client {
  name: string;
  /** Optional wordmark. Falls back to the name set in the display face. */
  logo?: string;
}

/**
 * PLACEHOLDER NAMES. Invented stand-ins so the strip reads correctly before
 * real clients are confirmed — replace them, and add `logo` paths (drop the
 * files in public/clients) once artwork is available.
 */
export const clients: Client[] = [
  { name: "Thillai Developers", logo: "/clients/thillai-developers.svg" },
  { name: "Coromandel Estates", logo: "/clients/coromandel-estates.svg" },
  { name: "Nilaya Hospitality", logo: "/clients/nilaya-hospitality.svg" },
  { name: "Kadamba Trust", logo: "/clients/kadamba-trust.svg" },
  { name: "Ashvin Realty", logo: "/clients/ashvin-realty.svg" },
  { name: "Suvarna Group", logo: "/clients/suvarna-group.svg" },
];

/**
 * The studio's contact details, in one place: the contact dialog and the
 * footer both read from here, so a change only has to be made once.
 */
export const studio = {
  email: "hello@forma.studio",
  phone: "+91 98400 00000",
  phoneHref: "tel:+919840000000",
  whatsappHref: "https://wa.me/919840000000",
  address: [
    "42 Adyar Bridge Road",
    "Adyar, Chennai — 600020",
    "Tamil Nadu, India",
  ],
  hours: "Mon – Fri, 9am – 6pm",
};

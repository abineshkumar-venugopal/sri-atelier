export type ProjectCategory = "interior" | "exterior" | "construction";

export interface Project {
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  year: string;
  description: string;
  image: string;
  thumb: string;
}

export const projects: Project[] = [
  {
    slug: "meridian-house",
    name: "Meridian House",
    location: "Chennai",
    category: "exterior",
    year: "2023",
    description:
      "A private residence perched on a hillside, designed around views, breezes, and the rhythms of natural light.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80&fit=crop",
  },
  {
    slug: "the-loft-collection",
    name: "The Loft Collection",
    location: "Bengaluru",
    category: "interior",
    year: "2023",
    description:
      "A series of curated apartment interiors, each distinct in character while united by an ethos of calm restraint.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&fit=crop",
  },
  {
    slug: "studio-norte",
    name: "Studio Norte",
    location: "Pondicherry",
    category: "construction",
    year: "2023",
    description:
      "A creative studio and residence for a sculptor, built in hand-laid stone and raw concrete.",
    image:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=900&q=80&fit=crop",
  },
  {
    slug: "villa-serena",
    name: "Villa Serena",
    location: "Coimbatore",
    category: "interior",
    year: "2023",
    description:
      "A sprawling family home interior defined by natural stone, handwoven textiles, and filtered tropical light.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&fit=crop",
  },
  {
    slug: "the-obsidian-tower",
    name: "The Obsidian Tower",
    location: "Chennai",
    category: "exterior",
    year: "2023",
    description:
      "A mixed-use commercial tower clad in dark granite, its angular facade responding to the city grid below.",
    image:
      "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=900&q=80&fit=crop",
  },
  {
    slug: "casa-mira",
    name: "Casa Mira",
    location: "Mysuru",
    category: "construction",
    year: "2023",
    description:
      "A weekend retreat built for serenity — low, long, and embedded in the landscape it inhabits.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80&fit=crop",
  },
  {
    slug: "the-garden-flat",
    name: "The Garden Flat",
    location: "Chennai",
    category: "interior",
    year: "2023",
    description:
      "A compact city apartment transformed by light, texture, and a rigorous restraint that makes space feel infinite.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=80&fit=crop",
  },
  {
    slug: "lighthouse-pavilion",
    name: "Lighthouse Pavilion",
    location: "Mahabalipuram",
    category: "exterior",
    year: "2023",
    description:
      "A coastal cultural pavilion designed to disappear into the horizon — glass, concrete, and open sky.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&fit=crop",
  },
  {
    slug: "the-clay-house",
    name: "The Clay House",
    location: "Auroville",
    category: "construction",
    year: "2023",
    description:
      "An earthen architecture experiment — rammed earth walls, passive cooling, and a deep respect for the site.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&q=85&fit=crop",
    thumb:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80&fit=crop",
  },
];

export const homeCarouselSlugs = [
  "meridian-house",
  "the-obsidian-tower",
  "villa-serena",
  "the-loft-collection",
  "studio-norte",
];

export const homeFeaturedSlugs = [
  "meridian-house",
  "the-loft-collection",
  "studio-norte",
  "villa-serena",
  "the-obsidian-tower",
  "casa-mira",
];

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
    name: "Architectural Design",
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
    name: "Turnkey Construction",
    description:
      "Design and delivery under one roof. We tender, appoint and coordinate the trades, hold the programme and the budget, and stay on site through the work — so responsibility for what gets built sits with the people who drew it.",
    icon: "construction",
  },
  {
    num: "05",
    name: "Planning & Feasibility",
    description:
      "The work before the design. Site appraisal, massing studies, regulatory review and honest cost and programme advice, so a brief is tested against what the site, the approvals and the budget will genuinely allow before commitments are made.",
    icon: "planning",
  },
  {
    num: "06",
    name: "Visualisation",
    description:
      "Photoreal images, walkthroughs and physical models made during design, not after it. Seeing a scheme in material and daylight is how clients make confident decisions — and how we catch what a plan and section alone will not reveal.",
    icon: "visualisation",
  },
];

export interface ProcessStep {
  num: string;
  name: string;
  description: string;
  /** Shown opposite the heading on the process timeline. */
  image: string;
  imageAlt: string;
}

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    name: "Consultation",
    description:
      "We begin by listening. Site visits, long conversations, and a careful read of how you actually live or work — the light you wake up to, the rooms you avoid, the way a family or a team moves through a day. Nothing is drawn until the brief has been earned.",
    image:
      "/process/consultation.png",
    imageAlt: "The consultation stage of a Sri Atelier project",
  },
  {
    num: "02",
    name: "Design",
    description:
      "Concepts take shape as sketches, models, and material boards, then are tested against sun path, structure, and budget. We work through several schemes rather than defending the first, refining plan and section until the idea holds from the street down to a door handle.",
    image:
      "/process/design.png",
    imageAlt: "The design stage of a Sri Atelier project",
  },
  {
    num: "03",
    name: "Build",
    description:
      "Drawings become a building. We stay on site through the work, coordinating contractors, checking every pour and joint, and resolving the details that only reveal themselves once the structure is standing. Material honesty is protected here or it is lost.",
    image:
      "/process/build.png",
    imageAlt: "The build stage of a Sri Atelier project",
  },
  {
    num: "04",
    name: "Deliver",
    description:
      "Snagging, finishes, and a full handover — every system explained, every drawing archived. We return after the first season to see how the space has settled and how you have made it your own, because a building is only finished once it is lived in.",
    image:
      "/process/deliver.png",
    imageAlt: "The deliver stage of a Sri Atelier project",
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
    description: "We design for decades, not for trends. Beauty that deepens with age.",
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
  { value: 16, label: "Years of Practice" },
  { value: 64, suffix: "+", label: "Projects Delivered" },
  { value: 1200000, suffix: "+", label: "Sq Ft Designed" },
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

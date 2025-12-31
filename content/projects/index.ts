export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "nhl-app",
    title: "NHL Scorecast",
    description: "A live scoreboard for the NHL, featuring real-time scores, game summaries, live win probabilities, and player statistics.",
    tags: ["Python", "Redis", "React.js", "PostgreSQL", "Docker", "NumPy", "scikit-learn", "FastAPI"],
    link: "https://example.com",
    github: "https://github.com/alexkm13/nhl-app",
    featured: true,
  },
  {
    slug: "bu-bus-app",
    title: "Better Terrier Transit",
    description: "A mobile app for the Boston University's bus system, featuring real-time bus locations and route information.",
    tags: ["Swift", "Python", "Flask"],
    link: "https://example.com",
    github: "https://github.com/alexkm13/bu-bus-app",
    featured: true,
  },
  {
    slug: "topo-trader",
    title: "Alex's Quant Trader",
    description: "A quant trading bot that uses graph diffusion and topological data analysis (TDA) for alpha generation to make trading decisions.",
    tags: ["Python", "NumPy", "SciPy", "PostgreSQL", "scikit-learn"],
    link: "https://example.com",
    github: "https://github.com/alexkm13/topo-trader",
    featured: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getAllProjects(): Project[] {
  return projects;
}

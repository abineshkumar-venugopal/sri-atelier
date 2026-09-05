"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import ProjItem from "@/components/ProjItem";
import { projects, type ProjectCategory } from "@/lib/data";

const filters: { key: "all" | ProjectCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "interior", label: "Interior" },
  { key: "exterior", label: "Exterior" },
  { key: "construction", label: "Construction" },
];

const itemDelays = [undefined, 1, 2, undefined, 1, 2, undefined, 1] as const;

export default function ProjectsPage() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  return (
    <>
      <div className="projects-hero">
        <Reveal as="h1" className="projects-page-title">
          Our
          <br />
          Projects
        </Reveal>
        <Reveal as="div" className="projects-count">
          {projects.length} Completed Works
        </Reveal>
      </div>

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${active === f.key ? " is-active" : ""}`}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="projects-full-grid">
        {projects.map((project, i) => (
          <ProjItem
            key={project.slug}
            project={project}
            delay={itemDelays[i]}
            hidden={active !== "all" && project.category !== active}
          />
        ))}
      </div>
    </>
  );
}

"use client";

import { useState } from "react";

import Reveal from "@/components/Reveal";
import ProjItem from "@/components/ProjItem";
import { cn } from "@/lib/utils";
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
      <div className="flex items-end justify-between border-b border-mist px-6 pt-40 pb-20 md:px-15">
        <Reveal
          as="h1"
          className="font-display text-[clamp(4rem,8vw,8rem)] font-light leading-[0.9] tracking-[-0.02em]"
        >
          Our
          <br />
          Projects
        </Reveal>
        <Reveal
          as="div"
          className="self-end pb-3 text-[0.75rem] uppercase tracking-[0.15em] text-ash"
        >
          {projects.length} Completed Works
        </Reveal>
      </div>

      <div className="flex overflow-x-auto border-b border-mist px-6 md:px-15">
        {filters.map((f) => (
          <button
            key={f.key}
            data-active={active === f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              // The ::after is the active/hover underline, inset by the padding.
              "relative shrink-0 px-8 py-6 text-label uppercase tracking-[0.18em] text-ash transition-all duration-300 hover:text-ink",
              "after:absolute after:inset-x-8 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 after:ease-forma",
              "data-[active=true]:text-ink data-[active=true]:after:scale-x-100"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-0.5 p-0.5 md:grid-cols-3">
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

import Link from "next/link";
import { ArrowRightIcon, ChevronLeft } from "lucide-react";

import Reveal from "@/components/Reveal";
import ProjectGallery from "@/components/ProjectGallery";
import { Button } from "@/components/ui/button";
import {
  categoryLabels,
  sectorLabels,
  projectImages,
  type Project,
} from "@/lib/data";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-ash/35 pt-5">
      <span className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink">
        {label}
      </span>
      <span className="text-[0.78rem] uppercase tracking-[0.12em] text-ash">
        {value}
      </span>
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <div className="relative px-6 pt-20 pb-10 md:px-15 md:pt-28 md:pb-12">
        <Button
          asChild
          variant="bordered"
          size="icon"
          className="absolute left-6 top-6 z-20 rounded-full md:left-15 md:top-8"
        >
          <Link href="/projects" aria-label="Back to projects">
            <ChevronLeft aria-hidden="true" />
          </Link>
        </Button>
        <Reveal
          as="h1"
          className="max-w-[1100px] font-sans text-[clamp(2.7rem,5.4vw,5.25rem)] font-light leading-none uppercase tracking-[-0.03em] text-ink"
        >
          Project Detail
        </Reveal>
        <nav
          aria-label="Breadcrumb"
          className="mt-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em]"
        >
          <Link href="/" className="text-terracotta transition-colors hover:text-terracotta-dark">
            Home
          </Link>
          <ArrowRightIcon aria-hidden="true" className="size-3.5 text-terracotta" />
          <Link href="/projects" className="text-terracotta transition-colors hover:text-terracotta-dark">
            Projects
          </Link>
          <ArrowRightIcon aria-hidden="true" className="size-3.5 text-terracotta" />
          <span className="truncate text-ash">{project.name}</span>
        </nav>
      </div>
      <div className="relative">
        <ProjectGallery images={projectImages(project)} name={project.name}>
          <div className="px-6 py-14 md:px-[15%] md:py-20">
            <h2 className="mb-8 font-sans text-[clamp(2rem,3vw,3.25rem)] font-light uppercase tracking-[-0.02em] text-ink">
              {project.name}
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-[0.95rem] leading-[1.9] text-ash">
                {project.description}
              </p>
              <p className="text-[0.95rem] leading-[1.9] text-ash">
                The design brings together proportion, material, and light to
                create a clear and enduring architectural experience, shaped
                around the way the space is lived and used.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
              <MetaItem label="Location" value={project.location} />
              <MetaItem
                label="Services"
                value={`${sectorLabels[project.sector]} · ${categoryLabels[project.category]}`}
              />
              <MetaItem label="Year" value={String(project.year)} />
              <MetaItem label="Sector" value={sectorLabels[project.sector]} />
            </div>
          </div>
        </ProjectGallery>
      </div>
    </>
  );
}

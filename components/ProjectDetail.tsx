import Image from "next/image";

import { categoryLabels, sectorLabels, type Project } from "@/lib/data";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="mb-1.5 block text-micro uppercase tracking-[0.2em] text-ash">
        {label}
      </span>
      <span className="font-display text-[1.1rem] capitalize">{value}</span>
    </div>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          sizes="100vw"
          preload
        />
      </div>
      <div className="p-6 md:p-15">
        <div className="mb-14 grid grid-cols-2 gap-10 border-b border-mist pb-10 md:grid-cols-4">
          <MetaItem label="Project" value={project.name} />
          <MetaItem label="Location" value={project.location} />
          <MetaItem
            label="Type"
            value={`${sectorLabels[project.sector]} · ${categoryLabels[project.category]}`}
          />
          <MetaItem label="Year" value={String(project.year)} />
        </div>
        <p className="max-w-170 font-display text-[1.3rem] font-light leading-[1.7] text-ash">
          {project.description}
        </p>
      </div>
    </>
  );
}

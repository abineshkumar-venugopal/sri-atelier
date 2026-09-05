import Image from "next/image";
import type { Project } from "@/lib/data";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <>
      <div className="proj-detail-hero">
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover"
          sizes="100vw"
          preload
        />
      </div>
      <div className="proj-detail-body">
        <div className="proj-detail-meta">
          <div className="proj-meta-item">
            <label>Project</label>
            <span>{project.name}</span>
          </div>
          <div className="proj-meta-item">
            <label>Location</label>
            <span>{project.location}</span>
          </div>
          <div className="proj-meta-item">
            <label>Type</label>
            <span className="capitalize">{project.category}</span>
          </div>
          <div className="proj-meta-item">
            <label>Year</label>
            <span>{project.year}</span>
          </div>
        </div>
        <p className="proj-detail-desc">{project.description}</p>
      </div>
    </>
  );
}

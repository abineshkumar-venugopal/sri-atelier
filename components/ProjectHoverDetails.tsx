import { MapPinIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { categoryLabels, sectorLabels, type Project } from "@/lib/data";

/**
 * The details that appear over a project image on hover: sector and type, the
 * name, and where it is. Nothing shows until then, so the photograph reads on
 * its own.
 *
 * Used by every project image on the site so they all say the same things in
 * the same way. The image's wrapper must carry `group`. When that wrapper is a
 * link, the details also show on keyboard focus, so they are not mouse-only.
 * The text stays in the page while hidden, so screen readers still get it.
 */
export default function ProjectHoverDetails({
  project,
  size = "md",
}: {
  project: Project;
  /** `lg` for the wide carousel slides, `md` for grid tiles. */
  size?: "md" | "lg";
}) {
  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 from-0% via-ink/35 via-45% to-transparent p-7 opacity-0 transition-opacity duration-500 ease-forma group-hover:opacity-100 group-focus-visible:opacity-100 md:p-8">
      <div className="translate-y-3 transition-transform duration-500 ease-forma group-hover:translate-y-0 group-focus-visible:translate-y-0">
        <p className="mb-3 text-micro uppercase tracking-[0.2em] text-stone">
          {sectorLabels[project.sector]} / {categoryLabels[project.category]}
        </p>
        <h3
          className={cn(
            "font-display font-light leading-tight text-paper",
            size === "lg" ? "text-[1.75rem]" : "text-[1.4rem]"
          )}
        >
          {project.name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-[0.8rem] tracking-[0.06em] text-stone">
          <MapPinIcon aria-hidden="true" className="size-3.5 text-terracotta-light" />
          {project.location}
        </p>
      </div>
    </div>
  );
}

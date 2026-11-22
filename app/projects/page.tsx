"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import Reveal from "@/components/Reveal";
import ProjItem from "@/components/ProjItem";
import Footer from "@/components/Footer";
import { ContactTrigger } from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projects, sectorLabels, type ProjectSector } from "@/lib/data";

// Filtered by who the building is for, not the kind of work. Built from the
// sector labels, so a new sector gets a filter too.
const filters: { key: "all" | ProjectSector; label: string }[] = [
  { key: "all", label: "All" },
  ...(Object.entries(sectorLabels) as [ProjectSector, string][]).map(
    ([key, label]) => ({ key, label })
  ),
];

const itemDelays = [undefined, 1, 2, undefined, 1, 2, undefined, 1] as const;

export default function ProjectsPage() {
  const [active, setActive] = useState<"all" | ProjectSector>("all");

  return (
    <>
      <div className="px-6 pt-35 pb-15 md:px-15 md:pt-45 md:pb-24">
        <Reveal
          as="h1"
          className="font-sans text-[clamp(2.75rem,5.4vw,5.25rem)] font-light leading-none uppercase tracking-[-0.03em]"
        >
          Our Projects
        </Reveal>
        <nav aria-label="Breadcrumb" className="mt-8 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em]">
          <Link href="/" className="text-terracotta transition-colors duration-300 hover:text-terracotta-dark">
            Home
          </Link>
          <ArrowRightIcon aria-hidden="true" className="size-3.5 text-terracotta" />
          <span className="text-ash">Projects</span>
        </nav>
      </div>

      <div className="flex overflow-x-auto border-t border-fog px-6 md:px-15">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            data-active={active === f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              "relative shrink-0 px-0 py-5 pr-10 text-[0.72rem] uppercase tracking-[0.16em] text-ash transition-colors duration-300 hover:text-ink",
              "after:absolute after:inset-x-0 after:right-10 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 after:ease-forma",
              "data-[active=true]:text-ink data-[active=true]:after:scale-x-100"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 px-6 py-12 md:grid-cols-2 md:gap-8 md:px-15 md:py-16">
        {projects.map((project, i) => (
          <ProjItem
            key={project.slug}
            project={project}
            delay={itemDelays[i]}
            hidden={active !== "all" && project.sector !== active}
          />
        ))}
      </div>

      <section className="relative mt-8 min-h-[520px] overflow-hidden md:min-h-[560px]">
        <Image
          src="/gallery-2/residential/interior/ram kumar residence/hall/3_PDFsam_ram kumar.jpg"
          alt="Warm contemporary living interior"
          fill
          sizes="100vw"
          className="object-cover"
          preload
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(42_38_34/72%)_0%,rgb(42_38_34/48%)_48%,rgb(42_38_34/18%)_100%)]" />
        <div className="relative z-[1] flex min-h-[520px] flex-col justify-center px-10 py-16 md:min-h-[560px] md:px-15">
          <Reveal
            as="h2"
            className="max-w-[760px] font-sans text-[clamp(2.25rem,4.7vw,5rem)] font-light leading-[1.12] uppercase text-paper"
          >
            Transforming Visions
            <br />
            into Exceptional Spaces
          </Reveal>
          <Reveal
            as="p"
            delay={1}
            className="mt-10 max-w-xl text-[0.95rem] leading-[1.85] text-stone"
          >
            At Sri Atelier, we believe great design goes beyond aesthetics. We
            create inspiring spaces that blend creativity, functionality, and
            innovation. From the initial concept to the final execution, our
            team is committed to delivering thoughtfully designed spaces with
            exceptional quality and attention to detail. With Sri Atelier,
            every idea has the potential to become something extraordinary.
          </Reveal>
          <Reveal as="div" delay={2} className="mt-10">
            <ContactTrigger>
              <Button
                variant="light"
                className="rounded-full px-7 py-3 text-[0.72rem] tracking-[0.12em]"
              >
                Contact Us
              </Button>
            </ContactTrigger>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}

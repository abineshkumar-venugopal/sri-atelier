"use client";

import Image from "next/image";
import { useState } from "react";

import Reveal from "@/components/Reveal";
import { eyebrowClass, sectionTitleClass } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const practices = [
  {
    num: "01",
    name: "Architecture",
    description:
      "Buildings shaped around light, climate, movement, and the life that will unfold inside them.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=85&fit=crop",
  },
  {
    num: "02",
    name: "Interior",
    description:
      "Rooms resolved through proportion, material, furniture, and the quiet details people feel every day.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&fit=crop",
  },
  {
    num: "03",
    name: "Landscape",
    description:
      "Outdoor spaces designed as living architecture, bringing shade, planting, water, and weather together.",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=85&fit=crop",
  },
  {
    num: "04",
    name: "Execution",
    description:
      "Close coordination from drawing to site, protecting the idea through every material, trade, and finish.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85&fit=crop",
  },
] as const;

export default function PracticeMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = practices[activeIndex];

  return (
    <section className="bg-paper px-6 py-25 md:px-15">
      <Reveal as="p" className={eyebrowClass}>
        The Practice
      </Reveal>
      <Reveal as="h2" className={sectionTitleClass} delay={1}>
        One idea,
        <br />
        <em>many disciplines.</em>
      </Reveal>

      <div className="mt-14 grid items-stretch gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
        <Reveal direction="up" className="relative h-[420px] overflow-hidden bg-mist md:h-[590px]">
          {practices.map((practice, index) => (
            <Image
              key={practice.name}
              src={practice.image}
              alt={`${practice.name} by SRI ATELIER`}
              fill
              sizes="(max-width: 768px) 100vw, 52vw"
              className={cn(
                "object-cover transition-[opacity,transform] duration-700 ease-forma",
                activeIndex === index
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-[1.04] opacity-0",
              )}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/35 to-transparent" />
          <p className="absolute right-6 bottom-5 font-display text-5xl italic text-paper">
            {active.num}
          </p>
        </Reveal>

        <div className="border-t border-fog">
          {practices.map((practice, index) => {
            const isActive = activeIndex === index;
            return (
              <Reveal
                key={practice.name}
                direction="up"
                delay={index === 0 ? undefined : index === 1 ? 1 : index === 2 ? 2 : 3}
              >
                <button
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={isActive}
                  className="group w-full border-b border-fog py-6 text-left md:py-7"
                >
                  <div className="flex items-start gap-5">
                    <span
                      className={cn(
                        "mt-1 text-micro tracking-[0.16em] transition-colors duration-300",
                        isActive ? "text-terracotta" : "text-ash/55",
                      )}
                    >
                      {practice.num}
                    </span>
                    <div className="flex-1">
                      <span
                        className={cn(
                          "block font-display text-[clamp(1.8rem,3.5vw,3.25rem)] leading-none transition-all duration-500 ease-forma",
                          isActive
                            ? "translate-x-2 italic text-terracotta"
                            : "text-ink group-hover:translate-x-2",
                        )}
                      >
                        {practice.name}
                      </span>
                      <p
                        className={cn(
                          "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-forma",
                          isActive
                            ? "mt-4 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="max-w-md overflow-hidden text-[0.9rem] leading-[1.8] text-ash">
                          {practice.description}
                        </span>
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1 text-xl text-terracotta transition-transform duration-500",
                        isActive ? "rotate-45" : "group-hover:rotate-45",
                      )}
                    >
                      +
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

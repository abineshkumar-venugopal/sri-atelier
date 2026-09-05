import Link from "next/link";
import Image from "next/image";

import Parallax from "@/components/Parallax";
import Carousel from "@/components/Carousel";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import ProcessStepCard from "@/components/ProcessStepCard";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { eyebrowClass, sectionTitleClass } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  projects,
  services,
  processSteps,
  homeCarouselSlugs,
  homeFeaturedSlugs,
} from "@/lib/data";

const carouselItems = homeCarouselSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

const featuredItems = homeFeaturedSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

const serviceDelays = [undefined, 1, 2] as const;
const featuredDelays = [undefined, 1, 2, 3, undefined, 1] as const;
const processDelays = [undefined, 1, 2, 3] as const;

/** Section padding shared by most bands on this page. */
const sectionPadding = "px-6 py-25 md:px-15";

export default function HomePage() {
  return (
    <>
      <section className="relative flex h-screen min-h-175 items-center justify-center overflow-hidden">
        <Parallax
          className="absolute inset-0 h-[115%] will-change-transform"
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&fit=crop"
          alt="Modern architecture"
          mode="scroll"
          factor={0.38}
          preload
          imgClassName="object-[center_30%]"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgb(5_5_5/38%)] to-[rgb(5_5_5/62%)]" />

        <div className="relative z-[2] px-10 text-center text-paper">
          {/* Staggered entrance: each line animates in 200-250ms after the last. */}
          <p className="mb-7 animate-fade-up text-eyebrow uppercase tracking-[0.3em] text-brass opacity-0 [animation-delay:0.3s]">
            Architecture &amp; Design Studio · Est. 2008
          </p>
          <h1 className="mb-7 animate-fade-up font-display text-[clamp(4rem,9vw,9rem)] font-light leading-[0.92] tracking-[-0.02em] opacity-0 [animation-delay:0.5s] [animation-duration:1.1s] max-md:text-[3.5rem]">
            Spaces
            <br />
            that <em className="italic text-brass">define</em>
            <br />
            lives.
          </h1>
          <p className="mb-14 animate-fade-up text-[0.9rem] font-light tracking-[0.05em] text-paper/70 opacity-0 [animation-delay:0.75s]">
            We craft architecture that stands at the intersection of beauty and purpose.
          </p>
          <div className="flex animate-fade-up justify-center gap-4 opacity-0 [animation-delay:1s]">
            <Button asChild variant="light">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/quote">Get Quote</Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 animate-fade-in flex-col items-center gap-2.5 text-micro uppercase tracking-[0.2em] text-paper/50 opacity-0 [animation-delay:1.5s]">
          <span>Scroll</span>
          <div className="h-12.5 w-px animate-scroll-pulse bg-gradient-to-b from-paper/50 to-transparent" />
        </div>
      </section>

      <section className="bg-paper pt-25 pb-20">
        <div className="px-6 md:px-15">
          <Reveal as="p" className={eyebrowClass}>
            Selected Works
          </Reveal>
          <Reveal as="h2" className={sectionTitleClass} delay={1}>
            Recent
            <br />
            Projects
          </Reveal>
        </div>
        <Carousel items={carouselItems} />
      </section>

      <div
        className={cn(
          "grid items-center gap-20 bg-mist px-6 py-25 md:grid-cols-2 md:px-15",
        )}
      >
        <div className="group relative h-115 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fit=crop"
            alt="Forma studio"
            fill
            className="object-cover transition-transform duration-800 ease-forma group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute top-5 right-5 font-display text-[5rem] font-light leading-none text-white/55 [text-shadow:0_2px_20px_rgb(0_0_0/40%)]">
            2008
          </div>
        </div>

        <div>
          <Reveal as="p" className={eyebrowClass}>
            About Forma
          </Reveal>
          <Reveal as="h2" className={sectionTitleClass} delay={1}>
            Design is not
            <br />
            decoration — it is
            <br />
            civilization.
          </Reveal>
          <Reveal as="p" className="mb-5 text-[1.05rem] leading-[1.9] text-ash" delay={2}>
            We are a Chennai-based architecture and design studio with over sixteen years
            of practice. Our work spans residential, commercial, and cultural projects,
            each defined by restraint, material honesty, and a deep understanding of
            place.
          </Reveal>
          <Reveal as="p" className="mb-5 text-[1.05rem] leading-[1.9] text-ash" delay={3}>
            Every project begins with listening — to the site, the client, the light, and
            the land.
          </Reveal>
          <Reveal as="div" delay={4}>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 border-b border-ink pb-0.5 text-[0.75rem] uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:gap-5 hover:border-brass hover:text-brass"
            >
              Our story →
            </Link>
          </Reveal>
        </div>
      </div>

      <section className={cn(sectionPadding, "bg-paper")}>
        <Reveal as="div" className={eyebrowClass}>
          What We Do
        </Reveal>
        <Reveal as="h2" className={sectionTitleClass} delay={1}>
          Services
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-0.5 md:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} delay={serviceDelays[i]} />
          ))}
        </div>
      </section>

      <div className="relative flex h-[60vh] min-h-100 items-center justify-center overflow-hidden">
        <Parallax
          className="absolute -inset-[20%] will-change-transform"
          src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1800&q=80&fit=crop"
          alt="Architecture detail"
          mode="center"
          factor={0.22}
        />
        <div className="absolute inset-0 z-[1] bg-[rgb(8_8_8/65%)]" />
        <Reveal as="div" className="relative z-[2] px-10 text-center text-paper">
          <blockquote className="max-w-200 font-display text-[clamp(2rem,4vw,3.5rem)] font-light italic leading-[1.3]">
            &ldquo;Architecture is the art of how to waste space.&rdquo;
          </blockquote>
          <cite className="mt-6 block text-label uppercase not-italic tracking-[0.2em] text-brass">
            — Philip Johnson
          </cite>
        </Reveal>
      </div>

      <section className={sectionPadding}>
        <Reveal as="p" className={eyebrowClass}>
          Portfolio
        </Reveal>
        <Reveal as="h2" className={sectionTitleClass} delay={1}>
          Featured
          <br />
          Projects
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-0.5 md:grid-cols-3">
          {featuredItems.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={featuredDelays[i]} />
          ))}
        </div>
      </section>

      <section className={cn(sectionPadding, "bg-mist")}>
        <Reveal as="p" className={eyebrowClass}>
          How We Work
        </Reveal>
        <Reveal as="h2" className={sectionTitleClass} delay={1}>
          Our Process
        </Reveal>
        {/* The span is the connector line running behind the numbered circles. */}
        <div className="relative mt-15 grid grid-cols-2 md:grid-cols-4">
          <span
            aria-hidden="true"
            className="absolute inset-x-[10%] top-7 h-px bg-fog"
          />
          {processSteps.map((step, i) => (
            <ProcessStepCard key={step.num} step={step} delay={processDelays[i]} />
          ))}
        </div>
      </section>

      <section className="bg-paper px-6 py-30 text-center md:px-15">
        <div className="mx-auto mb-10 h-px w-10 bg-brass" />
        <Reveal
          as="blockquote"
          className="mx-auto mb-8 max-w-195 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light italic leading-[1.5] text-ink"
        >
          &ldquo;Forma transformed not just our home, but the way we live in it. Every
          corner holds intention.&rdquo;
        </Reveal>
        <Reveal
          as="p"
          className="text-label uppercase tracking-[0.2em] text-brass"
          delay={1}
        >
          Priya &amp; Arjun Mehta — Meridian House, Chennai
        </Reveal>
      </section>

      <div className="relative overflow-hidden bg-ink px-6 py-30 text-center md:px-15">
        {/* Oversized watermark; a real element rather than a ::before so it is
            visible to anyone reading the markup. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[20vw] font-light text-white/3"
        >
          FORMA
        </span>
        <div className="relative z-[1]">
          <Reveal
            as="h2"
            className="mb-12 font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light italic leading-[1.1] text-paper"
          >
            Ready to
            <br />
            <em>build something</em>
            <br />
            extraordinary?
          </Reveal>
          <Reveal as="div" delay={1}>
            <Button asChild variant="accent">
              <Link href="/quote">Get Quote →</Link>
            </Button>
          </Reveal>
        </div>
      </div>

      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";

import Reveal from "@/components/Reveal";
import ValueCard from "@/components/ValueCard";
import TeamCard from "@/components/TeamCard";
import Footer from "@/components/Footer";
import { ContactTrigger } from "@/components/ContactDialog";
import { Button } from "@/components/ui/button";
import { eyebrowClass, sectionTitleClass } from "@/components/ui/typography";
import { values, team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sixteen years of architecture and interior design practice across South India — the story, principles, and team behind SRI ATELIER.",
};

const valueDelays = [undefined, 1, 2, 3] as const;
const teamDelays = [undefined, 1, 2, 3] as const;

export default function AboutPage() {
  return (
    <>
      <div className="relative flex h-[70vh] min-h-125 items-end overflow-hidden px-6 pb-20 md:px-15">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80&fit=crop"
          alt="Architecture studio"
          fill
          className="object-cover"
          sizes="100vw"
          preload
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[rgb(42_38_34/55%)] from-40% to-[rgb(42_38_34/15%)]" />
        <div className="relative z-[2]">
          <p className="mb-5 text-eyebrow uppercase tracking-[0.25em] text-stone">
            Who We Are
          </p>
          <h1 className="font-display text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-[-0.02em] text-paper">
            About
            <br />
            <em className="italic text-terracotta-light">SRI ATELIER</em>
          </h1>
        </div>
      </div>

      <div className="grid items-start gap-20 px-6 py-25 md:grid-cols-[1fr_2fr] md:px-15">
        <div className="sticky top-30 font-display text-[5rem] font-light leading-none text-fog">
          2008
        </div>
        <div>
          <Reveal
            as="p"
            className="mb-8 font-display text-2xl font-light leading-[1.7] text-ink"
          >
            We founded SRI ATELIER with a single belief: that great architecture
            is not about spectacle, but about the quiet intelligence of
            well-considered space.
          </Reveal>
          <Reveal
            as="p"
            className="mb-8 text-base leading-[1.9] text-ash"
            delay={1}
          >
            Over sixteen years and across sixty-four projects, we have worked
            with homeowners, developers, and institutions across South India —
            each commission approached as a singular opportunity to create
            something that will outlast the moment of its making.
          </Reveal>
        </div>
      </div>

      <div className="bg-stone px-6 py-20 md:px-15">
        <p className={eyebrowClass}>Our Principles</p>
        <Reveal as="h2" className={sectionTitleClass}>
          What we
          <br />
          believe in
        </Reveal>
        <div className="mt-13 grid grid-cols-2 md:grid-cols-4">
          {values.map((value, i) => (
            <ValueCard key={value.num} value={value} delay={valueDelays[i]} />
          ))}
        </div>
      </div>

      <div className="px-6 py-25 md:px-15">
        <Reveal as="p" className={eyebrowClass}>
          The People
        </Reveal>
        <Reveal as="h2" className={sectionTitleClass} delay={1}>
          Our Team
        </Reveal>
        <div className="mt-13 grid grid-cols-2 gap-0.5 md:grid-cols-4">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={teamDelays[i]} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 bg-mist px-6 py-25 md:flex-row md:gap-0 md:px-15">
        <div>
          <h2 className="mb-3 font-display text-[clamp(2.5rem,4vw,4rem)] font-light italic">
            Work
            <br />
            <em>With Us</em>
          </h2>
          <p className="text-[0.9rem] text-ash">
            Every great space starts with a conversation.
          </p>
        </div>
        <ContactTrigger>
          <Button variant="dark">Get In Touch →</Button>
        </ContactTrigger>
      </div>

      <Footer />
    </>
  );
}

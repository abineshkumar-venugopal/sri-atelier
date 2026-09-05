import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ValueCard from "@/components/ValueCard";
import TeamCard from "@/components/TeamCard";
import Footer from "@/components/Footer";
import { values, team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Sixteen years of architecture and interior design practice across South India — the story, principles, and team behind FORMA.",
};

const valueDelays = [undefined, 1, 2, 3] as const;
const teamDelays = [undefined, 1, 2, 3] as const;

export default function AboutPage() {
  return (
    <>
      <div className="about-hero">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80&fit=crop"
          alt="Architecture studio"
          fill
          className="object-cover"
          sizes="100vw"
          preload
        />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <p className="about-hero-label">Who We Are</p>
          <h1 className="about-hero-title">
            About
            <br />
            <em>Forma</em>
          </h1>
        </div>
      </div>

      <div className="about-story">
        <div className="about-story-year">2008</div>
        <div className="about-story-text">
          <Reveal as="p">
            We founded Forma with a single belief: that great architecture is not about
            spectacle, but about the quiet intelligence of well-considered space.
          </Reveal>
          <Reveal as="p" delay={1}>
            Over sixteen years and across sixty-four projects, we have worked with
            homeowners, developers, and institutions across South India — each commission
            approached as a singular opportunity to create something that will outlast the
            moment of its making.
          </Reveal>
        </div>
      </div>

      <div className="values-section">
        <p className="section-label">Our Principles</p>
        <Reveal as="h2" className="section-title section-title-invert">
          What we
          <br />
          believe in
        </Reveal>
        <div className="values-grid">
          {values.map((value, i) => (
            <ValueCard key={value.num} value={value} delay={valueDelays[i]} />
          ))}
        </div>
      </div>

      <div className="team-section">
        <Reveal as="p" className="section-label">
          The People
        </Reveal>
        <Reveal as="h2" className="section-title" delay={1}>
          Our Team
        </Reveal>
        <div className="team-grid">
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} delay={teamDelays[i]} />
          ))}
        </div>
      </div>

      <div className="about-cta-section">
        <div className="about-cta-text">
          <h2>
            Work
            <br />
            <em>With Us</em>
          </h2>
          <p>Every great space starts with a conversation.</p>
        </div>
        <Link href="/contact" className="btn btn-dark">
          Get In Touch →
        </Link>
      </div>

      <Footer />
    </>
  );
}

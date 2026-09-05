import Link from "next/link";
import Image from "next/image";
import Parallax from "@/components/Parallax";
import Carousel from "@/components/Carousel";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import ProcessStepCard from "@/components/ProcessStepCard";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
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

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <Parallax
          className="hero-bg"
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&fit=crop"
          alt="Modern architecture"
          mode="scroll"
          factor={0.38}
          preload
          imgClassName="object-[center_30%]"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">Architecture &amp; Design Studio · Est. 2008</p>
          <h1 className="hero-title">
            Spaces
            <br />
            that <em>define</em>
            <br />
            lives.
          </h1>
          <p className="hero-sub">
            We craft architecture that stands at the intersection of beauty and purpose.
          </p>
          <div className="hero-cta">
            <Link href="/projects" className="btn btn-light">
              View Projects
            </Link>
            <Link href="/quote" className="btn btn-outline">
              Get Quote
            </Link>
          </div>
        </div>
        <div className="hero-scroll">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="carousel-section">
        <div className="section-header">
          <Reveal as="p" className="section-label">
            Selected Works
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            Recent
            <br />
            Projects
          </Reveal>
        </div>
        <Carousel items={carouselItems} />
      </section>

      <div className="about-preview">
        <div className="about-preview-visual">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&fit=crop"
            alt="Forma studio"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="about-preview-year">2008</div>
        </div>
        <div className="about-preview-text">
          <Reveal as="p" className="section-label">
            About Forma
          </Reveal>
          <Reveal as="h2" className="section-title" delay={1}>
            Design is not
            <br />
            decoration — it is
            <br />
            civilization.
          </Reveal>
          <Reveal as="p" delay={2}>
            We are a Chennai-based architecture and design studio with over sixteen years
            of practice. Our work spans residential, commercial, and cultural projects,
            each defined by restraint, material honesty, and a deep understanding of
            place.
          </Reveal>
          <Reveal as="p" delay={3}>
            Every project begins with listening — to the site, the client, the light, and
            the land.
          </Reveal>
          <Reveal as="div" delay={4}>
            <Link href="/about" className="link-underline">
              Our story →
            </Link>
          </Reveal>
        </div>
      </div>

      <section className="services-section">
        <Reveal as="div" className="section-label">
          What We Do
        </Reveal>
        <Reveal as="h2" className="section-title" delay={1}>
          Services
        </Reveal>
        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} delay={serviceDelays[i]} />
          ))}
        </div>
      </section>

      <div className="parallax-break">
        <Parallax
          className="parallax-break-bg"
          src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1800&q=80&fit=crop"
          alt="Architecture detail"
          mode="center"
          factor={0.22}
        />
        <div className="parallax-break-overlay" />
        <Reveal as="div" className="parallax-break-content">
          <blockquote>&ldquo;Architecture is the art of how to waste space.&rdquo;</blockquote>
          <cite>— Philip Johnson</cite>
        </Reveal>
      </div>

      <section className="projects-section">
        <Reveal as="p" className="section-label">
          Portfolio
        </Reveal>
        <Reveal as="h2" className="section-title" delay={1}>
          Featured
          <br />
          Projects
        </Reveal>
        <div className="projects-grid">
          {featuredItems.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={featuredDelays[i]} />
          ))}
        </div>
      </section>

      <section className="process-section">
        <Reveal as="p" className="section-label">
          How We Work
        </Reveal>
        <Reveal as="h2" className="section-title" delay={1}>
          Our Process
        </Reveal>
        <div className="process-steps">
          {processSteps.map((step, i) => (
            <ProcessStepCard key={step.num} step={step} delay={processDelays[i]} />
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <div className="testimonial-divider" />
        <Reveal as="blockquote" className="testimonial-quote">
          &ldquo;Forma transformed not just our home, but the way we live in it. Every
          corner holds intention.&rdquo;
        </Reveal>
        <Reveal as="p" className="testimonial-author" delay={1}>
          Priya &amp; Arjun Mehta — Meridian House, Chennai
        </Reveal>
      </section>

      <div className="final-cta">
        <div className="final-cta-content">
          <Reveal as="h2">
            Ready to
            <br />
            <em>build something</em>
            <br />
            extraordinary?
          </Reveal>
          <Reveal as="div" delay={1}>
            <Link href="/quote" className="btn btn-accent">
              Get Quote →
            </Link>
          </Reveal>
        </div>
      </div>

      <Footer />
    </>
  );
}

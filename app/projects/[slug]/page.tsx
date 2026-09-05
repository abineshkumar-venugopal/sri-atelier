import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectDetail from "@/components/ProjectDetail";
import Footer from "@/components/Footer";
import { projects, getProjectBySlug } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <ProjectDetail project={project} />
      <div className="px-6 pb-20 md:px-15">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 border-b border-ink pb-0.5 text-[0.75rem] uppercase tracking-[0.15em] text-ink transition-all duration-300 hover:gap-5 hover:border-brass hover:text-brass"
        >
          ← Back to Projects
        </Link>
      </div>
      <Footer />
    </>
  );
}

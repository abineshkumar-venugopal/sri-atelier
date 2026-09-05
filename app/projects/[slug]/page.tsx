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
      <div style={{ padding: "0 60px 80px" }}>
        <Link href="/projects" className="link-underline">
          ← Back to Projects
        </Link>
      </div>
      <Footer />
    </>
  );
}

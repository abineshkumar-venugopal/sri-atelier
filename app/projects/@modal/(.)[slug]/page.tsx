import { notFound } from "next/navigation";
import Modal from "@/components/Modal";
import ProjectDetail from "@/components/ProjectDetail";
import { getProjectBySlug } from "@/lib/data";

export default async function InterceptedProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <Modal title={project.name}>
      <ProjectDetail project={project} />
    </Modal>
  );
}

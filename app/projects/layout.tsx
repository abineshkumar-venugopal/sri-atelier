import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Sixty-four completed interior, exterior, and construction projects by SRI ATELIER across South India.",
};

export default function ProjectsLayout({
  children,
  modal,
}: LayoutProps<"/projects">) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/**
 * Wraps the intercepted /projects/[slug] route. Radix handles the focus trap,
 * Escape, and body scroll lock, so this only has to translate "closed" into
 * navigating back to the grid.
 */
export default function Modal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent
        // Full-bleed rather than shadcn's centered panel.
        className="inset-0 top-0 left-0 block h-full max-h-full w-full max-w-full translate-x-0 translate-y-0 overflow-y-auto bg-paper p-0 ring-0"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}

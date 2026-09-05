"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="proj-detail-overlay">
      <button
        className="proj-detail-close"
        onClick={() => router.back()}
        aria-label="Close project detail"
      >
        ✕
      </button>
      {children}
    </div>
  );
}

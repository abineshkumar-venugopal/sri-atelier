// "use client";

// import { useEffect, useState } from "react";

// import { cn } from "@/lib/utils";

// const WORDMARK = "FORMA";

// /** Held at least this long so the wordmark animation can finish. */
// const MIN_VISIBLE_MS = 1600;
// /** Never hold the page hostage if something is slow to load. */
// const MAX_VISIBLE_MS = 4000;
// /** Must match the fade-out duration below. */
// const EXIT_MS = 800;

// type Phase = "visible" | "exiting" | "done";

// /**
//  * Brand overlay shown on first paint. Mounted in the root layout, so it runs
//  * once per full page load and not on client-side navigation.
//  *
//  * While it is up, `data-loading` on <html> pauses the page's own entrance
//  * animations (see globals.css) — otherwise the hero's staggered reveal would
//  * play out behind the overlay and be over before anyone saw it.
//  */
// export default function PageLoader() {
//   const [phase, setPhase] = useState<Phase>("visible");

//   useEffect(() => {
//     const root = document.documentElement;
//     root.dataset.loading = "true";

//     let exitTimer: number;
//     let doneTimer: number;

//     const startExit = () => {
//       setPhase("exiting");
//       // Release the page's animations as the fade begins, so the hero is
//       // already moving by the time the overlay clears.
//       delete root.dataset.loading;
//       doneTimer = window.setTimeout(() => setPhase("done"), EXIT_MS);
//     };

//     const openedAt = performance.now();
//     const scheduleExit = () => {
//       const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - openedAt));
//       exitTimer = window.setTimeout(startExit, remaining);
//     };

//     if (document.readyState === "complete") {
//       scheduleExit();
//     } else {
//       window.addEventListener("load", scheduleExit, { once: true });
//     }

//     const failsafe = window.setTimeout(startExit, MAX_VISIBLE_MS);

//     return () => {
//       window.removeEventListener("load", scheduleExit);
//       window.clearTimeout(exitTimer);
//       window.clearTimeout(doneTimer);
//       window.clearTimeout(failsafe);
//       delete root.dataset.loading;
//     };
//   }, []);

//   if (phase === "done") return null;

//   const exiting = phase === "exiting";

//   return (
//     <div
//       data-page-loader
//       aria-hidden="true"
//       className={cn(
//         // Above the nav (1000) and overlays (2000), below the cursor (9998+).
//         "fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-ink",
//         "transition-opacity duration-800 ease-forma",
//         // pointer-events-none so the fading panel doesn't swallow clicks.
//         exiting && "pointer-events-none opacity-0"
//       )}
//     >
//       <div className="flex flex-col items-center">
//         {/* Trailing letter-spacing would push the word off-centre. */}
//         <div className="flex -me-[0.22em] overflow-hidden">
//           {WORDMARK.split("").map((letter, i) => (
//             <span
//               key={i}
//               style={{ animationDelay: `${150 + i * 90}ms` }}
//               className="animate-fade-up font-display text-[clamp(2.75rem,11vw,6.5rem)] font-light uppercase leading-none tracking-[0.22em] text-paper opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
//             >
//               {letter}
//             </span>
//           ))}
//         </div>

//         <div className="mt-7 h-px w-full origin-left animate-line-draw bg-terracotta motion-reduce:animate-none" />

//         <p
//           style={{ animationDelay: "850ms" }}
//           className="mt-6 animate-fade-in text-micro uppercase tracking-[0.35em] text-paper/45 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
//         >
//           Architecture &amp; Design Studio
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const MIN_VISIBLE_MS = 1600;
/** Never hold the page hostage if something is slow to load. */
const MAX_VISIBLE_MS = 4000;
/** Must match the shutter's duration-1000 below. */
const EXIT_MS = 1000;

type Phase = "visible" | "exiting" | "done";

/**
 * Brand overlay shown on first paint.
 * Mounted in the root layout, so it runs once per full page load
 * and not on client-side navigation.
 *
 * While it is up, `data-loading` on <html> pauses the page's own
 * entrance animations.
 */
export default function PageLoader() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.loading = "true";

    let exitTimer: number;
    let doneTimer: number;

    const startExit = () => {
      setPhase("exiting");

      // Release the page animations as the shutter starts to lift, so the hero
      // is already moving as it comes into view.
      delete root.dataset.loading;

      doneTimer = window.setTimeout(() => {
        setPhase("done");
      }, EXIT_MS);
    };

    const openedAt = performance.now();

    const scheduleExit = () => {
      const remaining = Math.max(
        0,
        MIN_VISIBLE_MS - (performance.now() - openedAt),
      );

      exitTimer = window.setTimeout(startExit, remaining);
    };

    if (document.readyState === "complete") {
      scheduleExit();
    } else {
      window.addEventListener("load", scheduleExit, {
        once: true,
      });
    }

    // Failsafe so the loader can never block the page indefinitely.
    const failsafe = window.setTimeout(startExit, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener("load", scheduleExit);

      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(failsafe);

      delete root.dataset.loading;
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  const exiting = phase === "exiting";

  return (
    <div
      data-page-loader
      aria-hidden="true"
      className={cn(
        // Above navigation and other overlays.
        "fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-paper",

        // Shutter: the whole panel slides up off the screen. The shadow sits
        // below its bottom edge, so it only shows once that edge is moving.
        "shadow-[0_24px_60px_rgb(42_38_34/0.18)] transition-transform duration-1000 ease-shutter",

        // Prevent the lifting loader from blocking clicks.
        exiting && "pointer-events-none -translate-y-full",

        // Reduced motion: no travel, just a quick fade.
        "motion-reduce:translate-y-0 motion-reduce:transition-opacity motion-reduce:duration-500",
        exiting && "motion-reduce:opacity-0",
      )}
    >
      {/* The logo lifts and fades a little ahead of the panel, so it doesn't
          ride the shutter all the way out. */}
      <div
        className={cn(
          "flex w-[min(80vw,420px)] flex-col items-center transition-[translate,opacity] duration-600 ease-shutter motion-reduce:transition-none",
          exiting && "-translate-y-16 opacity-0",
        )}
      >
        {/* =========================================
            SRI ATELIER LOGO
            ========================================= */}
        <div
          style={{ animationDelay: "150ms" }}
          className={cn(
            "animate-fade-in opacity-0",
            "motion-reduce:animate-none motion-reduce:opacity-100",
          )}
        >
          <Image
            src="/logo_black.png"
            alt="Sri Atelier"
            width={600}
            height={300}
            preload
            className="h-auto w-[min(80vw,420px)] object-contain"
          />
        </div>

        {/* =========================================
            DIVIDER LINE
            ========================================= */}
        <div className="mt-7 h-px w-full origin-left animate-line-draw bg-terracotta motion-reduce:animate-none" />

        {/* =========================================
            TAGLINE
            ========================================= */}
        <p
          style={{ animationDelay: "850ms" }}
          className="
            mt-6
            animate-fade-in
            text-center
            text-micro
            uppercase
            tracking-[0.35em]
            text-ash
            opacity-0
            motion-reduce:animate-none
            motion-reduce:opacity-100
          "
        >
          Architecture &amp; Design Studio
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";

import type { Client } from "@/lib/data";

/**
 * Continuously scrolling client strip.
 *
 * The track holds four copies of the list and animates to -50%, which travels
 * exactly two copies and so lands on an identical arrangement — the loop has no
 * seam. Four rather than two because a single copy of a short list can be
 * narrower than a wide monitor, which would open a gap at the end of the run.
 *
 * Spacing is padding on each item rather than a gap on the track: a gap would
 * add one extra space between copies and break that alignment.
 */
export default function LogoMarquee({
  items,
  label = "Selected Clients",
}: {
  items: Client[];
  label?: string;
}) {
  const track = [...items, ...items, ...items, ...items];

  return (
    <section className="border-y border-mist bg-paper py-14">
      <p className="mb-10 text-center text-eyebrow uppercase tracking-[0.25em] text-ash">
        {label}
      </p>

      {/* The mask fades both ends so items enter and leave rather than being
          clipped against a hard edge. */}
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {track.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              // Only the first copy is announced; the rest are a visual loop.
              aria-hidden={i >= items.length}
              className="flex h-12 shrink-0 items-center justify-center px-10 md:px-14"
            >
              {client.logo ? (
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={240}
                  height={48}
                  // next/image serves .svg unoptimized automatically, so these
                  // need no config change and stay crisp at any size.
                  className="h-10 w-auto opacity-90 transition-opacity duration-500 ease-forma hover:opacity-100"
                />
              ) : (
                <span className="font-display text-[1.35rem] whitespace-nowrap text-ash/80 transition-colors duration-500 ease-forma hover:text-ink">
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

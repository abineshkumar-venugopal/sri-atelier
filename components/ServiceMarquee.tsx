import type { Service } from "@/lib/data";
import { cn } from "@/lib/utils";

const LOOP_SECONDS = 50;

export default function ServiceMarquee({ items }: { items: Service[] }) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-mist bg-paper py-8 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] md:py-10">
      <ul
        // Inline so it overrides the duration inside the animate-marquee shorthand.
        style={{ animationDuration: `${LOOP_SECONDS}s` }}
        className="flex w-max animate-marquee items-center motion-reduce:animate-none"
      >
        {track.map((service, i) => (
          <li
            key={`${service.name}-${i}`}
            // Only the first copy is announced; the rest are a visual loop.
            aria-hidden={i >= items.length}
            className="flex shrink-0 items-center"
          >
            <span
              // Pattern counted within each copy, so both copies match and the
              // loop stays seamless even with an odd number of services.
              className={cn(
                "px-7 font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-none font-light whitespace-nowrap md:px-10",
                (i % items.length) % 2 === 0
                  ? "text-ash/60"
                  : "italic text-terracotta/75",
              )}
            >
              {service.name}
            </span>
            <span
              aria-hidden="true"
              className="size-1 shrink-0 rounded-full bg-fog"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

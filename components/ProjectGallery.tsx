"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  MaximizeIcon,
  MinimizeIcon,
  Share2Icon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";

import OrientationImage from "@/components/OrientationImage";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselArrow from "@/components/ui/carousel-arrow";

/** "01 / 04". Zero-padded to match the numbering elsewhere on the site. */
const counter = (index: number, total: number) =>
  `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

/** Tracks which slide an embla instance is showing. */
function useSelectedIndex(api: CarouselApi) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const sync = () => setIndex(api.selectedScrollSnap());
    sync();
    api.on("select", sync);
    api.on("reInit", sync);
    return () => {
      api.off("select", sync);
      api.off("reInit", sync);
    };
  }, [api]);

  return index;
}

/**
 * The project's photos as a swipeable hero with a selectable thumbnail grid
 * below the project description and a full-screen viewer.
 *
 * The full-screen view starts on the photo the hero is showing, and hands its
 * position back on close, so the two never disagree. With a single photo the
 * controls are left out.
 */
export default function ProjectGallery({
  images,
  name,
  children,
}: {
  images: string[];
  name: string;
  children: ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const index = useSelectedIndex(api);
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [viewerApi, setViewerApi] = useState<CarouselApi>();
  const viewerIndex = useSelectedIndex(viewerApi);
  const several = images.length > 1;
  const [zoomed, setZoomed] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const syncFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", syncFullscreen);
    return () => document.removeEventListener("fullscreenchange", syncFullscreen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (viewerApi) api?.scrollTo(viewerApi.selectedScrollSnap(), true);
      setStartIndex(null);
      setZoomed(false);
      setOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, viewerApi, api]);

  const close = (next: boolean) => {
    if (!next) {
      if (viewerApi) api?.scrollTo(viewerApi.selectedScrollSnap(), true);
      setStartIndex(null);
      setZoomed(false);
    }
    setOpen(next);
  };

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Browsers can deny fullscreen requests; the viewer remains usable.
    }
  };

  const sharePhoto = async () => {
    const src = images[viewerIndex] ?? images[0];
    const url = new URL(src, window.location.origin).href;
    try {
      if (navigator.share) {
        await navigator.share({ title: name, url });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // Cancelling the native share sheet is not an error the user needs.
    }
  };

  return (
    <>
      <Carousel
        className="group/carousel relative mx-auto h-[min(56.25vw,70vh)] w-[calc(100%-3rem)] max-w-[1180px] overflow-hidden bg-stone md:w-[68%]"
        setApi={setApi}
        opts={{ loop: true }}
      >
        <CarouselContent className="ml-0 h-[min(56.25vw,70vh)]">
          {images.map((src, i) => (
            <CarouselItem key={`${src}-${i}`} className="relative h-full pl-0">
              <button
                type="button"
                aria-label={`View ${name}, photo ${i + 1} full screen`}
                onClick={() => {
                  setStartIndex(i);
                  setZoomed(false);
                  setOpen(true);
                }}
                className="absolute inset-0 z-[1]"
              >
                <OrientationImage
                  src={src}
                  alt=""
                  fill
                  sizes="100vw"
                  preload={i === 0}
                />
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {several && (
          <>
            <CarouselArrow
              direction="prev"
              label="Previous photo"
              onClick={() => api?.scrollPrev()}
            />
            <CarouselArrow
              direction="next"
              label="Next photo"
              onClick={() => api?.scrollNext()}
            />
            <p
              aria-live="polite"
              className="absolute bottom-5 left-6 z-10 rounded-full bg-ink/40 px-3.5 py-1.5 text-micro tracking-[0.2em] text-paper backdrop-blur-sm md:bottom-8 md:left-15"
            >
              {counter(index, images.length)}
            </p>
          </>
        )}

      </Carousel>

      {children}

      {several && (
        <section
          aria-label={`${name} project gallery`}
          className="bg-mist px-6 py-16 md:px-[15%] md:py-20"
        >
          <p className="mb-5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink">
            Explore Our Gallery
          </p>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-sans text-[clamp(2.25rem,4vw,4.25rem)] font-light uppercase tracking-[-0.03em] text-ink">
              {name}
            </h2>
            <span className="text-micro tracking-[0.15em] text-ash">
              {String(images.length).padStart(2, "0")} PHOTOS
            </span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                aria-label={`Open photo ${i + 1} of ${images.length} full screen`}
                aria-pressed={index === i}
                onClick={() => {
                  api?.scrollTo(i, true);
                  setStartIndex(i);
                  setZoomed(false);
                  setOpen(true);
                }}
                className={`group relative aspect-[4/3] overflow-hidden border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${
                  index === i ? "border-terracotta" : "border-fog"
                }`}
              >
                <OrientationImage
                  src={src}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 16vw, (min-width: 768px) 24vw, 48vw"
                  className="transition-transform duration-500 ease-forma group-hover:scale-105"
                />
                <span className="absolute bottom-2 left-2 bg-ink/70 px-2 py-1 text-micro tracking-[0.12em] text-paper">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={`${name} photo viewer`}
          className="pointer-events-none fixed inset-0 z-[3000] bg-ink/55 backdrop-blur-[1px]"
        >
          <div className="pointer-events-auto absolute top-5 right-5 z-[60] flex items-center gap-1 text-paper md:top-7 md:right-8">
            <button
              type="button"
              aria-label={fullscreen ? "Exit full screen" : "Enter full screen"}
              onClick={toggleFullscreen}
              className="grid size-10 place-items-center rounded-sm transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              {fullscreen ? (
                <MinimizeIcon className="size-5" strokeWidth={1.5} />
              ) : (
                <MaximizeIcon className="size-5" strokeWidth={1.5} />
              )}
            </button>
            <button
              type="button"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              aria-pressed={zoomed}
              onClick={() => setZoomed((current) => !current)}
              className="grid size-10 place-items-center rounded-sm transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              {zoomed ? (
                <ZoomOutIcon className="size-5" strokeWidth={1.5} />
              ) : (
                <ZoomInIcon className="size-5" strokeWidth={1.5} />
              )}
            </button>
            <button
              type="button"
              aria-label="Share photo"
              onClick={sharePhoto}
              className="grid size-10 place-items-center rounded-sm transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              <Share2Icon className="size-5" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Close photo viewer"
              onClick={() => close(false)}
              className="grid size-10 place-items-center rounded-sm transition-colors hover:bg-paper/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
            >
              <XIcon className="size-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* The carousel wraps everything, close button included, so the
              arrow keys work from whatever has focus. */}
          <Carousel
            className="group/carousel pointer-events-none h-full"
            setApi={setViewerApi}
            opts={{ loop: true, startIndex: startIndex ?? index }}
          >
            <CarouselContent className="pointer-events-none ml-0 h-dvh">
              {images.map((src, i) => (
                <CarouselItem
                  key={`${src}-${i}`}
                  className="pointer-events-none relative h-full pl-0"
                >
                  <OrientationImage
                    src={src}
                    alt={`${name}, photo ${i + 1} of ${images.length}`}
                    fill
                    className={cn(
                      "pointer-events-auto object-contain p-4 transition-transform duration-300 ease-forma md:px-28 md:py-20",
                      zoomed && "scale-125 cursor-zoom-out"
                    )}
                    sizes="100vw"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {several && (
              <>
                <CarouselArrow
                  direction="prev"
                  label="Previous photo"
                  onClick={() => {
                    setZoomed(false);
                    viewerApi?.scrollPrev();
                  }}
                  className="pointer-events-auto md:opacity-100"
                />
                <CarouselArrow
                  direction="next"
                  label="Next photo"
                  onClick={() => {
                    setZoomed(false);
                    viewerApi?.scrollNext();
                  }}
                  className="pointer-events-auto md:opacity-100"
                />
                <p
                  aria-live="polite"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 text-micro tracking-[0.2em] text-paper/80"
                >
                  {counter(viewerIndex, images.length)}
                </p>
              </>
            )}

          </Carousel>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

import OrientationImage from "@/components/OrientationImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import CarouselArrow from "@/components/ui/carousel-arrow";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

/** "01 / 04". Zero-padded to match the numbering elsewhere on the site. */
const counter = (index: number, total: number) =>
  `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

function clickedOutsidePhoto(event: MouseEvent<HTMLDivElement>) {
  const image = event.currentTarget.querySelector("img");
  if (!image) return true;
  if (event.target !== image) return true;

  const rect = image.getBoundingClientRect();
  const style = window.getComputedStyle(image);
  const paddingLeft = Number.parseFloat(style.paddingLeft);
  const paddingRight = Number.parseFloat(style.paddingRight);
  const paddingTop = Number.parseFloat(style.paddingTop);
  const paddingBottom = Number.parseFloat(style.paddingBottom);
  const contentWidth = rect.width - paddingLeft - paddingRight;
  const contentHeight = rect.height - paddingTop - paddingBottom;

  if (!image.naturalWidth || !image.naturalHeight) return true;

  const scale = Math.min(
    contentWidth / image.naturalWidth,
    contentHeight / image.naturalHeight
  );
  const photoWidth = image.naturalWidth * scale;
  const photoHeight = image.naturalHeight * scale;
  const photoLeft =
    rect.left + paddingLeft + (contentWidth - photoWidth) / 2;
  const photoTop =
    rect.top + paddingTop + (contentHeight - photoHeight) / 2;

  return (
    event.clientX < photoLeft ||
    event.clientX > photoLeft + photoWidth ||
    event.clientY < photoTop ||
    event.clientY > photoTop + photoHeight
  );
}

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
 * The project's photos as a swipeable hero, with arrows, a counter and an
 * expand button that opens the same set full screen.
 *
 * The full-screen view starts on the photo the hero is showing, and hands its
 * position back on close, so the two never disagree. With a single photo the
 * controls are left out.
 */
export default function ProjectGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const index = useSelectedIndex(api);
  const [open, setOpen] = useState(false);
  const [viewerApi, setViewerApi] = useState<CarouselApi>();
  const viewerIndex = useSelectedIndex(viewerApi);
  const several = images.length > 1;

  const close = (next: boolean) => {
    if (!next && viewerApi) api?.scrollTo(viewerApi.selectedScrollSnap(), true);
    setOpen(next);
  };

  return (
    <>
      <Carousel
        className="group/carousel relative h-[min(56.25vw,70vh)] bg-stone"
        setApi={setApi}
        opts={{ loop: true }}
      >
        <CarouselContent className="ml-0 h-[min(56.25vw,70vh)]">
          {images.map((src, i) => (
            <CarouselItem key={`${src}-${i}`} className="relative h-full pl-0">
              <button
                type="button"
                aria-label={`View ${name}, photo ${i + 1} full screen`}
                onClick={() => setOpen(true)}
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

      <Dialog open={open} onOpenChange={close}>
        <DialogContent
          showCloseButton={false}
          // Full screen, over the modal the detail may already be open in.
          className="inset-0 top-0 left-0 block h-full max-h-full w-full max-w-full translate-x-0 translate-y-0 bg-ink/95 p-0 ring-0 sm:max-w-full"
        >
          <DialogTitle className="sr-only">{name} photos</DialogTitle>

          {/* The carousel wraps everything, close button included, so the
              arrow keys work from whatever has focus. */}
          <Carousel
            className="group/carousel h-full"
            setApi={setViewerApi}
            opts={{ loop: true, startIndex: index }}
          >
            <CarouselContent className="ml-0 h-dvh">
              {images.map((src, i) => (
                <CarouselItem
                  key={`${src}-${i}`}
                  className="relative h-full pl-0"
                  onClick={(event) => {
                    if (
                      event.target instanceof Element &&
                      event.target.closest("button")
                    ) {
                      return;
                    }
                    if (clickedOutsidePhoto(event)) close(false);
                  }}
                >
                  <OrientationImage
                    src={src}
                    alt={`${name}, photo ${i + 1} of ${images.length}`}
                    fill
                    className="object-contain p-4 md:px-28 md:py-20"
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
                  onClick={() => viewerApi?.scrollPrev()}
                  className="md:opacity-100"
                />
                <CarouselArrow
                  direction="next"
                  label="Next photo"
                  onClick={() => viewerApi?.scrollNext()}
                  className="md:opacity-100"
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
        </DialogContent>
      </Dialog>
    </>
  );
}

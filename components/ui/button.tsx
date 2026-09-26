import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2.5 uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-400 ease-forma outline-none select-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-35 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        /** On dark imagery — the hero's primary call to action. */
        // Hover sweeps terracotta across from the left. The fill is a ::before
        // layer scaled from zero; `isolate` lets it sit behind the label but
        // above the paper background. Text changes over the same 500ms, so it
        // stays legible at every point of the sweep. Keyboard focus sweeps too.
        light:
          "relative isolate overflow-hidden bg-paper text-ink duration-500 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-terracotta before:transition-transform before:duration-500 before:ease-forma hover:text-paper hover:before:scale-x-100 focus-visible:text-paper focus-visible:before:scale-x-100 motion-reduce:before:transition-none",
        /** On dark imagery — the hero's secondary call to action. */
        outline:
          "border border-white/50 bg-transparent text-paper hover:bg-paper hover:text-ink",
        /** On light backgrounds — the default. */
        dark: "bg-terracotta text-paper hover:bg-terracotta-dark",
        /** Brass fill, for the closing call to action. */
        accent: "bg-terracotta text-paper hover:bg-terracotta-dark",
        /** Square icon button: carousel arrows, the project modal's close. */
        bordered:
          "border border-fog bg-transparent text-ink hover:border-terracotta hover:bg-terracotta hover:text-paper",
      },
      size: {
        default: "px-9 py-3.5 text-label",
        lg: "px-14 py-4.5 text-[0.78rem]",
        icon: "size-11 p-0",
        "icon-lg": "size-12 p-0",
      },
    },
    defaultVariants: {
      variant: "dark",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "dark",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

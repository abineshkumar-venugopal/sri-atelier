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
        light: "bg-paper text-ink hover:bg-brass hover:text-paper",
        /** On dark imagery — the hero's secondary call to action. */
        outline:
          "border border-white/50 bg-transparent text-paper hover:bg-paper hover:text-ink",
        /** On light backgrounds — the default. */
        dark: "bg-ink text-paper hover:bg-brass-dark",
        /** Brass fill, for the closing call to action. */
        accent: "bg-brass text-paper hover:bg-brass-dark",
        /** Square icon button: carousel arrows, the project modal's close. */
        bordered:
          "border border-fog bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
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

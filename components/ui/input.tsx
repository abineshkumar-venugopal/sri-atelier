import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * FORMA fields are a single rule under the text — no box, no fill. The rule
 * darkens from fog to ink on focus. Shared with Textarea and SelectTrigger.
 */
const fieldClassName =
  "w-full border-b border-fog bg-transparent py-3 text-base font-light text-ink outline-none transition-colors duration-300 placeholder:text-ash/60 focus-visible:border-ink aria-invalid:border-destructive disabled:opacity-50"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldClassName, className)}
      {...props}
    />
  )
}

export { Input, fieldClassName }

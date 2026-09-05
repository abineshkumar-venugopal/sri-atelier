import * as React from "react"

import { cn } from "@/lib/utils"
import { fieldClassName } from "@/components/ui/input"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldClassName, "h-30 resize-none", className)}
      {...props}
    />
  )
}

export { Textarea }

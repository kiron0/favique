import * as React from "react"

import { cn } from "@/lib/utils"

function ColorPicker({
  className,
  value,
  disabled,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className="relative inline-block w-full">
      <label
        htmlFor="color-picker"
        className={cn(
          "border-input block h-9 w-full overflow-hidden rounded-md border",
          !disabled && "cursor-pointer",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
      >
        <div
          className={cn("h-full w-full", !disabled && "cursor-pointer")}
          style={{
            backgroundColor: typeof value === "string" ? value : "#ffffff",
          }}
        >
          <input
            id="color-picker"
            type="color"
            className={cn(
              "absolute inset-0 h-full w-full appearance-none border-none p-0 opacity-0",
              !disabled && "cursor-pointer"
            )}
            value={value}
            disabled={disabled}
            {...props}
          />
        </div>
      </label>
    </div>
  )
}

export { ColorPicker }

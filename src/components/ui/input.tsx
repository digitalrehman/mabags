"use client"

import { forwardRef, type InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, type = "text", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-background px-4 py-2 text-base text-foreground transition-all duration-200",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-destructive focus:ring-destructive" : "border-input hover:border-primary/50",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
        {helperText && !error && <p className="mt-1.5 text-sm text-muted-foreground">{helperText}</p>}
      </div>
    )
  },
)

Input.displayName = "Input"

export { Input }

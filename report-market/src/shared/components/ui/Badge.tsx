import { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "green" | "yellow" | "red" | "blue";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg font-semibold tracking-wide",
        {
          "px-2 py-0.5 text-[10px] uppercase": size === "sm",
          "px-2.5 py-1 text-xs": size === "md",
        },
        {
          "bg-slate-100 text-slate-600": variant === "default",
          "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-500/20":
            variant === "green",
          "bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-500/20":
            variant === "yellow",
          "bg-red-50 text-red-600 ring-1 ring-inset ring-red-500/20":
            variant === "red",
          "bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-500/20":
            variant === "blue",
        },
        className
      )}
      {...props}
    />
  );
}

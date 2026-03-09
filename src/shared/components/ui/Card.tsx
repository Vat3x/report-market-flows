import { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  gradient?: boolean;
}

export function Card({
  className,
  padding = "md",
  hover,
  gradient,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[24px] border border-slate-200/50 bg-white/95 shadow-lg shadow-slate-200/20 backdrop-blur-md transition-all duration-300 ease-out",
        {
          "p-0": padding === "none",
          "p-5 sm:p-6": padding === "sm",
          "p-6 sm:p-8": padding === "md",
          "p-8 sm:p-10": padding === "lg",
        },
        hover && "cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/40 hover:border-slate-300/60",
        gradient && "bg-gradient-to-br from-white/90 to-blue-50/50",
        className
      )}
      {...props}
    />
  );
}

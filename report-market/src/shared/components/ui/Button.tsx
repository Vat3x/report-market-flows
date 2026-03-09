import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 font-medium tracking-wide",
          "rounded-xl transition-all duration-300 ease-out cursor-pointer overflow-hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
          {
            "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-blue-600 hover:shadow-blue-500/40 focus-visible:ring-blue-500 border border-blue-500/20":
              variant === "primary",
            "bg-white/80 backdrop-blur-sm text-slate-700 shadow-sm border border-slate-200/60 hover:bg-white hover:text-slate-900 hover:shadow-md hover:border-slate-300 focus-visible:ring-slate-400":
              variant === "secondary",
            "border border-slate-200 bg-transparent text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/50 hover:shadow-sm focus-visible:ring-blue-500":
              variant === "outline",
            "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25 hover:from-red-500 hover:to-red-600 hover:shadow-red-500/40 focus-visible:ring-red-500 border border-red-500/20":
              variant === "danger",
            "text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 focus-visible:ring-slate-400 hover:shadow-sm":
              variant === "ghost",
          },
          {
            "h-9 px-4 text-xs": size === "sm",
            "h-11 px-6 text-sm": size === "md",
            "h-14 px-8 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button };

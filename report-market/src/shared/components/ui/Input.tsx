import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, icon, id, required, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-400">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            required={required}
            className={cn(
              "block w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-slate-800",
              "shadow-sm transition-all duration-200 ease-out",
              "placeholder:text-slate-400",
              "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100",
              "hover:border-slate-300",
              error
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-100"
                : "border-slate-200",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {hint && !error && (
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {hint}
          </p>
        )}
        {error && (
          <p className="flex items-center gap-1 text-xs font-medium text-red-500">
            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };

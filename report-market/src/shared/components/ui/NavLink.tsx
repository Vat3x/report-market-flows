"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}

export function NavLink({ href, children, exact }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative px-1 py-1 text-sm font-medium transition-colors duration-200",
        isActive
          ? "text-blue-600"
          : "text-slate-400 hover:text-slate-700"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute -bottom-[13px] left-0 right-0 h-0.5 rounded-full bg-blue-600" />
      )}
    </Link>
  );
}

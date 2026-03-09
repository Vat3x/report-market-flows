import { auth, signOut } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { NavLink } from "@/shared/components/ui/NavLink";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const initials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 py-4 text-lg font-bold text-slate-800">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-sm">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="hidden sm:inline">Report Market</span>
            </Link>
            <div className="hidden items-center gap-6 sm:flex">
              <NavLink href="/dashboard" exact>
                Dashboard
              </NavLink>
              <NavLink href="/dashboard/report/new">
                File Report
              </NavLink>
              <NavLink href="/driver-check">
                Search Driver
              </NavLink>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-[10px] font-bold text-white shadow-sm">
                {initials}
              </div>
              <span className="hidden text-sm font-medium text-slate-600 sm:block">
                {session.user.name || session.user.email}
              </span>
            </div>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button variant="ghost" size="sm" type="submit">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="flex items-center gap-4 overflow-x-auto border-t border-slate-100 px-4 py-2 sm:hidden">
          <NavLink href="/dashboard" exact>
            Dashboard
          </NavLink>
          <NavLink href="/dashboard/report/new">
            File Report
          </NavLink>
          <NavLink href="/driver-check">
            Search
          </NavLink>
        </div>
      </nav>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

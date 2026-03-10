import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { getReportsByReporter, getReporterStats, getPendingDisputes } from "@/features/reports/queries";
import { DisputeReviewCard } from "@/features/reports/components/DisputeReviewCard";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { REPORT_SUBCATEGORY_LABELS } from "@/shared/lib/constants";
import { getSeverityWeight } from "@/features/rating/utils";
import { formatDate } from "@/shared/lib/utils";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const [reports, stats, pendingDisputes] = await Promise.all([
    getReportsByReporter(session.user.id),
    getReporterStats(session.user.id),
    getPendingDisputes(session.user.id),
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Welcome back, {session.user.name || "User"}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage driver reports and check ratings from your dashboard.
          </p>
        </div>
        <Link href="/dashboard/report/new">
          <Button size="sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Report
          </Button>
        </Link>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card gradient>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-800">{stats.totalReports}</p>
              <p className="text-sm text-slate-400">Total Reports</p>
            </div>
          </div>
        </Card>
        <Card gradient>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tight text-slate-800">{pendingDisputes.length}</p>
              <p className="text-sm text-slate-400">Pending Disputes</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link href="/driver-check">
          <Card hover>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Search Driver</p>
                <p className="text-sm text-slate-400">Look up a driver&apos;s rating by DL</p>
              </div>
              <svg className="ml-auto h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Card>
        </Link>
        <Link href="/dashboard/report/new">
          <Card hover>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-800">File Report</p>
                <p className="text-sm text-slate-400">Report a driver incident</p>
              </div>
              <svg className="ml-auto h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Card>
        </Link>
      </div>

      {/* Pending Disputes */}
      {pendingDisputes.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
              <svg className="h-3.5 w-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-800">
              Pending Disputes
            </h2>
            <Badge variant="yellow" size="sm">{pendingDisputes.length}</Badge>
          </div>
          <div className="space-y-3">
            {pendingDisputes.map((report) => (
              <DisputeReviewCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Reports */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-slate-800">
          Recent Reports
        </h2>

        {reports.length === 0 ? (
          <Card>
            <div className="py-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <svg className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-700">No reports yet</p>
              <p className="mt-1 text-sm text-slate-400">Start by filing your first driver report.</p>
              <Link href="/dashboard/report/new">
                <Button className="mt-6" size="sm">
                  File Your First Report
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <Card key={report.id} padding="sm" hover>
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/drivers/${encodeURIComponent(report.driver.cdlNumber)}`}
                        className="font-mono text-sm font-bold text-blue-600 transition-colors hover:text-blue-700"
                      >
                        {report.driver.cdlNumber}
                      </Link>
                      {(report.driver.firstName || report.driver.lastName) && (
                        <span className="truncate text-sm text-slate-400">
                          {report.driver.firstName} {report.driver.lastName}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {report.subcategories.map((sub, i) => (
                        <span key={sub} className="flex items-center gap-1.5">
                          {i > 0 && <span className="text-slate-300">|</span>}
                          <Badge size="sm" variant="blue">
                            {REPORT_SUBCATEGORY_LABELS[sub]}
                          </Badge>
                          <span className="text-[10px] font-semibold text-red-500">-{getSeverityWeight(sub)}</span>
                        </span>
                      ))}
                      <span className="ml-1 text-xs font-bold text-red-500">
                        ({report.subcategories.reduce((s, sub) => s + getSeverityWeight(sub), 0)} pts)
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-xs text-slate-300">
                      {formatDate(report.createdAt)}
                    </span>
                    <svg className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

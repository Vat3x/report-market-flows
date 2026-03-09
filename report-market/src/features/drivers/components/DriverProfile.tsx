import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Alert } from "@/shared/components/ui/Alert";
import { RatingBadge } from "./RatingBadge";
import { calculateRating, canDispute } from "@/features/rating/utils";
import { DisputeButton } from "@/features/reports/components/DisputeButton";
import {
  REPORT_SUBCATEGORY_LABELS,
  REPORT_STATUS_LABELS,
  REPORT_CATEGORY_LABELS,
} from "@/shared/lib/constants";
import { formatDate } from "@/shared/lib/utils";
import type { ReportCategory, ReportSubcategory, ReportStatus } from "@prisma/client";
import Link from "next/link";

interface Report {
  id: string;
  category: ReportCategory;
  subcategory: ReportSubcategory;
  description: string;
  incidentDate: Date;
  status: ReportStatus;
  disputeReason: string | null;
  disputedAt: Date | null;
  createdAt: Date;
  reporter: { companyName: string | null } | null;
}

interface Driver {
  id: string;
  cdlNumber: string;
  firstName: string | null;
  lastName: string | null;
  state: string | null;
  reports: Report[];
}

interface DriverProfileProps {
  driver: Driver;
  isAuthenticated: boolean;
}

export function DriverProfile({ driver, isAuthenticated }: DriverProfileProps) {
  const rating = calculateRating(driver.reports);
  const driverName =
    driver.firstName && driver.lastName
      ? `${driver.firstName} ${driver.lastName}`
      : null;

  return (
    <div className="space-y-6">
      {/* Driver Info + Rating */}
      <Card>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              {driverName || "Unknown Driver"}
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center rounded-xl bg-slate-100 px-3 py-1.5 font-mono text-sm font-bold text-slate-700">
                CDL: {driver.cdlNumber}
              </span>
              {driver.state && (
                <span className="inline-flex items-center rounded-xl bg-slate-100 px-3 py-1.5 text-sm text-slate-500">
                  {driver.state}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RatingBadge score={rating.score} color={rating.color} size="lg" />
            <p className="text-sm text-slate-400">
              {rating.verifiedReports} verified report{rating.verifiedReports !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Rating Legend */}
        <div className="mt-6 flex items-center justify-center gap-5 border-t border-slate-100 pt-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Good (80-100)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            Caution (50-79)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            High Risk (0-49)
          </span>
        </div>
      </Card>

      {/* Auth Teaser */}
      {!isAuthenticated && driver.reports.length > 0 && (
        <Alert variant="info">
          <Link href="/login" className="font-semibold text-blue-600 underline transition-colors hover:text-blue-700">
            Sign in
          </Link>{" "}
          to view full report descriptions and details.
        </Alert>
      )}

      {/* Report History */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Report History</h2>
          <span className="text-sm text-slate-400">
            {driver.reports.length} report{driver.reports.length !== 1 ? "s" : ""}
          </span>
        </div>

        {driver.reports.length === 0 ? (
          <Card>
            <div className="py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <svg className="h-7 w-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-700">No reports filed</p>
              <p className="mt-1 text-sm text-slate-400">
                This driver has a clean record with no incidents reported.
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {driver.reports.map((report) => (
              <Card key={report.id} padding="sm">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="blue">
                      {REPORT_CATEGORY_LABELS[report.category]}
                    </Badge>
                    <Badge>
                      {REPORT_SUBCATEGORY_LABELS[report.subcategory]}
                    </Badge>
                    <Badge
                      variant={
                        report.status === "VERIFIED"
                          ? "green"
                          : report.status === "DISPUTED"
                            ? "red"
                            : "yellow"
                      }
                    >
                      {REPORT_STATUS_LABELS[report.status as keyof typeof REPORT_STATUS_LABELS]}
                    </Badge>
                  </div>
                  {isAuthenticated && (
                    <p className="text-sm leading-relaxed text-slate-600">
                      {report.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                    <span>
                      Incident: {formatDate(new Date(report.incidentDate))}
                    </span>
                    {report.reporter?.companyName && (
                      <>
                        <span className="hidden sm:inline">·</span>
                        <span>Reported by: {report.reporter.companyName}</span>
                      </>
                    )}
                    <span className="hidden sm:inline">·</span>
                    <span>Filed: {formatDate(new Date(report.createdAt))}</span>
                  </div>

                  {/* Dispute pending notice */}
                  {report.status === "DISPUTE_PENDING" && report.disputeReason && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2">
                      <p className="text-xs font-semibold text-amber-700">Dispute Pending Review</p>
                      <p className="mt-0.5 text-sm text-amber-600">{report.disputeReason}</p>
                    </div>
                  )}

                  {/* Dispute accepted */}
                  {report.status === "DISPUTED" && report.disputeReason && (
                    <div className="rounded-lg border border-red-200 bg-red-50/50 px-3 py-2">
                      <p className="text-xs font-semibold text-red-700">Dispute Accepted</p>
                      <p className="mt-0.5 text-sm text-red-600">{report.disputeReason}</p>
                    </div>
                  )}

                  {/* Dispute button (only for verified reports within 48hr window) */}
                  {report.status === "VERIFIED" && canDispute(new Date(report.createdAt)) && (
                    <DisputeButton reportId={report.id} cdlNumber={driver.cdlNumber} />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

import { ReportForm } from "@/features/reports/components/ReportForm";
import Link from "next/link";

export default function NewReportPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-slate-600"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-800">
          File a Driver Report
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Report an incident involving a commercial driver
        </p>
      </div>
      <ReportForm />
    </div>
  );
}

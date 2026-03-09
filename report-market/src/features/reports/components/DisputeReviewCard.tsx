"use client";

import { useTransition, useState } from "react";
import { Card } from "@/shared/components/ui/Card";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Alert } from "@/shared/components/ui/Alert";
import { resolveDispute } from "../actions";
import { REPORT_SUBCATEGORY_LABELS } from "@/shared/lib/constants";
import { formatDate } from "@/shared/lib/utils";
import type { ReportSubcategory } from "@prisma/client";

interface DisputeReviewCardProps {
  report: {
    id: string;
    subcategories: ReportSubcategory[];
    description: string;
    disputeReason: string | null;
    disputedAt: Date | null;
    createdAt: Date;
    driver: {
      cdlNumber: string;
      firstName: string | null;
      lastName: string | null;
    };
  };
}

export function DisputeReviewCard({ report }: DisputeReviewCardProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ action: "accept" | "reject" } | null>(null);
  const [error, setError] = useState("");

  if (result) {
    return (
      <Alert variant={result.action === "accept" ? "success" : "info"}>
        {result.action === "accept"
          ? "Dispute accepted — report no longer affects the driver's rating."
          : "Dispute rejected — report status restored to Verified."}
      </Alert>
    );
  }

  function handleResolve(action: "accept" | "reject") {
    setError("");
    startTransition(async () => {
      const res = await resolveDispute(report.id, action);
      if (res.success) {
        setResult({ action });
      } else {
        setError(res.error || "Something went wrong");
      }
    });
  }

  const driverName =
    report.driver.firstName || report.driver.lastName
      ? `${report.driver.firstName || ""} ${report.driver.lastName || ""}`.trim()
      : null;

  return (
    <Card padding="sm">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-700">
                {report.driver.cdlNumber}
              </span>
              {driverName && (
                <span className="text-sm text-slate-400">{driverName}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {report.subcategories.map((sub) => (
                <Badge key={sub} size="sm">
                  {REPORT_SUBCATEGORY_LABELS[sub]}
                </Badge>
              ))}
              <Badge variant="yellow" size="sm">
                Dispute Pending
              </Badge>
            </div>
          </div>
          <span className="shrink-0 text-xs text-slate-300">
            {report.disputedAt ? formatDate(new Date(report.disputedAt)) : ""}
          </span>
        </div>

        {/* Original report description */}
        <div className="rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-xs font-semibold text-slate-500">Your Report:</p>
          <p className="mt-0.5 text-sm text-slate-600">{report.description}</p>
        </div>

        {/* Driver's dispute reason */}
        {report.disputeReason && (
          <div className="rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2">
            <p className="text-xs font-semibold text-amber-700">Driver&apos;s Dispute Reason:</p>
            <p className="mt-0.5 text-sm text-amber-600">{report.disputeReason}</p>
          </div>
        )}

        {error && <Alert variant="error">{error}</Alert>}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleResolve("reject")}
            disabled={isPending}
          >
            Reject Dispute
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleResolve("accept")}
            loading={isPending}
          >
            Accept Dispute
          </Button>
        </div>
      </div>
    </Card>
  );
}

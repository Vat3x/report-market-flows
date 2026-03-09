"use client";

import { useState, useTransition } from "react";
import { Button } from "@/shared/components/ui/Button";
import { Alert } from "@/shared/components/ui/Alert";
import { disputeReport } from "../actions";

interface DisputeButtonProps {
  reportId: string;
  cdlNumber: string;
}

export function DisputeButton({ reportId, cdlNumber }: DisputeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (success) {
    return (
      <Alert variant="success">
        Dispute submitted successfully. This report will no longer affect the rating.
      </Alert>
    );
  }

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Dispute
      </Button>
    );
  }

  function handleSubmit() {
    setError("");

    if (reason.trim().length < 10) {
      setError("Dispute reason must be at least 10 characters");
      return;
    }

    const formData = new FormData();
    formData.set("reportId", reportId);
    formData.set("cdlNumber", cdlNumber);
    formData.set("reason", reason.trim());

    startTransition(async () => {
      const result = await disputeReport(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Something went wrong");
      }
    });
  }

  return (
    <div className="mt-3 space-y-3 rounded-xl border-2 border-amber-200 bg-amber-50/50 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Dispute This Report
      </div>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Explain why you believe this report is inaccurate..."
        rows={3}
        maxLength={500}
        className="block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">{reason.length}/500</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsOpen(false);
              setReason("");
              setError("");
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleSubmit}
            loading={isPending}
          >
            Submit Dispute
          </Button>
        </div>
      </div>
      {error && <Alert variant="error">{error}</Alert>}
    </div>
  );
}

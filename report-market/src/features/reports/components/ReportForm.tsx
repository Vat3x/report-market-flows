"use client";

import { useState } from "react";
import { useMultiStepForm } from "@/shared/hooks/useMultiStepForm";
import { createReport } from "../actions";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { Card } from "@/shared/components/ui/Card";
import { Alert } from "@/shared/components/ui/Alert";
import { Select } from "@/shared/components/ui/Select";
import { Badge } from "@/shared/components/ui/Badge";
import {
  REPORT_CATEGORY_LABELS,
  REPORT_SUBCATEGORY_LABELS,
  SUBCATEGORY_BY_CATEGORY,
} from "@/shared/lib/constants";
import { getSeverityWeight } from "@/features/rating/utils";
import type { ReportCategory, ReportSubcategory } from "@prisma/client";

const STEPS = ["Driver Info", "Incident Details", "Review & Confirm"];

export function ReportForm() {
  const { currentStep, isFirstStep, isLastStep, next, back } =
    useMultiStepForm(STEPS.length);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    cdlNumber: "",
    driverFirstName: "",
    driverLastName: "",
    driverState: "",
    category: "TRANSPORT" as ReportCategory,
    subcategory: "LATE_DELIVERY" as ReportSubcategory,
    incidentDate: "",
    description: "",
  });

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleCategoryChange(category: ReportCategory) {
    const firstSub = SUBCATEGORY_BY_CATEGORY[category][0] as ReportSubcategory;
    setFormData((prev) => ({ ...prev, category, subcategory: firstSub }));
  }

  async function handleSubmit() {
    setIsPending(true);
    setError(null);

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    const result = await createReport(fd);
    if (!result.success) {
      setError(result.error || "Something went wrong");
      setIsPending(false);
    }
  }

  const availableSubcategories = SUBCATEGORY_BY_CATEGORY[formData.category];

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${i < currentStep
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md"
                    : i === currentStep
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg ring-4 ring-blue-100"
                      : "bg-slate-100 text-slate-400"
                  }`}
              >
                {i < currentStep ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`hidden text-sm font-medium sm:block ${i <= currentStep ? "text-slate-700" : "text-slate-300"
                  }`}
              >
                {step}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 w-8 rounded-full sm:w-12 ${i < currentStep ? "bg-emerald-500" : "bg-slate-200"
                  }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && <Alert variant="error">{error}</Alert>}

      <Card>
        {/* Step 1: Driver Info */}
        {currentStep === 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Driver Information
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Enter the driver&apos;s DL number to identify them
              </p>
            </div>
            <Input
              id="cdlNumber"
              value={formData.cdlNumber}
              onChange={(e) => updateField("cdlNumber", e.target.value)}
              placeholder="DL Number (e.g. TX12345678)"
              required
              hint="The driver's Commercial Driver License number"
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                </svg>
              }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="driverFirstName"
                value={formData.driverFirstName}
                onChange={(e) => updateField("driverFirstName", e.target.value)}
                placeholder="First Name (e.g. John)"
                hint="Optional"
              />
              <Input
                id="driverLastName"
                value={formData.driverLastName}
                onChange={(e) => updateField("driverLastName", e.target.value)}
                placeholder="Last Name (e.g. Doe)"
                hint="Optional"
              />
            </div>
            <Input
              id="driverState"
              value={formData.driverState}
              onChange={(e) => updateField("driverState", e.target.value)}
              placeholder="State (e.g. TX)"
              hint="Optional - state where the CDL was issued"
            />
          </div>
        )}

        {/* Step 2: Incident Details */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Incident Details
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Describe what happened and classify the incident
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                id="category"
                required
                value={formData.category}
                onChange={(e) =>
                  handleCategoryChange(e.target.value as ReportCategory)
                }
              >
                {Object.entries(REPORT_CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </Select>

              <Select
                id="subcategory"
                required
                value={formData.subcategory}
                onChange={(e) => updateField("subcategory", e.target.value)}
              >
                {availableSubcategories.map((key) => (
                  <option key={key} value={key}>
                    {REPORT_SUBCATEGORY_LABELS[key]} (-
                    {getSeverityWeight(key as ReportSubcategory)} pts)
                  </option>
                ))}
              </Select>
            </div>

            <Input
              id="incidentDate"
              type="date"
              value={formData.incidentDate}
              onChange={(e) => updateField("incidentDate", e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Description<span className="ml-1 text-red-400">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe the incident in detail..."
                rows={4}
                className="block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm transition-all duration-200 ease-out placeholder:text-slate-300 hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                required
                minLength={10}
              />
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formData.description.length}/10 characters minimum
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Review & Confirm
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Please verify the information before submitting
              </p>
            </div>

            <div className="divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-slate-50/50">
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-slate-400">DL Number</span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-sm font-bold text-slate-700">
                  {formData.cdlNumber.toUpperCase()}
                </span>
              </div>
              {(formData.driverFirstName || formData.driverLastName) && (
                <div className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-slate-400">Driver Name</span>
                  <span className="text-sm font-medium text-slate-700">
                    {formData.driverFirstName} {formData.driverLastName}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-slate-400">Category</span>
                <Badge variant="blue">
                  {REPORT_CATEGORY_LABELS[formData.category]}
                </Badge>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-slate-400">Issue Type</span>
                <Badge>{REPORT_SUBCATEGORY_LABELS[formData.subcategory]}</Badge>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-slate-400">Rating Impact</span>
                <Badge variant="red">
                  -{getSeverityWeight(formData.subcategory)} points
                </Badge>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-slate-400">Incident Date</span>
                <span className="text-sm font-medium text-slate-700">
                  {formData.incidentDate}
                </span>
              </div>
              <div className="px-5 py-3.5">
                <span className="text-sm text-slate-400">Description</span>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {formData.description}
                </p>
              </div>
            </div>

            <Alert variant="warning">
              This report will lower the driver&apos;s rating by{" "}
              <strong>{getSeverityWeight(formData.subcategory)} points</strong>.
              The driver can dispute this within 48 hours.
            </Alert>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          {!isFirstStep ? (
            <Button variant="ghost" onClick={back}>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Button>
          ) : (
            <div />
          )}
          {isLastStep ? (
            <Button onClick={handleSubmit} loading={isPending}>
              {isPending ? "Submitting..." : "Submit Report"}
            </Button>
          ) : (
            <Button
              onClick={next}
              disabled={
                (currentStep === 0 && !formData.cdlNumber) ||
                (currentStep === 1 &&
                  (!formData.incidentDate ||
                    formData.description.length < 10))
              }
            >
              Continue
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

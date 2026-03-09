import { ReportSubcategory, ReportStatus } from "@prisma/client";

const SEVERITY_WEIGHTS: Record<ReportSubcategory, number> = {
  // Transport
  LATE_DELIVERY: 5,
  CARGO_DAMAGE: 10,
  ACCIDENT: 15,
  DOT_INSPECTION_ISSUE: 8,
  // Professional
  COMMUNICATION: 3,
  PUNCTUALITY: 4,
  DOCUMENTATION: 5,
  IRRESPONSIBILITY: 8,
};

export type RatingColor = "green" | "yellow" | "red";

export interface RatingResult {
  score: number;
  color: RatingColor;
  totalReports: number;
  verifiedReports: number;
}

export function calculateRating(
  reports: { subcategory: ReportSubcategory; status: ReportStatus }[]
): RatingResult {
  const verifiedReports = reports.filter(
    (r) => r.status === "VERIFIED" || r.status === "DISPUTE_PENDING"
  );

  const totalPenalty = verifiedReports.reduce(
    (sum, report) => sum + SEVERITY_WEIGHTS[report.subcategory],
    0
  );

  const score = Math.max(0, 100 - totalPenalty);

  return {
    score,
    color: getRatingColor(score),
    totalReports: reports.length,
    verifiedReports: verifiedReports.length,
  };
}

export function getRatingColor(score: number): RatingColor {
  if (score >= 80) return "green";
  if (score >= 50) return "yellow";
  return "red";
}

export function getSeverityWeight(subcategory: ReportSubcategory): number {
  return SEVERITY_WEIGHTS[subcategory];
}

export function canDispute(reportCreatedAt: Date): boolean {
  const now = new Date();
  const hoursDiff =
    (now.getTime() - reportCreatedAt.getTime()) / (1000 * 60 * 60);
  return hoursDiff <= 48;
}

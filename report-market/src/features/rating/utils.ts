import { ReportSubcategory, ReportStatus } from "@prisma/client";

const SEVERITY_WEIGHTS: Record<ReportSubcategory, number> = {
  // Transport
  LATE_DELIVERY: 18,
  LOAD_CANCELLATION: 23,
  POOR_SCHEDULE: 17,
  NO_GOOD_TO_GO: 18,
  REFUSES_DETENTION: 17,
  FAILS_TO_REPORT: 18,
  NOT_CHECKING_LOAD: 18,
  // Professional
  PUNCTUALITY: 17,
  IRRESPONSIBILITY: 21,
  RUDE_BEHAVIOR: 18,
  HIGH_RATES: 15,
  DIRECT_CONTACT: 17,
  THREATENS_DELIVERY: 23,
  IGNORING_INSTRUCTIONS: 19,
  // Communication
  COMMUNICATION: 16,
  POOR_COMMUNICATION: 16,
  LACK_OF_UNDERSTANDING: 16,
  LANGUAGE_BARRIER: 15,
  // Compliance
  DOCUMENTATION: 18,
  DOT_INSPECTION_ISSUE: 21,
  INVALID_DOCUMENTS: 21,
  NO_TRACKING: 19,
  GPS_OFF: 20,
  REFUSES_SEAL: 20,
  // Safety
  CARGO_DAMAGE: 23,
  ACCIDENT: 25,
  UNSAFE_DRIVING: 25,
  POOR_EQUIPMENT: 21,
};

export type RatingColor = "green" | "yellow" | "red";

export interface RatingResult {
  score: number;
  color: RatingColor;
  totalReports: number;
  verifiedReports: number;
}

export function calculateRating(
  reports: { subcategories: ReportSubcategory[]; status: ReportStatus }[]
): RatingResult {
  const verifiedReports = reports.filter(
    (r) => r.status === "VERIFIED" || r.status === "DISPUTE_PENDING"
  );

  const totalPenalty = verifiedReports.reduce(
    (sum, report) =>
      sum + report.subcategories.reduce((s, sub) => s + SEVERITY_WEIGHTS[sub], 0),
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

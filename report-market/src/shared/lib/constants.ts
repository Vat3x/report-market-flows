export const APP_NAME = "Report Market";

export const REPORT_CATEGORY_LABELS = {
  TRANSPORT: "Transport",
  PROFESSIONAL: "Professional",
} as const;

export const REPORT_SUBCATEGORY_LABELS = {
  LATE_DELIVERY: "Late Delivery",
  CARGO_DAMAGE: "Cargo Damage",
  ACCIDENT: "Accident",
  DOT_INSPECTION_ISSUE: "DOT Inspection Issue",
  COMMUNICATION: "Communication",
  PUNCTUALITY: "Punctuality",
  DOCUMENTATION: "Documentation",
  IRRESPONSIBILITY: "Irresponsibility",
} as const;

export const REPORT_STATUS_LABELS = {
  PENDING: "Pending",
  VERIFIED: "Verified",
  DISPUTE_PENDING: "Dispute Pending",
  DISPUTED: "Disputed",
} as const;

export const SUBCATEGORY_BY_CATEGORY = {
  TRANSPORT: [
    "LATE_DELIVERY",
    "CARGO_DAMAGE",
    "ACCIDENT",
    "DOT_INSPECTION_ISSUE",
  ],
  PROFESSIONAL: [
    "COMMUNICATION",
    "PUNCTUALITY",
    "DOCUMENTATION",
    "IRRESPONSIBILITY",
  ],
} as const;

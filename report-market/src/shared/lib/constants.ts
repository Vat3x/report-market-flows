export const APP_NAME = "Report Market";

export const REPORT_CATEGORY_LABELS = {
  TRANSPORT: "Transport",
  PROFESSIONAL: "Professional",
  COMMUNICATION: "Communication",
  COMPLIANCE: "Compliance",
  SAFETY: "Safety",
} as const;

export const REPORT_SUBCATEGORY_LABELS = {
  // Transport
  LATE_DELIVERY: "Late Delivery",
  LOAD_CANCELLATION: "Load Cancellation",
  POOR_SCHEDULE: "Poor Schedule Adherence",
  NO_GOOD_TO_GO: "Left Without 'Good to Go'",
  REFUSES_DETENTION: "Refuses Detention/Layover",
  FAILS_TO_REPORT: "Fails to Report Issues",
  NOT_CHECKING_LOAD: "Not Checking Load Details",
  // Professional
  PUNCTUALITY: "Punctuality",
  IRRESPONSIBILITY: "Irresponsibility",
  RUDE_BEHAVIOR: "Rude or Unprofessional",
  HIGH_RATES: "High Rates vs Market",
  DIRECT_CONTACT: "Unauthorized Direct Contact",
  THREATENS_DELIVERY: "Threatens Not to Deliver",
  IGNORING_INSTRUCTIONS: "Ignoring Instructions",
  // Communication
  COMMUNICATION: "Communication Issues",
  POOR_COMMUNICATION: "Poor/Delayed Responses",
  LACK_OF_UNDERSTANDING: "Lacks Understanding",
  LANGUAGE_BARRIER: "Language Barrier",
  // Compliance
  DOCUMENTATION: "Documentation Issues",
  DOT_INSPECTION_ISSUE: "DOT Inspection Issue",
  INVALID_DOCUMENTS: "Invalid/Expired Documents",
  NO_TRACKING: "Refuses Tracking",
  GPS_OFF: "Turns Off GPS",
  REFUSES_SEAL: "Refuses to Seal Trailer",
  // Safety
  CARGO_DAMAGE: "Cargo Damage",
  ACCIDENT: "Accident",
  UNSAFE_DRIVING: "Unsafe Driving",
  POOR_EQUIPMENT: "Poor Equipment Condition",
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
    "LOAD_CANCELLATION",
    "POOR_SCHEDULE",
    "NO_GOOD_TO_GO",
    "REFUSES_DETENTION",
    "FAILS_TO_REPORT",
    "NOT_CHECKING_LOAD",
  ],
  PROFESSIONAL: [
    "PUNCTUALITY",
    "IRRESPONSIBILITY",
    "RUDE_BEHAVIOR",
    "HIGH_RATES",
    "DIRECT_CONTACT",
    "THREATENS_DELIVERY",
    "IGNORING_INSTRUCTIONS",
  ],
  COMMUNICATION: [
    "COMMUNICATION",
    "POOR_COMMUNICATION",
    "LACK_OF_UNDERSTANDING",
    "LANGUAGE_BARRIER",
  ],
  COMPLIANCE: [
    "DOCUMENTATION",
    "DOT_INSPECTION_ISSUE",
    "INVALID_DOCUMENTS",
    "NO_TRACKING",
    "GPS_OFF",
    "REFUSES_SEAL",
  ],
  SAFETY: [
    "CARGO_DAMAGE",
    "ACCIDENT",
    "UNSAFE_DRIVING",
    "POOR_EQUIPMENT",
  ],
} as const;

import { z } from "zod";

const ALL_SUBCATEGORIES = [
  "LATE_DELIVERY",
  "LOAD_CANCELLATION",
  "POOR_SCHEDULE",
  "NO_GOOD_TO_GO",
  "REFUSES_DETENTION",
  "FAILS_TO_REPORT",
  "NOT_CHECKING_LOAD",
  "PUNCTUALITY",
  "IRRESPONSIBILITY",
  "RUDE_BEHAVIOR",
  "HIGH_RATES",
  "DIRECT_CONTACT",
  "THREATENS_DELIVERY",
  "IGNORING_INSTRUCTIONS",
  "COMMUNICATION",
  "POOR_COMMUNICATION",
  "LACK_OF_UNDERSTANDING",
  "LANGUAGE_BARRIER",
  "DOCUMENTATION",
  "DOT_INSPECTION_ISSUE",
  "INVALID_DOCUMENTS",
  "NO_TRACKING",
  "GPS_OFF",
  "REFUSES_SEAL",
  "CARGO_DAMAGE",
  "ACCIDENT",
  "UNSAFE_DRIVING",
  "POOR_EQUIPMENT",
] as const;

export const reportSchema = z.object({
  // Step 1: Driver Info
  cdlNumber: z.string().min(1, "DL number is required"),
  driverFirstName: z.string().optional(),
  driverLastName: z.string().optional(),
  driverState: z.string().optional(),
  // Step 2: Incident Details
  subcategories: z
    .array(z.enum(ALL_SUBCATEGORIES))
    .min(1, "Select at least one issue type"),
  incidentDate: z.string().min(1, "Incident date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type ReportInput = z.infer<typeof reportSchema>;

export const disputeSchema = z.object({
  reportId: z.string().min(1, "Report ID is required"),
  cdlNumber: z.string().min(1, "DL number is required").transform((v) => v.toUpperCase().trim()),
  reason: z
    .string()
    .min(10, "Dispute reason must be at least 10 characters")
    .max(500, "Dispute reason must be under 500 characters"),
});

export type DisputeInput = z.infer<typeof disputeSchema>;

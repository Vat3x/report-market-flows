import { z } from "zod";

export const reportSchema = z.object({
  // Step 1: Driver Info
  cdlNumber: z.string().min(1, "DL number is required"),
  driverFirstName: z.string().optional(),
  driverLastName: z.string().optional(),
  driverState: z.string().optional(),
  // Step 2: Incident Details
  category: z.enum(["TRANSPORT", "PROFESSIONAL"]),
  subcategory: z.enum([
    "LATE_DELIVERY",
    "CARGO_DAMAGE",
    "ACCIDENT",
    "DOT_INSPECTION_ISSUE",
    "COMMUNICATION",
    "PUNCTUALITY",
    "DOCUMENTATION",
    "IRRESPONSIBILITY",
  ]),
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

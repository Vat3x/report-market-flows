import { z } from "zod";

export const cdlSearchSchema = z.object({
  cdl: z
    .string()
    .min(1, "CDL number is required")
    .transform((val) => val.toUpperCase().trim().replace(/\s+/g, "")),
});

export type CdlSearchInput = z.infer<typeof cdlSearchSchema>;

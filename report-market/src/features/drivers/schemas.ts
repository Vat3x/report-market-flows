import { z } from "zod";

export const cdlSearchSchema = z.object({
  cdl: z
    .string()
    .min(1, "DL number is required")
    .transform((val) => val.toUpperCase().trim().replace(/\s+/g, "")),
});

export type CdlSearchInput = z.infer<typeof cdlSearchSchema>;

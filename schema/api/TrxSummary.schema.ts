import { z } from "zod";

export const TrxSummarySchema = z.object({
  period: z.optional(z.enum(["MONTH", "WEEK", "YEAR"])),
});

export type TrxSummaryInterface = z.infer<typeof TrxSummarySchema>;

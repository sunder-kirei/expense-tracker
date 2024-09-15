import { z } from "zod";

export const SummarySchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
});

export type SummaryInterface = z.infer<typeof SummarySchema>;

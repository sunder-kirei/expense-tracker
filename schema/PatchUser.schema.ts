import { z } from "zod";

export const PatchUserSchema = z.object({
  name: z.optional(z.string()),
  locale: z.optional(z.string()),
  period: z.optional(z.enum(["MONTH", "YEAR", "WEEK"])),
});

export type PatchUserInterface = z.infer<typeof PatchUserSchema>;

import { z } from "zod";

export const PutAccountSchema = z.object({
  accountId: z.string(),
  accountName: z.string(),
  accountType: z.enum(["DEBIT", "CREDIT"]),
  accountNumber: z.optional(z.string()),
  bankName: z.string(),
  isPrimary: z.optional(z.boolean()),
});

export type PutAccountInterface = z.infer<typeof PutAccountSchema>;

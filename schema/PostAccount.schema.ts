import { title } from "process";
import { z } from "zod";

export const PostAccountSchema = z.object({
  accountName: z.string(),
  accountType: z.enum(["DEBIT", "CREDIT"]),
  accountNumber: z.optional(z.string()),
  bankName: z.string(),
  isPrimary: z.optional(z.boolean()),
});

export type PostAccountInterface = z.infer<typeof PostAccountSchema>;

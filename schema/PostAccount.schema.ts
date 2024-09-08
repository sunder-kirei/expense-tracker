import { title } from "process";
import { z } from "zod";

export const PostAccountSchema = z.object({
  accountName: z.string(),
  accountType: z.enum(["DEBIT", "CREDIT"]),
  accountNumber: z.optional(z.string()),
  accountLogo: z.optional(z.string()),
});

export type PostAccountInterface = z.infer<typeof PostAccountSchema>;

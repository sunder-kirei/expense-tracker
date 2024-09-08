import { title } from "process";
import { z } from "zod";

export const PostTransactionSchema = z.object({
  title: z.string(),
  amount: z.number(),
  payee: z.string(),
  notes: z.optional(z.string()),
  date: z.coerce.date(),
  bankAccountId: z.string(),
  type: z.enum(["CASH", "CARD", "UPI"]),
  categoryId: z.string(),
});

export type PostTransactionInterface = z.infer<typeof PostTransactionSchema>;

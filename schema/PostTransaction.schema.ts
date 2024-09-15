import { z } from "zod";

export const PostTransactionSchema = z.object({
  amount: z.coerce.number(),
  payee: z.string().min(1, { message: "Payee is required" }),
  notes: z.optional(z.string()),
  date: z.coerce.date(),
  bankAccountId: z.string().min(1, "Account is required"),
  type: z.enum(["CASH", "CARD", "UPI"]),
  categoryId: z.optional(z.string()),
});

export type PostTransactionInterface = z.infer<typeof PostTransactionSchema>;

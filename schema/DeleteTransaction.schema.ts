import { z } from "zod";

export const DeleteTransactionSchema = z.object({
  id: z.string(),
});

export type DeleteTransactionInterface = z.infer<
  typeof DeleteTransactionSchema
>;

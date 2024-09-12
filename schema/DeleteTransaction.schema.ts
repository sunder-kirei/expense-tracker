import { z } from "zod";

export const DeleteTransactionSchema = z.object({
  ids: z.array(z.string()),
});

export type DeleteTransactionInterface = z.infer<
  typeof DeleteTransactionSchema
>;

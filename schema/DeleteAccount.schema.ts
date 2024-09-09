import { z } from "zod";

export const DeleteAccountSchema = z.object({
  id: z.string(),
});

export type DeleteAccountInterface = z.infer<typeof DeleteAccountSchema>;

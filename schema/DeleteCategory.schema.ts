import { z } from "zod";

export const DeleteCategorySchema = z.object({
  id: z.string(),
});

export type DeleteCategoryInterface = z.infer<typeof DeleteCategorySchema>;

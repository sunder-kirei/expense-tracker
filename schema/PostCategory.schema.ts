import { title } from "process";
import { z } from "zod";

export const PostCategorySchema = z.object({
  name: z.string(),
});

export type PostCategoryInterface = z.infer<typeof PostCategorySchema>;

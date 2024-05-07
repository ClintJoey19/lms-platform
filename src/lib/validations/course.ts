import * as z from "zod";

export const courseSchema = z.object({
  userId: z.string(),
  title: z.string().min(1).max(30),
  description: z.optional(z.string()),
  imageUrl: z.optional(z.string()),
  price: z.optional(z.number().or(z.null())),
  categories: z.optional(z.string().or(z.null())),
  attachments: z.optional(z.array(z.string()).or(z.null())),
  isPublished: z.optional(z.boolean()),
});

import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  author: z.string().min(2).max(50),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

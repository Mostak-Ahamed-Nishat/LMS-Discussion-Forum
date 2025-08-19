import { z } from "zod";

export const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const tagSchema = z
  .string()
  .regex(/^[a-z0-9-]{1,20}$/i, "Use letters/numbers/hyphen (max 20 chars)");

export const createThreadSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(10, "Title must be at least 10 characters")
      .max(140, "Title is too long"),
    body: z.string().min(1, "Body is required"),
    tags: z.array(tagSchema).max(5, "Maximum 5 tags allowed"),
  })
  .refine((data) => stripHtml(data.body).length >= 20, {
    path: ["body"],
    message: "Body must contain at least 20 characters of text",
  });

export type CreateThreadInput = z.infer<typeof createThreadSchema>;

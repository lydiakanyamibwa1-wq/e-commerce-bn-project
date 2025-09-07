import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().positive("Price must be positive"),
    description: z.string().min(1, "Description is required"),
    imageUrl: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().positive().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    category: z.string().optional(),
  }),
});

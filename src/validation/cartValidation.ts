import { z } from "zod";

export const addCartItemSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "Product ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
  }),
});

export const updateCartItemSchema = z.object({
  body: z.object({
    quantity: z.number().min(1, "Quantity must be at least 1"),
  }),
  params: z.object({
    productId: z.string().min(1, "Product ID is required"),
  }),
});

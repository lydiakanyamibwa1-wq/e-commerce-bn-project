import { z } from "zod";

export const updateOrderSchema = z.object({
  body: z.object({
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number().min(1),
      })
    ),
  }),
  params: z.object({
    id: z.string(),
  }),
});

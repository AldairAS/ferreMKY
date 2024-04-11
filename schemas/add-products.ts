import { z } from 'zod';

export const addProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
  category: z.string(),
  description: z.string(),
  quantity: z.number(),
  image: z.string()
});

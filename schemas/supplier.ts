import { z } from 'zod';

export const addSupplierSchema = z.object({
  name: z.string(),
  contact: z.string(),
  description: z.string()
});

export const editSupplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contact: z.string(),
  description: z.string()
});

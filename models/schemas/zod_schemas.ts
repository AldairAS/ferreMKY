import { z } from 'zod';

export const FormCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'El nombre de la categoría es requerido' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'La descripción de la categoría es requerida' })
});

export const FormKindSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'El nombre del tipo de producto es requerido' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'La descripción del tipo de producto es requerida' }),
  idCategory: z.string().min(1, { message: 'Selecciona una categoría' })
});

export const FormSupplierSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'El nombre del proveedor es requerido' }),
  contact: z
    .string()
    .trim()
    .min(6, {
      message:
        'El contacto del proveedor es requerido y como mínimo debe tener 6 dígitos (teléfono) o 9 dígitos (número de celular).'
    }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'La descripción del proveedor es requerida' })
});

export const FormProductSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, { message: 'El código del producto es requerido' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'La descripción del producto es requerida' }),
  priceSale: z.coerce
    .number({ invalid_type_error: 'El precio de venta debe ser un número' })
    .gt(0, { message: 'Por favor, ingrese un precio mayor a 0' }),
  storageCost: z.coerce
    .number({
      invalid_type_error: 'El costo de almacenamiento debe ser un número'
    })
    .gt(0, { message: 'Por favor, ingrese un precio mayor a 0' }),
  unit: z
    .string()
    .trim()
    .min(1, { message: 'La unidad del producto es requerida' }),
  quantity: z.coerce
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .int({ message: 'La cantidad debe ser un número entero' })
    .gte(0, {
      message: 'Por favor, la cantidad ingresada como mínimo debe ser 0'
    }),
  idKind: z.string().min(1, { message: 'Seleccione un tipo de producto' })
});

export const FormAddQuantitySchema = z.object({
  pricePurchase: z.coerce
    .number({ invalid_type_error: 'Ingrese un número en el precio de compra' })
    .gt(0, { message: 'El precio de compra debe ser mayor a 0' }),
  quantity: z.coerce
    .number({ invalid_type_error: 'Ingrese un número en la cantidad' })
    .int({ message: 'La cantidad ingresada debe ser un número entero' })
    .gt(0, { message: 'La cantidad aquirida debe ser mayor a 0' }),
  idProduct: z.string().min(1, { message: 'Seleccione un producto' }),
  idSupplier: z.string().min(1, { message: 'Seleccione un proveedor' })
});

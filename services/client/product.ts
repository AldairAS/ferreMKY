import { FormProductSchema } from '@/models/schemas/zod_schemas';
import { addProduct, revalidateProduct } from '../server/product';
import { StateProduct } from '@/models/types/states';

//Función para añadir la categoría y validación de campos
export async function addProductClient(
  prevState: StateProduct,
  formData: FormData
): Promise<StateProduct> {
  const code = formData.get('code') as string;
  const description = formData.get('description') as string;
  const priceSale = formData.get('priceSale') as string;
  const storageCost = formData.get('storageCost') as string;
  const unit = formData.get('unit') as string;
  const quantity = formData.get('quantity') as string;
  const idKind = formData.get('idKind') as string;
  const validatedFields = FormProductSchema.safeParse({
    code,
    description,
    priceSale,
    storageCost,
    unit,
    quantity,
    idKind
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data, errorMessage } = await addProduct(
    idKind,
    code,
    description,
    Number(priceSale),
    Number(storageCost),
    Number(quantity),
    unit
  );

  if (!data || errorMessage) {
    return { message: errorMessage ?? 'Ha ocurrido un error' };
  }

  console.log('Producto añadido');
  await revalidateProduct();
}

import { FormAddQuantitySchema } from '@/models/schemas/zod_schemas';
import { addQuantity, revalidateQuantity } from '../server/product_supplier';
import { StateProductSupplier } from '@/models/types/states';

//Función para añadir la categoría y validación de campos
export async function addQuantityClient(
  prevState: StateProductSupplier,
  formData: FormData
): Promise<StateProductSupplier> {
  const pricePurchase = formData.get('pricePurchase') as string;
  const quantity = formData.get('quantity') as string;
  const idProduct = formData.get('idProduct') as string;
  const idSupplier = formData.get('idSupplier') as string;
  const validatedFields = FormAddQuantitySchema.safeParse({
    pricePurchase,
    quantity,
    idProduct,
    idSupplier
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data, errorMessage } = await addQuantity(
    idProduct,
    idSupplier,
    Number(quantity),
    Number(pricePurchase)
  );

  if (!data || errorMessage) {
    return { message: errorMessage ?? 'Ha ocurrido un error' };
  }

  console.log('Cantidad de producto añadida');
  await revalidateQuantity();
}

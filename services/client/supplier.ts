import { FormSupplierSchema } from '@/lib/zod_schema';
import { addSupplier, editSupplier, revalidateSupplier } from '../server/supplier';
import { StateSupplier } from '@/lib/states';

//Función para añadir la categoría y validación de campos
export async function addSupplierClient(
  prevState: StateSupplier,
  formData: FormData
): Promise<StateSupplier> {
  const name = formData.get('name') as string;
  const contact = formData.get('contact') as string;
  const description = formData.get('description') as string;
  const validatedFields = FormSupplierSchema.safeParse({
    name,
    contact,
    description
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data, errorMessage } = await addSupplier(name, description, contact);
  if (!data || errorMessage)
    return { message: errorMessage ?? 'Ha ocurrido un error' };
  

  console.log('Proveedor añadido');
  await revalidateSupplier();
}

// Función para editar un proveedor
export async function editSupplierClient(
  prevState: StateSupplier,
  formData: FormData
): Promise<StateSupplier> {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const contact = formData.get('contact') as string;
  const description = formData.get('description') as string;
  const validatedFields = FormSupplierSchema.safeParse({
    name,
    contact,
    description
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data, errorMessage } = await editSupplier(id, name, description, contact);
  if (!data || errorMessage) {
    return { message: errorMessage ?? 'Ha ocurrido un error' };
  }

  console.log('Proveedor editado');
  await revalidateSupplier();
}
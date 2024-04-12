import { FormKindSchema } from '@/models/schemas/zod_schemas';
import { addKind, revalidateKind } from '../server/kind';
import { StateKind } from '@/models/types/states';

//Función para añadir la categoría y validación de campos
export async function addKindClient(
  prevState: StateKind,
  formData: FormData
): Promise<StateKind> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const idCategory = formData.get('idCategory') as string;
  const validatedFields = FormKindSchema.safeParse({
    name,
    description,
    idCategory
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    };
  }

  const { data, errorMessage } = await addKind(idCategory, name, description);
  if (!data || errorMessage)
    return { message: errorMessage ?? 'Ha ocurrido un error' };

  console.log('Tipo de producto añadido');
  await revalidateKind();
}

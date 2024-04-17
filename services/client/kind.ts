import { FormKindSchema } from "@models/schemas/zod_schemas";
import { addKind, revalidateKind } from "../server/kind";
import { StateKind } from "@models/types/states";
import { updateKind, getAllKinds } from "@/services/server/kind";
//Función para añadir la categoría y validación de campos
export async function addKindClient(
  prevState: StateKind,
  formData: FormData
): Promise<StateKind> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const idCategory = formData.get("idCategory") as string;
  const validatedFields = FormKindSchema.safeParse({
    name,
    description,
    idCategory,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await addKind(idCategory, name, description);
  if (!data || errorMessage)
    return { message: errorMessage ?? "Ha ocurrido un error" };

  console.log("Tipo de producto añadido");
  await revalidateKind();
}


// actualizar

export interface KindItem {
  id: string;
  name: string;
  description: string;
  id_category: string;
}

export async function updateKindClient(
  formData: { id: string; name: string; description: string; id_category: string },
  kind: KindItem,
  setAllKinds: (kinds: KindItem[]) => void
) {
  try {
    // Actualizamos la categoría en la base de datos
    const result: { data: any; errorMessage: string | undefined } = await updateKind(formData.id, formData.name, formData.description,formData.id_category);

    // Registro de la respuesta y errores para depuración
    console.log("Respuesta de updateKind:", result.data);
    
    if (result.errorMessage) {
      // Si hay un mensaje de error, lo lanzamos
      throw new Error(result.errorMessage);
    }

    // Verificamos si la respuesta de la actualización es un objeto válido con propiedad 'id'
    if (result.data && typeof result.data === 'object') {
      console.log("Categoría actualizada");
      await revalidateKind();
      const updatedKindsFromServer = await getAllKinds();
      setAllKinds(updatedKindsFromServer);
    } else if (result.errorMessage) {
      throw new Error(result.errorMessage);
    } else {
      throw new Error("La respuesta de actualización no es válida.");
    }
  } catch (error) {
    // Manejamos cualquier error capturado durante el proceso
    console.error("Error al actualizar la categoría:", error);
  }
}
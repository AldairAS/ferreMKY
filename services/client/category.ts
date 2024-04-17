import { FormCategorySchema } from "@models/schemas/zod_schemas";
import { addCategory, revalidateCategory } from "../server/category";
import { StateCategory } from "@models/types/states";
import { updateCategory, getAllCategories } from "@/services/server/category";

//Función para añadir la categoría y validación de campos
export async function addCategoryClient(
  prevState: StateCategory,
  formData: FormData,
): Promise<StateCategory> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const validatedFields = FormCategorySchema.safeParse({ name, description });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { data, errorMessage } = await addCategory(name, description);
  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "Ha ocurrido un error" };
  }
  console.log("Categoría añadida");
  await revalidateCategory();
}

//ACTUALIZAR
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
}

export async function updateCategoryClient(
  formData: { id: string; name: string; description: string },
  category: CategoryItem,
  setAllCategories: (categories: CategoryItem[]) => void,
) {
  try {
    // Actualizamos la categoría en la base de datos
    const result: { data: any; errorMessage: string | undefined } =
      await updateCategory(formData.id, formData.name, formData.description);

    // Registro de la respuesta y errores para depuración
    console.log("Respuesta de updateCategory:", result.data);

    if (result.errorMessage) {
      // Si hay un mensaje de error, lo lanzamos
      throw new Error(result.errorMessage);
    }

    // Verificamos si la respuesta de la actualización es un objeto válido con propiedad 'id'
    if (result.data && typeof result.data === "object") {
      console.log("Tipo de Categoría actualizada");
      await revalidateCategory();
      const updatedCategoriesFromServer = await getAllCategories();
      setAllCategories(updatedCategoriesFromServer);
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

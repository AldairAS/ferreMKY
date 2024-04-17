import { FormSupplierSchema } from "@models/schemas";
import {
  addSupplier,
  editSupplier,
  revalidateSupplier,
} from "../server/supplier";

import { updateSupplier,getAllSupplier } from "@/services/server/supplier";
import { StateSupplier } from "@models/types";


//Función para añadir la categoría y validación de campos
export async function addSupplierClient(
  prevState: StateSupplier,
  formData: FormData
): Promise<StateSupplier> {
  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const description = formData.get("description") as string;
  const validatedFields = FormSupplierSchema.safeParse({
    name,
    contact,
    description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await addSupplier(name, description, contact);
  if (!data || errorMessage)
    return { message: errorMessage ?? "Ha ocurrido un error" };

  console.log("Proveedor añadido");
  await revalidateSupplier();
}

// Función para editar un proveedor
export async function editSupplierClient(
  prevState: StateSupplier,
  formData: FormData
): Promise<StateSupplier> {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const description = formData.get("description") as string;
  const validatedFields = FormSupplierSchema.safeParse({
    name,
    contact,
    description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await editSupplier(
    id,
    name,
    description,
    contact
  );
  if (!data || errorMessage)
    return { message: errorMessage ?? "Ha ocurrido un error" };

  console.log("Proveedor editado");
  await revalidateSupplier();
}
//actualizar

export interface SupplierItem {
  id: string;
  name: string;
  contact: string;
  description: string;
}

export async function updateSupplierClient(
  formData: { id: string; name: string;contact:string; description: string },
  supplier: SupplierItem,
  setAllSuppliers: (suppliers: SupplierItem[]) => void
) {
  try {
    // Actualizamos la categoría en la base de datos
    const result: { data: any; errorMessage: string | undefined } = await updateSupplier(formData.id, formData.name,formData.contact, formData.description);

    // Registro de la respuesta y errores para depuración
    console.log("Respuesta de updateSupplier:", result.data);
    
    if (result.errorMessage) {
      // Si hay un mensaje de error, lo lanzamos
      throw new Error(result.errorMessage);
    }

    // Verificamos si la respuesta de la actualización es un objeto válido con propiedad 'id'
    if (result.data && typeof result.data === 'object') {
      console.log("Proveedor actualizado");
      await revalidateSupplier();
      const updatedSuppliersFromServer = await getAllSupplier();
      setAllSuppliers(updatedSuppliersFromServer);
    } else if (result.errorMessage) {
      throw new Error(result.errorMessage);
    } else {
      throw new Error("La respuesta de actualización no es válida.");
    }
  } catch (error) {
    // Manejamos cualquier error capturado durante el proceso
    console.error("Error al actualizar el proveedor:", error);
  }
}
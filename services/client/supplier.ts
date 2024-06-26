import { FormSupplierSchema } from "@models/schemas";
import {
  updateSupplier,
  getAllSuppliers,
  addSupplier,
  revalidateSupplier,
  searchSuppliers,
  deleteSupplier,
} from "@server/supplier";
import { StateSupplier, Supplier } from "@models/types";

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

  // console.log("Proveedor añadido");
  await revalidateSupplier();
  return { success: true, id: data[0].id };
}

// Función para recuperar todos los proveedores
export async function getAllSuppliersClient(): Promise<any> {
  // console.log("first getAllSuppliers");
  return await getAllSuppliers();
}

// Función para editar un proveedor
export async function updateSupplierClient(
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

  const { data, errorMessage } = await updateSupplier(
    id,
    name,
    description,
    contact
  );

  if (!data || errorMessage)
    return { message: errorMessage ?? "Ha ocurrido un error" };

  console.log("Proveedor editado");
  await revalidateSupplier();
  return { success: true };
}

// export async function updateSupplierClient(
//   formData: { id: string; name: string; contact: string; description: string },
//   supplier: Supplier,
//   setAllSuppliers: (suppliers: Supplier[]) => void
// ) {
//   try {
//     // Actualizamos la categoría en la base de datos
//     const result: { data: any; errorMessage: string | undefined } =
//       await updateSupplier(
//         formData.id,
//         formData.name,
//         formData.contact,
//         formData.description
//       );

//     // Registro de la respuesta y errores para depuración
//     console.log("Respuesta de updateSupplier:", result.data);

//     if (result.errorMessage) {
//       // Si hay un mensaje de error, lo lanzamos
//       throw new Error(result.errorMessage);
//     }

//     // Verificamos si la respuesta de la actualización es un objeto válido con propiedad 'id'
//     if (result.data && typeof result.data === "object") {
//       console.log("Proveedor actualizado");
//       await revalidateSupplier();
//       const data = await getAllSuppliers();
//       if (data.suppliers) {
//         //setAllSuppliers(updatedSuppliersFromServer);
//         setAllSuppliers(data.suppliers);
//       }
//     } else if (result.errorMessage) {
//       throw new Error(result.errorMessage);
//     } else {
//       throw new Error("La respuesta de actualización no es válida.");
//     }
//   } catch (error) {
//     // Manejamos cualquier error capturado durante el proceso
//     console.error("Error al actualizar el proveedor:", error);
//   }
// }

// Busqueda de proveedores por valor y página en el servidor desde la base de datos
export async function searchSuppliersClient(
  value: string,
  page: number
): Promise<Supplier[]> {
  // limpia los inputs de posibles ataques y valida los parametros
  //if (!value) return [];

  //if (page < 1) return [];

  //if (value.length < 3) return [];

  const suppliers = await searchSuppliers(value, page);
  return suppliers;
}

export async function deleteSupplierClient(supplier: Supplier) {
  const res = await deleteSupplier(supplier.id);
  if (res.errorMessage) {
    return { message: res.errorMessage ?? "Ha ocurrido un error" };
  }

  await revalidateSupplier();
  return { success: true };
}

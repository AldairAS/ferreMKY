import { FormSupplierSchema } from "@/lib/zod_schema";
import { addSupplier, revalidateSupplier } from "../server/supplier";
import { StateSupplier } from "@/lib/states";

//Función para añadir la categoría y validación de campos
export async function addSupplierClient(
  prevState: StateSupplier,
  formData: FormData
): Promise<StateSupplier> {
  const name = formData.get("name") as string;
  const contact = formData.get("contact") as string;
  const description = formData.get("description") as string;
  const validatedFields = FormSupplierSchema.safeParse({ name, contact,description });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { data, errorMessage } = await addSupplier(name, description, contact);
  if (!data || errorMessage) {
    return { message: errorMessage ? errorMessage : "Ha ocurrido un error" };
  }
  console.log("Proveedor Añadido");
  await revalidateSupplier();
}

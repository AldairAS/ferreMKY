import { FormCategorySchema } from "@/lib/zod_schema";
import { addCategory, revalidateCategory } from "../server/category";
import { StateCategory } from "@/lib/states";

//Función para añadir la categoría y validación de campos
export async function addCategoryClient(
  prevState: StateCategory,
  formData: FormData
): Promise<StateCategory> {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const validatedFields = FormCategorySchema.safeParse({ name, description });
   if (!validatedFields.success) {
     return {
       errors: validatedFields.error.flatten().fieldErrors,
     };
   }
   const {data, errorMessage} = await addCategory(name, description);
   if (!data || errorMessage) {
     return { message: errorMessage ? errorMessage : "Ha ocurrido un error" };
   }
   console.log("Categoría añadida");
   await revalidateCategory();
}

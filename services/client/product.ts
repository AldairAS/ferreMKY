import { FormProductSchema } from "@models/schemas/zod_schemas";
import { addProduct, revalidateProduct } from "../server/product";
import { StateProduct } from "@models/types/states";
import { updateProduct, getAllProducts } from "@server/product";

//Función para añadir la categoría y validación de campos
export async function addProductClient(
  prevState: StateProduct,
  formData: FormData,
): Promise<StateProduct> {
  const code = formData.get("code") as string;
  const description = formData.get("description") as string;
  const priceSale = formData.get("priceSale") as string;
  const storageCost = formData.get("storageCost") as string;
  const unit = formData.get("unit") as string;
  const quantity = formData.get("quantity") as string;
  const idKind = formData.get("idKind") as string;
  const validatedFields = FormProductSchema.safeParse({
    code,
    description,
    priceSale,
    storageCost,
    unit,
    quantity,
    idKind,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await addProduct(
    idKind,
    code,
    description,
    Number(priceSale),
    Number(storageCost),
    Number(quantity),
    unit,
  );

  if (!data || errorMessage) {
    return { message: errorMessage ?? "Ha ocurrido un error" };
  }

  console.log("Producto añadido");
  await revalidateProduct();
}

//actualizar

export interface ProductItem {
  id: string;
  id_kind: string;
  code: string;
  description: string;
  price_sale: number;
  storage_cost: number;
  quantity: number;
  unit: number;
}

export async function updateProductClient(
  formData: {
    id: string;
    code: string;
    description: string;
    price_sale: number;
    storage_cost: number;
    quantity: number;
    unit: number;
    id_kind: string;
  },
  product: ProductItem,
  setAllProducts: (products: ProductItem[]) => void,
) {
  try {
    // Actualizamos la categoría en la base de datos
    const result: { data: any; errorMessage: string | undefined } =
      await updateProduct(
        formData.id,
        formData.id_kind,
        formData.code,
        formData.description,
        formData.price_sale,
        formData.quantity,
        formData.storage_cost,
        formData.unit,
      );

    // Registro de la respuesta y errores para depuración
    console.log("Respuesta de updateProduct:", result.data);

    if (result.errorMessage) {
      // Si hay un mensaje de error, lo lanzamos
      throw new Error(result.errorMessage);
    }

    // Verificamos si la respuesta de la actualización es un objeto válido con propiedad 'id'
    if (result.data && typeof result.data === "object") {
      console.log("Producto actualizado");
      await revalidateProduct();
      const updatedProductsFromServer = await getAllProducts();
      setAllProducts(updatedProductsFromServer);
    } else if (result.errorMessage) {
      throw new Error(result.errorMessage);
    } else {
      throw new Error("La respuesta de producto no es válida.");
    }
  } catch (error) {
    // Manejamos cualquier error capturado durante el proceso
    console.error("Error al actualizar el producto:", error);
  }
}

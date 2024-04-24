import { FormAddQuantitySchema } from "@models/schemas/zod_schemas";
import { addQuantity, revalidateQuantity } from "../server/product_supplier";
import { StateProductSupplier } from "@models/types/states";
import {
  updateQuantity,
  getAllQuantitys,
} from "@server/product_supplier";
//Función para añadir la categoría y validación de campos
export async function addQuantityClient(
  prevState: StateProductSupplier,
  formData: FormData,
): Promise<StateProductSupplier> {
  const pricePurchase = formData.get("pricePurchase") as string;
  const quantity = formData.get("quantity") as string;
  const idProduct = formData.get("idProduct") as string;
  const idSupplier = formData.get("idSupplier") as string;
  const validatedFields = FormAddQuantitySchema.safeParse({
    pricePurchase,
    quantity,
    idProduct,
    idSupplier,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { data, errorMessage } = await addQuantity(
    idProduct,
    idSupplier,
    Number(quantity),
    Number(pricePurchase),
  );

  if (!data || errorMessage) {
    return { message: errorMessage ?? "Ha ocurrido un error" };
  }

  console.log("Cantidad de producto añadida");
  await revalidateQuantity();
}

//actualizar

export interface QuantityItem {
  id: string;
  quantity: number;
  price_purchase: number;
  id_product: string;
  id_supplier: string;
}

export async function updateQuantityClient(
  formData: {
    id: string;
    quantity: number;
    price_purchase: number;
    id_product: string;
    id_supplier: string;
  },
  quantity: QuantityItem,
  setAllQuantitys: (quantitys: QuantityItem[]) => void,
) {
  try {
    // Actualizamos la categoría en la base de datos
    const result: { data: any; errorMessage: string | undefined } =
      await updateQuantity(
        formData.id,
        formData.quantity,
        formData.price_purchase,
        formData.id_product,
        formData.id_supplier,
      );

    // Registro de la respuesta y errores para depuración
    console.log("Respuesta de updateQuantity:", result.data);

    if (result.errorMessage) {
      // Si hay un mensaje de error, lo lanzamos
      throw new Error(result.errorMessage);
    }

    // Verificamos si la respuesta de la actualización es un objeto válido con propiedad 'id'
    if (result.data && typeof result.data === "object") {
      console.log("Cantidad actualizada");
      await revalidateQuantity();
      const updatedQuantitysFromServer = await getAllQuantitys();
      setAllQuantitys(updatedQuantitysFromServer);
    } else if (result.errorMessage) {
      throw new Error(result.errorMessage);
    } else {
      throw new Error("La respuesta de actualización no es válida.");
    }
  } catch (error) {
    // Manejamos cualquier error capturado durante el proceso
    console.error("Error al actualizar la cantidad:", error);
  }
}

"use server";

import { FormProductSchema } from "@models/schemas";
import {
  addProduct,
  deleteImageProduct,
  deleteProduct,
  revalidateProduct,
  uploadImageAndGetUrlProduct,
} from "../server/product";
import { StateProduct } from "@models/types/states";
import { updateProduct } from "@/services/server/product";
import { Product } from "@/models/types";

export async function validateProductClient(
  prevState: StateProduct,
  formData: FormData
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
}

//Función para añadir la categoría y validación de campos
export async function addProductClient(
  prevState: StateProduct,
  formData: FormData
): Promise<StateProduct> {
  const code = formData.get("code") as string;
  const description = formData.get("description") as string;
  const priceSale = formData.get("priceSale") as string;
  const storageCost = formData.get("storageCost") as string;
  const unit = formData.get("unit") as string;
  const quantity = formData.get("quantity") as string;
  const idKind = formData.get("idKind") as string;

  const image: File | null = formData.get("image") as File;

  const { data, errorMessage } = await addProduct(
    idKind,
    code,
    description,
    Number(priceSale),
    Number(storageCost),
    Number(quantity),
    unit
  );

  if (!data || errorMessage) {
    return { message: errorMessage ?? "Ha ocurrido un error" };
  }

  if (image) {
    let productId = "";
    if (data) productId = data.id;

    const preciseDateTime = new Date().getTime();
    const idImage = productId + "_" + preciseDateTime;

    const imageDataUrl = await uploadImageAndGetUrlProduct(idImage, image);

    data.id_image = idImage;
    data.url_image = imageDataUrl.data.publicUrl;

    const result = await updateProduct(
      data.id,
      data.id_kind,
      data.code,
      data.description,
      data.price_sale,
      data.storage_cost,
      data.quantity,
      data.unit,
      data.id_image,
      data.url_image
    );

    if (!result.data || result.errorMessage) {
      return { message: result.errorMessage ?? "Ha ocurrido un error" };
    }
  }

  await revalidateProduct();
  return { success: true };
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
  prevState: StateProduct,
  formData: FormData
): Promise<StateProduct> {
  /* try {
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
        formData.unit
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
  } */
  const id = formData.get("id") as string;
  const code = formData.get("code") as string;
  const description = formData.get("description") as string;
  const priceSale = formData.get("priceSale") as string;
  const storageCost = formData.get("storageCost") as string;
  const unit = formData.get("unit") as string;
  const quantity = formData.get("quantity") as string;
  const idKind = formData.get("idKind") as string;

  const image: File | null = formData.get("image") as File;
  const idImage = formData.get("idImage") as string;
  const urlImage = formData.get("urlImage") as string;

  let idImageToUpdate = idImage;
  let urlImageToUpdate = urlImage;

  // Si existe una imagen
  if (image) {
    // Si el id no está vacío
    if (idImage.length > 0) {
      const res = await deleteImageProduct(idImage);
      if (res.errorMessage) {
        return { message: res.errorMessage ?? "Ha ocurrido un error" };
      }
    }

    const preciseDateTime = new Date().getTime();
    const newIdImage = id + "_" + preciseDateTime;

    const imageDataUrl = await uploadImageAndGetUrlProduct(newIdImage, image);

    idImageToUpdate = newIdImage;
    urlImageToUpdate = imageDataUrl.data.publicUrl;
  }

  const result = await updateProduct(
    id,
    idKind,
    code,
    description,
    Number(priceSale),
    Number(storageCost),
    Number(quantity),
    unit,
    idImageToUpdate,
    urlImageToUpdate
  );

  if (!result.data || result.errorMessage)
    return { message: result.errorMessage ?? "Ha ocurrido un error" };


  await revalidateProduct();
  return { success: true };
}

export async function deleteProductClient(product: Product) {
  if (product.id_image.length > 0) {
    const resImage = await deleteImageProduct(product.id_image);
    if (resImage.errorMessage) {
      return { message: resImage.errorMessage ?? "Ha ocurrido un error" };
    }
  }

  const resProduct = await deleteProduct(product.id);
  if (resProduct.errorMessage) {
    return { message: resProduct.errorMessage ?? "Ha ocurrido un error" };
  }

  await revalidateProduct();
  return { success: true };
}

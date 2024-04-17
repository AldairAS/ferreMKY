"use server";
import { supabase } from "@config/supabase";
import { revalidatePath } from "next/cache";

//Revalidar la ruta
export async function revalidateQuantity() {
  revalidatePath("/add", "page");
}

//Función para añadir una cantidad de producto
export async function addQuantity(
  idProduct: String,
  idSupplier: String,
  quantity: number,
  price_purchase: number,
) {
  const { data, error } = await supabase
    .from("product_supplier")
    .insert([
      {
        id_product: idProduct,
        id_supplier: idSupplier,
        quantity,
        price_purchase,
      },
    ])
    .select();
  const errorMessage = error?.message;
  console.error(data, errorMessage);
  return { data, errorMessage };
}

// Función para actualizar una categoría
export async function updateQuantity(
  id: string,
  quantity: number,
  price_purchase: number,
  id_product: string,
  id_supplier: string,
) {
  const { data, error } = await supabase
    .from("product_supplier")
    .update({ quantity, price_purchase, id_product, id_supplier })
    .eq("id", id)
    .single();

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al actualizar la cantidad:", errorMessage);
    return { data: null, errorMessage };
  }

  return { data: data || {}, errorMessage: undefined };
}
// Función para traer las categorías
export async function getAllQuantitys() {
  const { data: quantitys, error } = await supabase
    .from("product_supplier")
    .select("*")
    .order("price_purchase");

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al obtener la cantidad:", errorMessage);
    return [];
  }

  return quantitys || [];
}

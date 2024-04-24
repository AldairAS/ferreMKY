"use server";
import { supabase } from "@config/supabase";
import { revalidatePath } from "next/cache";
import { Movement, ValueCategory, ValueKind } from "@/models/types";
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

//Función para obtener el valor del inventario
export async function valueInventory(){
  const {data: total_value} = await supabase
    .rpc("value_inventory");
  console.log(total_value)
  return total_value || [];
}

//Función para obtener los últimos 5 movimientos
export async function recentMovements(){
  const {data: recentMovements} = await supabase
    .rpc("recent_movements");
  console.log(recentMovements)
  return recentMovements as Movement[];
}

//Función para obtener las categorías con mayor valor
export async function categoryValue(){
  const {data: categoryValue} = await supabase
    .rpc("category_value");
  console.log(categoryValue)
  return categoryValue as ValueCategory[];
}

//Función para obtener los tipos de producto con mayor valor
export async function kindValue(){
  const {data: kindValue} = await supabase
    .rpc("kind_value");
  console.log(kindValue)
  return kindValue as ValueKind[];
}
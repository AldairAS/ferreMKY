"use server";

import { Supplier } from "@models/types";
import { supabase } from "@config/supabase";
import { revalidatePath } from "next/cache";

//Revalidar la ruta
export async function revalidateSupplier() {
  revalidatePath("/dashboard/supplier", "page");
}

//Función para añadir un nuevo proveedor
export async function addSupplier(
  name: String,
  description: String,
  contact: String
) {
  const { data, error } = await supabase
    .from("supplier")
    .insert([
      {
        name,
        contact,
        description,
      },
    ])
    .select();

  const errorMessage = error?.message;
  console.error(data, errorMessage);
  return { data, errorMessage };
}

//funcion para eliminar productos de la tabla (product)
export async function deleteSupplier(id: string) {
  //Elimina el registro relacionado con product_supplier
  const { error: errorPSupplier } = await supabase
    .from("product_supplier")
    .delete()
    .eq("id_supplier", id);

  //Manejo de errores
  if (errorPSupplier) {
    console.error("Error:", errorPSupplier.message);
    return { error: errorPSupplier };
  }
  //Eliminar el proveedor
  const { error: errorSupplier } = await supabase
    .from("supplier")
    .delete()
    .eq("id", id);

  //Manejo de errores
  if (errorSupplier) {
    console.error("Error al eliminar el producto:", errorSupplier.message);
    // return { error: errorProduct };
  } else {
    console.log("Producto eliminado exitosamente.");
    // return { error: null };
  }

  return { errorMessage: errorSupplier?.message ?? "" };
}

// Función para actualizar una categoría
export async function updateSupplier(
  id: string,
  name: string,
  contact: string,
  description: string
) {
  const { data, error } = await supabase
    .from("supplier")
    .update({ name, contact, description })
    .eq("id", id)
    .single();

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al actualizar el proveedor:", errorMessage);
    return { data: null, errorMessage };
  }

  // Devuelve un objeto con data y errorMessage
  return { data: data || {}, errorMessage: undefined };
}

// Get 10 supplier filter by name search
export async function searchSuppliers(
  value: string,
  page: number,
  rows?: number
) {
  const initialPosition = (rows ?? 10) * (page - 1);
  const finalPosition = (rows ?? 10) * page - 1;

  const { data: suppliers, error } = await supabase
    .from("supplier")
    .select("name, contact, description")
    .or(
      `name.ilike."*${value}*", contact.ilike."*${value}*", description.ilike."*${value}*"`
    )
    .order("created_at", { ascending: false })
    .range(initialPosition, finalPosition);

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al buscar el proveedor:", errorMessage);
    return [];
  }

  return (suppliers || []) as Supplier[];
}

export async function getAllSuppliersByRange(
  page: number,
  query: string,
  rows: number
) {
  const initialPosition = rows * (page - 1);
  const finalPosition = rows * page - 1;

  const { data: suppliers, error } = await supabase
    .from("supplier")
    .select("id, name, contact, description")
    .or(
      `name.ilike."*${query}*", contact.ilike."*${query}*", description.ilike."*${query}*"`
    )
    .order("created_at", { ascending: false })
    .range(initialPosition, finalPosition);

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al obtener el proveedor:", errorMessage);
    return [];
  }

  return (suppliers || []) as Supplier[];
}

export async function getAllSuppliers() {
  const {
    data: suppliers,
    count,
    error,
  } = await supabase
    .from("supplier")
    .select("id, name, contact, description", { count: "exact" })
    .order("created_at", { ascending: false });

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al obtener el proveedor:", errorMessage);
    return { suppliers: [], count: 0 };
  }

  return { suppliers, count } || { suppliers: [], count: 0 };
}

export async function getCountSupplier(query: string) {
  const { count } = await supabase
    .from("supplier")
    .select(undefined, { count: "exact" })
    .or(
      `name.ilike."*${query}*", contact.ilike."*${query}*", description.ilike."*${query}*"`
    );

  // console.log(count);
  return count === null ? 0 : count;
}

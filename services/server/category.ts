"use server";
import { supabase } from "@config/supabase";
import { revalidatePath } from "next/cache";

//Revalidar la ruta
export async function revalidateCategory() {
  revalidatePath("/add", "page");
}

//Función para añadir una categoría
export async function addCategory(name: String, description: String) {
  const { data, error } = await supabase
    .from("category")
    .insert([
      {
        name: name,
        description: description,
      },
    ])
    .select();

  const errorMessage = error?.message;
  console.error(data, errorMessage);

  return { data, errorMessage };
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from("category").delete().eq("id", id);

  if (error) {
    console.log("Error:", error.message);
    return { error };
  } else {
    console.log("Categoria eliminada");
    return { error: null };
  }
}

// Función para actualizar una categoría
export async function updateCategory(
  id: string,
  name: string,
  description: string,
) {
  const { data, error } = await supabase
    .from("category")
    .update({ name, description })
    .eq("id", id)
    .single();

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al actualizar la categoría:", errorMessage);
    return { data: null, errorMessage };
  }

  // Devuelve un objeto con data y errorMessage
  return { data: data || {}, errorMessage: undefined };
}
// Función para traer las categorías
export async function getAllCategories() {
  const { data: categories, error } = await supabase
    .from("category")
    .select("*")
    .order("name");

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al obtener las categorías:", errorMessage);
    return [];
  }

  return categories || [];
}

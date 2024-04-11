"use server"
import { supabase } from "@/config/supabase";
import { revalidatePath } from "next/cache";

//Revalidar la ruta
export async function revalidateCategory() {
  revalidatePath("/add", "page")
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
  console.log(data, errorMessage);
  return { data, errorMessage };
}

export async function deleteCategory(id : string) {
    const { error } = await supabase
        .from('category')
        .delete()
        .eq('id', id);

    if (error) {
        console.log('Error:', error.message);
        return { error }
    } else {
        console.log('Categoria eliminada');
        return { error: null }
    }

//Función para traer las categorías
export async function getAllCategories(){
  const {data: categories} = await supabase
  .from("category")
  .select("*")
  .order("name");
  return categories;
}
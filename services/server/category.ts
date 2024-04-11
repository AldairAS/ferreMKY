'use server';
import { supabase } from '@/config/supabase';
import { revalidatePath } from 'next/cache';

//Revalidar la ruta
export async function revalidateCategory() {
  revalidatePath('/add', 'page');
}

//Función para añadir una categoría
export async function addCategory(name: String, description: String) {
  const { data, error } = await supabase
    .from('category')
    .insert([
      {
        name: name,
        description: description
      }
    ])
    .select();

  const errorMessage = error?.message;
  console.error(data, errorMessage);

  return { data, errorMessage };
}

//Función para traer las categorías
export async function getAllCategories() {
  const { data: categories } = await supabase
    .from('category')
    .select('*')
    .order('name');

  return categories;
}

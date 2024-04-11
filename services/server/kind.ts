'use server';
import { supabase } from '@/config/supabase';
import { revalidatePath } from 'next/cache';

//Revalidar la ruta
export async function revalidateKind() {
  revalidatePath('/add', 'page');
}

//Implementación para añadir un nuevo tipo de producto
export async function addKind(
  idCategory: String,
  name: String,
  description: String
) {
  const { data, error } = await supabase
    .from('kind')
    .insert([
      {
        id_category: idCategory,
        name,
        description
      }
    ])
    .select();

  const errorMessage = error?.message;
  console.error(data, errorMessage);

  return { data, errorMessage };
}

//Función para traer las categorías
export async function getAllKinds() {
  const { data: kinds } = await supabase.from('kind').select('*').order('name');
  return kinds;
}

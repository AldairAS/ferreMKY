'use server';
import { supabase } from '@config/supabase';
import { revalidatePath } from 'next/cache';

//Revalidar la ruta
export async function revalidateSupplier() {
  revalidatePath('/add', 'page');
}

//Función para añadir un nuevo proveedor
export async function addSupplier(
  name: String,
  description: String,
  contact: String
) {
  const { data, error } = await supabase
    .from('supplier')
    .insert([
      {
        name,
        contact,
        description
      }
    ])
    .select();
  const errorMessage = error?.message;
  console.error(data, errorMessage);
  return { data, errorMessage };
}

//funcion para eliminar productos de la tabla (product)
export async function deleteSupplier(id: string) {
  //Elimina el registro relacionado con product_supplier
  const { error: errorSupplier } = await supabase
    .from('product_supplier')
    .delete()
    .eq('id_supplier', id);

  //Manejo de errores
  if (errorSupplier) {
    console.error('Error:', errorSupplier.message);
    return { error: errorSupplier };
  }
  //Eliminar el producto
  const { error: errorProduct } = await supabase
    .from('supplier')
    .delete()
    .eq('id', id);

  //Manejo de errores
  if (errorProduct) {
    console.error('Error al eliminar el producto:', errorProduct.message);
    return { error: errorProduct };
  } else {
    console.log('Producto eliminado exitosamente.');
    return { error: null };
  }
}

// Función para actualizar una categoría
export async function updateSupplier(id: string, name: string, contact:string , description: string) {
  const { data, error } = await supabase
    .from("supplier")
    .update({ name,contact, description })
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
// Función para traer las categorías
export async function getAllSupplier() {
  const { data: supplier, error } = await supabase
    .from("supplier")
    .select("*")
    .order("name");

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al obtener el proveedor:", errorMessage);
    return [];
  }

  return supplier || [];
}

// Función para editar un proveedor
export async function editSupplier(
  id: String,
  name?: String,
  description?: String,
  contact?: String
) {
  const supplier = Object.keys({ name, description, contact }).reduce(
    (acc, el) => (el ? { acc, el } : acc),
    {}
  );

  const { data, error } = await supabase
    .from('supplier')
    .update(supplier)
    .eq('id', id);

  const errorMessage = error?.message;
  console.error(data, errorMessage);
  return { data, errorMessage };
}

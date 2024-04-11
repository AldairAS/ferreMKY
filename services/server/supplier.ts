"use server"
import { supabase } from "@/config/supabase"
import { revalidatePath } from "next/cache";


//Revalidar la ruta
export async function revalidateSupplier() {
  revalidatePath("/add", "page");
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
  console.log(data, errorMessage);
  return { data, errorMessage };
}

//funcion para eliminar productos de la tabla (product)
export async function deleteSupplier(id : string) {
    //Elimina el registro relacionado con product_supplier
    const { error: errorSupplier } = await supabase
        .from('product_supplier')
        .delete()
        .eq('id_supplier', id);
        
    //Manejo de errores
    if (errorSupplier) {
        console.log('Error:', errorSupplier.message);
        return { error: errorSupplier }
    } 
    //Eliminar el producto
    const { error: errorProduct } = await supabase
        .from('supplier')
        .delete()
        .eq('id', id);
    
    //Manejo de errores
    if (errorProduct) {
        console.log('Error al eliminar el producto:', errorProduct.message);
        return { error: errorProduct }
    }else{
        console.log('Producto eliminado exitosamente.');
        return { error: null }
    }
    

//Función para traer los proveedores
export async function getAllSuppliers(){
  const {data: supplier} = await supabase
  .from("supplier")
  .select("*")
  .order("name");
  return supplier;
}
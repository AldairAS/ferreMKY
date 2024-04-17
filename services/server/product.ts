'use server';
import { Product } from '@models/types/definitions';
import { supabase } from '@config/supabase';
import { revalidatePath } from 'next/cache';

//Revalidar la ruta
export async function revalidateProduct() {
  revalidatePath('/add', 'page');
}
//Función para añadir un nuevo producto
export async function addProduct(
  idKind: String,
  code: String,
  description: String,
  priceSale: number,
  storageCost: number,
  quantity: number,
  unit: string
) {
  const { data, error } = await supabase
    .from('product')
    .insert([
      {
        id_kind: idKind,
        code,
        description,
        price_sale: priceSale,
        storage_cost: storageCost,
        unit,
        quantity
      }
    ])
    .select();
  const errorMessage = error?.message;
  console.error(data, errorMessage);
  return { data, errorMessage };
}
  
//funcion para eliminar productos de la tabla (product)
export async function deleteProduct(id : string) {
    //Elimina el registro relacionado con product_supplier
    const { error: errorSupplier } = await supabase
        .from('product_supplier')
        .delete()
        .eq('id_product', id);
        
    //Manejo de errores
    if (errorSupplier) {
        console.log('Error:', errorSupplier.message);
        return { error: errorSupplier }
    } 
    //Eliminar el producto
    const { error: errorProduct } = await supabase
        .from('product')
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
    
}
//Función para traer los productos
// Función para actualizar una categoría
export async function updateProduct(id: string,
  id_kind: string,
  code: string,
  description: string,
  price_sale: number,
  storage_cost: number,
  quantity: number ,
  unit: number   

) {
  const { data, error } = await supabase
    .from("product")
    .update({ id_kind,code, description, price_sale,storage_cost,quantity,unit })
    .eq("id", id)
    .single();

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al actualizar el producto:", errorMessage);
    return { data: null, errorMessage };
  }

  // Devuelve un objeto con data y errorMessage
  return { data: data || {}, errorMessage: undefined };
}
// Función para traer las categorías
export async function getAllProducts() {
  const { data: products, error } = await supabase
    .from("product")
    .select("*")
    .order("code");

  const errorMessage = error?.message;

  if (errorMessage) {
    console.error("Error al obtener el producto:", errorMessage);
    return [];
  }

  return products || [];
}


export async function searchItemsInventory(
  currentPage: number,
  query: string,
  rows?: number
) {
  const initialPosition = (rows ?? 10) * (currentPage - 1);
  const lastPosition = (rows ?? 10) * currentPage - 1;

  const { data: products } = await supabase
    .rpc('get_products_kind_query', { query })
    .select('id, code, unit, description, price_sale, quantity, name_kind')
    .range(initialPosition, lastPosition);

  return products as Product[];
}


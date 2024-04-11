'use server';
import { Product } from '@/lib/definitions';
import { supabase } from '@/config/supabase';
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
export async function getAllProducts() {
  const { data: products } = await supabase
    .from('product')
    .select('*')
    .order('code');
  return products;
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

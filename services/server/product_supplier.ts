'use server';
import { supabase } from '@config/supabase';
import { revalidatePath } from 'next/cache';

//Revalidar la ruta
export async function revalidateQuantity() {
  revalidatePath('/add', 'page');
}

//Función para añadir una cantidad de producto
export async function addQuantity(
  idProduct: String,
  idSupplier: String,
  quantity: number,
  price_purchase: number
) {
  const { data, error } = await supabase
    .from('product_supplier')
    .insert([
      {
        id_product: idProduct,
        id_supplier: idSupplier,
        quantity,
        price_purchase
      }
    ])
    .select();
  const errorMessage = error?.message;
  console.error(data, errorMessage);
  return { data, errorMessage };
}

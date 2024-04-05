'use server'

import { supabase } from "@/config/supabase";

//funcion para eliminar productos de la tabla (product)
export async function deleteProduct(id : string) {
    const { error } = await supabase
        .from('product')
        .delete()
        .eq('id', id);
        
    //Manejo de errores
    if (error) {
        console.log('Error:', error.message);
    } else {
        console.log('Producto eliminado');
    }
}
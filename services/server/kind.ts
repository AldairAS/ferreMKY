'use server';

import { supabase } from "@/config/supabase";

//funcion para eliminar un tipo de producto de la tabla (kind)
export async function deleteTypeOfProduct(id : string) {
    const { error } = await supabase
        .from('kind')
        .delete()
        .eq('id', id);

    if (error) {
        console.log('Error:', error.message);
        return { error }
    } else {
        console.log('Tipo de producto eliminado');
        return { error: null }
    }
}
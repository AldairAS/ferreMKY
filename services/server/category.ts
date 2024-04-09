'use server';

import { supabase } from "@/config/supabase";

//funcion para eliminar categorias de la tabla (category)
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
}
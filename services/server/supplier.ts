'use server';

import { supabase } from "@/config/supabase";

//funcion para eliminar proveedores de la tabla (supplier)
export async function deleteSupplier(id : string) {
    const { error } = await supabase
        .from('supplier')
        .delete()
        .eq('id', id);

    if (error) {
        console.log('Error:', error.message);
    } else {
        console.log('Proveedor eliminado');
    }
}
// Componente para editar un supplier
'use client';
import { useFormState } from 'react-dom';
import { editSupplierClient } from '@client/supplier';
import { Supplier } from '@models/types/definitions';

export default function EditSupplierForm({
  kinds,
  supplier
}: {
  kinds: any | null;
  supplier: Supplier;
}) {
  const [formState, formAction] = useFormState(editSupplierClient, undefined);

  return (
    <div>
      <form action={formAction}>
        <h2>Añadir un Producto</h2>
        <label htmlFor='idKind'>Seleccione un Tipo de producto</label>
        <select name='idKind' id='idKind' defaultValue=''>
          {kinds?.map((v: any) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type='text'
          id='code'
          name='code'
          value={supplier.name}
          placeholder='Ingrese el nuevo nombre del proveedor.'
        />
        <br />
        <input
          type='text'
          id='description'
          name='description'
          value={supplier.contact}
          placeholder='Ingrese el nuevo contacto del proveedor.'
        />
        <input
          type='text'
          id='priceSale'
          name='priceSale'
          value={supplier.description}
          placeholder='Ingrese la nueva descripción del proveedor.'
        />
        <button type='submit'>Editar Proveedor</button>
        <p>
          {formState?.errors && formState.errors.name}
          {formState?.errors && formState.errors.contact}
          {formState?.errors && formState.errors.description}
          {formState?.message && formState.message}
        </p>
      </form>
    </div>
  );
}

"use client";
import { useFormState } from "react-dom";
import { addProductClient } from "@/services/client/product";

export default function AddProductForm({
  kinds,
}: {
  kinds: any | null;
}) {
  const [formState, formAction] = useFormState(addProductClient, undefined);
  return (
    <div>
      <form action={formAction}>
        <h2>Añadir un Producto</h2>
        <label htmlFor="idKind">Seleccione un Tipo de producto</label>
        <select name="idKind" id="idKind" defaultValue="">
          {kinds?.map((v: any) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          id="code"
          name="code"
          placeholder="Ingrese el código del nuevo producto."
        />
        <br />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Ingrese la descripción del nuevo producto."
        />
        <input
          type="text"
          id="priceSale"
          name="priceSale"
          placeholder="Ingrese el precio de venta del producto."
        />
        <br />
        <input
          type="text"
          id="storageCost"
          name="storageCost"
          placeholder="Ingrese el costo por almacenamiento del producto."
        />
        <br />
        <input
          type="text"
          id="unit"
          name="unit"
          placeholder="Ingrese la unidad del nuevo producto (metros, unidad, Kg, etc.)"
        />
        <br />
        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Ingrese la cantidad del nuevo producto."
        />
        <button type="submit">Añadir nuevo Producto</button>
        <p>
          {formState?.errors && formState.errors.idKind}
          {formState?.errors && formState.errors.code}
          {formState?.errors && formState.errors.description}
          {formState?.errors && formState.errors.priceSale}
          {formState?.errors && formState.errors.storageCost}
          {formState?.errors && formState.errors.unit}
          {formState?.errors && formState.errors.quantity}
          {formState?.message && formState.message}
        </p>
      </form>
    </div>
  );
}

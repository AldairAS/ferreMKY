"use client";
import { useFormState } from "react-dom";
import { addQuantityClient } from "@client/product_supplier";

export default function AddQuantityForm({
  products,
  suppliers
}: {
  products: any | null,
  suppliers: any | null;
}) {
  const [formState, formAction] = useFormState(addQuantityClient, undefined);
  return (
    <div>
      <form action={formAction}>
        <h2>Añadir una cantidad de producto</h2>
        <label htmlFor="idSupplier">Seleccione un proveedor</label>
        <select name="idSupplier" id="idSupplier" defaultValue="">
          {suppliers?.map((v: any) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="idProduct">Seleccione un producto</label>
        <select name="idProduct" id="idProduct" defaultValue="">
          {products?.map((v: any) => (
            <option key={v.id} value={v.id}>
              {v.description}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          id="pricePurchase"
          name="pricePurchase"
          placeholder="Ingrese el precio de costo por unidad al comprar el producto."
        />
        <br />
        <input
          type="text"
          id="quantity"
          name="quantity"
          placeholder="Ingrese la cantidad adquirida al proveedor."
        />
        <button type="submit">Añadir nueva cantidad de producto</button>
        <p>
          {formState?.errors && formState.errors.idProduct}
          {formState?.errors && formState.errors.idSupplier}
          {formState?.errors && formState.errors.pricePurchase}
          {formState?.errors && formState.errors.quantity}
          {formState?.message && formState.message}
        </p>
      </form>
    </div>
  );
}

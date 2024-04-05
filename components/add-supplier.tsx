"use client";
import { useFormState } from "react-dom";
import { addSupplierClient } from "@/services/client/supplier";

export default function AddSupplierForm() {
  const [formState, formAction] = useFormState(addSupplierClient, undefined);
  return (
    <div>
      <form action={formAction}>
        <h2>Añadir Proveedor</h2>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre de la nueva categoría"
        />
        <br />
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="contacto del proveedor"
        />
        <br />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descripción de la nueva categoría"
        />
        <button type="submit">Añadir nuevo proveedor</button>
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

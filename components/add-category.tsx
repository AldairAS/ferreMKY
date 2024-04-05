"use client";
import { useFormState } from "react-dom";
import { addCategoryClient } from "@/services/client/category";

export default function AddCategoryForm() {
  const [formState, formAction] = useFormState(addCategoryClient, undefined);
  return (
    <div>
      <form action={formAction}>
        <h2>Añadir categoría</h2>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nombre de la nueva categoría"
        />
        <br />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Descripción de la nueva categoría"
        />
        <button type="submit">Añadir nueva categoría</button>
        <p>
          {formState?.errors && formState.errors.name}
          {formState?.errors && formState.errors.description}
          {formState?.message && formState.message}
        </p>
      </form>
    </div>
  );
}

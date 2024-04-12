"use client";
import { useFormState } from "react-dom";
import { addKindClient } from "@client/kind";

export default function AddKindForm({categories}:{categories: any | null}) {
  const [formState, formAction] = useFormState(addKindClient, undefined);
  return (
    <div>
      <form action={formAction}>
        <h2>Añadir Tipo de producto</h2>
        <label htmlFor="idCategory">Seleccione una categoría</label>
        <select name="idCategory" id="idCategory" defaultValue="">
          {categories?.map((v: any) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ingrese el nombre del nuevo tipo de producto."
        />
        <br />
        <input
          type="text"
          id="description"
          name="description"
          placeholder="Ingrese la descripción del nuevo tipo de producto."
        />
        <button type="submit">Añadir nuevo tipo de producto</button>
        <p>
          {formState?.errors && formState.errors.name}
          {formState?.errors && formState.errors.description}
          {formState?.errors && formState.errors.idCategory}
          {formState?.message && formState.message}
        </p>
      </form>
    </div>
  );
}

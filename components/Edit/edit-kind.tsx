"use client";
import React, { useState } from "react";
import {
  updateKindClient,
  KindItem as KindItemType,
} from "@/services/client/kind";

interface KindItemProps {
  kind: KindItemType;
  setAllKinds: (kinds: KindItemType[]) => void;
  categories: any[] | null;
}

const KindItem = ({ kind, setAllKinds, categories }: KindItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(kind);
  const [selectedCategory, setSelectedCategory] = useState("");
  const currentCategoryId = kind.id_category;
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      id_category: e.target.value, // Actualizar el valor de id_category
    });
    setSelectedCategory(e.target.value); // Mantener el valor seleccionado
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateKindClient(formData, kind, setAllKinds);
      setIsEditing(false); // Ocultar el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar el tipo de categoría:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Descripción:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="id_category">Seleccione una categoría</label>
          <select
            name="id_category"
            id="id_category"
            value={formData.id_category || currentCategoryId}
            onChange={handleSelectChange}
          >
            {categories?.map((v: any) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <br />

          <button type="submit">Actualizar</button>
        </form>
      ) : (
        <>
          <h2>{kind.name}</h2>
          <p>{kind.description}</p>
          <p>{kind.id_category}</p>
          <button onClick={handleEditClick}>Editar</button>
        </>
      )}
    </div>
  );
};

export default KindItem;

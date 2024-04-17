"use client";
import { useState } from "react";
import {
  updateCategoryClient,
  CategoryItem as CategoryItemType,
} from "@/services/client/category";

interface CategoryItemProps {
  category: CategoryItemType;
  setAllCategories: (categories: CategoryItemType[]) => void;
}

const CategoryItem = ({ category, setAllCategories }: CategoryItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(category);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...formData, id: category.id };
      await updateCategoryClient(updatedFormData, category, setAllCategories);
      setFormData(updatedFormData);
      setIsEditing(false); // Ocultar el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
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
          <button type="submit">Actualizar</button>
        </form>
      ) : (
        <>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          <button onClick={handleEditClick}>Editar</button>
        </>
      )}
    </div>
  );
};

export default CategoryItem;

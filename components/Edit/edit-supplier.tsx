"use client";
import { useState } from "react";
import {
  updateSupplierClient,
  SupplierItem as SupplierItemType,
} from "@/services/client/supplier";

interface SupplierItemProps {
  supplier: SupplierItemType;
  setAllSuppliers: (suppliers: SupplierItemType[]) => void;
}

const SupplierItem = ({ supplier, setAllSuppliers }: SupplierItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(supplier);

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
      const updatedFormData = { ...formData, id: supplier.id };
      await updateSupplierClient(updatedFormData, supplier, setAllSuppliers);
      setFormData(updatedFormData);
      setIsEditing(false); // Ocultar el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar el proveedor:", error);
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
            Nombre:
            <input
              type="text"
              name="contact"
              value={formData.contact}
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
          <h2>{supplier.name}</h2>
          <p>{supplier.contact}</p>
          <p>{supplier.description}</p>

          <button onClick={handleEditClick}>Editar</button>
        </>
      )}
    </div>
  );
};

export default SupplierItem;

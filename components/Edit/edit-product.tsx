"use client";
import React, { useState } from "react";
import {
  updateProductClient,
  ProductItem as ProductItemType,
} from "@client/product";

interface ProductItemProps {
  product: ProductItemType;
  setAllProducts: (products: ProductItemType[]) => void;
  kinds: any[] | null;
}

const ProductItem = ({ product, setAllProducts, kinds }: ProductItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(product);
  const [selectedKind, setSelectedKind] = useState("");
  const currentKindId = product.id_kind;
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
      id_kind: e.target.value, // Actualizar el valor de id_category
    });
    setSelectedKind(e.target.value); // Mantener el valor seleccionado
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProductClient(formData, product, setAllProducts);
      setIsEditing(false); // Ocultar el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar el tipo de categoría:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="id_kind">Seleccione un producto</label>
          <select
            name="id_kind"
            id="id_kind"
            value={formData.id_kind || currentKindId}
            onChange={handleSelectChange}
          >
            {kinds?.map((v: any) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
          <br />
          <label>
            code
            <input
              type="text"
              name="code"
              value={formData.code}
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
          <label>
            Precio:
            <input
              type="number"
              name="price_sale"
              value={formData.price_sale}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Costo:
            <input
              type="number"
              name="storage_cost"
              value={formData.storage_cost}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Unidad:
            <input
              type="number"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Cantidad:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </label>
          <br />

          <button type="submit">Actualizar</button>
        </form>
      ) : (
        <>
          <h2>{product.code}</h2>
          <p>{product.description}</p>
          <p>{product.price_sale}</p>
          <p>{product.storage_cost}</p>
          <p>{product.unit}</p>
          <p>{product.quantity}</p>
          <p>{product.id_kind}</p>
          <button onClick={handleEditClick}>Editar</button>
        </>
      )}
    </div>
  );
};

export default ProductItem;

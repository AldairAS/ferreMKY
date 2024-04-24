"use client";
import React, { useState } from "react";
import {
  updateQuantityClient,
  QuantityItem as QuantityItemType,
} from "@client/product_supplier";

interface QuantityItemProps {
  quantity: QuantityItemType;
  setAllQuantitys: (quantitys: QuantityItemType[]) => void;
  products: any[] | null;
  suppliers: any[] | null;
}

const QuantityItem = ({
  quantity,
  setAllQuantitys,
  products,
  suppliers,
}: QuantityItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(quantity);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const currentProductId = quantity.id_product;
  const currentSupplierId = quantity.id_supplier;
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
      id_product: e.target.value,
    });
    setSelectedProduct(e.target.value); // Mantener el valor seleccionado
  };
  const handleSelectChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      id_supplier: e.target.value, // Actualizar el valor de id_category
    });
    setSelectedSupplier(e.target.value); // Mantener el valor seleccionado
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateQuantityClient(formData, quantity, setAllQuantitys);
      setIsEditing(false); // Ocultar el formulario después de la actualización
    } catch (error) {
      console.error("Error al actualizar el tipo de cantidad:", error);
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
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
          <label>
            Precio_purche:
            <input
              type="number"
              name="price_purchase"
              value={formData.price_purchase}
              onChange={handleChange}
            />
          </label>
          <br />
          <label htmlFor="id_product">
            Seleccione una categoría de producto
          </label>
          <select
            name="id_product"
            id="id_product"
            value={formData.id_product || currentProductId}
            onChange={handleSelectChange}
          >
            {products?.map((v: any) => (
              <option key={v.id} value={v.id}>
                {v.description}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="id_supplier">Seleccione una proveedor</label>
          <select
            name="id_supplier"
            id="id_supplier"
            value={formData.id_supplier || currentSupplierId}
            onChange={handleSelectChanges}
          >
            {suppliers?.map((v: any) => (
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
          <h2>{quantity.quantity}</h2>
          <p>{quantity.price_purchase}</p>
          <p>{quantity.id_product}</p>
          <p>{quantity.id_supplier}</p>
          <button onClick={handleEditClick}>Editar</button>
        </>
      )}
    </div>
  );
};

export default QuantityItem;

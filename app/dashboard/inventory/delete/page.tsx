// FIXME: No es necesaria una pagina para la eliminacion de un producto, se puede hacer directamente en el archivo de la pagina de inventario seleccionando la opcion del dropdown

"use client";
import { useState } from "react";
import { deleteProduct } from "@/services/server/product";

export default function DeleteProduct() {
  const [productId, setProductId] = useState("");

  const handleDelete = async () => {
    //Verifica si el producto esta vacio
    if (!productId) {
      alert("Por favor ingresa un ID de producto válido.");
      return;
    }
    //Mensaje de confirmación
    if (
      !confirm(
        "Al eliminar el producto se eliminará también el product_supplier asociado. ¿Estás seguro de que deseas continuar"
      )
    ) {
      return;
    }

    try {
      // Intenta eliminar el producto
      const { error } = await deleteProduct(productId);

      if (error) {
        alert(`Error al eliminar el producto: ${error.message}`);
      } else {
        alert("Producto y product_supplier eliminados exitosamente.");
      }
    } catch (error) {
      // Manejo de errores
      alert(
        "Error al eliminar el producto. Por favor revisa la consola para más detalles."
      );
      console.error("Error al eliminar el producto:", error);
    }
  };

  //Actualiza el estado del ID del producto
  const handleIdChange = (e: any) => {
    setProductId(e.target.value);
  };

  return (
    <div>
      <h3>Eliminar Producto</h3>
      <label htmlFor="productId">ID de Producto:</label>
      <input
        type="text"
        id="productId"
        value={productId}
        onChange={handleIdChange}
        placeholder="ID del producto a eliminar"
      />
      {/* Boton para eliminar el producto */}
      <button onClick={handleDelete}>Eliminar Producto</button>
    </div>
  );
}

'use client'
import { useState } from 'react';
import { deleteProduct } from '@/services/server/product';

export default function DeleteProduct() {
  const [productId, setProductId] = useState('');

  const handleDelete = async () => {
    //Verifica si el producto esta vacio
    if (!productId) {
      alert('Por favor ingresa un ID de producto válido.');
      return;
    }
    try {
        //Llama a la funcion deleteProduct para eliminar el producto
      await deleteProduct(productId);
      alert('Producto eliminado exitosamente.');
    } catch (error) {
        //Manejo de errores
      alert('Error al eliminar el producto. Por favor revisa la consola para más detalles.');
      console.error('Error al eliminar el producto:', error);
    }
  };

  //Actualiza el estado del ID del producto
  const handleIdChange = (e : any) => {
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

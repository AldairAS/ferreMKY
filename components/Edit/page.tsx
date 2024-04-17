"use client";
import React, { useState, useEffect } from "react";
import CategoryItem from "@/components/Edit/edit-categories";
import KindItem from "@/components/Edit/edit-kind";
import SupplierItem from "@/components/Edit/edit-supplier";
import ProductItem from "@/components/Edit/edit-product";
import QuantityItem from "@/components/Edit/edit-quantity-product";
import { getAllCategories } from "@/services/server/category";
import { getAllKinds } from "@/services/server/kind";
import { getAllSupplier } from "@/services/server/supplier";
import { getAllProducts } from "@/services/server/product";
import { getAllQuantitys } from "@/services/server/product_supplier";
import { CategoryItem as CategoryItemType } from "@/services/client/category";
import { KindItem as KindItemType } from "@/services/client/kind";
import { SupplierItem as SupplierItemType } from "@/services/client/supplier";
import { ProductItem as ProductItemType } from "@/services/client/product";
import { QuantityItem as QuantityItemType } from "@/services/client/product_supplier";
interface AddProps {}

export default function Add(props: AddProps) {
  const [categories, setCategories] = useState<CategoryItemType[]>([]);
  const [kinds, setKinds] = useState<KindItemType[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierItemType[]>([]);
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [quantitys, setQuantitys] = useState<QuantityItemType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);

      const fetchedKinds = await getAllKinds();
      setKinds(fetchedKinds);

      const fetchedSuppliers = await getAllSupplier();
      setSuppliers(fetchedSuppliers);

      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);

      const fetchedQuantity = await getAllQuantitys();
      setQuantitys(fetchedQuantity);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Categorías</h1>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          setAllCategories={setCategories}
        />
      ))}
      <h2>Tipos de Productos</h2>
      {kinds.map((kind) => (
        <KindItem
          key={kind.id}
          kind={kind}
          setAllKinds={setKinds}
          categories={categories}
        />
      ))}
      <h1>Proveedor</h1>
      {suppliers.map((supplier) => (
        <SupplierItem
          key={supplier.id}
          supplier={supplier}
          setAllSuppliers={setSuppliers}
        />
      ))}
      <h2>Productos</h2>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          setAllProducts={setProducts}
          kinds={kinds}
        />
      ))}
      <h2>Tipos de Cantidad de proveedor y producto</h2>
      {quantitys.map((quantity) => (
        <QuantityItem
          key={quantity.id}
          quantity={quantity}
          setAllQuantitys={setQuantitys}
          products={products}
          suppliers={suppliers}
        />
      ))}
    </div>
  );
}
